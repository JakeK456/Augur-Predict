import { useRouter } from "next/router";
import ProfileList from "./ProfileList";

export default function ProfileMainContainer({
  profile,
  followers,
  following,
}) {
  const router = useRouter();
  switch (router.query.tab) {
    case "followers":
      return <ProfileList profiles={followers} />;
    case "following":
      return <ProfileList profiles={following} />;
    case "predictions":
      return (
        <div className="mt-4 text-2xl text-dark-bg-text-1 text-center">{`${profile?.firstName} ${profile?.lastName}'s Prediction Page`}</div>
      );
    default:
      return (
        <div className="mt-4 text-2xl text-dark-bg-text-1 text-center">{`${profile?.firstName} ${profile?.lastName}'s Overview Page`}</div>
      );
  }
}
