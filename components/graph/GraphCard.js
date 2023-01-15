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
import { PredictionGraphBounds } from "utils/graph";

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
  const graphBounds = new PredictionGraphBounds(graphData.datasets[0].data);
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
        min: chartRef.current
          ? chartRef.current.scales.x.min
          : graphBounds.xMin,
        max: chartRef.current
          ? chartRef.current.scales.x.max
          : graphBounds.xMax + graphBounds.xPadding,
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
        min: chartRef.current
          ? chartRef.current.scales.y.min
          : graphBounds.yMin - graphBounds.yPadding,
        max: chartRef.current
          ? chartRef.current.scales.y.max
          : graphBounds.yMax + graphBounds.yPadding,
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
    <div className="object-contain">
      <Line options={options} data={graphData} />;
    </div>
  );
}
