---
applyTo: "**/*.tsx,**/*.ts"
description: "React and TypeScript specific coding standards for the Capital IQ Strategic Intelligence Engine"
---

# React & TypeScript Guidelines

Apply the [general coding guidelines](../copilot-instructions.md) to all code, plus these React/TypeScript specific standards.

## Component Structure

Follow this standardized component pattern:

```tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ComponentNameProps } from './types';

interface ComponentNameProps {
  // Clear prop definitions with proper TypeScript types
  requiredProp: string;
  optionalProp?: number;
  children?: React.ReactNode;
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  requiredProp, 
  optionalProp = 10,
  children 
}) => {
  // Hooks at the top, in consistent order
  const { data, isLoading, error } = useQuery(/* ... */);
  
  // Event handlers
  const handleAction = useCallback(() => {
    // Implementation
  }, [/* dependencies */]);
  
  // Early returns for loading/error states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.length) return <EmptyState message="No data found" />;
  
  return (
    <div className="component-wrapper">
      {/* Component JSX */}
    </div>
  );
};
```

## TypeScript Standards

- Use `React.FC<Props>` for functional components with children
- Define clear prop interfaces with JSDoc comments for complex props
- Use union types for strategic initiatives: `'genai' | 'privateMarkets' | 'esg'`
- Prefer `interface` over `type` for object shapes
- Use generics for reusable components

## State Management

- **Server State**: Use React Query for all API data
- **Form State**: Use React Hook Form with TypeScript schemas
- **UI State**: Use Context API with TypeScript for global state
- **Local State**: Use useState with proper typing

Example React Query usage:

```tsx
const { data, isLoading, error } = useQuery<FeedbackItem[]>({
  queryKey: ['feedback', initiative, limit],
  queryFn: () => fetchFeedbackItems(initiative, limit),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

## Performance Optimizations

- Use `React.memo` for expensive components
- Implement `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to child components
- Implement proper dependency arrays for hooks

## Error Boundaries

Implement error boundaries for component trees:

```tsx
class FeedbackErrorBoundary extends React.Component {
  // Error boundary implementation
}
```

## Custom Hooks

Create reusable custom hooks for:
- API data fetching patterns
- Local storage interactions
- Common UI state logic

Example custom hook:

```tsx
const useFeedbackSearch = (initiative: InitiativeType) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FeedbackItem[]>([]);
  
  // Implementation
  
  return { query, setQuery, results, isLoading, error };
};
```

## Styling with Tailwind

- Use S&P Capital IQ brand colors: `primary-dark`, `accent-cyan`
- Implement responsive design with mobile-first approach
- Use custom CSS classes for complex animations
- Maintain consistent spacing with Tailwind's spacing scale

## Accessibility

- Always include proper ARIA labels
- Ensure keyboard navigation works
- Use semantic HTML elements
- Test with screen readers
- Maintain proper color contrast ratios
