# Legacy Manual Setup (Not Recommended)

> **⚠️ Important:** This setup method is deprecated. Use Docker for all development: `docker-compose up --build`

This document contains the original manual setup instructions for historical reference and edge cases where Docker cannot be used.

## Prerequisites

- **Node.js** 18+
- **PostgreSQL** 17
- **Git**

## Manual Installation Steps

### 1. Clone Repository
```bash
git clone <repository-url>
cd Finance-Tech
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. PostgreSQL Database Setup

#### Windows Setup
```powershell
# Install PostgreSQL 17 if not already installed
# Set password to 'postgres' for both user and PGPASSWORD

# Run the automated database setup
.\setup-database-working.bat

# Or manually:
psql -U postgres -c "CREATE DATABASE capital_iq_dev;"
psql -U postgres -d capital_iq_dev -f sql/01_schema.sql
psql -U postgres -d capital_iq_dev -f sql/02_data.sql
```

#### macOS Setup
```bash
# Install PostgreSQL via Homebrew
brew install postgresql@17
brew services start postgresql@17

# Create database and load schema
createdb capital_iq_dev
psql -d capital_iq_dev -f sql/01_schema.sql
psql -d capital_iq_dev -f sql/02_data.sql
```

#### Linux Setup
```bash
# Install PostgreSQL 17
sudo apt update
sudo apt install postgresql-17 postgresql-client-17

# Create database
sudo -u postgres createdb capital_iq_dev
sudo -u postgres psql -d capital_iq_dev -f sql/01_schema.sql
sudo -u postgres psql -d capital_iq_dev -f sql/02_data.sql
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
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

### 5. Start Development Server

#### Windows
```powershell
$env:PGPASSWORD="postgres"
npm run dev
```

#### macOS/Linux
```bash
PGPASSWORD=postgres npm run dev
```

### 6. Access Application

- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api
- **Database**: localhost:5432

## Common Issues & Troubleshooting

### PostgreSQL Connection Issues
```bash
# Test database connection
psql -h localhost -U postgres -d capital_iq_dev -c "SELECT COUNT(*) FROM support_tickets;"

# If connection fails:
# 1. Ensure PostgreSQL service is running
# 2. Check password is set correctly
# 3. Verify database exists
```

### Node.js Version Issues
```bash
# Check Node.js version
node --version  # Should be 18+

# If wrong version, use nvm:
nvm install 18
nvm use 18
```

### Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts
```bash
# Check what's using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill process using port
taskkill /PID <PID> /F       # Windows  
kill -9 <PID>                # macOS/Linux
```

## Why We Recommend Docker Instead

### Manual Setup Problems:
❌ Platform-specific installation steps  
❌ Version compatibility issues  
❌ Complex PostgreSQL configuration  
❌ Environment variable management  
❌ 2+ hours setup time for new developers  
❌ "Works on my machine" debugging  

### Docker Benefits:
✅ One command setup: `docker-compose up --build`  
✅ Identical environments for all developers  
✅ No PostgreSQL installation required  
✅ Automatic database setup with sample data  
✅ 5-minute setup time  
✅ Easy cleanup and reset  

## Migration to Docker

If you're currently using manual setup, migrate to Docker:

```bash
# Stop any running local services
# Kill Node.js and PostgreSQL processes

# Use Docker instead
docker-compose up --build

# Your app will be available at the same URL: http://localhost:5000
```

---

**For any new development, use Docker: `docker-compose up --build`**
