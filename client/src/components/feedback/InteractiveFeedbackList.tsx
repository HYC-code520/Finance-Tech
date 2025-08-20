import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FeedbackItem, SortField, SortOrder } from '../../types/feedback';
import { TagFilter } from './TagFilter';
import { SentimentChart } from './SentimentChart';

interface InteractiveFeedbackListProps {
  initiativeId?: string;
  onFeedbackSelect: (feedback: FeedbackItem) => void;
}

export const InteractiveFeedbackList: React.FC<InteractiveFeedbackListProps> = ({
  initiativeId,
  onFeedbackSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const { data: feedbackItems, isLoading, error } = useQuery<FeedbackItem[]>({
    queryKey: ['feedback', initiativeId],
    queryFn: async () => {
      // Using mock data for now
      const { mockFeedback } = await import('../../services/mockData');
      return initiativeId 
        ? mockFeedback.filter(item => item.initiativeId === initiativeId)
        : mockFeedback;
    },
  });

  // Get all tags from feedback items
  const allTags = useMemo(() => {
    if (!feedbackItems) return [];
    return feedbackItems.flatMap(item => item.tags || []);
  }, [feedbackItems]);

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags(current =>
      current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag]
    );
  };

  const filteredAndSortedFeedback = useMemo(() => {
    if (!feedbackItems) return [];
    
    // First filter by search term and tags
    const filtered = feedbackItems.filter(item => {
      const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => item.tags?.includes(tag));
      return matchesSearch && matchesTags;
    });
    
    // Then sort
    return [...filtered].sort((a, b) => {
      if (sortField === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'sentiment') {
        const sentimentOrder = { positive: 2, neutral: 1, negative: 0 };
        const sentimentA = sentimentOrder[a.sentiment || 'neutral'];
        const sentimentB = sentimentOrder[b.sentiment || 'neutral'];
        return sortOrder === 'asc' ? sentimentA - sentimentB : sentimentB - sentimentA;
      }
      return 0;
    });
  }, [feedbackItems, searchTerm, sortField, sortOrder]);

  if (isLoading) return <div className="animate-pulse">Loading feedback...</div>;
  if (error) return <div className="text-red-600">Error loading feedback</div>;

  return (
    <div className="space-y-4">
      {feedbackItems && <SentimentChart feedbackItems={feedbackItems} />}
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />
      <div className="flex gap-4 items-center">
        <input
          type="search"
          placeholder="Search feedback..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={sortField}
          onChange={(e) => setSortField(e.target.value as SortField)}
        >
          <option value="createdAt">Date</option>
          <option value="sentiment">Sentiment</option>
        </select>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md"
          onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      
      <div className="space-y-2">
        {filteredAndSortedFeedback.map((feedback) => (
          <div
            key={feedback.id}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onFeedbackSelect(feedback)}
          >
            <h3 className="font-medium">{feedback.title}</h3>
            <p className="text-gray-600">{feedback.content}</p>
            <div className="flex gap-2 mt-2">
              {feedback.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
