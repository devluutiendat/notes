import noteModel from "@/lib/model/note";
import connectDB from "@/lib/mogoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function postNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { authorid, name } = req.body;

  if (!authorid || !name) {
    return res.status(400).json({ message: "authorid or name is required" });
  }

  try {
    await connectDB();
    const newNotes = new noteModel({
      name: name,
      authorId: authorid,
      detail: "",
    });
    await newNotes.save();
    res.status(200).json(newNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching add notes" });
  }
}
