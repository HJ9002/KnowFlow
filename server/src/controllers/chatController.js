import { validationResult } from "express-validator";
import { answerQuestion as generateAnswer } from "../services/aiService.js";
import { listUnanswered, saveFeedback, saveUnanswered } from "../services/storageService.js";

export async function answerQuestion(req, res, next) {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  const { question } = req.body;
  const result = await generateAnswer(question);
  if (!result.matched) await saveUnanswered(question);
  return res.json(result);
 } catch (error) { next(error); }
}

export async function submitFeedback(req, res, next) {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
  await saveFeedback(req.body);
  return res.status(201).json({ message: "Feedback saved." });
 } catch (error) {
   if (error.code === 11000 || error.code === "DUPLICATE_FEEDBACK") return res.status(409).json({ message: "Feedback has already been submitted for this answer." });
   next(error);
 }
}

export async function listUnansweredQueries(req, res, next) {
 try {
  return res.json(await listUnanswered());
 } catch (error) { next(error); }
}
