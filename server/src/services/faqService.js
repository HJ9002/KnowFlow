const faqs = [
  {
    keywords: ["what is knowflow", "knowflow", "about chatbot"],
    answer: "KnowFlow is an AI-powered FAQ chatbot that uses simple natural-language keyword matching to answer common questions."
  },
  {
    keywords: ["what can i ask", "what should i ask", "what am i supposed to ask", "examples", "sample question"],
    answer: "You can ask about KnowFlow, how the chatbot works, its technology stack, support, availability, feedback, or how unanswered questions are reviewed. Try: “How does KnowFlow work?”"
  },
  {
    keywords: ["how work", "how does it work", "working"],
    answer: "KnowFlow normalizes your question, compares it with its FAQ keywords, and returns the closest matching answer."
  },
  {
    keywords: ["technology", "tech stack", "built with"],
    answer: "KnowFlow uses React and Vite for the frontend, Node.js and Express for the backend, and MongoDB for feedback and unanswered queries."
  },
  {
    keywords: ["contact", "support", "help"],
    answer: "For support, please contact the project administrator through the support channel provided by your organization."
  },
  {
    keywords: ["hours", "open", "available"],
    answer: "KnowFlow is available 24 hours a day through its web interface."
  },
  {
    keywords: ["feedback", "rate", "thumbs"],
    answer: "You can use the thumbs-up or thumbs-down button below each answer to submit feedback."
  }
];

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function findFaqAnswer(question) {
  const normalizedQuestion = normalize(question);
  let bestMatch = null;
  let bestScore = 0;

  for (const faq of faqs) {
    const score = faq.keywords.reduce((total, keyword) => {
      const normalizedKeyword = normalize(keyword);
      return total + (normalizedQuestion.includes(normalizedKeyword) ? normalizedKeyword.split(" ").length : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestMatch
    ? { answer: bestMatch.answer, matched: true }
    : {
        answer: "I’m sorry, I don’t know the answer to that yet. Your question has been saved for review.",
        matched: false
      };
}
