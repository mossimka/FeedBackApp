import './App.css';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackList } from './components/FeedbackList';
import { useFeedbackStore } from './store/useFeedbackStore';

function App() {
  const sortBy = useFeedbackStore((s) => s.sortBy);
  const setSortBy = useFeedbackStore((s) => s.setSortBy);

  return (
    <div>
      <h1>Feedback App (Zustand)</h1>
      <FeedbackForm />
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'date' | 'likes')}>
          <option value="date">Date</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      <FeedbackList />
    </div>
  );
}

export default App;
