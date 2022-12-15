import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { name, targetName } = req.body;

  try {
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
}
