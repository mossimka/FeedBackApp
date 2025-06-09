import { useState } from 'react';

import type { Feedback } from '../shared/types';
import { useFeedbackStore } from '../store/useFeedbackStore';

type Props = {
  feedback: Feedback;
};

export const FeedbackItem = ({ feedback }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(feedback.text);

  const deleteFeedback = useFeedbackStore((s) => s.deleteFeedback);
  const likeFeedback = useFeedbackStore((s) => s.likeFeedback);
  const editFeedback = useFeedbackStore((s) => s.editFeedback);

  const handleEdit = () => {
    editFeedback(feedback.id, editedText);
    setIsEditing(false);
  }

  return (
    <li className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col gap-2 transition">
      {isEditing ? (
        <>
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded"
          />
          <div className="flex gap-2">
            <button onClick={handleEdit} className="bg-gradient-to-r from-green-300 to-green-500 dark:from-green-600 dark:to-green-700 text-white px-3 py-1 rounded shadow">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-white px-3 py-1 rounded shadow">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-800 dark:text-gray-100">{feedback.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">👍 {feedback.likes}</span>
            <div className="flex gap-2">
              <button onClick={() => likeFeedback(feedback.id)} className="text-sm bg-gradient-to-r from-blue-200 to-blue-400 dark:from-blue-700 dark:to-blue-900 hover:from-blue-300 hover:to-blue-500 text-white px-3 py-1 rounded shadow transition">
                Like
              </button>
              <button onClick={() => setIsEditing(true)} className="text-sm bg-gradient-to-r from-purple-200 to-purple-400 dark:from-purple-600 dark:to-purple-800 hover:from-purple-300 hover:to-purple-500 text-white px-3 py-1 rounded shadow">
                Edit
              </button>
              <button onClick={() => deleteFeedback(feedback.id)} className="text-sm bg-gradient-to-r from-red-200 to-red-400 dark:from-red-600 dark:to-red-800 hover:from-red-300 hover:to-red-500 text-white px-3 py-1 rounded shadow">
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
