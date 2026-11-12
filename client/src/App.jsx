import { useState } from "react";
import { askQuestion, getUnansweredQueries, sendFeedback } from "./services/chatApi.js";
import ChatInput from "./components/ChatInput.jsx";
import MessageBubble from "./components/MessageBubble.jsx";
import "./styles.css";

const welcome = { sender: "bot", text: "Hello! I’m KnowFlow. Ask me about the project, its technology, or how it works." };
const suggestions = ["What is KnowFlow?", "How does it work?", "What technology does it use?", "What can I ask?"];

export default function App() {
  const [messages, setMessages] = useState([welcome]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [unanswered, setUnanswered] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);

  async function submitQuestion(question) {
    setError("");
    setMessages((current) => [...current, { sender: "user", text: question }]);
    setLoading(true);
    try {
      const result = await askQuestion(question);
      setMessages((current) => [...current, { sender: "bot", text: result.answer, question, id: crypto.randomUUID(), source: result.source }]);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to reach KnowFlow. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFeedback(message, rating) {
    if (feedback[message.id]) return;
    try {
      await sendFeedback({ question: message.question, answer: message.text, rating, submissionId: message.id });
      setFeedback((current) => ({ ...current, [message.id]: true }));
    } catch {
      setError("Feedback could not be saved. Please try again.");
    }
  }

  async function loadReview() {
    setShowReview((current) => !current);
    if (showReview) return;
    setReviewLoading(true);
    try { setUnanswered(await getUnansweredQueries()); }
    catch { setError("Unanswered questions could not be loaded."); }
    finally { setReviewLoading(false); }
  }

  return (
    <main className="app">
      <section className="chat-card">
        <header><span className="logo">K</span><div><h1>KnowFlow</h1><p>AI-powered FAQ assistant</p></div><button className="review-toggle" onClick={loadReview}>Review unanswered</button></header>
        <div className="messages">
          {showReview ? <div className="review-panel"><h2>Unanswered questions</h2>{reviewLoading ? <p>Loading...</p> : unanswered.length ? unanswered.map((item) => <p key={item._id}>{item.question}</p>) : <p>No unanswered questions yet.</p>}</div> : <>{messages.map((message, index) => <MessageBubble key={message.id || index} message={message} onFeedback={handleFeedback} feedbackState={feedback[message.id]} />)}{messages.length === 1 && <div className="suggestions"><p>Try asking:</p>{suggestions.map((suggestion) => <button key={suggestion} onClick={() => submitQuestion(suggestion)}>{suggestion}</button>)}</div>}</>}
          {loading && <div className="typing">KnowFlow is thinking...</div>}
        </div>
        {error && <div className="error" role="alert">{error}</div>}
        <ChatInput onSubmit={submitQuestion} disabled={loading} />
      </section>
    </main>
  );
}
