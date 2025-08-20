export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  initiativeId?: string;
  createdAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export type SortField = 'createdAt' | 'sentiment';
export type SortOrder = 'asc' | 'desc';
