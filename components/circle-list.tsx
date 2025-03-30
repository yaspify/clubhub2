import { ClubCard } from "@/components/club-card"
import type { Club } from "@/lib/data"

interface CircleListProps {
  circles: Club[]
}

export function CircleList({ circles }: CircleListProps) {
  if (!circles.length) return null
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {circles.map((club) => (
        <ClubCard key={club.slug} club={club} />
      ))}
    </div>
  )
}