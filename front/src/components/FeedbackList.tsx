import { useEffect, useState } from 'react';
import { useFeedbackStore } from '../store/useFeedbackStore';
import { FeedbackItem } from './FeedbackItem';

export const FeedbackList = () => {
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const sortBy = useFeedbackStore((s) => s.sortBy);
  const currentPage = useFeedbackStore((s) => s.currentPage);
  const itemsPerPage = useFeedbackStore((s) => s.itemsPerPage);
  const setCurrentPage = useFeedbackStore((s) => s.setCurrentPage);
  const setFeedbacks = useFeedbackStore((s) => s.setFeedbacks);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFeedbacks()
      .catch((e) => console.error('Failed to load feedbacks', e))
      .finally(() => setLoading(false));
  }, [setFeedbacks]);

  if (loading) return <p>Loading feedbacks...</p>;
  if (feedbacks.length === 0) return <p>No feedback yet</p>;

  const sorted = [...feedbacks].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sorted.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="w-full">
      <ul className="space-y-4">
        {currentItems.map((f) => (
          <FeedbackItem key={f.id} feedback={f} />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border transition
                ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 dark:text-white text-gray-800 hover:bg-blue-100 dark:hover:bg-blue-600'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
