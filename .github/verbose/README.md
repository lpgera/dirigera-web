# React TypeScript Project

## Overview

This is a React application built with TypeScript, focusing on maintainable, scalable architecture with clear separation of concerns.

**Tech Stack:**

- React 18+ with TypeScript
- Zustand for global client state management
- React Query (TanStack Query) for server state management
- Pure CSS with layered design token system (3-layer architecture)
- Storybook for UI component development and documentation
- Component architecture: UI components (presentational) + Container components (data logic)

**Purpose:** [Describe your app's main purpose here]

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open Storybook
npm run storybook

# Run tests
npm test

# Lint code
npm run lint
```

## Documentation Structure

This project documentation is organized into focused guides:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Application architecture, import boundaries, and structural patterns
- **[COMPONENTS.md](./COMPONENTS.md)** - Component patterns, UI/Container split, and organization
- **[STYLING.md](./STYLING.md)** - Design token system, CSS conventions, and theming
- **[STATE-MANAGEMENT.md](./STATE-MANAGEMENT.md)** - React Query, Zustand, and state management patterns
- **[API-LAYER.md](./API-LAYER.md)** - API services, error handling, and type safety
- **[TESTING.md](./TESTING.md)** - Testing philosophy, patterns, and utilities
- **[DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md)** - File structure, naming conventions, and development workflows

## Key Concepts

- 📁 **Feature-based structure** - Code organized by business domain in `src/features/`
- 🔒 **Unidirectional imports** - App → Features → Shared (enforced by ESLint)
- 🎨 **UI/Container split** - Presentational vs logic components (only when reused)
- 📦 **Public APIs** - Each feature exports via `index.ts`
- 🎭 **Storybook for reusable components** - Shared UI and feature UI used 3+ times
- ⚛️ **State management trinity** - React Query (server) + Zustand (client) + Context (DI)
- 🎨 **Layered design tokens** - 3 layers: Primitives → Semantic → Component
- 📏 **TypeScript strict** - No `any`, explicit types everywhere

## Environment Variables

Create `.env.local` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=MyApp
```

Import in your config:

```ts
// src/config/env.ts
export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
}
```

## Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run storybook        # Open Storybook

# Testing
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode

# Building
npm run build            # Build for production
npm run build-storybook  # Build Storybook

# Code Quality
npm run lint             # Check for errors (includes import boundaries)
npm run lint:fix         # Lint and fix
npm run format           # Format code
```

## Project Philosophy

**When in doubt, prioritize:**

1. **Feature colocation** - Keep feature code together
2. **Design token discipline** - Use component tokens (Layer 3), never hardcoded values
3. **Right tool for the job** - React Query for server, Zustand for client, Context for DI
4. **Type safety** - Explicit types everywhere, no `any`
5. **Import boundaries** - Respect the unidirectional import rules
6. **Component separation** - Split UI/Container only when component is reused
7. **Readability over cleverness** - Code is read more than written

## Getting Help

- Check the specific documentation guides for detailed information
- Review example code in the documentation
- Run ESLint to catch architectural violations
- Use TypeScript compiler to catch type errors early

---

**Known Technical Debt:** [List any known issues or planned refactoring]

**Future Plans:** [List any planned architectural changes]
