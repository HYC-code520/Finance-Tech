# 🚀 Quick Start Guide - Capital IQ Finance-Tech

## For New Developers

### Step 1: Install Docker Desktop
- **Windows/Mac**: Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Linux**: Follow Docker installation guide for your distribution

### Step 2: Clone and Run
```bash
git clone <repository-url>
cd Finance-Tech
docker-compose up --build
```

### Step 3: Open Application
- **Frontend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

**That's it! 🎉** You now have:
- PostgreSQL database with sample data
- React frontend with Capital IQ branding
- Express backend with TypeScript
- 10 sample support tickets for testing

## Daily Development Commands

```bash
# Start everything
docker-compose up

# Start in background
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Reset database
docker-compose down --volumes && docker-compose up

# Development mode (code changes auto-reload)
docker-compose -f docker-compose.dev.yml up
```

## Common Scenarios

### First Time Setup
```bash
git clone <repo>
cd Finance-Tech
docker-compose up --build
# Wait for "serving on port 5000" message
# Open http://localhost:5000
```

### Daily Development
```bash
# Morning startup
docker-compose up -d

# Make code changes (auto-reloads in dev mode)
# git add, commit, push as normal

# End of day
docker-compose down
```

### Demo Preparation
```bash
# Ensure fresh state
docker-compose down --volumes
docker-compose up --build
# Open http://localhost:5000
# App ready with 10 sample tickets
```

### Database Access
```bash
# Connect to database directly
docker exec -it capital-iq-db psql -U postgres -d capital_iq_dev

# View all support tickets
SELECT ticket_id, ticket_subject FROM support_tickets;

# Exit database
\q
```

### Troubleshooting
```bash
# If build fails
docker-compose build --no-cache

# If containers won't start
docker-compose down
docker system prune -f
docker-compose up --build

# If port conflicts
docker-compose down
# Kill any local processes using port 5000
docker-compose up
```

## File Structure (Key Folders)
```
Finance-Tech/
├── client/src/          # React frontend code
├── server/              # Express backend code  
├── sql/                 # Database schema & sample data
├── docker-compose.yml   # Main Docker configuration
└── README.md           # Full documentation
```

## Quick Reference

| Task | Command |
|------|---------|
| **First setup** | `docker-compose up --build` |
| **Daily start** | `docker-compose up -d` |
| **View logs** | `docker-compose logs -f` |
| **Stop** | `docker-compose down` |
| **Reset DB** | `docker-compose down --volumes && docker-compose up` |
| **Dev mode** | `docker-compose -f docker-compose.dev.yml up` |

## Need Help?

1. **Check logs**: `docker-compose logs -f`
2. **Restart everything**: `docker-compose down && docker-compose up --build`
3. **Read full docs**: `README.md` or `DOCKER.md`
4. **Database issues**: `docker exec -it capital-iq-db psql -U postgres -d capital_iq_dev`

---

**Welcome to friction-free development! 🐳**
