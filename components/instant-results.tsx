"use client"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Club } from "@/lib/data"

interface InstantResultsProps {
  results: Club[]
  query: string
  onViewAll: () => void
  onResultClick: () => void
}

export default function InstantResults({ results, query, onViewAll, onResultClick }: InstantResultsProps) {
  if (!query.trim()) {
    return null
  }

  return (
    <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg overflow-hidden">
      <div className="p-2">
        <div className="flex items-center justify-between px-2 py-1.5">
          <p className="text-sm font-medium">検索結果</p>
          <Badge variant="secondary" className="text-xs">
            {results.length}件見つかりました
          </Badge>
        </div>
      </div>
      {results.length > 0 ? (
        <>
          <ul className="max-h-[300px] overflow-auto">
            {results.map((club) => (
              <li key={club.slug} className="border-t first:border-t-0">
                <Link
                  href={`/club/${club.slug}`}
                  className="flex items-start px-4 py-2 hover:bg-muted transition-colors"
                  onClick={onResultClick}
                >
                  <div className="h-12 w-12 mr-3 flex-shrink-0 relative overflow-hidden rounded-md bg-muted">
                    {club.profileImage ? (
                      <Image
                        src={club.profileImage}
                        alt={club.clubName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-muted text-xs font-medium">
                        {club.clubName.substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">{club.clubName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {club.activityDetails?.summary || "説明はありません"}
                    </p>
                    {club.tags && club.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {club.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs capitalize px-1 py-0 h-4">
                            {tag}
                          </Badge>
                        ))}
                        {club.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                            +{club.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-2 border-t">
            <Button
              variant="secondary"
              size="sm"
              className="w-full flex items-center justify-center gap-2"
              onClick={onViewAll}
            >
              <Search className="h-3.5 w-3.5" />
              <span>すべての結果を表示</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="p-4 text-left text-sm text-muted-foreground">&ldquo;{query}&rdquo;の検索結果はありません</div>
      )}
    </div>
  )
}
