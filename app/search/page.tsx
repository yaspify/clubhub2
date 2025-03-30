import { Suspense } from "react"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/search-bar"
import { ClubCard } from "@/components/club-card"
import Header from "@/components/header"
import { searchClubs, getAllClubs } from "@/lib/data"

interface SearchPageProps {
  searchParams: {
    q?: string
    tags?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const tags = searchParams.tags ? searchParams.tags.split(",") : []
  
  // 検索結果を取得
  const searchResults = query ? searchClubs(query) : getAllClubs()
  
  // タグが選択されている場合はフィルタリング
  const filteredResults = tags.length > 0
    ? searchResults.filter(club => 
        club.tags?.some(tag => tags.includes(tag)) || false
      )
    : searchResults

  // フィルターオプション用に全クラブから固有のタグを取得
  const allClubs = getAllClubs()
  const uniqueTags = Array.from(
    new Set(
      allClubs.flatMap(club => club.tags || [])
    )
  ).sort()

  // URL検索パラメータユーティリティ関数の作成
  const createQueryString = (name: string, value: string[]) => {
    const params = new URLSearchParams()
    
    // クエリパラメータが存在する場合は保持
    if (query) {
      params.set("q", query)
    }
    
    // 新しいタグがある場合は設定
    if (value.length > 0) {
      params.set(name, value.join(','))
    }
    
    return params.toString()
  }

  return (
    <>
      <Header />
      <main className="container p-4 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-4">
            {query ? `"${query}"の検索結果` : "すべてのクラブ"}
          </h1>
          <SearchBar initialQuery={query} disableSuggestions />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* フィルターサイドバー */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">タグでフィルター</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueTags.map((tag) => {
                    const isSelected = tags.includes(tag)
                    
                    // タグの選択を切り替える
                    const newTags = isSelected
                      ? tags.filter(t => t !== tag)
                      : [...tags, tag]
                    
                    // クエリ文字列の作成
                    const queryString = createQueryString("tags", newTags)
                    const href = queryString ? `/search?${queryString}` : '/search'
                    
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
                          {isSelected && " ×"}
                        </Badge>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* 結果グリッド */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div>読み込み中...</div>}>
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults.map((club) => (
                    <ClubCard key={club.slug} club={club} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">結果が見つかりませんでした</h3>
                  <p className="text-muted-foreground">
                    検索条件やフィルター条件を調整してみてください
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}