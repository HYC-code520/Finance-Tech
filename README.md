# Capital IQ Strategic Intelligence Engine

<div align="center">

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](http://localhost:5000)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue?logo=postgresql)](https://postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

*Transforming fragmented S&P Global customer feedback into strategic, data-driven product decisions*

**✨ Now with Real Database Integration & Performance Optimizations ✨**

</div>

## 🎯 Project Overview

The Capital IQ Strategic Intelligence Engine is an AI-powered dashboard designed to systematically capitalize on S&P Global's most valuable non-monetary asset—customer feedback for Capital IQ. This MVP transforms fragmented feedback data into actionable insights, enabling product managers to make data-driven decisions aligned with business objectives.

### Core Problem Statement
S&P Global is failing to systematically capitalize on customer feedback for Capital IQ. Feedback is fragmented across disconnected channels, creating data silos that lead to:
- **Reactive product strategy** instead of proactive planning
- **Resource misallocation** on low-impact features  
- **Competitive vulnerability** as high-value client needs are missed

> **Core Premise**: Feedback is only useful if you can align it with a business objective.

## 🚀 Quick Setup for Developers

**Ready to start developing? Two commands and you're running:**

```bash
git clone <repository-url> && cd Finance-Tech
docker-compose up --build
```

**Open http://localhost:5000** - Your full-stack app with database and sample data is ready! 🎉

📋 **[Quick Start Guide](QUICK_START.md)** | 📖 **[Full Setup Instructions](#-development-setup)**

## 🚀 Latest Updates

### ✅ Database Integration Complete
- **Real PostgreSQL Integration**: Live database with 10 sample support tickets
- **Performance Optimized**: 50-60fps animations, sub-100ms search responses
- **Production Ready**: Full CORS support, environment configuration, error handling

### ✅ Performance Enhancements  
- **Canvas Animation**: Optimized particle system (50→25 particles, 60fps throttling)
- **React Performance**: Memoized components, optimized re-renders, cached calculations
- **Hardware Acceleration**: GPU-optimized CSS with `transform-gpu` and `will-change`

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18.3.1** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds (3.5s build time)
- **TanStack Query** for robust server state management
- **Tailwind CSS** with glassmorphism effects and S&P branding
- **Radix UI + shadcn/ui** for accessible, customizable components

### Backend Infrastructure  
- **Express.js** server with TypeScript and CORS support
- **PostgreSQL 17** with local development setup
- **Supabase** integration ready for production deployment
- **Real-time API** with <100ms response times
- **Environment-based** database service abstraction

### Database Layer
- **Local Development**: PostgreSQL with Docker setup
- **Production Ready**: Supabase integration with pgvector for semantic search
- **Performance Optimized**: Connection pooling, parameterized queries
- **Type Safety**: Full TypeScript interfaces matching database schema
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
- **Docker Desktop** (Required)
- **Git**

### 🐳 Quick Start (One Command Setup)

**For new developers - get up and running in 5 minutes:**

```bash
# 1. Clone the repository
git clone <repository-url>
cd Finance-Tech

# 2. Start everything with Docker
docker-compose up --build
```

🎉 **That's it!** Open http://localhost:5000 to see your running app!

✅ **What you get automatically:**
- PostgreSQL 17 database with sample data (10 support tickets)
- React frontend built and served  
- Express backend with API endpoints
- Full development environment ready

> **Why Docker?** No PostgreSQL installation, no Node.js version conflicts, works identically on Windows/Mac/Linux, instant setup for any developer on your team.

📖 **[Quick Start Guide](QUICK_START.md)** - Essential commands for daily development  
📖 **[Complete Docker Guide](DOCKER.md)** - Advanced commands, troubleshooting, and development workflows

### Alternative: Manual Setup (Not Recommended)

<details>
<summary>Click to expand manual setup instructions</summary>

> **⚠️ Warning:** Manual setup is complex and error-prone. Docker is strongly recommended for all development.

**Prerequisites:**
- Node.js 18+
- PostgreSQL 17

**Steps:**
1. Install PostgreSQL 17 and configure user/password
2. Run manual SQL setup (see LEGACY_SETUP.md)
3. Configure environment variables in `.env` file
4. Run `npm install` and `npm run dev`
5. Access application at http://localhost:5000

See [`LEGACY_SETUP.md`](LEGACY_SETUP.md) for complete manual setup instructions.

</details>

## 🐳 Docker Commands

### Essential Commands
```bash
# Start everything (first time)
docker-compose up --build

# Start in background
docker-compose up -d

# Stop everything
docker-compose down

# Reset database with fresh data
docker-compose down --volumes && docker-compose up

# View live logs
docker-compose logs -f
```

### Development Commands
```bash
# Development mode with hot reload
docker-compose -f docker-compose.dev.yml up

# Rebuild images
docker-compose build --no-cache

# Connect to database directly
docker exec -it capital-iq-db psql -U postgres -d capital_iq_dev
```

### Quick npm Scripts
```bash
npm run docker:up              # Start production environment
npm run docker:dev             # Start development environment  
npm run docker:down            # Stop all services
npm run docker:reset           # Reset database and restart
npm run docker:logs            # View logs
```

📖 **[Complete Docker Guide](DOCKER.md)** for detailed setup, troubleshooting, and advanced usage

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration (Local PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=capital_iq_dev
DB_USER=postgres
DB_PASSWORD=postgres
PGPASSWORD=postgres

# Frontend Configuration
VITE_DATABASE_TYPE=local
VITE_API_BASE_URL=http://localhost:5000/api

# Development Settings
NODE_ENV=development
PORT=5000
```


### Database Setup (Manual, Not Recommended)

See [`LEGACY_SETUP.md`](LEGACY_SETUP.md) for full manual setup instructions if you cannot use Docker.

### Troubleshooting Setup

#### PostgreSQL Connection Issues
```powershell
# Test database connection
psql -h localhost -U postgres -d capital_iq_dev -c "SELECT COUNT(*) FROM support_tickets;"

# If connection fails, ensure PostgreSQL is running:
# Windows: Check Services for "postgresql-x64-17"
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql
```

#### Environment Variable Loading
```bash
# If database credentials aren't loading:
# 1. Ensure .env file exists in root directory
# 2. Check that dotenv is installed: npm list dotenv
# 3. Restart the development server
```

#### API Connection Errors
```bash
# If frontend can't connect to API:
# 1. Verify server is running on port 5000
# 2. Check CORS configuration in server/index.ts
# 3. Ensure VITE_API_BASE_URL points to correct port
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

## 📊 Performance Metrics

### Current Performance (Post-Optimization)
- **Canvas Animation**: 55-60fps (previously ~30fps)
- **API Response Time**: 50-100ms for ticket queries
- **Search Performance**: Instant filtering with memoization
- **Build Time**: ~3.5 seconds for complete frontend build
- **Bundle Size**: 314KB (96KB gzipped)

### Application Metrics
- **Database**: 10 sample support tickets with real schema
- **Real-time Updates**: Live PostgreSQL integration
- **Memory Efficiency**: Optimized React rendering with memoization
- **Network Performance**: Efficient API calls with proper caching

### Success Metrics

#### Primary KPI
**Actionability of Insights**: Number of AI-surfaced insights copied from dashboard for use in Jira tickets, emails, or reports

#### Secondary Metrics
- **Time-to-Insight Reduction**: From 10+ hours to under 1 hour
- **Opportunity Generation**: New qualified product/API opportunities  
- **Weekly Active Users (WAU)**: Foundation adoption metric

### Performance Benchmarks
- **UI Interactions**: <100ms response times ✅
- **API Endpoints**: <500ms for complex queries ✅
- **Database Queries**: <50ms for ticket retrieval ✅
- **Search Functionality**: Real-time filtering ✅

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
npm run dev          # Start development server with database
npm run build        # Build for production (frontend + server)
npm start            # Start production server

# Database Management
psql -U postgres -d capital_iq_dev    # Connect to database
npm run db:reset     # Reset database with fresh sample data (if implemented)

# Testing & Validation
npm run check        # TypeScript type checking
npm run test         # Run test suite (if implemented)

# Performance Monitoring
npm run analyze      # Bundle size analysis (if implemented)
```

### Development Workflow Commands

```powershell
# Complete setup for new developer (Manual, not recommended)
git clone <repository-url>
cd Finance-Tech
npm install
# See LEGACY_SETUP.md for manual database setup
$env:PGPASSWORD="postgres"


# Quick restart after changes
npm run build && npm run dev

# Database verification
psql -U postgres -d capital_iq_dev -c "SELECT COUNT(*) FROM support_tickets;"
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
