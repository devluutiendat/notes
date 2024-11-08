import noteModel from "@/lib/model/note";
import connectDB from "@/lib/mogoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function updateNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { id,detail } = req.body;

  if (!id || !detail) {
    return res.status(400).json({ message: "detail or id is required" });
  }

  try {
    await connectDB();
    const note = await noteModel.findById(id);
        if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    note.detail = detail;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notes" });
  }
}
