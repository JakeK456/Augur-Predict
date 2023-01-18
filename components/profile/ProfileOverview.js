import { useState } from "react";
import GraphCard from "../graph/GraphCard";
export default function ProfileOverview({ profile, pinnedPredictions }) {
  return (
    <div>
      <p className="mt-4 mb-1 text-sm text-dark-bg-text-1">
        {pinnedPredictions.length === 0
          ? `${profile?.firstName} ${profile?.lastName} has no pinned predictions!`
          : "Pinned Predictions:"}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pinnedPredictions.map((elem) => (
          <GraphCard
            key={elem.predictionId}
            profile={profile}
            graphData={elem}
          />
        ))}
      </div>
    </div>
  );
}
