# Development Guide - Agent Commands

## Quick Commands

```bash
npm run dev              # Start dev server
npm run storybook        # Open Storybook
npm test                 # Run tests
npm run lint             # Check errors
npm run build            # Production build
```

## File Naming

```
# Components - PascalCase
Button.tsx, UserProfile.tsx

# Hooks - camelCase with 'use'
useAuth.ts, useDebounce.ts

# Utilities - camelCase
formatters.ts, validators.ts

# Types - camelCase + .types suffix
user.types.ts, api.types.ts

# Stores - camelCase with 'use' + 'Store'
useUserStore.ts, useUIStore.ts

# Tests - same name + .test
Button.test.tsx, useAuth.test.ts

# Stories - same name + .stories
Button.stories.tsx
```

## Create New Feature Recipe

```bash
# 1. Create structure
mkdir -p src/features/my-feature/{api,components,hooks,stores,types}

# 2. Create types
# features/my-feature/types/my-feature.types.ts
export interface MyFeatureData {
  id: string
  name: string
}

# 3. Create API service
# features/my-feature/api/myFeatureService.ts
import { apiClient } from '@/lib/api/client'

export const getMyFeatureData = async (id: string): Promise<MyFeatureData> => {
  return apiClient.get(`/my-feature/${id}`)
}

# 4. Create React Query hook
# features/my-feature/hooks/useMyFeature.ts
import { useQuery } from '@tanstack/react-query'

export function useMyFeature(id: string) {
  return useQuery({
    queryKey: ['my-feature', id],
    queryFn: () => getMyFeatureData(id),
  })
}

# 5. Create component
# features/my-feature/components/MyFeatureView.tsx
export function MyFeatureView({ id }: { id: string }) {
  const { data, isLoading } = useMyFeature(id)
  if (isLoading) return <div>Loading...</div>
  return <div>{data?.name}</div>
}

# 6. Export public API
# features/my-feature/index.ts
export { MyFeatureView } from './components/MyFeatureView'
export { useMyFeature } from './hooks/useMyFeature'
export type { MyFeatureData } from './types/my-feature.types'
```

## Create Shared UI Component

```bash
# 1. Create directory
mkdir -p src/components/ui/MyComponent

# 2. Component
# components/ui/MyComponent/MyComponent.tsx
import styles from './MyComponent.module.css'

interface MyComponentProps {
  title: string
  children: React.ReactNode
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

# 3. Styles
# components/ui/MyComponent/MyComponent.module.css
.container {
  background: var(--card-bg);
  padding: var(--card-padding);
}

# 4. Tests
# components/ui/MyComponent/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'

describe('MyComponent', () => {
  it('renders title and children', () => {
    render(<MyComponent title="Test"><p>Content</p></MyComponent>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})

# 5. Storybook
# components/ui/MyComponent/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MyComponent> = {
  title: 'UI/MyComponent',
  component: MyComponent,
}
export default meta

export const Default: Story = {
  args: { title: 'Example', children: <p>Content</p> },
}

# 6. Barrel export
# components/ui/MyComponent/index.ts
export { MyComponent } from './MyComponent'
```

## Add Route

```tsx
// 1. Create route component
// app/routes/MyPage.tsx
import { MyFeatureView } from "@/features/my-feature";

export function MyPage() {
  return <MyFeatureView id="123" />;
}

// 2. Add to router
// app/router.tsx
import { MyPage } from "./routes/MyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "my-page", element: <MyPage /> }],
  },
]);
```

## Create Zustand Store

```tsx
// stores/useMyStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface MyState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useMyStore = create<MyState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      }),
      { name: "my-store" }
    ),
    { name: "MyStore" }
  )
);
```

## TypeScript Patterns

```tsx
// Component props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// Generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// API types - transform at boundary
interface UserDTO {
  full_name: string;
} // Backend
interface User {
  name: string;
} // Frontend

function transformUser(dto: UserDTO): User {
  return { name: dto.full_name };
}

// Utility types
type PartialUser = Partial<User>;
type CreateUserData = Omit<User, "id" | "createdAt">;
```

## Priority Rules

1. Feature colocation - keep related code together
2. Design tokens - use Layer 3 component tokens
3. Type safety - explicit types, no `any`
4. Import boundaries - respect unidirectional flow
5. Component separation - split only when reused
6. Public APIs - export via index.ts
7. Reusability - shared when used 3+ times
