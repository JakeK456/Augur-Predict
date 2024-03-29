import GraphCard from "../graph/GraphCard";

export default function PredictionContainer({ profile, recentPredictions }) {
  return (
    <div>
      <p className="mt-4 mb-1 text-sm text-dark-bg-text-1">
        Recent Predictions:
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recentPredictions.map((elem) => (
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
