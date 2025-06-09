import axios from "axios";
import type { Category } from "../shared/types";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: false,
});

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};
