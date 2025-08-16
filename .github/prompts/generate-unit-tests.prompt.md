---
mode: 'agent'
model: 'GPT-4o'
tools: ['codebase']
description: 'Generate comprehensive unit tests following the Capital IQ testing strategy'
---

# Generate Unit Tests

Generate comprehensive unit tests for the selected code following the Capital IQ Strategic Intelligence Engine testing strategy.

Apply guidelines from [Testing Guidelines](../instructions/testing.instructions.md) and focus on risk-based testing priorities.

## Testing Requirements

For the selected code, generate tests that cover:

### 1. Critical Path Testing
- Test the main user journey and core functionality
- Ensure key features work flawlessly for the demo
- Validate integration between components and APIs

### 2. Vector Search Validation (if applicable)
- Test semantic search accuracy with realistic queries
- Verify search results match expected strategic initiatives
- Validate performance thresholds (< 500ms response time)

### 3. Component Testing
- Test component rendering in different states
- Validate user interactions and event handlers
- Test responsive design across viewport sizes
- Verify accessibility requirements

### 4. Error Handling
- Test system resilience under error conditions
- Validate graceful handling of API failures
- Test input validation and edge cases

## Test Structure

Create tests following this pattern:

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
  
  // Test cases here
});
```

## Mock Data Requirements

Generate realistic mock data that represents:
- All three strategic initiatives (GenAI, Private Markets, ESG)
- Various sentiment scores (-1 to 1)
- Different feedback sources and client scenarios
- Edge cases (empty data, error states, null values)

Example mock data pattern:

```typescript
export const createMockFeedbackItem = (overrides: Partial<FeedbackItem> = {}): FeedbackItem => ({
  id: 'mock-id-1',
  title: 'Chart Explainer Feature Request',
  description: 'The AI Chart Explainer needs correlation analysis',
  source: 'support_ticket',
  client_id: 'client-123',
  sentiment: 0.75,
  initiatives: ['genai'],
  tags: ['feature_request', 'ai', 'chart_explainer'],
  created_at: '2025-08-10T14:30:00Z',
  ...overrides
});
```

## Test Categories to Include

### 1. Happy Path Tests
- Test successful scenarios with valid data
- Verify expected behavior under normal conditions
- Validate correct data flow through components

### 2. Edge Case Tests
- Test with empty data sets
- Test with null/undefined values
- Test with extremely large or small data sets
- Test boundary conditions

### 3. Error Handling Tests
- Test API failure scenarios
- Test network errors
- Test validation failures
- Test component error boundaries

### 4. Performance Tests
- Test rendering performance with large data sets
- Validate API response times
- Test memory usage for complex operations

### 5. User Interaction Tests
- Test click handlers and form submissions
- Test keyboard navigation
- Test search and filter functionality
- Test "Copy to Clipboard" features

### 6. Accessibility Tests
- Test screen reader compatibility
- Verify proper ARIA labels
- Test keyboard navigation
- Validate color contrast requirements

## Strategic Initiative Testing

If testing components related to strategic initiatives, include:

### GenAI Testing
```typescript
it('should return relevant results for GenAI queries', async () => {
  const query = "AI features in Capital IQ";
  const results = await searchFeedback(query, 'genai', 5);
  
  expect(results.some(item => 
    item.description.toLowerCase().includes('chart explainer') ||
    item.description.toLowerCase().includes('ai')
  )).toBe(true);
  
  expect(results.every(item => 
    item.initiatives.includes('genai')
  )).toBe(true);
});
```

### Performance Testing
```typescript
it('should return results within performance thresholds', async () => {
  const startTime = performance.now();
  await searchFeedback("private equity data", 'privateMarkets', 10);
  const endTime = performance.now();
  
  expect(endTime - startTime).toBeLessThan(500); // 500ms threshold
});
```

## Coverage Goals

Focus test coverage on:
- Critical user flows (search, filter, copy to clipboard)
- Vector search functionality
- Error handling paths
- Component state management
- API response handling

## Test File Organization

Create test files with clear naming:
- `ComponentName.test.tsx` for component tests
- `api/vectorSearch.test.ts` for API tests
- `utils/helpers.test.ts` for utility function tests

Include proper test descriptions that explain the business value and expected behavior of each test case.
