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
    const { valid, reasons } = validate(req.body);
    if (!valid) return res.status(406).json(reasons);

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

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
}

const namePattern = /^(?:[a-zA-Z]{1,16})$/;
const usernamePattern = /^(?:[a-zA-Z0-9]{4,16})$/;
const emailPattern =
  /^(?:[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/;
const passwordPattern = /^(?:[\S]{8,16})$/;

const validate = (body) => {
  const { firstName, lastName, username, email, password } = body;
  let reasons = [];

  !firstName.match(namePattern) && reasons.push("Invalid First Name");
  !lastName.match(namePattern) && reasons.push("Invalid Last Name");
  !username.match(usernamePattern) && reasons.push("Invalid Username");
  !email.match(emailPattern) && reasons.push("Invalid Email");
  !password.match(passwordPattern) && reasons.push("Invalid Password");

  if (reasons.length > 0) {
    return { valid: false, reasons };
  } else {
    return { valid: true, reasons };
  }
};
