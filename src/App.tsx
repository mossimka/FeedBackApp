import { useState } from 'react';

import './App.css';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackList } from './components/FeedbackList';
import type { Feedback } from './shared/types';

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const addFeedback = (text: string) => {
    const newFeedback: Feedback = {
      id: Date.now(),
      text,
    };
    setFeedbacks([...feedbacks, newFeedback]);
  };

  const deleteFeedback = (id: number) => {
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  return (
    <div>
      <h1>Feedback App</h1>
      <FeedbackForm onAdd={addFeedback} />
      <FeedbackList feedbacks={feedbacks} onDelete={deleteFeedback} />
    </div>
  );
}

export default App;
