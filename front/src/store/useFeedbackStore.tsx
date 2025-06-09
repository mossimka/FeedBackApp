import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Feedback, Category } from '../shared/types';
import {
  getAllFeedbacks,
  createFeedback,
  deleteFeedback,
  patchFeedback,
} from '../api/feedback';

type SortBy = 'date' | 'likes';

type FeedbackStore = {
  feedbacks: Feedback[];
  sortBy: SortBy;
  currentPage: number;
  itemsPerPage: number;
  theme: 'light' | 'dark';
  categories: Category[];

  setFeedbacks: () => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => void;
  addFeedback: (text: string, category: Category) => Promise<void>;
  deleteFeedback: (id: number) => Promise<void>;
  likeFeedback: (id: number) => Promise<void>;
  editFeedback: (id: number, text: string) => Promise<void>;
  setSortBy: (sortBy: SortBy) => void;
  setCurrentPage: (page: number) => void;
};

export const useFeedbackStore = create<FeedbackStore>()(
  devtools((set, get) => ({
    feedbacks: [],
    sortBy: 'date',
    theme: 'light',
    currentPage: 1,
    itemsPerPage: 5,
    categories: [],

    setTheme: (theme) => set(() => ({ theme })),

    setFeedbacks: async () => {
      const data = await getAllFeedbacks();
      set(() => ({ feedbacks: data }));
    },

    addFeedback: async (text, category) => {
      const newFb = await createFeedback({ text, category_id: category.id });
      set((state) => ({ feedbacks: [...state.feedbacks, newFb] }));
    },

    deleteFeedback: async (id) => {
      await deleteFeedback(id);
      set((state) => ({
        feedbacks: state.feedbacks.filter((f) => f.id !== id),
      }));
    },

    likeFeedback: async (id) => {
      const feedback = get().feedbacks.find((f) => f.id === id);
      if (!feedback) return;

      const updated = await patchFeedback(id, { likes: feedback.likes + 1 });
      set((state) => ({
        feedbacks: state.feedbacks.map((f) => (f.id === id ? updated : f)),
      }));
    },

    editFeedback: async (id, text) => {
      const updated = await patchFeedback(id, { text });
      set((state) => ({
        feedbacks: state.feedbacks.map((f) => (f.id === id ? updated : f)),
      }));
    },

    setSortBy: (sortBy) => set(() => ({ sortBy })),
    setCurrentPage: (page) => set(() => ({ currentPage: page })),
  }))
);
