import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Club } from "@/lib/data"

interface ClubCardProps {
  club: Club
}

export function ClubCard({ club }: ClubCardProps) {
  const { slug, clubName, verified, profileImage, activityDetails, externalLinks } = club
  return (
    <Card className="overflow-hidden h-full flex flex-col py-0 gap-0">
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-3">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={clubName}
                width={96}
                height={96}
                objectFit="cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-sm font-medium text-muted-foreground">
                {clubName.substring(0, 5)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium line-clamp-2">{clubName}</h3>
            <p className="text-xs text-muted-foreground line-clamp-4 mt-1">
              {activityDetails?.summary || "説明はありません"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button
          asChild
          variant="default"
          className={`flex-1 ${!verified ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {verified ? (
            <Link href={`/club/${slug}`}>
              詳しくみる
            </Link>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              情報が登録されていません
            </div>
          )}
        </Button>
        {externalLinks?.Instagram ? (
          <Button variant="outline" size="icon" className="shrink-0">
            <a
              href={externalLinks.Instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-full h-full"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="icon" className="shrink-0" disabled>
            <Instagram className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}