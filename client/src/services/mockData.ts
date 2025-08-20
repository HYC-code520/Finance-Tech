import { FeedbackItem } from '../types/feedback';

export const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    title: 'Great Chart Explainer Feature',
    content: 'The new AI-powered chart explanation feature is incredibly helpful. It saves me so much time.',
    createdAt: '2025-08-18T10:00:00Z',
    sentiment: 'positive',
    initiativeId: 'genai',
    tags: ['ai', 'charts', 'feature-feedback', 'genai']
  },
  {
    id: '2',
    title: 'Private Markets Data Issues',
    content: 'Having trouble accessing private equity data. The loading times are too long.',
    createdAt: '2025-08-19T09:00:00Z',
    sentiment: 'negative',
    initiativeId: 'private-markets',
    tags: ['performance', 'data-quality', 'private-markets']
  },
  {
    id: '3',
    title: 'ESG Scoring Feedback',
    content: 'The new ESG scoring system is well designed but could use more granular filters.',
    createdAt: '2025-08-19T11:00:00Z',
    sentiment: 'neutral',
    initiativeId: 'esg',
    tags: ['esg', 'filters', 'data-quality']
  },
  {
    id: '4',
    title: 'AI Model Accuracy',
    content: 'The AI predictions for market trends have been spot on. Really impressed with the accuracy.',
    createdAt: '2025-08-19T14:00:00Z',
    sentiment: 'positive',
    initiativeId: 'genai',
    tags: ['ai', 'performance', 'genai']
  },
  {
    id: '5',
    title: 'ESG Data Coverage',
    content: 'Would love to see more ESG data coverage for emerging markets.',
    createdAt: '2025-08-19T15:30:00Z',
    sentiment: 'neutral',
    initiativeId: 'esg',
    tags: ['esg', 'data-quality', 'coverage']
  }
];
