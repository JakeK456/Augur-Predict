import { useEffect, useState } from "react";
import GraphCard from "../graph/GraphCard";

export default function PredictionContainer({ recentPredictions }) {
  console.log(recentPredictions);

  // render up to 6 preloaded graphs from server

  // useEffect(() => {
  //   // set state to grab pinned predictions
  //   const fetchPredictions = async () => {
  //     const res = await fetch("/api/prediction");
  //     const fetchedPredictions = await res.json();
  //     console.log(fetchedPredictions);
  //   };
  //   fetchPredictions();
  // }, []);

  return (
    <div className="mt-4 text-xl text-dark-bg-text-1">
      {`Recent Predictions`}
      <div className="grid grid-cols-2 gap-4">
        {recentPredictions.map((elem) => (
          <GraphCard key={elem.predictionId} graphData={elem} />
        ))}
      </div>
    </div>
  );
}
