import { useRef } from "react";
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
import zoomPlugin from "chartjs-plugin-zoom";
import { PredictionGraphBounds } from "utils/graph";
import cloneDeep from "lodash/cloneDeep";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
  zoomPlugin
);

export default function Graph({ graphData, setGraphData }) {
  const chartRef = useRef();
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
      // tooltip: {
      //   enabled: true,
      // },
      title: {
        display: true,
        text: graphData.ticker,
      },
      zoom: {
        pan: {
          enabled: true,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          // pinch: {
          //   enabled: true,
          // },
          mode: "xy",
        },
      },
    },
    onClick: (event) => {
      const click = {
        x: Math.round(chartRef.current.scales.x.getValueForPixel(event.x)),
        y:
          Math.round(
            chartRef.current.scales.y.getValueForPixel(event.y) * 100
          ) / 100,
      };

      const validClick = validateClick(click.x);

      if (validClick) {
        setGraphData((prevData) => {
          const newData = cloneDeep(prevData);
          appendToPredictionArray(newData.datasets[1].data, click);
          return newData;
        });
      }
    },
  };

  return (
    <div className="object-contain">
      <Line ref={chartRef} options={options} data={graphData} />;
    </div>
  );
}

const validateClick = (x) => {
  return x > moment().format("x");
};

const appendToPredictionArray = (array, dataPoint) => {
  if (dataPoint.x > array[array.length - 1].x) {
    array.push(dataPoint);
  }
};
