---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx"
description: "Testing standards and patterns for the Capital IQ Strategic Intelligence Engine"
---

# Testing Guidelines

Apply the [general coding guidelines](../copilot-instructions.md) to all test code, plus these testing-specific standards.

## Testing Philosophy

Focus on **risk-based testing** for this rapid MVP:

1. **Critical Path Testing**: Ensure core user journey works flawlessly
2. **Vector Search Validation**: Verify semantic search accuracy and performance
3. **Component Testing**: Validate key UI components
4. **Error Handling**: Test system resilience under error conditions

## Test Structure

### Unit Test Pattern

```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('ComponentName', () => {
  let queryClient: QueryClient;
  
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });
  });
  
  afterEach(() => {
    queryClient.clear();
  });
  
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };
  
  it('should handle the happy path correctly', async () => {
    // Arrange
    const mockData = createMockFeedbackItems();
    
    // Act
    renderWithProviders(<ComponentName />);
    
    // Assert
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Mock Data Patterns

Create realistic mock data that represents the three strategic initiatives:

```typescript
export const createMockFeedbackItem = (overrides: Partial<FeedbackItem> = {}): FeedbackItem => ({
  id: 'mock-id-1',
  title: 'Chart Explainer Feature Request',
  description: 'The AI Chart Explainer is helpful but needs correlation analysis',
  source: 'support_ticket',
  client_id: 'client-123',
  sentiment: 0.75,
  initiatives: ['genai'],
  tags: ['feature_request', 'ai', 'chart_explainer'],
  created_at: '2025-08-10T14:30:00Z',
  ...overrides
});

export const mockFeedbackByInitiative = {
  genai: [
    createMockFeedbackItem({ 
      initiatives: ['genai'],
      tags: ['ai', 'chart_explainer', 'feature_request']
    }),
  ],
  privateMarkets: [
    createMockFeedbackItem({
      title: 'Private Equity Data Gap',
      description: 'Missing private equity data for healthcare sector',
      initiatives: ['privateMarkets'],
      sentiment: -0.25
    }),
  ],
  esg: [
    createMockFeedbackItem({
      title: 'ESG Metrics Request',
      description: 'Need better ESG scoring for portfolio analysis',
      initiatives: ['esg'],
      sentiment: 0.5
    }),
  ]
};
```

## Component Testing

### Testing UI State

```typescript
it('should show loading state initially', () => {
  // Mock useQuery to return loading state
  jest.spyOn(require('@tanstack/react-query'), 'useQuery')
    .mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    });
    
  renderWithProviders(<FeedbackList initiative="genai" />);
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

it('should show empty state when no data', () => {
  jest.spyOn(require('@tanstack/react-query'), 'useQuery')
    .mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });
    
  renderWithProviders(<FeedbackList initiative="genai" />);
  expect(screen.getByText('No feedback found')).toBeInTheDocument();
});
```

### Testing User Interactions

```typescript
it('should handle search input changes', async () => {
  const mockOnSearch = jest.fn();
  
  render(<SearchBox onSearch={mockOnSearch} />);
  
  const searchInput = screen.getByPlaceholderText('Search feedback...');
  fireEvent.change(searchInput, { target: { value: 'AI features' } });
  fireEvent.click(screen.getByText('Search'));
  
  await waitFor(() => {
    expect(mockOnSearch).toHaveBeenCalledWith('AI features');
  });
});
```

## API Testing

### Vector Search Testing

```typescript
describe('Vector Search API', () => {
  it('should return relevant results for GenAI queries', async () => {
    const query = "AI features in Capital IQ";
    const results = await searchFeedback(query, 'genai', 5);
    
    // Verify results contain expected keywords
    expect(results.some(item => 
      item.description.toLowerCase().includes('chart explainer') ||
      item.description.toLowerCase().includes('ai')
    )).toBe(true);
    
    // Verify results are from correct initiative
    expect(results.every(item => 
      item.initiatives.includes('genai')
    )).toBe(true);
  });
  
  it('should return results within performance thresholds', async () => {
    const startTime = performance.now();
    await searchFeedback("private equity data", 'privateMarkets', 10);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(500); // 500ms threshold
  });
});
```

### Error Handling Tests

```typescript
it('should handle API errors gracefully', async () => {
  // Mock fetch to reject
  global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
  
  const { result } = renderHook(() => 
    useQuery(['feedback'], () => fetchFeedbackItems())
  );
  
  await waitFor(() => {
    expect(result.current.error).toBeDefined();
  });
});
```

## Performance Testing

```typescript
it('should render large lists efficiently', () => {
  const largeMockData = Array.from({ length: 1000 }, (_, i) => 
    createMockFeedbackItem({ id: `item-${i}` })
  );
  
  const startTime = performance.now();
  render(<FeedbackList data={largeMockData} />);
  const renderTime = performance.now() - startTime;
  
  expect(renderTime).toBeLessThan(100); // 100ms render threshold
});
```

## Test Data Quality

Ensure test data represents real-world scenarios:

- Include edge cases (empty strings, null values, extreme numbers)
- Test all three strategic initiatives
- Include various sentiment scores (-1 to 1)
- Test different feedback sources
- Include realistic client scenarios

## Test Coverage Goals

Focus coverage on:
- Critical user flows (search, filter, copy to clipboard)
- Vector search functionality
- Error handling paths
- Component state management
- API response handling
