import axios from "axios";
import type { Category } from "../shared/types";

const api = axios.create({
  baseURL: "https://feedbackapp-ldqr.onrender.com",
  withCredentials: false,
});

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};
