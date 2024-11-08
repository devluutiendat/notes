import mongoose, { Schema, model, models } from "mongoose";

const note = new Schema({
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: false,
  },
  authorId: {
    type: String,
    required :true,
  },
});

const noteModel = models.noteModel || model("noteModel", note);

export default noteModel;
