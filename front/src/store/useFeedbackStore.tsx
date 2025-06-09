import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Feedback, Category } from '../shared/types';

type SortBy = 'date' | 'likes';

type FeedbackStore = {
  feedbacks: Feedback[];
  sortBy: SortBy;
  currentPage: number;
  itemsPerPage: number;
  theme: 'light' | 'dark';
  categories: Category[];

  setTheme: (theme: 'light' | 'dark') => void;
  addFeedback: (text: string, category: Category) => void;
  deleteFeedback: (id: number) => void;
  likeFeedback: (id: number) => void;
  editFeedback: (id: number, text: string) => void;
  setSortBy: (sortBy: SortBy) => void;
  setCurrentPage: (page: number) => void;
};

export const useFeedbackStore = create<FeedbackStore>()(
  devtools(
    persist(
      (set) => ({
        feedbacks: [],
        sortBy: 'date',
        theme: 'light',
        currentPage: 1,
        itemsPerPage: 5,
        categories: [],

        setTheme: (theme) => set(() => ({ theme })),

        addFeedback: (text, category) => {
          set((state) => ({
            feedbacks: [
              ...state.feedbacks,
              {
                id: Date.now(),
                text,
                likes: 0,
                createdAt: new Date(),
                category,
              },
            ],
          }));
        },

        deleteFeedback: (id) => {
          set((state) => ({
            feedbacks: state.feedbacks.filter((f) => f.id !== id),
          }));
        },

        likeFeedback: (id) => {
          set((state) => ({
            feedbacks: state.feedbacks.map((f) =>
              f.id === id ? { ...f, likes: f.likes + 1 } : f
            ),
          }));
        },

        editFeedback: (id, text) => {
          set((state) => ({
            feedbacks: state.feedbacks.map((f) =>
              f.id === id ? { ...f, text } : f
            ),
          }));
        },

        setSortBy: (sortBy) => {
          set(() => ({ sortBy }));
        },

        setCurrentPage: (page) => set({ currentPage: page }),
      }),
      {
        name: 'feedback-storage',
        partialize: (state) => ({
          feedbacks: state.feedbacks,
          sortBy: state.sortBy,
          theme: state.theme,
        }),
        merge: (persistedState, currentState) => {
          const feedbacks = (persistedState as FeedbackStore).feedbacks.map((f) => ({
            ...f,
            createdAt: new Date(f.createdAt),
          }));
          return {
            ...currentState,
            ...persistedState,
            feedbacks,
          };
        },
      }
    )
  )
);
