---
mode: 'ask'
model: 'GPT-4o'
tools: ['codebase']
description: 'Create detailed implementation plan following Capital IQ planning standards'
---

# Create Implementation Plan

Generate a detailed implementation plan for a new feature following the Capital IQ Strategic Intelligence Engine planning methodology.

Reference the planning guidelines and break down the feature using our layered approach and thin vertical slices strategy.

## Planning Methodology

Ask for the following information if not provided:
- **Feature name** and description
- **Business objective** and how it aligns with strategic initiatives
- **Target user workflow** and expected outcomes
- **Acceptance criteria** and success metrics
- **Timeline constraints** and priority level

## Implementation Approach

### 1. Layered Breakdown
Break down the feature into these layers:

#### Data Layer
- Database schema changes or new tables needed
- Vector embeddings and search requirements
- Mock data generation and population
- Performance considerations for queries

#### API Layer  
- Supabase Edge Functions required
- API contracts (input/output specifications)
- Authentication and authorization needs
- Error handling and validation requirements

#### UI Layer
- React components needed (new and modified)
- State management requirements
- User interaction flows
- Responsive design considerations

#### Integration Layer
- Component-to-API connections
- End-to-end user flow testing
- Performance optimization
- Error state handling

### 2. Thin Vertical Slices
Prioritize building complete, working slices before expanding:

1. **First Slice**: Minimal viable functionality across all layers
2. **Second Slice**: Enhanced functionality and edge cases
3. **Third Slice**: Polish, optimization, and additional features

### 3. Risk-First Prioritization
Classify tasks by technical risk:

**High Risk (Priority 1)**:
- Tasks that validate core technical approach
- Integration between vector search and UI
- New API patterns or database structures

**Medium Risk (Priority 2)**:
- Standard CRUD operations
- UI components following established patterns
- Performance optimizations

**Low Risk (Priority 3)**:
- Styling and visual polish
- Non-essential features
- Documentation updates

## Task Template Structure

For each task, provide:

```markdown
## [Task Name]

### Objective
[Clear statement of what this task accomplishes]

### Success Criteria
- [ ] Specific, measurable outcome 1
- [ ] Specific, measurable outcome 2
- [ ] Performance meets requirements (<500ms API, <100ms UI)
- [ ] Passes all tests and code review

### Implementation Steps
1. [Detailed step with specific deliverable]
2. [Detailed step with specific deliverable]
3. [Testing and validation steps]

### Dependencies
- [List of prerequisite tasks or external dependencies]
- [Required team members or resources]

### Estimated Effort
[Small (0.5-1 day) / Medium (1-2 days) / Large (2-3 days)]

### Strategic Initiative Alignment
[How this task supports GenAI, Private Markets, or ESG initiatives]

### Demo Impact
[How this task contributes to the final demo narrative]
```

## Demo-Driven Considerations

Ensure every task contributes to the 5-minute demo story:

1. **Before State**: Alejandra's manual feedback analysis process
2. **Transition**: Introduction of the Strategic Intelligence Engine  
3. **After State**: Rapid insight discovery and actionability

Ask: "How does this feature support our demo narrative?"

## Feature Categories

### Strategic Initiative Features
For features related to the three core initiatives:
- GenAI Integration (Chart Explainer, AI features)
- Private Markets Expansion (PE/debt analysis)
- ESG Data (sustainability workflows)

### Core Platform Features
For general platform capabilities:
- Search and filtering
- Data visualization
- Copy to clipboard functionality
- User interface improvements

### Technical Infrastructure
For backend and performance features:
- Vector search optimization
- API performance improvements
- Security enhancements
- Testing infrastructure

## Timeline Estimation

Break down the feature timeline:
- **Day 1**: Foundation and highest-risk components
- **Day 2**: Core functionality implementation
- **Day 3**: Integration and testing
- **Day 4**: Polish and optimization
- **Day 5**: Final testing and demo preparation

## Scope Management

### In-Scope Definition
Clearly define what IS included in this feature:
- Specific user workflows
- Technical components
- Performance requirements
- Testing coverage

### Out-of-Scope (V2 Parking Lot)
Document what is NOT included:
- Advanced features for future iterations
- Integration with external systems
- Non-essential UI enhancements

### Risk Mitigation
Identify potential risks and mitigation strategies:
- Technical risks (new technologies, complex integrations)
- Timeline risks (dependencies, complexity)
- Demo risks (critical path features)

## Output Format

Provide the implementation plan in this structure:

```markdown
# [Feature Name] - Implementation Plan

## Feature Overview
[Description, business objective, strategic alignment]

## Layer Breakdown

### Data Layer Tasks
[List of database, schema, and data-related tasks]

### API Layer Tasks  
[List of backend API and business logic tasks]

### UI Layer Tasks
[List of frontend component and interaction tasks]

### Integration Layer Tasks
[List of end-to-end integration tasks]

## Timeline & Milestones
[Day-by-day breakdown with key milestones]

## Risk Assessment
[High/medium/low risk tasks and mitigation strategies]

## Demo Integration
[How this feature enhances the final demo]

## Success Metrics
[Measurable outcomes and acceptance criteria]
```

Generate a comprehensive implementation plan that follows our established planning standards and supports the overall project goals.
