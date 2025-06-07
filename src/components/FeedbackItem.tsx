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
    <li className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-2">
      {isEditing ? (
        <>
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <div className="flex gap-2">
            <button onClick={handleEdit} className="bg-gradient-to-r from-blue-100 to-purple-300 hover:from-blue-200 hover:to-purple-400 text-white px-3 py-1 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gradient-to-r from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-800">{feedback.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">👍 {feedback.likes}</span>
            <div className="flex gap-2">
              <button onClick={() => likeFeedback(feedback.id)} className="text-sm bg-gradient-to-r from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 text-white px-3 py-1 rounded shadow transition">Like</button>
              <button onClick={() => setIsEditing(true)} className="text-sm bg-gradient-to-r from-purple-100 to-purple-300 hover:from-purple-200 hover:to-purple-400 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => deleteFeedback(feedback.id)} className="text-sm bg-gradient-to-r from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
