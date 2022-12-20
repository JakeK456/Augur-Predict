export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (email) {
      const matchingEmails = await prisma.user.findMany({
        where: {
          email: {
            equals: email,
            mode: "insensitive",
          },
        },
      });
      if (matchingEmails.length > 0) {
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
