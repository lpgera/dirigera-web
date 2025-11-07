# Architecture Guide

## Visual Architecture Overview

### Import Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        APP LAYER                            │
│  (Routes, Pages, Root Components)                           │
│                                                             │
│  app/routes/Dashboard.tsx                                   │
│  app/routes/UserProfile.tsx                                 │
│  app/App.tsx, app/router.tsx                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ ✅ CAN IMPORT FROM
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                     FEATURES LAYER                          │
│  (Business Domain Logic)                                    │
│                                                             │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│    │ Feature: Auth│  │Feature: User │  │Feature: Posts│     │
│    │              │  │              │  │              │     │
│    │ • Components │  │ • Components │  │ • Components │     │
│    │ • Stores     │  │ • Stores     │  │ • Stores     │     │
│    │ • API calls  │  │ • API calls  │  │ • API calls  │     │
│    │ • Hooks      │  │ • Hooks      │  │ • Hooks      │     │
│    │ • Types      │  │ • Types      │  │ • Types      │     │
│    └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  Features can import from each other via public APIs        │
│  (minimize this - prefer composition at App layer)          │
└──────────────────────┬──────────────────────────────────────┘
                       │ ✅ CAN IMPORT FROM
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                     SHARED LAYER                            │
│  (Reusable Code - No Business Logic)                        │
│                                                             │
│   components/ui/  •  hooks/  •  utils/  •  lib/             │
│   stores/  •  types/  •  config/  •  constants/             │
│                                                             │
│  ⛔ CANNOT import from Features or App layers               │
└─────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### App Layer
**Purpose:** Application composition and routing

**Contains:**
- Route definitions
- Page components
- Root-level providers
- Application initialization

**Can import from:** Features, Shared
**Cannot import from:** Nothing (top layer)

**Example:**
```tsx
// app/routes/Dashboard.tsx
import { UserProfile } from '@/features/user'
import { TaskList } from '@/features/tasks'

export function Dashboard() {
  return (
    <div>
      <UserProfile />
      <TaskList />
    </div>
  )
}
```

### Features Layer
**Purpose:** Business domain logic encapsulation

**Contains:**
- Feature-specific components
- State stores (Zustand)
- API calls and React Query hooks
- Custom hooks
- Feature types
- Feature tests

**Can import from:** Other features (minimally), Shared
**Cannot import from:** App

**Structure:**
```
src/features/user/
├── index.ts              # Public API
├── components/
│   ├── UserProfile.tsx   # Container
│   └── ui/
│       └── UserCard.tsx  # UI component
├── hooks/
│   └── useUser.ts
├── stores/
│   └── userStore.ts
├── api/
│   └── userService.ts
└── types/
    └── user.types.ts
```

**Example:**
```tsx
// features/user/components/UserProfile.tsx
import { useUserStore } from '../stores/userStore'
import { useUserQuery } from '../hooks/useUser'
import { UserCard } from './ui/UserCard'
import { Button } from '@/components/ui/Button' // From Shared

export function UserProfile() {
  const currentUser = useUserStore(s => s.currentUser)
  const { data } = useUserQuery(currentUser.id)
  
  return <UserCard user={data} />
}
```

### Shared Layer
**Purpose:** Reusable, domain-agnostic utilities

**Contains:**
- UI components (Button, Input, Card, etc.)
- Custom hooks (useDebounce, useLocalStorage)
- Utilities (formatters, validators)
- Types (common interfaces)
- Constants
- Configuration

**Can import from:** Other shared modules
**Cannot import from:** Features, App

**Rule:** If it's used 3+ times or is truly generic, it belongs here.

## Import Boundaries

### Enforced Rules

```tsx
// ✅ ALLOWED
// App importing Features
import { LoginForm } from '@/features/auth'

// Features importing Shared
import { Button } from '@/components/ui/Button'

// Features importing other Features (via public API)
import { useUser } from '@/features/user'

// Shared importing other Shared
import { formatDate } from '@/utils/date'

// ❌ FORBIDDEN
// Shared importing Features
import { LoginForm } from '@/features/auth' // ❌ Breaks architecture

// Features importing App
import { Dashboard } from '@/app/routes/Dashboard' // ❌ Circular dependency

// Bypassing public API
import { UserCard } from '@/features/user/components/ui/UserCard' // ❌ Use index.ts
```

### ESLint Configuration

Configure ESLint to enforce import boundaries:

```js
// .eslintrc.js
module.exports = {
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Shared cannot import from Features or App
          {
            target: './src/components',
            from: './src/features',
          },
          {
            target: './src/components',
            from: './src/app',
          },
          // Features cannot import from App
          {
            target: './src/features',
            from: './src/app',
          },
        ],
      },
    ],
  },
}
```

## Public APIs via index.ts

Each feature must export its public API through an `index.ts` file:

```tsx
// features/user/index.ts
export { UserProfile } from './components/UserProfile'
export { useUser } from './hooks/useUser'
export { useUserStore } from './stores/userStore'
export type { User, UserRole } from './types/user.types'

// Don't export internal implementation details
// UserCard stays internal to the feature
```

**Benefits:**
- Clear public interface
- Easy refactoring of internals
- Better encapsulation
- Prevents tight coupling

## Feature-Based Organization

### Why Feature-Based?

**Traditional (by type):**
```
src/
├── components/
│   ├── LoginForm.tsx
│   ├── UserProfile.tsx
│   └── TaskCard.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useUser.ts
└── stores/
    ├── authStore.ts
    └── userStore.ts
```
❌ Related code is scattered
❌ Hard to find all code for a feature
❌ Features become tangled

**Feature-based (by domain):**
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── stores/
│   └── user/
│       ├── components/
│       ├── hooks/
│       └── stores/
```
✅ Related code is together
✅ Clear feature boundaries
✅ Easy to add/remove features

### Screaming Architecture

Your folder structure should "scream" what the application does:

```
src/features/
├── authentication/    # I handle auth!
├── billing/          # I handle billing!
├── products/         # I handle products!
└── shopping-cart/    # I handle shopping!
```

Not:
```
src/
├── components/       # I have... components?
├── hooks/           # I have... hooks?
└── utils/           # I have... utils?
```

## When to Scale

### Current Architecture (Feature-Based Monolith)
**Best for:** Teams of 2-10 developers

### Next Level: Workspaces
**When:** 15+ developers, multiple teams
```
packages/
├── shared-ui/
├── feature-auth/
├── feature-billing/
└── app-web/
```

### Advanced: Micro-Frontends
**When:** Very large organizations (50+ developers)
**Warning:** High complexity, only if needed

## Architecture Benefits

1. **Scalability** - Add features without touching existing code
2. **Team Collaboration** - Multiple teams work independently
3. **Clear Boundaries** - Enforced by tooling
4. **Easy Onboarding** - Structure is self-documenting
5. **Maintainability** - Features are isolated
6. **Testability** - Features can be tested in isolation

## Common Pitfalls

### ❌ Feature Cross-Dependencies

```tsx
// features/tasks/components/TaskCard.tsx
import { UserAvatar } from '@/features/user/components/UserAvatar' // ❌
```

**Solution:** Compose at App level or extract to Shared:

```tsx
// app/routes/Dashboard.tsx
import { TaskCard } from '@/features/tasks'
import { UserAvatar } from '@/features/user'

<TaskCard renderAvatar={userId => <UserAvatar userId={userId} />} />
```

### ❌ God Features

Features that do too much become hard to maintain.

**Solution:** Split into smaller, focused features:
- `features/user` → `features/user-profile`, `features/user-settings`
- `features/admin` → `features/admin-users`, `features/admin-billing`

### ❌ Shared Bloat

Shared layer becoming a dumping ground for everything.

**Solution:** Only extract to Shared when:
- Used 3+ times across different features
- Truly domain-agnostic
- Stable and unlikely to change frequently

## Decision Tree: Where Does This Code Go?

```
Is it a route/page?
├─ YES → app/routes/
└─ NO ↓

Is it specific to a business domain?
├─ YES → features/{domain}/
└─ NO ↓

Is it reusable across features?
├─ YES → Is it used 3+ times?
│   ├─ YES → components/ui/ or hooks/ or utils/
│   └─ NO → Keep in feature for now
└─ NO → Keep in feature
```

## Related Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** - Component organization patterns
- **[STATE-MANAGEMENT.md](./STATE-MANAGEMENT.md)** - State management in features
- **[DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md)** - File naming and structure
