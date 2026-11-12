export default function MessageBubble({ message, onFeedback, feedbackState }) {
  const isBot = message.sender === "bot";
  return (
    <article className={`message ${isBot ? "bot" : "user"}`}>
      <p>{message.text}</p>
      {isBot && message.id && (
        <div className="feedback">
          <button disabled={feedbackState} onClick={() => onFeedback(message, "positive")} aria-label="Helpful answer">👍</button>
          <button disabled={feedbackState} onClick={() => onFeedback(message, "negative")} aria-label="Unhelpful answer">👎</button>
          {feedbackState && <small>Thanks for your feedback.</small>}
        </div>
      )}
    </article>
  );
}
