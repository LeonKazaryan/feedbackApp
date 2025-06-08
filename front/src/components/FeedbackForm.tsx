import { useState } from "react";
import { useFeedback } from "../store/FeedbackContext";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const { dispatch } = useFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD", payload: text });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your feedback..."
        rows={4}
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
