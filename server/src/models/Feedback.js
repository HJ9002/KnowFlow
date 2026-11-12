import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    rating: { type: String, enum: ["positive", "negative"], required: true },
    submissionId: { type: String, required: true, unique: true, index: true }
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
