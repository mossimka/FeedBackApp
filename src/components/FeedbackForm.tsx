import { useState } from 'react';

type FeedbackFormProps = {
  onAdd: (text: string) => void;
};

export const FeedbackForm = ({ onAdd }: FeedbackFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your feedback"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
