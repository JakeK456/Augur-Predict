import { useState, useRef, useEffect } from "react";
import BlueChevronButton from "./BlueChevronButton";
import dynamic from "next/dynamic";
import TimeSpanBar from "../graph/TimeSpanBar";

const DynamicGraph = dynamic(() => import("../graph/Graph"), {
  ssr: false,
});

export default function MakePredictionContainer({ profile }) {
  const [graphData, setGraphData] = useState();
  const [tickerInput, setTickerInput] = useState("");
  const [timeSpan, setTimeSpan] = useState("6M");
  const isMounted = useRef(false);
  const [graphKey, setGraphKey] = useState(); // Needed to refresh graph axes when switching timeSpan

  // rerenders graph when timespan bar is clicked.
  useEffect(() => {
    if (isMounted.current) {
      fetchGraphData();
    } else {
      isMounted.current = true;
    }
  }, [timeSpan]);

  const fetchGraphData = async () => {
    if (tickerInput === "") {
      return;
    }
    try {
      const res = await fetch(
        `/api/graph?ticker=${tickerInput}&timeSpan=${timeSpan}`
      );
      const { graphData } = await res.json();
      setGraphData(graphData);
      setGraphKey(graphData.ticker.concat(timeSpan));
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (evt) => {
    const value = evt.target.value.toUpperCase();
    setTickerInput(value);
  };

  const handleTickerSubmit = async (evt) => {
    evt.preventDefault();
    if (tickerInput === "") {
      return;
    }
    fetchGraphData();
  };

  const handleSendButton = async () => {
    const ticker = graphData.ticker;
    const predictionData = graphData.datasets[1].data;

    if (predictionData.length === 1) {
      alert(
        "Cannot send an empty prediction. Click on the graph to draw your prediction."
      );
      return;
    }

    // place prediction
    await fetch("/api/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticker, predictionData }),
    });

    // revalidate profile page
    await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([profile.username]),
    });
  };

  return (
    <div suppressHydrationWarning={true}>
      <form className="flex h-8 my-6 mx-2" onSubmit={handleTickerSubmit}>
        <input
          className="pl-2 w-full pr-2 text-lg sm:text-sm rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
          id="tickerSearchBar"
          type="text"
          placeholder="Enter ticker symbol"
          autoComplete="off"
          value={tickerInput}
          onChange={handleInputChange}
        />
        <BlueChevronButton />
      </form>
      {graphData && (
        <>
          <TimeSpanBar timeSpan={timeSpan} setTimeSpan={setTimeSpan} />
          <DynamicGraph
            key={graphKey}
            graphData={graphData}
            setGraphData={setGraphData}
          />
          <div className="flex mt-8 mx-8">
            <button
              className="basis-3/4 mx-4 bg-dark-theme-green border border-dark-theme-border text-dark-theme-6 hover:text-dark-hover-text hover:bg-dark-theme-green-hover py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1"
              type="button"
              onClick={handleSendButton}
            >
              Send prediction
            </button>
            <button
              className="basis-1/4 mx-4 bg-dark-theme-border hover:bg-gray-700 w-full text-dark-surface-text py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1"
              type="button"
              onClick={fetchGraphData}
            >
              Reset graph
            </button>
          </div>
        </>
      )}
    </div>
  );
}
