export default function TimeSpanBar({ timeSpan, setTimeSpan }) {
  const handleClickEvent = (event) => {
    if (event.target.type === "button") {
      setTimeSpan(event.target.textContent);
    }
  };

  return (
    <div className="mt-8 mb-4 lg:px-40 flex" onClick={handleClickEvent}>
      <div className="basis-[14.2857143%] shrink hover:bg-dark-bg-hover px-1 border-r border-dark-bg-text-2 text-center text-dark-bg-text-1">
        <button
          className={`${
            timeSpan === "1D" && "border-b-2 w-8 w-8"
          } w-full text-sm`}
          type="button"
        >
          1D
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-dark-bg-hover px-1 border-r border-dark-bg-text-2 text-center text-dark-bg-text-1">
        <button
          className={`${timeSpan === "5D" && "border-b-2 w-8"} w-full text-sm`}
          type="button"
        >
          5D
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-dark-bg-hover px-1 border-r border-dark-bg-text-2 text-center text-dark-bg-text-1">
        <button
          className={`${timeSpan === "1M" && "border-b-2 w-8"} w-full text-sm`}
          type="button"
        >
          1M
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-dark-bg-hover px-1 border-r border-dark-bg-text-2 text-center text-dark-bg-text-1">
        <button
          className={`${timeSpan === "6M" && "border-b-2 w-8"} w-full text-sm`}
          type="button"
        >
          6M
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-dark-bg-hover px-1 border-r border-dark-bg-text-2 text-center text-dark-bg-text-1">
        <button
          className={`${timeSpan === "1Y" && "border-b-2 w-8"} w-full text-sm`}
          type="button"
        >
          1Y
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-dark-bg-hover px-1 border-r border-dark-bg-text-2 text-center text-dark-bg-text-1">
        <button
          className={`${timeSpan === "5Y" && "border-b-2 w-8"} w-full text-sm`}
          type="button"
        >
          5Y
        </button>
      </div>
      <div className="basis-[14.2857143%] shrink hover:bg-dark-bg-hover px-1 border-dark-bg-text-2 text-center text-dark-bg-text-1">
        <button
          className={`${timeSpan === "Max" && "border-b-2 w-8"} w-full text-sm`}
          type="button"
        >
          Max
        </button>
      </div>
    </div>
  );
}
