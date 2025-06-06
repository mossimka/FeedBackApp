import type { Feedback } from '../shared/types';
import { FeedbackItem } from './FeedbackItem';

type FeedbackListProps = {
  feedbacks: Feedback[];
  onDelete: (id: number) => void;
};

export const FeedbackList = ({ feedbacks, onDelete }: FeedbackListProps) => {
  if (feedbacks.length === 0) {
    return <p>No feedback yet</p>;
  }

  return (
    <ul>
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
