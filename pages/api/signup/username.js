import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username } = req.body;
    if (username) {
      const matchingProfiles = await prisma.profile.findMany({
        where: {
          username: {
            equals: username,
            mode: "insensitive",
          },
        },
      });
      if (matchingProfiles.length > 0) {
        return res.status(406).json({ available: false });
      }
    }

    return res.status(200).json({ available: true });
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
}
