import { useState } from 'react';
import { useFeedbackStore } from '../store/useFeedbackStore';

export const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');

  const addFeedback = useFeedbackStore((s) => s.addFeedback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addFeedback(text, category);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2 w-full"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your feedback..."
        className="flex-grow border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-3 py-2 focus:outline-none"
      >
        <option value="General">UI</option>
        <option value="Bug">Performance</option>
        <option value="Suggestion">Feauture</option>
        <option value="Question">UX</option>
      </select>
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-4 py-2 rounded shadow"
      >
        Add
      </button>
    </form>
  );
};
