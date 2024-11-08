import noteModel from "@/lib/model/note";
import connectDB from "@/lib/mogoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { authorid } = req.query;

  if (!authorid) {
    return res.status(400).json({ message: "author id is required" });
  }

  try {
    await connectDB();
    const note = await noteModel.find({ authorId: authorid });
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching note" });
  }
}
