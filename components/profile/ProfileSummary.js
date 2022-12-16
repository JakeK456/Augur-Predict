import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import FollowDetails from "./FollowDetails";

export default function ProfileSummary({
  user,
  profile,
  followers,
  following,
  setButtonClick,
}) {
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
        <FollowButton
          profile={profile}
          user={user}
          setButtonClick={setButtonClick}
        />
      </div>
      <FollowDetails followers={followers} following={following} />
    </div>
  );
}
