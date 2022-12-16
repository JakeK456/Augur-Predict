import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { username } = req.query;

      const resProfile = await prisma.profile.findUnique({
        where: { username },
        include: {
          followers: true,
          following: true,
        },
      });

      let followerProfiles = [];
      for (let index = 0; index < resProfile.followers.length; index++) {
        const { followerName } = resProfile.followers[index];
        const profile = await prisma.profile.findUnique({
          where: {
            username: followerName,
          },
        });
        followerProfiles.push(JSON.parse(JSON.stringify(profile)));
      }

      let followingProfiles = [];
      for (let index = 0; index < resProfile.following.length; index++) {
        const { followingName } = resProfile.following[index];
        const profile = await prisma.profile.findUnique({
          where: {
            username: followingName,
          },
        });
        followingProfiles.push(JSON.parse(JSON.stringify(profile)));
      }

      res.status(200).json({ followerProfiles, followingProfiles });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
