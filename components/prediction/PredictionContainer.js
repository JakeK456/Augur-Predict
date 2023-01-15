import { useEffect, useState } from "react";
import GraphCard from "../graph/GraphCard";

export default function PredictionContainer({
  openPredictions,
  closedPredictions,
}) {
  // console.log(openPredictions);
  // console.log(closedPredictions);

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
        <GraphCard graphData={true} />
        <GraphCard graphData={true} />
        <GraphCard graphData={true} />
      </div>
    </div>
  );
}
