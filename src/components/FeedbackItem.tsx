import type { Feedback } from '../shared/types';

type FeedbackItemProps = {
  feedback: Feedback;
  onDelete: (id: number) => void;
};

export const FeedbackItem = ({ feedback, onDelete }: FeedbackItemProps) => {
  return (
    <li>
      <span>{feedback.text}</span>
      <button onClick={() => onDelete(feedback.id)}>Delete</button>
    </li>
  );
};
