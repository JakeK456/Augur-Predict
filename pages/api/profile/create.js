import { prisma } from "@/lib/prisma";

const defaultAvatarURL = `${process.env.SUPABASE_URL.replace(
  ".co",
  ".in"
)}/storage/v1/object/public/${
  process.env.SUPABASE_BUCKET
}/default_profile_picture.png`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    let profileData = req.body;
    profileData["avatar"] = defaultAvatarURL;
    try {
      const profileCheck = await prisma.profile.findUnique({
        where: {
          userId: profileData.userId,
        },
      });
      if (profileCheck === null) {
        const profile = await prisma.profile.create({ data: profileData });
        res.status(200).json(profile);
      } else {
        res.status(200).json({ message: "User already has a profile" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
