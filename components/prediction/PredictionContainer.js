import { useEffect, useState } from "react";
import GraphCard from "../graph/GraphCard";

export default function PredictionContainer({ recentPredictions }) {
  return (
    <div className="mt-4 text-xl text-dark-bg-text-1">
      {`Recent Predictions`}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recentPredictions.map((elem) => (
          <GraphCard key={elem.predictionId} graphData={elem} />
        ))}
      </div>
    </div>
  );
}
