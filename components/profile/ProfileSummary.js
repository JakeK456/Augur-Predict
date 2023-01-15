import Link from "next/link";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import FollowDetails from "./FollowDetails";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function ProfileSummary({ profile, followers, following }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <div className="p-4 md:p-2 md:-mt-10">
      <div className="flex md:block">
        <div className="basis-1/3">
          <Avatar size={300} profile={profile} user={user} />
        </div>
        <div className="flex flex-col justify-center basis-2/3 md:block pl-4 md:pl-0">
          <h2 className="md:mt-4 text-2xl text-dark-bg-text-1">{`${profile?.firstName} ${profile?.lastName}`}</h2>
          <h3 className="md:mt-.5 text-xl text-dark-bg-text-2">
            {profile?.username}
          </h3>
        </div>
      </div>
      <div className="mt-4">
        <FollowButton profile={profile} />
      </div>
      <FollowDetails followers={followers} following={following} />
      {user?.id === profile?.userId &&
        router.query.tab !== "make-prediction" && (
          <div className="flex items-center h-10 w-full rounded bg-dark-theme-green border  border-dark-theme-border text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-theme-green-hover">
            <Link
              href={`${router.query.id}?tab=make-prediction`}
              className="grow text-center"
            >
              Make a Prediction
            </Link>
          </div>
        )}
    </div>
  );
}
