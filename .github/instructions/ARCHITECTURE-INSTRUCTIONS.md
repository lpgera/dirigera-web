# Architecture - Agent Guide

## Import Flow (Unidirectional)

```
App Layer (routes, pages)
    ↓ ✅ CAN IMPORT
Features Layer (business logic)
    ↓ ✅ CAN IMPORT
Shared Layer (reusable utils, UI)
    ❌ CANNOT IMPORT UPWARD
```

## Layer Rules

### App Layer (`app/`)

- Routes and page components
- Composes features
- ✅ Can import: Features, Shared
- ❌ Cannot import: Nothing (top layer)

### Features Layer (`features/`)

- Business domain logic
- Self-contained modules
- ✅ Can import: Other features (minimally), Shared
- ❌ Cannot import: App

### Shared Layer (`components/`, `hooks/`, `utils/`)

- Domain-agnostic code
- Reusable across features
- ✅ Can import: Other shared
- ❌ Cannot import: Features, App

## Feature Structure

```
features/user/
├── index.ts              # Public API exports only
├── components/
│   ├── UserProfile.tsx   # Container (data + logic)
│   └── ui/
│       └── UserCard.tsx  # UI (presentation)
├── hooks/
│   └── useUser.ts
├── stores/
│   └── userStore.ts
├── api/
│   └── userService.ts
└── types/
    └── user.types.ts
```

## Public API via index.ts

```tsx
// features/user/index.ts
export { UserProfile } from "./components/UserProfile";
export { useUser } from "./hooks/useUser";
export type { User } from "./types/user.types";

// Don't export internal components like UserCard
```

## Decision Tree: Where Does Code Go?

```
Is it a route/page?
├─ YES → app/routes/
└─ NO ↓

Is it specific to a business domain (auth, user, products)?
├─ YES → features/{domain}/
└─ NO ↓

Is it reusable and used 3+ times across features?
├─ YES → components/ui/ or hooks/ or utils/
└─ NO → Keep in feature for now
```

## ESLint Enforcement

```js
// .eslintrc.js
rules: {
  'import/no-restricted-paths': [
    'error',
    {
      zones: [
        { target: './src/components', from: './src/features' },
        { target: './src/components', from: './src/app' },
        { target: './src/features', from: './src/app' },
      ],
    },
  ],
}
```

## Rules

- ✅ Feature code stays together
- ✅ Export via index.ts (public API)
- ✅ Import from feature root: `@/features/user` not `@/features/user/components/UserCard`
- ✅ Extract to shared when used 3+ times
- ❌ No upward imports (Shared → Features, Features → App)
- ❌ No bypassing public API
- ❌ Minimize feature-to-feature imports
