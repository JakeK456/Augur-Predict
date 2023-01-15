import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { search } = req.query;
        const resProfiles = await prisma.profile.findMany({
          take: 10,
          where: {
            OR: [
              {
                AND: [
                  {
                    firstName: {
                      contains: search.split(" ")[0],
                      mode: "insensitive",
                    },
                  },
                  {
                    lastName: {
                      contains: search.split(" ")[1],
                      mode: "insensitive",
                    },
                  },
                ],
              },
              {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        });

        return res.status(200).json({ resProfiles });
      } catch (error) {
        return res.status(500).json({ error });
      }
    default:
      return res.status(500).json({ message: "HTTP method not supported." });
  }
}
