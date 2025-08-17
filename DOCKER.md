# 🐳 Docker Setup for Capital IQ Strategic Intelligence Engine

This document provides comprehensive Docker setup instructions for the Capital IQ application, replacing the manual PostgreSQL setup with a fully containerized environment.

## 🎯 Quick Start (TL;DR)

```bash
# Clone and start everything with one command
git clone <your-repo>
cd Finance-Tech
docker-compose up --build
```

Open http://localhost:5000 - that's it! 🚀

## 📋 Prerequisites

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Docker Compose** (included with Docker Desktop)
- **Git**

> **No need for Node.js, PostgreSQL, or any other dependencies!**

## 🚀 Development Modes

### Production Mode (Recommended for Testing)
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

### Development Mode (Hot Reload)
```bash
# Start development environment with code mounting
docker-compose -f docker-compose.dev.yml up --build

# This mounts your local code for instant updates
# Frontend: http://localhost:5000
# Vite Dev Server: http://localhost:5173
```

## 🔧 Available Commands

### Basic Operations
```bash
# Start services
docker-compose up                    # Foreground
docker-compose up -d                 # Background
docker-compose up --build           # Rebuild images

# Stop services
docker-compose down                  # Stop containers
docker-compose down --volumes        # Stop and remove data

# View logs
docker-compose logs                  # All services
docker-compose logs app              # Just the app
docker-compose logs postgres         # Just database
docker-compose logs -f               # Follow logs
```

### Development Workflow
```bash
# Development with hot reload
npm run docker:dev                   # Start dev environment
npm run docker:dev:build            # Rebuild dev images
npm run docker:dev:down             # Stop dev environment

# Production testing
npm run docker:build                # Build production images
npm run docker:up                   # Start production environment
npm run docker:down                 # Stop production environment
npm run docker:logs                 # View logs
npm run docker:reset                # Reset database and restart
```

### Database Operations
```bash
# Connect to database directly
docker exec -it capital-iq-db psql -U postgres -d capital_iq_dev

# Run database commands
docker exec -it capital-iq-db psql -U postgres -d capital_iq_dev -c "SELECT COUNT(*) FROM support_tickets;"

# Backup database
docker exec capital-iq-db pg_dump -U postgres capital_iq_dev > backup.sql

# Restore database
docker exec -i capital-iq-db psql -U postgres -d capital_iq_dev < backup.sql
```

### Debugging
```bash
# Enter running container
docker exec -it capital-iq-app sh

# View container details
docker inspect capital-iq-app
docker inspect capital-iq-db

# Check container resource usage
docker stats

# View container processes
docker top capital-iq-app
```

## 📊 Service Architecture

### Services Overview
- **postgres**: PostgreSQL 17 database with automatic schema setup
- **app**: Node.js application (React frontend + Express backend)

### Network Configuration
- **Internal**: Services communicate via `capital-iq-network`
- **External**: Only port 5000 exposed for web access
- **Database**: PostgreSQL available on localhost:5432 for external tools

### Volume Management
- **postgres_data**: Persistent database storage
- **Code mounting** (dev mode): Live code updates

## 🔄 Database Initialization

The database is automatically initialized with:
1. **Schema** (`sql/01_schema.sql`): Tables, indexes, constraints
2. **Sample Data** (`sql/02_data.sql`): 10 sample support tickets

### Automatic Setup Features
- Database creation
- Schema migration
- Sample data loading
- Health checks
- Connection validation

## 🛠️ Configuration

### Environment Variables

The Docker setup uses these environment variables:

```env
# Database (automatically configured)
DB_HOST=postgres              # Container name
DB_PORT=5432
DB_NAME=capital_iq_dev
DB_USER=postgres
DB_PASSWORD=postgres

# Application
NODE_ENV=production           # or development
PORT=5000
VITE_DATABASE_TYPE=local
VITE_API_BASE_URL=http://localhost:5000/api
```

### Customization

To modify settings, edit `docker-compose.yml`:

```yaml
# Change database credentials
postgres:
  environment:
    POSTGRES_PASSWORD: your_password

# Change application port
app:
  ports:
    - "3000:5000"  # External:Internal
```

## 🔍 Health Monitoring

### Health Checks
Both services include health checks:

```bash
# Check service health
docker-compose ps

# Manual health check
curl http://localhost:5000/api/health
```

### Health Check Endpoints
- **Application**: `GET /api/health`
- **Database**: Internal PostgreSQL health check

### Expected Responses
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-08-17T10:30:00.000Z"
}
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: bind: address already in use
docker-compose down
# Kill local PostgreSQL if running
# Windows: Stop postgresql service
# Mac: brew services stop postgresql
# Linux: sudo systemctl stop postgresql
```

#### Database Connection Failed
```bash
# Check if database is ready
docker-compose logs postgres

# Wait for "database system is ready"
# Then restart app service
docker-compose restart app
```

#### Image Build Failed
```bash
# Clear Docker cache
docker system prune -a
docker-compose build --no-cache
```

#### Volume Permission Issues (Linux/Mac)
```bash
# Fix volume permissions
docker-compose down
docker volume rm finance-tech_postgres_data
docker-compose up --build
```

### Performance Issues

#### Slow Database Queries
```bash
# Check container resources
docker stats

# Add more memory to Docker Desktop:
# Settings → Resources → Memory → 4GB+
```

#### Slow Build Times
```bash
# Use build cache
docker-compose build

# Or rebuild specific service
docker-compose build app
```

### Development Issues

#### Code Changes Not Reflecting
```bash
# Ensure you're using dev mode
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build

# Check volume mounts
docker-compose -f docker-compose.dev.yml config
```

## 🆚 Docker vs Manual Setup

### Before Docker (Manual Setup)
```bash
# 😰 Complex setup process
1. Install PostgreSQL 17
2. Set up Windows environment variables
3. Create database manually
4. Run schema scripts
5. Install Node.js dependencies
6. Configure environment variables
7. Start development server
8. Hope everything works together

# 😵 Different on each developer's machine
# 🐛 "Works on my machine" problems
# ⏰ 30+ minutes setup time for new developers
```

### After Docker (One Command)
```bash
# 😎 Simple setup process
docker-compose up --build

# ✅ Identical on all machines
# 🚀 5 minutes setup time
# 🔄 Easy cleanup and reset
```

## 📈 Performance Comparison

### Resource Usage
- **Memory**: ~200MB (PostgreSQL) + ~100MB (Node.js)
- **Disk**: ~500MB (images) + ~50MB (data)
- **Startup**: ~15-30 seconds for full stack

### Development Benefits
- **Consistency**: Exact same environment for all developers
- **Isolation**: No conflicts with local PostgreSQL installations
- **Portability**: Works on Windows, Mac, Linux identically
- **Cleanup**: Complete removal with `docker-compose down --volumes`

## 🔒 Security Considerations

### Development Security
- Database only accessible within Docker network
- Default credentials for development only
- Environment variables properly scoped

### Production Recommendations
```yaml
# Use secrets for production
postgres:
  environment:
    POSTGRES_PASSWORD_FILE: /run/secrets/db_password
  secrets:
    - db_password

# Use specific image tags
postgres:
  image: postgres:17.1-alpine
```

## 🎯 Next Steps

1. **Try it out**: `docker-compose up --build`
2. **Development**: Use `docker-compose.dev.yml` for code changes
3. **Share with team**: Commit Docker files to version control
4. **Production**: Adapt for production deployment with proper secrets

## 💡 Pro Tips

### Speed Up Development
```bash
# Keep containers running between sessions
docker-compose up -d

# Only rebuild when dependencies change
docker-compose build app

# Use development mode for code changes
docker-compose -f docker-compose.dev.yml up
```

### Database Management
```bash
# Quick database reset
docker-compose down --volumes && docker-compose up -d

# Database backup before major changes
docker exec capital-iq-db pg_dump -U postgres capital_iq_dev > backup.sql
```

### Team Workflow
```bash
# After pulling new code
docker-compose down
docker-compose up --build

# Share database state
docker exec capital-iq-db pg_dump -U postgres capital_iq_dev > team_data.sql
# Other team members: docker exec -i capital-iq-db psql -U postgres -d capital_iq_dev < team_data.sql
```

---

**🎉 Congratulations!** You now have a fully containerized Capital IQ development environment that works consistently across all platforms!
