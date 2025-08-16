# S&P Capital IQ Strategic Intelligence Engine - Development Instructions

## Project Context

You are working on the **Capital IQ Strategic Intelligence Engine**, an AI-powered dashboard that transforms fragmented S&P Global customer feedback into actionable product insights. This is an MVP focused on helping Product Managers like "Alejandra" make data-driven decisions by analyzing feedback through strategic initiatives.

**Core Premise**: Feedback is only useful if you can align it with a business objective.

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Supabase with pgvector extension
- **Database**: PostgreSQL with vector embeddings
- **State Management**: React Query for server state, Context API for UI state
- **Styling**: Tailwind CSS with custom S&P Capital IQ branding

## Development Principles

### 1. Type Safety First
- Use TypeScript throughout with strict type checking
- Define clear interfaces for all data structures
- Prefer type safety over convenience shortcuts

### 2. Component-Based Architecture
- Build reusable, composable components following atomic design
- Organize components by feature: `components/feedback/`, `components/initiatives/`
- Use proper prop interfaces and component typing

### 3. Performance & User Experience
- Optimize for both initial load and runtime performance
- Implement proper loading states and error boundaries
- Use React.memo, useMemo, and useCallback appropriately
- Implement code splitting for route-based optimization

### 4. Vector Search & AI Integration
- Use OpenAI's text-embedding-ada-002 for embedding generation
- Implement cosine similarity for semantic search
- Store embeddings in pgvector columns
- Optimize vector queries with proper indexing

### 5. Error Handling
- Implement comprehensive error handling at all layers
- Provide clear, actionable error messages to users
- Use React Query's error handling capabilities
- Log errors with context for debugging

## Naming Conventions

- **Components**: PascalCase (e.g., `FeedbackList`, `StrategicInitiativeTracker`)
- **Variables & Functions**: camelCase (e.g., `feedbackItems`, `searchFeedback`)
- **Types & Interfaces**: PascalCase (e.g., `FeedbackItem`, `SearchParams`)
- **Constants**: ALL_CAPS (e.g., `API_ENDPOINTS`, `INITIATIVE_TYPES`)
- **Database**: snake_case (e.g., `feedback_items`, `created_at`)

## Code Organization

```
src/
├── components/
│   ├── common/           # Shared components (LoadingSpinner, ErrorMessage)
│   ├── feedback/         # Feedback-related components
│   ├── initiatives/      # Strategic initiative components
│   └── layout/           # Layout components
├── hooks/                # Custom hooks
├── api/                  # API client functions
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── pages/                # Page components
```

## Strategic Initiatives Focus

The system tracks three core strategic initiatives:

1. **GenAI Integration**: AI features like Chart Explainer
2. **Private Markets Expansion**: Private equity and debt analysis
3. **ESG Data**: Environmental, social, governance workflows

Always consider how features align with these strategic priorities.

## MVP Constraints

- **Timeline**: Rapid development (1-week sprint)
- **Scope**: Support tickets only, Capital IQ web platform & Excel plugin
- **Core Action**: "Copy to Clipboard" functionality for insights
- **Data**: Mock, anonymized data only

## Quality Standards

- **Accessibility**: Ensure components meet basic accessibility requirements
- **Responsive Design**: Test across viewport sizes (mobile-first approach)
- **Browser Support**: Target modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance**: API responses under 500ms, UI interactions under 100ms

## Security Considerations

- Validate all user inputs and sanitize data
- Use parameterized queries to prevent SQL injection
- Implement proper authentication for API endpoints
- Apply rate limiting to prevent abuse
- Handle sensitive data appropriately (mock data in MVP)

## Demo-Driven Development

All code should contribute to the final demo narrative:
1. **Before State**: Manual feedback analysis process
2. **Transition**: Introduction of Strategic Intelligence Engine
3. **After State**: Rapid insight discovery and actionability

When implementing features, always ask: "How does this support our demo story?"
