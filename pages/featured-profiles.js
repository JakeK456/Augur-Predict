import FeaturedProfileCard from "@/components/profile/FeaturedProfileCard";
import { prisma } from "@/lib/prisma";
import { Rosario } from "@next/font/google";

const rosario = Rosario({ subsets: ["latin"] });

export default function FeaturedProfiles({ profiles }) {
  return (
    <div className="flex flex-col items-center px-2">
      <div
        className={`w-full text-center py-6 text-xl text-dark-bg-text-1 ${rosario.className}`}
      >
        Featured Profiles - Most Followers
      </div>
      {profiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const featuredProfiles = await prisma.profile.findMany({
    orderBy: {
      followers: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: { followers: true, predictions: true },
      },
    },
    take: 10,
  });

  if (featuredProfiles) {
    return {
      props: {
        profiles: featuredProfiles,
      },
      revalidate: 60,
    };
  }
}
