const moment = require("moment");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { ticker, timeSpan } = req.query;
        console.log(timeSpan);
        const { multiplier, time, subtract, span } =
          convertLabelToTimeSpan(timeSpan);

        const tAgo = moment().subtract(subtract, span).format("YYYY-MM-DD");
        const tCurrent = moment().format("YYYY-MM-DD");

        console.log(tAgo);
        console.log(tCurrent);

        const pgUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${time}/${tAgo}/${tCurrent}?adjusted=true&limit=5000&sort=asc&apiKey=${process.env.PG_KEY}`;
        const pgRes = await fetch(pgUrl);
        const rawdata = await pgRes.json();

        let x = [];
        let y = [];
        let coords = [];

        if (rawdata.status === "ERROR") {
          return res.status(500).json({
            message:
              "Too many request to grab stock data. Please wait 1 minute.",
          });
        }

        rawdata.results.forEach((obj) => {
          x.push(obj.t);
          y.push(obj.c);
          coords.push({ x: obj.t, y: obj.c });
        });

        const graphData = {
          ticker,
          datasets: [
            {
              data: coords,
              borderWidth: 1,
              borderColor: setLineColor(y),
              borderDash: [],
            },
            {
              data: [coords[coords.length - 1]],
              borderWidth: 1,
              borderColor: "#a7a7a7", // grey
              borderDash: [5, 5],
            },
          ],
        };

        return res.status(200).json({ graphData });
      } catch (error) {
        return res.status(500).json({ error });
      }
    default:
      return res.status(500).json({ message: "HTTP method not supported." });
  }
}

const setLineColor = (array) => {
  const red = "#EA4335";
  const green = "#34A853";
  if (array[0] < array[array.length - 1]) return green;
  return red;
};

const convertLabelToTimeSpan = (label) => {
  switch (label) {
    case "5D":
      return { multiplier: 5, time: "minute", subtract: 5, span: "days" };
    case "1M":
      return { multiplier: 1, time: "day", subtract: 1, span: "months" };
    case "6M":
      return { multiplier: 1, time: "day", subtract: 6, span: "months" };
    case "1Y":
      return { multiplier: 1, time: "day", subtract: 1, span: "years" };
    case "5Y":
      return { multiplier: 2, time: "day", subtract: 5, span: "years" };
    default:
      return { multiplier: 2, time: "day", subtract: 15, span: "years" };
  }
};
