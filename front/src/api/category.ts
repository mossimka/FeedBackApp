import api from "./api";
import type { Category } from "../shared/types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};
