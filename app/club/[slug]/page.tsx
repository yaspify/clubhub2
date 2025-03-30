import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getClubBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface ClubPageProps {
  params: {
    slug: string;
  };
}

export default function ClubPage({ params }: ClubPageProps) {
  const club = getClubBySlug(params.slug);

  if (!club) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Profile Image */}
      {club.profileImage && (
        <div className="relative w-full aspect-video">
          <Image
            src={club.profileImage}
            alt={club.clubName}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Club Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{club.clubName}</h1>
        {club.affiliation && <p>{club.affiliation}</p>}
      </div>

      {/* Tags */}
      {club.tags && (
        <div>
          <div className="flex flex-wrap gap-2">
            {club.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-100 text-gray-800">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Activity Details */}
      {club.activityDetails && (
        <div>
          <h2 className="text-lg font-semibold">Activity Details</h2>
          <ul className="list-disc pl-6 space-y-1">
            {club.activityDetails.summary && <li>Summary: {club.activityDetails.summary}</li>}
            {club.activityDetails.location && <li>Location: {club.activityDetails.location}</li>}
            {club.activityDetails.frequency && <li>Frequency: {club.activityDetails.frequency}</li>}
            {club.activityDetails.fee && <li>Fee: {club.activityDetails.fee}</li>}
            {club.activityDetails.record && <li>Record: {club.activityDetails.record}</li>}
            {club.activityDetails.meal && <li>Meal: {club.activityDetails.meal}</li>}
            {club.activityDetails.membershipFee && <li>Membership Fee: {club.activityDetails.membershipFee}</li>}
            {club.activityDetails.initialCost && <li>Initial Cost: {club.activityDetails.initialCost}</li>}
            {club.activityDetails.feelingPositive && <li>Positive: {club.activityDetails.feelingPositive}</li>}
            {club.activityDetails.feelingNegative && <li>Negative: {club.activityDetails.feelingNegative}</li>}
          </ul>
        </div>
      )}

      {/* Member Composition */}
      {club.memberComposition && (
        <div>
          <h2 className="text-lg font-semibold">Member Composition</h2>
          <ul className="list-disc pl-6 space-y-1">
            {club.memberComposition.totalMembers && <li>Total Members: {club.memberComposition.totalMembers}</li>}
            {club.memberComposition.gender && (
              <li>
                Gender Ratio: Male: {club.memberComposition.gender.Male || "N/A"}, Female:{" "}
                {club.memberComposition.gender.Female || "N/A"}
              </li>
            )}
            {club.memberComposition.foundingYear && <li>Founding Year: {club.memberComposition.foundingYear}</li>}
          </ul>
        </div>
      )}

      {/* Recruitment Info */}
      {club.recruitmentInfo && (
        <div>
          <h2 className="text-lg font-semibold">Recruitment Info</h2>
          {typeof club.recruitmentInfo === "string" ? (
            <p>{club.recruitmentInfo}</p>
          ) : (
            <ul className="list-disc pl-6 space-y-1">
              {club.recruitmentInfo.welcomeSchedule && (
                <li>Welcome Schedule: {club.recruitmentInfo.welcomeSchedule}</li>
              )}
            </ul>
          )}
        </div>
      )}

      {/* External Links */}
      {club.externalLinks && (
        <div>
          <h2 className="text-lg font-semibold">External Links</h2>
          <ul className="list-disc pl-6 space-y-1">
            {club.externalLinks.Website && (
              <li>
                <a href={club.externalLinks.Website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </li>
            )}
            {club.externalLinks.Instagram && (
              <li>
                <a href={club.externalLinks.Instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {club.externalLinks.X && (
              <li>
                <a href={club.externalLinks.X} target="_blank" rel="noopener noreferrer">
                  X (Twitter)
                </a>
              </li>
            )}
            {club.externalLinks.Facebook && (
              <li>
                <a href={club.externalLinks.Facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            )}
            {club.externalLinks.YouTube && (
              <li>
                <a href={club.externalLinks.YouTube} target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
            )}
            {club.externalLinks.LINE && (
              <li>
                <a href={club.externalLinks.LINE} target="_blank" rel="noopener noreferrer">
                  LINE
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Last Update */}
      {club.lastUpdate && <p className="text-sm text-gray-500">Last Updated: {club.lastUpdate}</p>}
    </div>
  );
}