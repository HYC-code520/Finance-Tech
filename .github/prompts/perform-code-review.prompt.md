---
mode: 'ask'
model: 'Claude Sonnet 3.5'
tools: ['codebase']
description: 'Perform comprehensive code review based on Capital IQ coding standards and security requirements'
---

# Perform Code Review

Conduct a thorough code review for the selected code following the Capital IQ Strategic Intelligence Engine coding standards, security requirements, and best practices.

Apply guidelines from [React & TypeScript Guidelines](../instructions/react-typescript.instructions.md), [Supabase & Database Guidelines](../instructions/supabase-database.instructions.md), [Testing Guidelines](../instructions/testing.instructions.md), and [Styling Guidelines](../instructions/styling.instructions.md).

## Code Review Checklist

### 1. Type Safety & Code Quality

#### TypeScript Standards
- [ ] Strict TypeScript typing is used throughout
- [ ] Proper interfaces defined for all data structures  
- [ ] No `any` types unless absolutely necessary
- [ ] Union types used for strategic initiatives: `'genai' | 'privateMarkets' | 'esg'`
- [ ] Generic types implemented for reusable components

#### React Standards
- [ ] Components follow the standardized pattern
- [ ] Proper prop interfaces with clear typing
- [ ] Hooks used correctly (proper dependency arrays)
- [ ] Performance optimizations (React.memo, useMemo, useCallback) used appropriately
- [ ] Error boundaries implemented where needed

### 2. Architecture & Organization

#### Component Structure
- [ ] Components organized by feature (feedback/, initiatives/, common/)
- [ ] Atomic design principles followed
- [ ] Clear separation of concerns
- [ ] Reusable components properly abstracted

#### State Management
- [ ] React Query used for server state
- [ ] Context API used appropriately for UI state
- [ ] Local state kept minimal and focused
- [ ] No unnecessary re-renders

### 3. Security & Data Handling

#### Input Validation
- [ ] All user inputs validated and sanitized
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention measures in place
- [ ] Proper authentication checks on API endpoints

#### Data Security
- [ ] Sensitive data handled appropriately
- [ ] Proper error messages (no information leakage)
- [ ] Rate limiting implemented where needed
- [ ] CORS headers configured correctly

### 4. Performance & Optimization

#### Frontend Performance
- [ ] Bundle size considerations (code splitting, tree shaking)
- [ ] Efficient rendering (minimal re-renders)
- [ ] Image optimization and lazy loading
- [ ] Network request optimization (caching, batching)

#### Backend Performance
- [ ] Database queries optimized with proper indexes
- [ ] Vector search queries use appropriate similarity thresholds
- [ ] API responses under 500ms threshold
- [ ] Connection pooling and caching implemented

### 5. Vector Search & AI Integration

#### Embedding Handling
- [ ] OpenAI embeddings generated correctly
- [ ] Vector storage uses proper pgvector types
- [ ] Cosine similarity calculations implemented correctly
- [ ] Batch processing for embedding generation

#### Search Quality
- [ ] Semantic search returns relevant results
- [ ] Initiative filtering works correctly
- [ ] Search performance meets requirements (<500ms)
- [ ] Error handling for AI API failures

### 6. Styling & Design System

#### S&P Capital IQ Branding
- [ ] Brand colors used consistently (primary-dark, accent-cyan)
- [ ] Design system patterns followed
- [ ] Responsive design implemented (mobile-first)
- [ ] Glassmorphism effects applied correctly

#### Accessibility
- [ ] Proper ARIA labels and semantic HTML
- [ ] Keyboard navigation works correctly
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader compatibility verified

### 7. Testing Coverage

#### Test Quality
- [ ] Critical path functionality tested
- [ ] Vector search accuracy validated
- [ ] Error handling scenarios covered
- [ ] Performance thresholds verified

#### Test Structure
- [ ] Tests follow established patterns
- [ ] Mock data represents realistic scenarios
- [ ] Strategic initiative testing included
- [ ] Accessibility testing implemented

### 8. Demo Alignment

#### Strategic Focus
- [ ] Code supports the three strategic initiatives
- [ ] Features contribute to demo narrative
- [ ] "Copy to clipboard" functionality included where relevant
- [ ] Mock data represents realistic client scenarios

### 9. Documentation & Comments

#### Code Documentation
- [ ] Complex logic documented with clear comments
- [ ] API contracts clearly defined
- [ ] Component props documented
- [ ] Database schema changes documented

## Security Risk Assessment

Evaluate the code for these security concerns:

### High Risk Issues
- SQL injection vulnerabilities
- XSS attack vectors
- Authentication bypasses
- Data exposure in error messages

### Medium Risk Issues
- Missing input validation
- Insufficient rate limiting
- Weak error handling
- Missing CORS configuration

### Low Risk Issues
- Verbose logging in production
- Missing security headers
- Inadequate session management

## Performance Review

### Frontend Performance Issues
- Large bundle sizes
- Unnecessary re-renders
- Memory leaks
- Inefficient API calls

### Backend Performance Issues
- Slow database queries
- Missing indexes
- Inefficient vector searches
- Resource-intensive operations

## Code Quality Recommendations

### Immediate Fixes Required
List critical issues that must be addressed before merge:
- Security vulnerabilities
- Performance bottlenecks
- Breaking changes
- Test failures

### Suggested Improvements
List non-critical improvements for better code quality:
- Code organization enhancements
- Performance optimizations
- Documentation improvements
- Additional test coverage

### Future Considerations
List items for future iterations:
- Refactoring opportunities
- Architecture improvements
- Feature enhancements
- Technical debt reduction

## Review Output Format

Provide the code review in this structure:

```markdown
# Code Review - [Component/Feature Name]

## Overall Assessment
[High-level summary of code quality and readiness]

## Critical Issues (Must Fix)
1. **[Issue Type]**: [Description]
   - **Impact**: [Security/Performance/Functionality]
   - **Recommendation**: [Specific fix]
   - **Priority**: High

## Suggestions (Should Fix)
1. **[Issue Type]**: [Description]
   - **Impact**: [Code Quality/Maintainability]
   - **Recommendation**: [Specific improvement]
   - **Priority**: Medium

## Observations (Consider)
1. **[Area]**: [Observation]
   - **Recommendation**: [Future consideration]
   - **Priority**: Low

## Security Assessment
[Summary of security review findings]

## Performance Assessment
[Summary of performance review findings]

## Demo Readiness
[Assessment of how well the code supports demo objectives]

## Approval Status
- [ ] Approved - Ready to merge
- [ ] Approved with minor changes
- [ ] Requires changes before merge
- [ ] Major refactoring needed
```

Conduct a thorough review focusing on the areas most critical to the Capital IQ Strategic Intelligence Engine project success.
