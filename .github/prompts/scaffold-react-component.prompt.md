---
mode: 'agent'
model: 'GPT-4o'
tools: ['codebase']
description: 'Generate a new React component following Capital IQ Strategic Intelligence Engine standards'
---

# Scaffold React Component

Generate a new React component for the Capital IQ Strategic Intelligence Engine following our established patterns and standards.

Apply guidelines from [React & TypeScript Guidelines](../instructions/react-typescript.instructions.md) and [Styling Guidelines](../instructions/styling.instructions.md).

## Component Requirements

Ask for the following information if not provided:
- **Component name** (e.g., `FeedbackList`, `StrategicInitiativeTracker`)
- **Component purpose** (e.g., "Display filtered feedback items", "Track GenAI initiative metrics")
- **Props needed** (e.g., initiative type, data filters, event handlers)
- **Strategic initiative alignment** (GenAI, Private Markets, or ESG)

## Implementation Standards

Create a component that includes:

### 1. Component Structure
- Use TypeScript with proper prop interfaces
- Follow the standardized component pattern from our guidelines
- Include proper imports and exports
- Implement proper error boundaries and loading states

### 2. Prop Interface
```tsx
interface ComponentNameProps {
  // Required props with clear types
  requiredProp: string;
  initiative?: 'genai' | 'privateMarkets' | 'esg';
  
  // Optional props with defaults
  optionalProp?: number;
  className?: string;
  children?: React.ReactNode;
  
  // Event handlers
  onAction?: (data: DataType) => void;
}
```

### 3. State Management
- Use React Query for API data fetching
- Implement proper loading, error, and empty states
- Use appropriate hooks (useState, useCallback, useMemo)

### 4. Styling
- Apply S&P Capital IQ brand colors and design system
- Use Tailwind CSS with our custom classes
- Implement responsive design (mobile-first)
- Include proper accessibility attributes

### 5. Performance
- Use React.memo if the component is expensive to render
- Implement proper dependency arrays for hooks
- Consider code splitting for large components

## File Structure

Create the component in the appropriate directory:
- `src/components/feedback/` - For feedback-related components
- `src/components/initiatives/` - For strategic initiative components  
- `src/components/common/` - For shared/reusable components
- `src/components/layout/` - For layout components

## Example Component Template

Follow this pattern:

```tsx
import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { EmptyState } from '@/components/common/EmptyState';

interface ComponentNameProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  prop1, 
  prop2 = defaultValue,
  onAction 
}) => {
  // Hooks at the top
  const { data, isLoading, error } = useQuery(/* ... */);
  
  // Event handlers
  const handleAction = useCallback(() => {
    // Implementation
    onAction?.(data);
  }, [data, onAction]);
  
  // Computed values
  const processedData = useMemo(() => {
    // Processing logic
  }, [data]);
  
  // Early returns for loading/error states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.length) return <EmptyState message="No data found" />;
  
  return (
    <div className="component-wrapper glass-card p-6">
      {/* Component JSX */}
    </div>
  );
};
```

## Additional Considerations

- **Demo Alignment**: Ensure the component supports our final demo narrative
- **Strategic Focus**: Consider how the component relates to our three strategic initiatives
- **Copy to Clipboard**: If relevant, include functionality for copying insights
- **Mock Data**: Use realistic mock data that represents actual feedback scenarios
- **Accessibility**: Include proper ARIA labels and keyboard navigation

Generate the complete component file with proper documentation and ensure it follows all established patterns from our instruction files.
