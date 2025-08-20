import React, { useMemo } from 'react';
import { FeedbackItem } from '../../types/feedback';

interface SentimentChartProps {
  feedbackItems: FeedbackItem[];
}

interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ feedbackItems }) => {
  const stats = useMemo(() => {
    const counts = feedbackItems.reduce((acc, item) => {
      const sentiment = item.sentiment || 'neutral';
      acc[sentiment]++;
      acc.total++;
      return acc;
    }, { positive: 0, negative: 0, neutral: 0, total: 0 } as SentimentStats);

    return counts;
  }, [feedbackItems]);

  const getPercentage = (count: number) => {
    return ((count / stats.total) * 100).toFixed(1);
  };

  return (
    <div className="bg-[#092946]/30 rounded-lg p-4 mb-4">
      <h3 className="text-white text-sm font-medium mb-3">Sentiment Distribution</h3>
      <div className="space-y-2">
        {/* Positive Sentiment */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/80">
            <span>Positive</span>
            <span>{getPercentage(stats.positive)}% ({stats.positive})</span>
          </div>
          <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500/70 rounded-full transition-all duration-500"
              style={{ width: `${getPercentage(stats.positive)}%` }}
            />
          </div>
        </div>

        {/* Neutral Sentiment */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/80">
            <span>Neutral</span>
            <span>{getPercentage(stats.neutral)}% ({stats.neutral})</span>
          </div>
          <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500/70 rounded-full transition-all duration-500"
              style={{ width: `${getPercentage(stats.neutral)}%` }}
            />
          </div>
        </div>

        {/* Negative Sentiment */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/80">
            <span>Negative</span>
            <span>{getPercentage(stats.negative)}% ({stats.negative})</span>
          </div>
          <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500/70 rounded-full transition-all duration-500"
              style={{ width: `${getPercentage(stats.negative)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
