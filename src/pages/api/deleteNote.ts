import noteModel from "@/lib/model/note";
import connectDB from "@/lib/mogoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function deleteNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: " id is required" });
  }

  try {
    await connectDB();
     await noteModel.findByIdAndDelete(id);
    res.status(200).json("delete success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notes" });
  }
}
