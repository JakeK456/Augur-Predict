import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;

    try {
      let profile = {};
      if (userId) {
        profile = await prisma.profile.findUnique({
          where: {
            userId,
          },
        });
      }

      if (Object.keys(profile).length === 0) {
        profile = null;
      }

      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
