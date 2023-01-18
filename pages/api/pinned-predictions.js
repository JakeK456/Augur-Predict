import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { username } = req.query;

        const pinnedPredictions = await prisma.prediction.findMany({
          where: {
            AND: [
              {
                username,
              },
              {
                pinned: { gt: 0 },
              },
            ],
          },
        });

        pinnedPredictions.forEach((element) => {
          element.startTime = Number(element.startTime);
          element.endTime = Number(element.endTime);
        });

        return res.status(200).json(pinnedPredictions);
      } catch (error) {
        return res.status(500).json({ error });
      }
    case "POST":
      try {
        const { username, predictionId } = req.body;

        const pinnedPredictions = await prisma.prediction.findMany({
          where: {
            AND: [
              {
                username,
              },
              {
                pinned: { gt: 0 },
              },
            ],
          },
        });

        // check for room in pinnedPredictions array
        if (pinnedPredictions.length > 6) {
          return res.status(200).json({
            ok: false,
            message:
              "You can pin at most 6 predictions. Please delete a pinned prediction before adding a new one.",
          });
        }

        // check that the prediction is not already in the array
        if (
          pinnedPredictions.some((prediction) => prediction.id === predictionId)
        ) {
          return res.status(200).json({
            ok: false,
            message: "Prediction is already pinned.",
          });
        }

        const pinPrediction = await prisma.prediction.update({
          where: { id: predictionId },
          data: { pinned: 1 },
        });

        return res.status(200).json({ ok: true });
      } catch (error) {
        return res.status(500).json({ error });
      }
    case "PATCH":
      try {
        const { predictionId } = req.body;

        await prisma.prediction.update({
          where: {
            id: predictionId,
          },
          data: {
            pinned: 0,
          },
        });

        return res.status(200).json({ ok: true });
      } catch (error) {
        return res.status(500).json({ error });
      }
    default:
      return res.status(500).json({ message: "HTTP method not supported." });
  }
}
