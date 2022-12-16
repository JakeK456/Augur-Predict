import Avatar from "@/components/profile/Avatar";
import ProfileMainContainer from "@/components/profile/ProfileMainContainer";
import ProfileNav from "@/components/profile/ProfileNav";
import ProfileSummary from "@/components/profile/ProfileSummary";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Profile({ profile = null, followers, following }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="text-white">
        Please wait, your profile page is being created.
      </div>
    );
  }

  return (
    <div>
      {/* Top Nav */}
      <div className="h-20 border-b border-dark-bg-border">
        <div className="m-auto flex max-w-screen-xl h-full">
          <div className="w-80 shrink-0 h-full"></div>
          <div className="flex items-end grow shrink h-full px-2 py-1">
            <ProfileNav />
          </div>
        </div>
      </div>
      {/* Below Nav */}
      <div className="m-auto flex max-w-screen-xl h-screen">
        <div className="w-80 shrink-0 h-full">
          <ProfileSummary profile={profile} user={user} />
        </div>
        <div className="ml-4 grow shrink h-full">
          <ProfileMainContainer
            profile={profile}
            followers={followers}
            following={following}
          />
        </div>
      </div>
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
  const resProfile = await prisma.profile.findUnique({
    where: { username: params.id },
    include: {
      followers: true,
      following: true,
    },
  });

  const followerProfiles = await getFollowers(resProfile);
  const followingProfiles = await getFollowing(resProfile);

  if (resProfile) {
    return {
      props: {
        profile: JSON.parse(JSON.stringify(resProfile)),
        followers: followerProfiles,
        following: followingProfiles,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

const getFollowers = async (resProfile) => {
  let followerProfiles = [];
  for (let index = 0; index < resProfile.followers.length; index++) {
    const { followerName } = resProfile.followers[index];
    const profile = await prisma.profile.findUnique({
      where: {
        username: followerName,
      },
    });
    followerProfiles.push(JSON.parse(JSON.stringify(profile)));
  }
  return followerProfiles;
};

const getFollowing = async (resProfile) => {
  let followingProfiles = [];
  for (let index = 0; index < resProfile.following.length; index++) {
    const { followingName } = resProfile.following[index];
    const profile = await prisma.profile.findUnique({
      where: {
        username: followingName,
      },
    });
    followingProfiles.push(JSON.parse(JSON.stringify(profile)));
  }
  return followingProfiles;
};
