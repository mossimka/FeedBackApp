import { useEffect } from 'react';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackList } from './components/FeedbackList';
import { ThemeToggle } from './components/ThemeToggle';
import { useFeedbackStore } from './store/useFeedbackStore';
import { useAuthStore } from './store/useAuthStore';
import AuthPage from './AuthPage';

function App() {
  const theme = useFeedbackStore((s) => s.theme);
  const sortBy = useFeedbackStore((s) => s.sortBy);
  const setSortBy = useFeedbackStore((s) => s.setSortBy);
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (!token) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">🗳️ Product Feedback Board</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <ThemeToggle />
        <FeedbackForm />

        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Sort by:</label>
          <select
            className="ml-2 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'likes')}
          >
            <option value="date">📅 Date</option>
            <option value="likes">👍 Likes</option>
          </select>
        </div>

        <FeedbackList />
      </div>
    </div>
  );
}

export default App;
