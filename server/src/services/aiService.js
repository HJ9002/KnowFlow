import OpenAI from "openai";
import { findFaqAnswer } from "./faqService.js";

let client;

function getClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  client ||= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function answerQuestion(question) {
  const openai = getClient();
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "Answer only questions about KnowFlow using the FAQ context below. If the context does not answer the question, reply exactly with NO_MATCH. Do not invent facts.\n\n" + JSON.stringify(getFaqContext())
          },
          { role: "user", content: question }
        ]
      });
      const answer = response.choices[0]?.message?.content?.trim();
      if (answer && answer !== "NO_MATCH") return { answer, matched: true, source: "openai" };
    } catch (error) {
      console.warn("OpenAI unavailable; using local FAQ matching:", error.message);
    }
  }
  return { ...findFaqAnswer(question), source: "local" };
}

function getFaqContext() {
  return [
    "KnowFlow is an AI-powered FAQ chatbot using React, Express, Node.js, and MongoDB.",
    "It normalizes questions and compares them with predefined FAQ keywords.",
    "Users can rate answers with positive or negative feedback.",
    "Unknown questions are saved for review.",
    "The chatbot is available through its web interface."
  ];
}
