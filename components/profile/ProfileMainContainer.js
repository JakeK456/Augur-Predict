import { useEffect } from "react";
import { useRouter } from "next/router";
import ProfileList from "./ProfileList";
import { useSession } from "next-auth/react";
import MakePredictionContainer from "../prediction/MakePredictionContainer";
import PredictionContainer from "../prediction/PredictionContainer";

export default function ProfileMainContainer({
  profile,
  followers,
  following,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  switch (router.query.tab) {
    case "followers":
      return <ProfileList profiles={followers} />;
    case "following":
      return <ProfileList profiles={following} />;
    case "predictions":
      return (
        <PredictionContainer
          openPredictions={profile?.openPredictions}
          closedPredictions={profile?.closedPredictions}
        />
      );
    case "make-prediction":
      if (status === "loading") {
        return <></>;
      }
      if (user.id !== profile.userId) {
        router.push(`${profile.username}`);
      }
      return <MakePredictionContainer />;
    default:
      return (
        <div className="mt-4 text-md text-dark-bg-text-1">
          <h3>Pinned Predictions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 w-full border">
            <div className="border aspect-video">{/* <Graph /> */}</div>
            <div className="border aspect-video">{/* <Graph /> */}</div>
            <div className="border aspect-video">{/* <Graph /> */}</div>
          </div>
        </div>
      );
  }
}
