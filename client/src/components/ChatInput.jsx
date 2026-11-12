import { useState } from "react";

export default function ChatInput({ onSubmit, disabled }) {
  const [question, setQuestion] = useState("");
  function submit(event) {
    event.preventDefault();
    if (!question.trim() || disabled) return;
    onSubmit(question.trim());
    setQuestion("");
  }
  return (
    <form className="chat-input" onSubmit={submit}>
      <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question..." maxLength={500} disabled={disabled} />
      <button type="submit" disabled={disabled || !question.trim()}>Send</button>
    </form>
  );
}
