import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        return res.status(200).json({});
      } catch (error) {
        return res.status(500).json({ error });
      }
    default:
      return res.status(500).json({ message: "HTTP method not supported." });
  }
}
