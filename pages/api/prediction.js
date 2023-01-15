import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        console.log("GET REQUEST PREDICTIONS");
        return res.status(200).json({});
      } catch (error) {
        return res.status(500).json({ error });
      }
    case "POST":
      try {
        const token = await getToken({ req });
        const userId = token?.sub;

        if (!userId) {
          return res
            .status(400)
            .json({ message: "Invalid call, must be logged in." });
        }

        const profileUsername = await prisma.profile.findUnique({
          where: { userId },
          select: { username: true },
        });

        const { ticker, predictionData } = req.body;
        const coordinates = JSON.stringify(predictionData);
        // const startTime = predictionData[0].x;
        const startTime = Date.now();
        const endTime = predictionData[predictionData.length - 1].x;
        const prediction = await prisma.openPrediction.create({
          data: {
            ticker,
            coordinates,
            startTime,
            endTime,
            authorId: profileUsername.username,
          },
        });

        return res.status(200).json({});
      } catch (error) {
        return res.status(500).json({ error });
      }
    default:
      return res.status(500).json({ message: "HTTP method not supported." });
  }
}
