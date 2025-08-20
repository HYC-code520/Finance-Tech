import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const getTagColor = (tag: string): string => {
  // Color mapping for different tag categories
  if (['ai', 'genai'].includes(tag)) return 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50';
  if (['esg', 'coverage'].includes(tag)) return 'bg-green-500/20 hover:bg-green-500/30 border-green-500/50';
  if (['private-markets'].includes(tag)) return 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50';
  if (['performance', 'data-quality'].includes(tag)) return 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/50';
  return 'bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/50';
};

export const TagFilter: React.FC<TagFilterProps> = ({
  allTags,
  selectedTags,
  onTagSelect,
}) => {
  // Count occurrences of each tag
  const tagCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    allTags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
    return counts;
  }, [allTags]);

  // Get unique tags and sort them
  const uniqueTags = useMemo(() => {
    return Array.from(new Set(allTags)).sort();
  }, [allTags]);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {uniqueTags.map(tag => (
        <Badge
          key={tag}
          variant="outline"
          className={`cursor-pointer transition-colors duration-200 ${
            getTagColor(tag)
          } ${
            selectedTags.includes(tag) ? 'ring-2 ring-white/20' : ''
          }`}
          onClick={() => onTagSelect(tag)}
        >
          {tag} ({tagCounts[tag]})
        </Badge>
      ))}
    </div>
  );
};
