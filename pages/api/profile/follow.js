import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { name, targetName } = req.body;
        const addFollower = await prisma.follows.upsert({
          where: {
            followerName_followingName: {
              followerName: name,
              followingName: targetName,
            },
          },
          update: {
            followerName: name,
            followingName: targetName,
          },
          create: {
            followerName: name,
            followingName: targetName,
          },
        });
        res.status(200).json(addFollower);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case "DELETE":
      try {
        const { name, targetName } = req.body;
        const removeFollower = await prisma.follows.delete({
          where: {
            followerName_followingName: {
              followerName: name,
              followingName: targetName,
            },
          },
        });
        res.status(200).json(removeFollower);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.status(500).json({ message: "HTTP method not supported." });
      break;
  }
}
