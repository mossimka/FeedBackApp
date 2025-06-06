import type { Feedback } from '../shared/types';
import { useFeedbackStore } from '../store/useFeedbackStore';

type Props = {
  feedback: Feedback;
};

export const FeedbackItem = ({ feedback }: Props) => {
  const deleteFeedback = useFeedbackStore((s) => s.deleteFeedback);
  const likeFeedback = useFeedbackStore((s) => s.likeFeedback);

  return (
    <li>
      <p>{feedback.text}</p>
      <p>👍 {feedback.likes}</p>
      <button onClick={() => likeFeedback(feedback.id)}>Like</button>
      <button onClick={() => deleteFeedback(feedback.id)}>Delete</button>
    </li>
  );
};
