import ProfileMainContainer from "@/components/profile/ProfileMainContainer";
import ProfileNav from "@/components/profile/ProfileNav";
import ProfileSummary from "@/components/profile/ProfileSummary";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Profile({ profile = null }) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [buttonClick, setButtonClick] = useState();

  useEffect(() => {
    const fetchFollows = async () => {
      const res = await fetch(
        `/api/profile/list?username=${profile?.username}`
      );
      const follows = await res.json();
      setFollowers(follows.followerProfiles);
      setFollowing(follows.followingProfiles);
    };
    fetchFollows();
  }, [profile?.username, buttonClick]);

  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden">
        <ProfileSummary
          profile={profile}
          user={user}
          followers={followers}
          following={following}
          setButtonClick={setButtonClick}
        />
        <div className="h-[37px] border-b border-dark-bg-border">
          <ProfileNav />
        </div>
        <ProfileMainContainer
          profile={profile}
          followers={followers}
          following={following}
          setButtonClick={setButtonClick}
        />
      </div>

      {/* Tablet and Above */}
      <div className="hidden md:block">
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
            <ProfileSummary
              profile={profile}
              user={user}
              followers={followers}
              following={following}
              setButtonClick={setButtonClick}
            />
          </div>
          <div className="ml-4 grow shrink h-full">
            <ProfileMainContainer
              profile={profile}
              followers={followers}
              following={following}
              setButtonClick={setButtonClick}
            />
          </div>
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
  });

  if (resProfile) {
    return {
      props: {
        profile: JSON.parse(JSON.stringify(resProfile)),
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
