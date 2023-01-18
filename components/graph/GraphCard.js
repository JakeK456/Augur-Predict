import "chartjs-adapter-moment";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PortfolioGraphBounds } from "utils/graph";
import { GiPin } from "react-icons/gi";
import useIsMyProfile from "hooks/useIsMyProfile";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale
);

export default function GraphCard({
  profile,
  graphData,
  predictionList,
  setPredictionList,
}) {
  const graphBounds = new PortfolioGraphBounds(
    graphData.datasets[0].data,
    graphData.datasets[1].data
  );
  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            day: "MMM D",
          },
        },
        ticks: {
          color: "#6E767E",
          maxTicksLimit: 5,
        },
        min: graphBounds.xMin - graphBounds.xPadding,
        max: graphBounds.xMax + graphBounds.xPadding,
        grid: {
          color: "#13181E",
        },
      },
      y: {
        ticks: {
          color: "#6E767E",
          callback: function (val) {
            return Math.floor(val);
          },
        },
        min: graphBounds.yMin - graphBounds.yPadding,
        max: graphBounds.yMax + graphBounds.yPadding,
        grid: {
          color: "#13181E",
        },
      },
    },
    animation: {
      duration: 0,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const { loading, isMyProfile } = useIsMyProfile(profile);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const fetchPinnedPredictions = async () => {
      const res = await fetch(
        `/api/pinned-predictions?username=${profile.username}`
      );
      const pinnedPredictions = await res.json();

      if (
        pinnedPredictions.some(
          (prediction) => prediction.id === graphData.predictionId
        )
      ) {
        setIsPinned(true);
      }
    };
    fetchPinnedPredictions();
  }, [graphData.predictionId, profile.username]);

  const pinPrediction = async () => {
    if (isPinned) {
      setIsPinned(false);

      // only called from ProfileOverview
      if (predictionList) {
        const newPredictionList = predictionList.filter((obj) => {
          return obj.predictionId !== graphData.predictionId;
        });
        setPredictionList(newPredictionList);
      }

      // unpin
      await fetch(`/api/pinned-predictions`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          predictionId: graphData.predictionId,
        }),
      });

      const revalidate = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([profile.username]),
      });
    } else {
      // pin
      setIsPinned(true);
      const res = await fetch(`/api/pinned-predictions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: profile.username,
          predictionId: graphData.predictionId,
        }),
      });
      const pinnedPredictions = await res.json();

      if (pinnedPredictions.ok) {
        // revalidate profile page
        await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([profile.username]),
        });
      } else {
        setIsPinned(true);
        alert(pinnedPredictions.message);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center px-2 h-8 w-full border-x border-t border-dark-theme-border rounded-t-xl">
        <p className="basis-1/3"></p>
        <p className="basis-1/3 text-base flex justify-center text-dark-bg-text-1">
          {graphData.ticker}
        </p>
        {!loading && isMyProfile && (
          <div
            className="basis-1/3 flex space-x-2 items-center justify-end cursor-pointer"
            onClick={pinPrediction}
          >
            <p className="text-xs text-dark-bg-text-1">
              {isPinned ? "Unpin" : "Pin"}
            </p>
            <GiPin className="text-dark-bg-text-1" />
          </div>
        )}
      </div>
      <div className="object-contain border-x border-b border-dark-theme-border rounded-b-xl px-2 pb-2">
        <Line options={options} data={graphData} />
      </div>
    </div>
  );
}
