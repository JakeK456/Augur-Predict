import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

const defaultAvatarURL = `${process.env.SUPABASE_URL.replace(
  ".co",
  ".in"
)}/storage/v1/object/public/${
  process.env.SUPABASE_BUCKET
}/default_profile_picture.png`;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { username } = req.query;
    const avatarURL = await prisma.profile.findUnique({
      where: { username },
      select: { avatar: true },
    });
    return res.status(200).json(avatarURL);
  } else if (req.method === "POST") {
    const { image, profile } = req.body;

    if (!image) {
      return res.status(500).json({ message: "No image provided" });
    }

    try {
      const contentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];

      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: "Image data not valid" });
      }

      const fileName = nanoid();
      const ext = contentType.split("/")[1];
      const path = `${fileName}.${ext}`;

      // delete old photo
      // grab users profileid, check avatar url, if not default url, return url,
      // supabase storage delete returned url
      const { avatar } = await prisma.profile.findUnique({
        where: {
          userId: profile.userId,
        },
        select: {
          avatar: true,
        },
      });

      if (avatar !== defaultAvatarURL) {
        const urlSplit = avatar.split("/");
        const updatedUrl = urlSplit[urlSplit.length - 1];
        console.log(updatedUrl);
        const { data, error: uploadError } = await supabase.storage
          .from(process.env.SUPABASE_BUCKET)
          .remove([updatedUrl]);
      }

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        throw new Error("Unable to upload image to storage");
      }

      // Construct public URL
      const url = `${process.env.SUPABASE_URL.replace(
        ".co",
        ".in"
      )}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${data.path}`;

      await prisma.profile.update({
        where: {
          userId: profile.userId,
        },
        data: {
          avatar: url,
        },
      });

      return res.status(200).json({ url });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    const { profile } = req.body;

    const { avatar } = await prisma.profile.findUnique({
      where: {
        userId: profile.userId,
      },
      select: {
        avatar: true,
      },
    });

    const urlSplit = avatar.split("/");
    const updatedUrl = urlSplit[urlSplit.length - 1];

    const { data, error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .remove([updatedUrl]);

    if (uploadError) {
      throw new Error("Unable to upload image to storage");
    }

    await prisma.profile.update({
      where: {
        userId: profile.userId,
      },
      data: {
        avatar: defaultAvatarURL,
      },
    });

    return res.status(200).json({ test: "delete" });
  } else {
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
