import { Router } from "express";
import { body } from "express-validator";
import { answerQuestion, submitFeedback } from "../controllers/chatController.js";

const router = Router();
const questionValidation = body("question").isString().trim().isLength({ min: 2, max: 500 }).withMessage("Question must be between 2 and 500 characters.");

router.post("/ask", questionValidation, answerQuestion);
router.post(
  "/feedback",
  body("question").isString().trim().notEmpty(),
  body("answer").isString().trim().notEmpty(),
  body("rating").isIn(["positive", "negative"]).withMessage("Rating must be positive or negative."),
  body("submissionId").isUUID().withMessage("A valid submission ID is required."),
  submitFeedback
);

export default router;
