import { prisma } from "@/lib/prisma";
const bcrypt = require("bcrypt");

const defaultAvatarURL = `${process.env.SUPABASE_URL.replace(
  ".co",
  ".in"
)}/storage/v1/object/public/${
  process.env.SUPABASE_BUCKET
}/default_profile_picture.png`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, username, email, password } = req.body;

    try {
      const hash = await bcrypt.hash(password, 0);
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hash,
        },
      });

      await prisma.profile.create({
        data: {
          userId: newUser.id,
          firstName,
          lastName,
          username,
          avatar: defaultAvatarURL,
        },
      });

      return res.status(200).end();
    } catch (err) {
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
}
