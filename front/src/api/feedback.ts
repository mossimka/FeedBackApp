import api from "./api";
import type { FeedbackCreate, Feedback } from "../shared/types";

export const getAllFeedbacks = async (): Promise<Feedback[]> => {
  const res = await api.get("/feedbacks");
  return res.data;
};

export const createFeedback = async (feedback: FeedbackCreate): Promise<Feedback> => {
  const res = await api.post("/feedbacks", feedback);
  return res.data;
};

export const patchFeedback = async (
  id: number,
  updates: Partial<{ text: string; likes: number }>
) => {
  const res = await api.patch(`/feedbacks/${id}`, updates);
  return res.data;
};

export const deleteFeedback = async (id: number): Promise<void> => {
  await api.delete(`/feedbacks/${id}`);
};
