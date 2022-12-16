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
    <div className="-mt-10 p-2">
      <Avatar size={300} profile={profile} user={user} />
      <h2 className="mt-4 text-2xl text-dark-bg-text-1">{`${profile?.firstName} ${profile?.lastName}`}</h2>
      <h3 className="mt-.5 text-xl text-dark-bg-text-2">{profile?.username}</h3>
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
