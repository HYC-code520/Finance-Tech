# Developer Onboarding Guide - Capital IQ Strategic Intelligence Engine

## 🚀 Quick Start for New Developers

### Prerequisites Checklist
- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **PostgreSQL 17** installed ([Download](https://www.postgresql.org/download/))
- [ ] **Git** installed and configured
- [ ] **VS Code** (recommended) with TypeScript extension

### 30-Second Setup (Windows)

```powershell
# 1. Clone and enter project
git clone <repository-url>
cd Finance-Tech

# 2. Install dependencies
npm install

# 3. Setup database (automated)
.\setup-database-working.bat

# 4. Start development server
$env:PGPASSWORD="postgres"; npm run dev

# 5. Open in browser
# http://localhost:5000/dashboard
```

### Verification Steps

After setup, verify everything works:

1. **Database Connection**: You should see `✅ Connected to PostgreSQL database` in terminal
2. **API Working**: Visit `http://localhost:5000/api/tickets` - should return JSON data
3. **Frontend Loading**: Visit `http://localhost:5000/dashboard` - should show 10 support tickets
4. **Search Functionality**: Try searching in the dashboard - should filter instantly

---

## 🏗️ Architecture Overview

### Project Structure
```
Finance-Tech/
├── client/src/                     # React TypeScript Frontend
│   ├── pages/dashboard.tsx         # Main dashboard (performance optimized)
│   ├── services/databaseService.ts # Database abstraction layer
│   ├── types/tickets.ts            # TypeScript interfaces
│   └── components/                 # Reusable UI components
├── server/                         # Express TypeScript Backend
│   ├── index.ts                    # Server entry point with CORS
│   └── routes.ts                   # API endpoints with PostgreSQL
├── sql/                           # Database schema and seed data
│   ├── 01_schema.sql              # Database tables
│   └── 02_data.sql                # 10 sample support tickets
└── setup-database-working.bat    # Automated Windows setup
```

### Data Flow
```
PostgreSQL Database → Express API → React Frontend
     ↓                    ↓              ↓
10 Support Tickets → REST Endpoints → Dashboard UI
```

---

## 🛠️ Development Environment

### Required Tools

#### 1. PostgreSQL Setup
```powershell
# After installing PostgreSQL 17:
# 1. Set postgres user password to 'postgres'
# 2. Ensure PostgreSQL service is running
# 3. Run our automated setup script
.\setup-database-working.bat
```

#### 2. Environment Configuration
The project uses these environment variables (auto-configured):
```env
# Database (Local Development)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=capital_iq_dev
DB_USER=postgres
DB_PASSWORD=postgres

# Server Configuration  
PORT=5000
NODE_ENV=development

# Frontend API URL
VITE_API_BASE_URL=http://localhost:5000/api
```

### VS Code Extensions (Recommended)
- **TypeScript and JavaScript Language Features** (built-in)
- **Tailwind CSS IntelliSense**
- **Thunder Client** (for API testing)
- **PostgreSQL** (for database management)

---

## 🎯 Key Features & Components

### 1. Dashboard Component (`client/src/pages/dashboard.tsx`)
- **Performance Optimized**: React.memo, useMemo, useCallback for 60fps animations
- **Real Database Integration**: Loads tickets from PostgreSQL via API
- **Search Functionality**: Instant filtering across ticket fields
- **Beautiful UI**: S&P Capital IQ branding with glassmorphism effects

### 2. Database Service (`client/src/services/databaseService.ts`)
- **Abstraction Layer**: Supports both local PostgreSQL and future Supabase
- **Type Safety**: Full TypeScript interfaces for all data structures
- **Error Handling**: Comprehensive error management and retry logic

### 3. API Backend (`server/routes.ts`)
- **PostgreSQL Integration**: Direct database queries with connection pooling
- **Performance**: <100ms response times with optimized queries
- **CORS Enabled**: Proper frontend-backend communication
- **Environment Aware**: Supports both development and production configurations

---

## 📚 Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled, full type coverage required
- **React**: Functional components with hooks, performance optimizations
- **Database**: Parameterized queries, proper error handling
- **Styling**: Tailwind CSS with S&P Capital IQ design system

### Performance Best Practices
- **Frontend**: Use React.memo for expensive components, useMemo for calculations
- **Backend**: Connection pooling, efficient SQL queries
- **Database**: Indexed columns for search performance
- **Animations**: 60fps target with requestAnimationFrame throttling

### Testing Approach
- **Manual Testing**: Verify database connection, API responses, UI functionality
- **Performance Testing**: Monitor API response times, frontend responsiveness
- **Cross-Platform**: Test on Windows (primary) and Unix systems

---

## 🔧 Common Development Tasks

### Adding New API Endpoints
1. Add route in `server/routes.ts`
2. Update TypeScript interfaces in `client/src/types/`
3. Add service method in `client/src/services/databaseService.ts`
4. Use in React components with proper error handling

### Database Schema Changes
1. Update `sql/01_schema.sql`
2. Update TypeScript interfaces in `client/src/types/tickets.ts`
3. Update API routes to handle new fields
4. Test with `.\setup-database-working.bat`

### Performance Optimization
1. Use React DevTools Profiler to identify slow components
2. Add React.memo for components that re-render unnecessarily
3. Use useMemo for expensive calculations
4. Monitor API response times in Network tab

---

## 🚨 Troubleshooting

### Database Connection Issues
```powershell
# Test database connection
psql -h localhost -U postgres -d capital_iq_dev

# If fails, check:
# 1. PostgreSQL service running
# 2. User 'postgres' has correct password
# 3. Database 'capital_iq_dev' exists

# Reset database if needed
.\setup-database-working.bat
```

### API Not Responding
```bash
# Check server logs for errors
# Ensure server running on port 5000
# Verify CORS configuration
# Test direct API call: http://localhost:5000/api/tickets
```

### Frontend Compilation Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run check
```

### Performance Issues
```javascript
// Check React DevTools Profiler
// Look for unnecessary re-renders
// Verify useMemo/useCallback dependencies
// Monitor canvas animation frame rate
```

---

## 🎯 Demo & Presentation

### Demo Flow (5 minutes)
1. **Problem State**: Show manual ticket analysis pain points
2. **Solution Demo**: 
   - Open dashboard → Show real database tickets
   - Search functionality → Filter by keywords  
   - Strategic initiative tabs → AI vs Raw tickets
   - Performance → Smooth animations, instant responses
3. **Results**: Copy insights to clipboard, show actionability

### Key Demo Points
- **Real Data**: 10 authentic support tickets from PostgreSQL
- **Performance**: 60fps animations, <100ms search responses  
- **Professional UI**: S&P Capital IQ branding and design
- **Functionality**: Working search, filtering, and data visualization

---

## 📈 Performance Metrics & Monitoring

### Current Benchmarks
- **Canvas Animation**: 55-60fps (optimized from ~30fps)
- **API Response**: 50-100ms for ticket queries
- **Search Performance**: Real-time filtering with memoization
- **Build Time**: ~3.5 seconds
- **Bundle Size**: 314KB (96KB gzipped)

### Monitoring Tools
- **Browser DevTools**: Performance tab for frontend optimization
- **React DevTools**: Component re-render analysis
- **Network Tab**: API response time monitoring
- **PostgreSQL Logs**: Query performance analysis

---

## 🚀 Deployment & Production

### Production Build
```bash
# Build optimized frontend and server
npm run build

# Start production server
npm start
```

### Environment Variables (Production)
```env
# Update for production deployment
VITE_DATABASE_TYPE=supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
NODE_ENV=production
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] API endpoints tested
- [ ] Frontend build optimized
- [ ] Performance benchmarks met
- [ ] Demo functionality verified

---

**Welcome to the team! 🎉 You're now ready to contribute to the Capital IQ Strategic Intelligence Engine.**

For questions or issues not covered here, check the main [README.md](../README.md) or review the project documentation in `.clinerules/` and `.github/instructions/`.
