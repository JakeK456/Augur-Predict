import { useEffect, useRef, useState } from "react";
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
import { landingGraphData } from "../../utils/landingGraphData";

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

export default function LandingPageAnimatedGraph() {
  const chartRef = useRef(null);
  const data = chartRef.current
    ? landingGraphData
    : { datasets: [{ data: [] }] };
  const totalDuration = 10000;
  const delayBetweenPoints =
    totalDuration / landingGraphData.datasets[0].data.length;

  const previousY = (ctx) => {
    if (ctx.index === 0) {
      return chartRef.current.scales.y.getPixelForValue(100);
    } else {
      return chartRef.current
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(["y"], true).y;
    }
  };

  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        if (ctx.index > 450) {
          return ctx.index * delayBetweenPoints + 5000;
        }
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        if (ctx.index > 550) {
          return ctx.index * delayBetweenPoints + 5000;
        }
        return ctx.index * delayBetweenPoints;
      },
    },
  };

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
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    events: [],
    animation: chartRef.current ? animation : {},
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="object-contain">
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
}
