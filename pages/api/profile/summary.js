import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;
    // console.log(userId);
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          userId,
        },
      });
      res.status(200).json(profile);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
