import { SearchBar } from "@/components/search-bar"
import { ClubCard } from "@/components/club-card"
import Header from "@/components/header"
import { getAllClubs } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"

type HomePageProps = {
  searchParams: Promise<{[key: string]: string|undefined}>
}

export default async function Home({ searchParams }: HomePageProps) {
  const {tags} = await searchParams
  //const tags = searchParams.tags ? searchParams.tags.split(",") : []
  const tagList = tags? tags.split(",") : []
  const allClubs = getAllClubs()
  
  // タグが選択されている場合はクラブをフィルタリング
  const clubs = tagList.length > 0
    ? allClubs.filter(club => 
        club.tags?.some(tag => tagList.includes(tag)) || false
      )
    : allClubs

  // フィルターオプション用に全クラブから固有のタグを取得
  const uniqueTags = Array.from(
    new Set(
      allClubs.flatMap(club => club.tags || [])
    )
  ).sort()

  // URL検索パラメータユーティリティ関数の作成
  const createQueryString = (name: string, value: string[]) => {
    const params = new URLSearchParams()
    if (value.length > 0) {
      params.set(name, value.join(','))
    }
    return params.toString()
  }

  return (
    <>
      <Header />
      <main className="container p-4 md:py-12">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            あなたにぴったりのクラブを見つけよう
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            あなたの興味に合ったクラブや活動を発見し、つながりましょう
          </p>
          <SearchBar />
        </div>

        {/* タグフィルター */}
        <div className="mb-8">
          <h3 className="font-medium mb-3">タグでフィルター</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => {
              const isSelected = tagList.includes(tag)
              
              // タグの選択を切り替える
              const newTags = isSelected
                ? tagList.filter(t => t !== tag)
                : [...tagList, tag]
              
              // クエリ文字列の作成
              const queryString = createQueryString("tags", newTags)
              const href = queryString ? `/?${queryString}` : '/'

              return (
                <a
                  key={tag}
                  href={href}
                  className="no-underline"
                >
                  <Badge
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </a>
              )
            })}
          </div>
        </div>

        <Suspense fallback={<div>読み込み中...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {clubs.length > 0 ? (
              clubs.map((club) => (
                <ClubCard key={club.slug} club={club} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium mb-2">クラブが見つかりませんでした</h3>
                <p className="text-muted-foreground">
                  フィルター条件を調整してみてください
                </p>
              </div>
            )}
          </div>
        </Suspense>
        <footer className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-4">
            あなたのクラブが見つかりませんか？{" "}
            <a href="/submit" className="text-primary underline">
              こちらから登録
            </a>
          </p>
        </footer>
      </main>
    </>
  )
}
