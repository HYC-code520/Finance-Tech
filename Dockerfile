# Multi-stage Dockerfile for Capital IQ Strategic Intelligence Engine

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy client source and build
COPY client/ ./client/
COPY tsconfig.json vite.config.ts tailwind.config.ts postcss.config.js components.json ./
RUN npm run build:client

# Stage 2: Build backend
FROM node:18-alpine AS backend-builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy server source
COPY server/ ./server/
COPY tsconfig.json ./
RUN npm run build:server

# Stage 3: Production runtime
FROM node:18-alpine AS production
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built assets from previous stages
COPY --from=frontend-builder /app/dist ./dist
COPY --from=backend-builder /app/dist-server ./dist-server

# Copy necessary files
COPY sql/ ./sql/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

# Start the application
CMD ["node", "dist-server/index.js"]

