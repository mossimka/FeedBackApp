import { useFeedbackStore } from '../store/useFeedbackStore';
import { FeedbackItem } from './FeedbackItem';

export const FeedbackList = () => {
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const sortBy = useFeedbackStore((s) => s.sortBy);

  const sorted = [...feedbacks].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  if (sorted.length === 0) return <p>No feedback yet</p>;

  return (
    <ul>
      {sorted.map((f) => (
        <FeedbackItem key={f.id} feedback={f} />
      ))}
    </ul>
  );
};
