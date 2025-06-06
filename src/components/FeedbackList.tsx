import { useFeedbackStore } from '../store/useFeedbackStore';
import { FeedbackItem } from './FeedbackItem';

export const FeedbackList = () => {
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const sortBy = useFeedbackStore((s) => s.sortBy);
  const currentPage = useFeedbackStore((s) => s.currentPage);
  const itemsPerPage = useFeedbackStore((s) => s.itemsPerPage);
  const setCurrentPage = useFeedbackStore((s) => s.setCurrentPage);

  const sorted = [...feedbacks].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sorted.slice(startIdx, startIdx + itemsPerPage);

  if (sorted.length === 0) return <p>No feedback yet</p>;

  return (
    <div className="w-full  ">
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
              className={`px-3 py-1 rounded border 
                ${page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-blue-100'}
              `}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
