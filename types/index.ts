export interface Product {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RedditContent {
  id: string;
  redditId: string;
  productId: string;
  subreddit: string;
  title?: string;
  content: string;
  author: string;
  score: number;
  url?: string;
  permalink?: string;
  createdAt: Date;
  fetchedAt: Date;
  sentimentScore?: number;
}

export interface ProductWithRedditData extends Product {
  redditContent: RedditContent[];
  averageSentiment?: number;
  totalMentions?: number;
  topSubreddits?: string[];
}

export interface SearchFilters {
  category?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  subreddit?: string;
  timeRange?: '24h' | '7d' | '30d' | 'all';
  minScore?: number;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Watchlist {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  product: Product;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1
  label: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0 to 1
}

export interface TrendingProduct {
  product: Product;
  mentionCount: number;
  sentimentTrend: number;
  popularSubreddits: string[];
}
