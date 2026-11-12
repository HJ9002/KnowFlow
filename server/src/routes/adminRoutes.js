import { Router } from "express";
import { listUnansweredQueries } from "../controllers/chatController.js";

const router = Router();
router.get("/unanswered", listUnansweredQueries);
export default router;
