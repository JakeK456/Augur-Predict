import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      const profile = await prisma.user.findUnique({
        where: { email },
        include: {
          profile: {
            select: { username: true },
          },
        },
      });
      const username = profile.profile.username;
      res.status(200).json({
        username,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
