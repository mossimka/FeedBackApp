export type Category = {
  id: number;
  name: string;
}

export type Feedback = {
  id: number;
  text: string;
  likes: number;
  createdAt: Date;
  category: Category;
};

export type FeedbackCreate = {
  text: string;
  category_id: number;
}

export type FeedbackUpdate = {
  text?: string;
  likes?: number;
}