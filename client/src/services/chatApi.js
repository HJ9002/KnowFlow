import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

export async function askQuestion(question) {
  const { data } = await api.post("/chat/ask", { question });
  return data;
}

export async function sendFeedback(feedback) {
  await api.post("/chat/feedback", feedback);
}

export async function getUnansweredQueries() {
  const { data } = await api.get("/admin/unanswered");
  return data;
}
