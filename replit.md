# Overview

This is a full-stack web application for S&P Capital IQ, designed to transform scattered client feedback into strategic, data-driven decisions. The application features a modern tech-styled landing page with a gradient background and interactive elements. It's built as a monorepo with a React frontend and Express backend, using a shared schema architecture for type safety across the stack.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive component library based on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming and a tech/gradient aesthetic
- **State Management**: TanStack Query for server state management with custom query client configuration
- **Forms**: React Hook Form with Zod validation integration
- **Build Tool**: Vite with custom configuration for development and production builds

## Backend Architecture
- **Express.js**: RESTful API server with TypeScript
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage class)
- **Request Logging**: Custom middleware for API request/response logging
- **Development Integration**: Vite middleware integration for seamless development experience
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Data Storage Solutions
- **Database**: PostgreSQL configured with Drizzle ORM
- **Schema Management**: Shared TypeScript schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless PostgreSQL integration
- **Validation**: Zod schemas for runtime type validation and form validation

## Authentication and Authorization
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **User Schema**: Basic user model with username/password authentication structure
- **Type Safety**: Shared user types between frontend and backend using Drizzle schema inference

## External Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Library**: Radix UI components for accessible, unstyled primitives
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Development**: Replit-specific tooling for cloud development environment
- **Fonts**: Google Fonts integration for typography (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Build Tools**: ESBuild for server-side bundling, PostCSS for CSS processing