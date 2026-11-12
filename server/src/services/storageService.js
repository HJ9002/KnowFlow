import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import { Feedback } from "../models/Feedback.js";
import { UnansweredQuery } from "../models/UnansweredQuery.js";

const memory = { feedback: [], unanswered: [] };

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

export async function saveUnanswered(question) {
  if (isDatabaseReady()) return UnansweredQuery.create({ question });
  memory.unanswered.push({ _id: randomUUID(), question, status: "new", createdAt: new Date() });
}

export async function listUnanswered() {
  if (isDatabaseReady()) return UnansweredQuery.find().sort({ createdAt: -1 }).limit(100).lean();
  return [...memory.unanswered].sort((a, b) => b.createdAt - a.createdAt).slice(0, 100);
}

export async function saveFeedback(feedback) {
  if (isDatabaseReady()) return Feedback.create(feedback);
  if (memory.feedback.some((item) => item.submissionId === feedback.submissionId)) {
    const error = new Error("Feedback has already been submitted for this answer.");
    error.code = "DUPLICATE_FEEDBACK";
    throw error;
  }
  memory.feedback.push({ ...feedback, _id: randomUUID(), createdAt: new Date() });
}
