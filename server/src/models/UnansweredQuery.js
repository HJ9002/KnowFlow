import mongoose from "mongoose";

const unansweredQuerySchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "reviewed"], default: "new" }
  },
  { timestamps: true }
);

export const UnansweredQuery = mongoose.model("UnansweredQuery", unansweredQuerySchema);
