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

export default function GraphCard({ graphData }) {
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
          maxTicksLimit: 7,
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
      title: {
        display: true,
        text: graphData.ticker,
      },
    },
  };

  return (
    <div className="object-contain border border-dark-theme-border rounded-xl p-2">
      <Line options={options} data={graphData} />
    </div>
  );
}
