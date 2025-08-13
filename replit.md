# Overview

This is a frontend web application for S&P Capital IQ, designed to transform scattered client feedback into strategic, data-driven decisions. The application features a modern tech-styled landing page with glassmorphism effects and interactive elements. It's built as a monorepo with a React frontend and minimal Express backend for serving static files.

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
- **Express.js**: Minimal server for serving static files and development integration
- **Request Logging**: Custom middleware for API request/response logging
- **Development Integration**: Vite middleware integration for seamless development experience
- **Error Handling**: Basic error handling middleware

## External Dependencies
- **UI Library**: Radix UI components for accessible, unstyled primitives
- **Styling**: Tailwind CSS for utility-first styling with glassmorphism effects
- **Icons**: Lucide React for consistent iconography
- **Development**: Replit-specific tooling for cloud development environment
- **Fonts**: Google Fonts integration for typography (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Build Tools**: ESBuild for server-side bundling, PostCSS for CSS processing