"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import InstantResults from "./instant-results"
import { type Club, searchClubs } from "@/lib/data"

interface SearchBarProps {
  initialQuery?: string
  disableSuggestions?: boolean
}

export function SearchBar({ initialQuery = "", disableSuggestions = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Club[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // クエリ変更時に結果を更新
  useEffect(() => {
    if (query.trim() && !disableSuggestions) {
      const searchResults = searchClubs(query)
      setResults(searchResults.slice(0, 5)) // インスタント検索のために5件に制限
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }, [query, disableSuggestions])

  // 外部クリックで結果を閉じる処理
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // 検索パラメータ付きURLの作成ユーティリティ関数
  const createSearchUrl = (queryText: string) => {
    const params = new URLSearchParams()

    // クエリパラメータが存在する場合は追加
    if (queryText.trim()) {
      params.set("q", queryText.trim())
    }

    // 既存のタグパラメータがあれば保持
    const tags = searchParams.get("tags")
    if (tags) {
      params.set("tags", tags)
    }

    const queryString = params.toString()
    return `/search${queryString ? `?${queryString}` : ""}`
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim()) {
      const searchUrl = createSearchUrl(query)
      router.push(searchUrl)
      setShowResults(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
    inputRef.current?.focus()
  }

  const handleViewAllResults = () => {
    if (query.trim()) {
      const searchUrl = createSearchUrl(query)
      router.push(searchUrl)
      setShowResults(false)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="クラブ、活動などを検索..."
            className="pl-10 pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.trim() && !disableSuggestions) {
                setShowResults(true)
              }
            }}
          />
          {query.trim() && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">検索をクリア</span>
            </Button>
          )}
        </div>
        <Button type="submit" size="sm" className="shrink-0">
          検索
        </Button>
      </form>

      {showResults && !disableSuggestions && (
        <div ref={resultsRef} className="relative">
          <InstantResults
            results={results}
            query={query}
            onViewAll={handleViewAllResults}
            onResultClick={() => setShowResults(false)}
          />
        </div>
      )}
    </div>
  )
}
