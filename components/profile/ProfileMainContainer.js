import { useEffect } from "react";
import { useRouter } from "next/router";
import ProfileList from "./ProfileList";
import { useSession } from "next-auth/react";
import MakePredictionContainer from "../prediction/MakePredictionContainer";
import PredictionContainer from "../prediction/PredictionContainer";
import ProfileOverview from "./ProfileOverview";

export default function ProfileMainContainer({
  profile,
  followers,
  following,
  setButtonClick,
  recentPredictions,
  pinnedPredictions,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  switch (router.query.tab) {
    case "followers":
      return (
        <ProfileList profiles={followers} setButtonClick={setButtonClick} />
      );
    case "following":
      return (
        <ProfileList profiles={following} setButtonClick={setButtonClick} />
      );
    case "predictions":
      return (
        <PredictionContainer
          profile={profile}
          recentPredictions={recentPredictions}
        />
      );
    case "make-prediction":
      if (status === "loading") {
        return <></>;
      }
      if (user.id !== profile.userId) {
        router.push(`${profile.username}`);
      }
      return <MakePredictionContainer profile={profile} />;
    default:
      return (
        <ProfileOverview
          profile={profile}
          pinnedPredictions={pinnedPredictions}
        />
      );
  }
}
