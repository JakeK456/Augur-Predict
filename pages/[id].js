import Avatar from "@/components/profile/Avatar";
import ProfileSummary from "@/components/profile/ProfileSummary";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";

export default function Profile(profile = null) {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="flex h-screen">
      <div className="flex basis-1/3 justify-end border">
        <ProfileSummary profile={profile} />
      </div>
      <div className="basis-2/3 border"></div>
    </div>
  );
}

export async function getStaticPaths() {
  const profiles = await prisma.profile.findMany();

  return {
    paths: profiles.map((profile) => ({
      params: { id: profile.username },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const profile = await prisma.profile.findUnique({
    where: { username: params.id },
  });

  if (profile) {
    return {
      props: JSON.parse(JSON.stringify(profile)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
