# Capital IQ Strategic Intelligence Engine

<div align="center">

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](http://localhost:8080)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Vector--Enabled-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

*Transforming fragmented S&P Global customer feedback into strategic, data-driven product decisions*

</div>

## 🎯 Project Overview

The Capital IQ Strategic Intelligence Engine is an AI-powered dashboard designed to systematically capitalize on S&P Global's most valuable non-monetary asset—customer feedback for Capital IQ. This MVP transforms fragmented feedback data into actionable insights, enabling product managers to make data-driven decisions aligned with business objectives.

### Core Problem Statement
S&P Global is failing to systematically capitalize on customer feedback for Capital IQ. Feedback is fragmented across disconnected channels, creating data silos that lead to:
- **Reactive product strategy** instead of proactive planning
- **Resource misallocation** on low-impact features  
- **Competitive vulnerability** as high-value client needs are missed

> **Core Premise**: Feedback is only useful if you can align it with a business objective.

## 🎭 Target Personas

### Primary User: "Alejandra" - The Product Manager
- **Role**: Mid-level Product Manager for core Capital IQ platform components
- **Responsibilities**: Roadmap development, feature specifications, business value prioritization
- **Current Pain Points**: 
  - Manually reviews weekly support ticket summaries (10+ hours)
  - Relies on anecdotal feedback from sales teams
  - Lacks a single source of truth for customer feedback

### Data Source: "Santiago" - The Strategic Client  
- **Profile**: Senior leader at client firm providing high-value strategic feedback
- **Value**: Represents the "golden signal" on GenAI, API needs, and Private Market data

## 🚀 Key Features

### Strategic Initiative Tracker
Monitor how well Capital IQ's strategic goals are being received:
- **GenAI Integration**: Customer sentiment on AI features like 'Chart Explainer'
- **Private Markets Expansion**: Pain points in new private market offerings  
- **ESG Data**: User experience with ESG data workflows

### Emerging Use-Case Detector
Scan feedback for signals of intent including:
- API integration requests
- Python/automation mentions
- Advanced workflow needs

### Copy-to-Clipboard Intelligence
Export pre-formatted, actionable summaries for:
- Jira tickets
- Executive reports
- Product roadmap presentations

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18.3.1** with TypeScript for type-safe development
- **Wouter** for lightweight client-side routing
- **TanStack Query** for robust server state management
- **Tailwind CSS** with glassmorphism effects and S&P branding
- **Radix UI + shadcn/ui** for accessible, customizable components

### Backend Infrastructure  
- **Express.js** server with TypeScript
- **Supabase** with pgvector extension for vector search
- **PostgreSQL** with semantic embeddings storage
- **OpenAI Embeddings** (text-embedding-ada-002) for AI-powered search

### Development Tools
- **Vite** for fast development and optimized builds
- **ESBuild** for production server bundling
- **React Hook Form + Zod** for type-safe form validation

## 📁 Project Structure

```
Capital-IQ-Strategic-Intelligence-Engine/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Shared components
│   │   │   ├── feedback/           # Feedback analysis components  
│   │   │   ├── initiatives/        # Strategic initiative trackers
│   │   │   └── ui/                 # Design system components
│   │   ├── pages/                  # Route-based page components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── api/                    # API client functions
│   │   ├── types/                  # TypeScript definitions
│   │   └── utils/                  # Utility functions
├── server/                         # Express backend
│   ├── index.ts                    # Main server entry point
│   ├── routes.ts                   # API route definitions
│   └── vite.ts                     # Development integration
├── .github/                        # Development workflows & guidelines
│   ├── instructions/               # Language-specific coding standards
│   ├── chatmodes/                  # AI development mode configurations
│   └── prompts/                    # Code generation templates
└── .clinerules/                    # Project standards & planning docs
```

## 🛠️ Development Setup

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Finance-Tech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   
   **On Windows:**
   ```powershell
   .\start-dev.bat
   ```
   
   **On macOS/Linux:**
   ```bash
   npm run dev
   ```

4. **Access the application**
   ```
   🌐 Frontend: http://localhost:8080
   🔧 API: http://localhost:8080/api
   ```

### Environment Configuration

The application automatically configures for your platform:
- **Windows**: Uses `localhost` binding for compatibility
- **Unix/Linux**: Uses `0.0.0.0` for broader network access
- **Development**: Includes hot reloading and error overlays
- **Production**: Optimized builds with static serving

### Common Issues & Solutions

#### Windows Setup Issues
If you encounter `ENOTSUP` errors on Windows, the application automatically handles platform-specific networking configurations. The server code detects Windows and uses `localhost` instead of `0.0.0.0` for better compatibility.

#### Port Conflicts
If port 8080 is in use, you can specify a different port:
```powershell
# Windows
set PORT=3000 && .\start-dev.bat

# macOS/Linux
PORT=3000 npm run dev
```

## 🎨 Design System

### Branding
- **Primary Colors**: S&P Capital IQ blue (#1E40AF) with gradient accents
- **Typography**: DM Sans for UI, Fira Code for code, Geist Mono for data
- **Visual Style**: Modern glassmorphism with tech-inspired gradients
- **Accessibility**: WCAG 2.1 AA compliant color contrast

### Component Library
Built on Radix UI primitives with custom S&P styling:
- Consistent spacing and typography scales
- Responsive design patterns
- Dark/light theme support
- Accessible keyboard navigation

## 📊 Success Metrics

### Primary KPI
**Actionability of Insights**: Number of AI-surfaced insights copied from dashboard for use in Jira tickets, emails, or reports

### Secondary Metrics
- **Time-to-Insight Reduction**: From 10+ hours to under 1 hour
- **Opportunity Generation**: New qualified product/API opportunities  
- **Weekly Active Users (WAU)**: Foundation adoption metric

## 🎯 MVP Scope & Constraints

### ✅ In Scope
- **Single Data Source**: Support tickets only
- **Platform Focus**: Capital IQ web platform & Excel plugin
- **Core Modules**: Strategic Initiative Tracker + Emerging Use-Case Detector
- **Primary Action**: Copy-to-clipboard functionality

### ❌ Explicitly Out of Scope  
- Multiple data source integration (CRM, research reports)
- Direct Jira integration
- Competitive analysis modules
- Closed-loop customer notification

### 🚧 Technical Constraints
- **Timeline**: 1-week rapid prototype sprint
- **Budget**: $0 (free tier tools only)
- **Data**: Mock, anonymized data exclusively

## 🧪 Testing Strategy

### Frontend Testing
- **Unit Tests**: Component behavior and utility functions
- **Integration Tests**: API communication and state management
- **E2E Tests**: Critical user workflows and demo scenarios

### Backend Testing
- **API Tests**: Endpoint functionality and error handling
- **Database Tests**: Query performance and data integrity
- **Vector Search Tests**: Embedding accuracy and similarity ranking

### Performance Benchmarks
- **API Response Time**: <500ms for search queries
- **UI Interactions**: <100ms response times
- **Bundle Size**: Optimized for fast initial load

## 🚀 Deployment & Demo

### Demo Narrative (5-minute presentation)
1. **Before State** (30s): Alejandra's manual process frustrations
2. **Transition** (1m): Strategic Intelligence Engine introduction  
3. **Core Demo** (3m): Live workflow demonstration
   - Search feedback across strategic initiatives
   - Filter and analyze insights
   - Copy actionable summary to clipboard
4. **After State** (30s): Transformation impact summary

### Production Deployment
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`  
- **Environment**: Configurable via environment variables
- **Scaling**: Stateless design ready for horizontal scaling

## 🔄 Development Workflow

### Branching Strategy
- **main**: Production-ready code
- **builder**: Active development branch
- **feature/***: Individual feature development

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Enforced coding standards
- **Prettier**: Automated code formatting
- **Conventional Commits**: Structured commit messages

### AI-Assisted Development
- **GitHub Copilot**: Integrated for code generation
- **Chat Modes**: Specialized AI assistants for different development phases
- **Code Review**: AI-powered pattern validation

## 📚 Documentation

### Available Resources
- **[Project Context](.clinerules/01-project-context.md)**: Comprehensive project overview
- **[Planning Standards](.clinerules/02-planning-standards.md)**: Task breakdown methodology  
- **[Coding Standards](.clinerules/03-coding-standards.md)**: Technical implementation guidelines
- **[React/TypeScript Guidelines](.github/instructions/react-typescript.instructions.md)**: Frontend standards
- **[Supabase Guidelines](.github/instructions/supabase-database.instructions.md)**: Backend & database patterns

## 🤝 Contributing

### Getting Started
1. Review the project context and coding standards
2. Check out the `builder` branch for active development
3. Follow the established component and testing patterns
4. Submit pull requests with clear descriptions

### Development Principles
1. **Risk Mitigation First**: Address technical risks early
2. **Thin Vertical Slices**: Complete functionality across all layers
3. **Story-Driven Development**: Ensure features support demo narrative
4. **No Demo Day Features**: Focus on polish and rehearsal

## 🔧 Scripts Reference

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking

# Database (when implemented)
npm run db:push      # Push database schema changes

# Platform-specific (Windows)
.\start-dev.bat      # Windows development start script
```

## 📞 Support & Contact

For questions about the Capital IQ Strategic Intelligence Engine:
- **Technical Issues**: Check the development documentation in `.clinerules/` and `.github/instructions/`
- **Feature Requests**: Review MVP scope constraints in project context
- **Deployment Help**: Follow the setup instructions above

### Known Compatibility Notes
- **Originally Built For**: Replit cloud environment
- **Windows Compatibility**: Automatically handled with platform detection
- **Port Configuration**: Flexible port assignment with fallback defaults
- **Network Binding**: Platform-specific host configuration for optimal compatibility

---

<div align="center">
<strong>Built with ❤️ for S&P Global Capital IQ</strong><br>
<em>Transforming customer feedback into strategic advantage</em>
</div>
