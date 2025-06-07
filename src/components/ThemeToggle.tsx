import { useFeedbackStore } from '../store/useFeedbackStore';

export const ThemeToggle = () => {
  const theme = useFeedbackStore((s) => s.theme);
  const setTheme = useFeedbackStore((s) => s.setTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  console.log('Current theme:', theme);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded shadow"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

