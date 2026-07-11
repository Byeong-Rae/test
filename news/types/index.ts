export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  time: string;
  priority: "high" | "medium" | "low";
}

export interface Subscriber {
  id: string;
  email: string;
  deliveryTime: string;
  categories: string[];
  active: boolean;
  createdAt: string;
}

export const NEWS_CATEGORIES = [
  "국방정책",
  "무기체계",
  "북한·안보",
  "국방산업",
  "국제안보",
] as const;