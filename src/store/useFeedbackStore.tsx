import { create } from 'zustand';
import type { Feedback } from '../shared/types';

type SortBy = 'date' | 'likes';  

type FeedbackStore = {
  feedbacks: Feedback[];
  sortBy: SortBy;
  currentPage: number;
  itemsPerPage: number;

  addFeedback: (text: string) => void;
  deleteFeedback: (id: number) => void;
  likeFeedback: (id: number) => void;
  setSortBy: (sortBy: SortBy) => void;
  setCurrentPage: (itemsPerPage: number) => void;
};

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbacks: [],
  sortBy: 'date',
  currentPage: 1,
  itemsPerPage: 5,

  addFeedback: (text) => {
    set((state) => ({
      feedbacks: [
        ...state.feedbacks, 
        {
          id: Date.now(),
          text,
          likes: 0,
          createdAt: new Date(),
        },
      ],
    }));
  },

  deleteFeedback: (id) => {
    set((state) => ({
      feedbacks: state.feedbacks.filter((feedback) => feedback.id !== id),
    }));
  }, 

  likeFeedback: (id) => {
    set((state) => ({
      feedbacks: state.feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, likes: feedback.likes + 1 } : feedback
      ),
    }));
  },

  setSortBy: (sortBy) => {
    set(() => ({ sortBy }));
  },
  setCurrentPage: (page) => set({ currentPage: page }),
}));
