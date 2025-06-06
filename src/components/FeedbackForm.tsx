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
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your feedback..."
        className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
      >
        Add
      </button>
    </form>
  );
};
