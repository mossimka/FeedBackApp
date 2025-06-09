import { useState } from 'react';
import { useFeedbackStore } from '../store/useFeedbackStore';

export const FeedbackForm = () => {
  const [text, setText] = useState('');

  const addFeedback = useFeedbackStore((s) => s.addFeedback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addFeedback(text, category);
    setText('');
  };

  const categories = [
    { id: 1, name: 'UI' },
    { id: 2, name: 'Optimization' },
    { id: 3, name: 'UX' },
    { id: 4, name: 'Performance' },
  ];

  const [category, setCategory] = useState(categories[0]);

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
        value={category.id}
        onChange={(e) => {
          const selected = categories.find(c => c.id === +e.target.value);
          if (selected) setCategory(selected);
        }}
      >
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
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
