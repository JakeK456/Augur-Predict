import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const finalizedPredictions = await prisma.openPrediction.findMany({
          where: { endTime: { lt: Date.now() } },
        });

        if (finalizedPredictions.length > 0) {
          const closedPredictions = await prisma.closedPrediction.createMany({
            data: finalizedPredictions,
          });

          const deletePredictions = await prisma.openPrediction.deleteMany({
            where: { endTime: { lt: Date.now() } },
          });
        }

        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
