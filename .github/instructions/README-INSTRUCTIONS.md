# React TypeScript Project - Agent Overview

## Tech Stack

- React 18 + TypeScript
- Zustand (global client state)
- React Query (server state)
- Pure CSS with 3-layer design tokens
- Storybook (UI development)
- Vitest + React Testing Library

## Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
npm run storybook    # http://localhost:6006
npm test
```

## Architecture at a Glance

```
app/              # Routes, pages
features/         # Business logic (auth, user, etc)
components/       # Shared UI (Button, Input)
hooks/            # Shared hooks
utils/            # Shared utilities
stores/           # Global Zustand stores
lib/              # Third-party integrations
```

## Key Principles

1. **Feature-based structure** - Code by domain in `features/`
2. **Unidirectional imports** - App → Features → Shared
3. **UI/Container split** - Only when reused 3+ times
4. **Public APIs** - Export via `index.ts`
5. **State trinity** - React Query (server) + Zustand (client) + Context (DI)
6. **Design tokens** - 3 layers: Primitives → Semantic → Component
7. **Type safety** - No `any`, explicit everywhere

## Import Rules

```tsx
// ✅ ALLOWED
import { LoginForm } from "@/features/auth"; // App → Features
import { Button } from "@/components/ui/Button"; // Features → Shared
import { useUser } from "@/features/user"; // Features ↔ Features (minimal)

// ❌ FORBIDDEN
import { LoginForm } from "@/features/auth"; // Shared → Features
import { Dashboard } from "@/app/routes/Dashboard"; // Features → App
import { UserCard } from "@/features/user/components/ui/UserCard"; // Bypass public API
```

## Decision Trees

### Where Does Code Go?

```
Route/page? → app/routes/
Business domain specific? → features/{domain}/
Reusable 3+ times? → components/ui/ or hooks/ or utils/
Otherwise → Keep in feature
```

### State Management Tool?

```
Server/API data? → React Query
Global UI state? → Zustand
Service/config injection? → Context
Local component state? → useState
```

### Split Component?

```
Reused 3+ times? → Yes
Complex testing setup? → Yes
Used once + simple? → No
```

## File Structure Example

```
src/
├── app/
│   ├── routes/Dashboard.tsx
│   └── App.tsx
├── features/
│   └── user/
│       ├── index.ts              # Public API
│       ├── components/
│       │   ├── UserProfile.tsx   # Container
│       │   └── ui/UserCard.tsx   # UI
│       ├── hooks/useUser.ts
│       ├── stores/userStore.ts
│       ├── api/userService.ts
│       └── types/user.types.ts
├── components/ui/Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── styles/
│   ├── tokens/
│   │   ├── primitives.css        # Raw values
│   │   ├── semantic.css          # Themed values
│   │   └── components.css        # Component tokens
│   └── global.css
└── lib/api/client.ts
```

## Design Tokens (3 Layers)

```css
/* Layer 1: Primitives - never use directly */
--color-blue-500: #3b82f6;
--spacing-4: 1rem;

/* Layer 2: Semantic - theming layer */
--color-primary: var(--color-blue-500);

/* Layer 3: Component - use in components */
--button-primary-bg: var(--color-primary);

/* Usage */
.button {
  background: var(--button-primary-bg);
}
```

## Common Commands

```bash
# Development
npm run dev
npm run storybook

# Testing
npm test
npm run test:watch
npm run test:coverage

# Production
npm run build
npm run lint
npm run format
```

## Agent Guidelines

1. Always respect import boundaries
2. Use design tokens (Layer 3) in all CSS
3. Export features via index.ts
4. Split components only when reused 3+
5. Use React Query for server, Zustand for client
6. Write tests for behavior, not implementation
7. Follow file naming conventions
8. Type everything explicitly
