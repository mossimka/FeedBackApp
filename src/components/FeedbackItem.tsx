import type { Feedback } from '../shared/types';
import { useFeedbackStore } from '../store/useFeedbackStore';

type Props = {
  feedback: Feedback;
};

export const FeedbackItem = ({ feedback }: Props) => {
  const deleteFeedback = useFeedbackStore((s) => s.deleteFeedback);
  const likeFeedback = useFeedbackStore((s) => s.likeFeedback);

  return (
    <li className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-2">
      <p className="text-gray-800">{feedback.text}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">👍 {feedback.likes}</span>
        <div className="flex gap-2">
          <button
            onClick={() => likeFeedback(feedback.id)}
            className="text-sm bg-gradient-to-br from-blue-300 to-purple-400 text-white px-3 py-1 rounded transition-all duration-200 hover:brightness-110 hover:scale-102"
          >
            Like
          </button>
          <button
            onClick={() => deleteFeedback(feedback.id)}
            className="text-sm bg-gradient-to-br from-purple-400 to-blue-300 text-white px-3 py-1 rounded transition-all duration-200 hover:brightness-110 hover:scale-102"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};
