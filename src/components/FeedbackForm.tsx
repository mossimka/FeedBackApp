import { useState } from 'react';
import { useFeedbackStore } from '../store/useFeedbackStore';

export const FeedbackForm = () => {
  const [text, setText] = useState('');
  const addFeedback = useFeedbackStore((s) => s.addFeedback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addFeedback(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your feedback"
      />
      <button type="submit">Add</button>
    </form>
  );
};
