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
