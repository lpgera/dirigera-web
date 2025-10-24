# Repository Instructions

## Tech Stack

- **React 18+** with TypeScript (strict mode) - Suspense, useTransition, ErrorBoundary
- **Zustand 4+** with Immer middleware (client state)
- **React Query v5** (TanStack Query) - server state with optimistic updates
- **Context** (DI only, not for state)
- **Vitest + Testing Library** - modern testing with MSW v2
- **Storybook 8+** (CSF 3 format) - reusable components
- **Pure CSS** with 3-layer design tokens
- **UI/Container component split** (only when reused 3+ times)

## Architecture

### Layer Structure

```
App (routes, pages)
  ↓ can import
Features (business domains: auth, users, posts)
  ↓ can import
Shared (components/ui, hooks, utils, lib, stores, types)
```

**Rule:** Unidirectional imports only. Shared layer cannot import from Features/App.

### Component Pattern

- **Container**: Data fetching, state, business logic, event handlers
- **UI**: Pure presentation, props only, no store/API access
- **Split only when reused 3+ times**

### Design Tokens (3 Layers)

```
Primitives (--color-blue-500)
  → Semantic (--color-primary)
    → Component (--button-primary-bg)
```

Always use component tokens in CSS, never primitives or hardcoded values.

## Structure

```
src/
├── app/              # Routes, main App component
│   ├── routes/
│   ├── App.tsx
│   └── router.tsx
├── features/         # Business domains
│   └── auth/
│       ├── api/      # API calls
│       ├── components/
│       │   ├── ui/   # Presentational (props only)
│       │   └── containers/  # Data + logic
│       ├── hooks/
│       ├── stores/
│       ├── types/
│       └── index.ts  # Public API - only export here
├── components/       # Shared UI (Button, Card, Modal)
│   └── ui/
├── hooks/           # Shared hooks
├── stores/          # Shared Zustand stores
├── lib/             # Third-party wrappers
├── utils/           # Pure functions
├── types/           # Shared types
├── config/
├── constants/
└── styles/
    ├── tokens/
    │   ├── primitives.css
    │   ├── semantic.css
    │   └── components.css
    ├── themes/
    │   └── dark.css
    ├── reset.css
    └── global.css
```

## Key Rules

### State Management

```tsx
// ✅ Server state
const { data } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks })

// ✅ Client state
const count = useTaskStore((s) => s.tasks.length) // Precise selector

// ✅ Local UI state
const [isOpen, setIsOpen] = useState(false)

// ❌ Never use useState for server data
const [tasks, setTasks] = useState([]) // Wrong!
```

### Imports

```tsx
// ✅ Feature public API
import { LoginForm, useAuth } from '@/features/auth'

// ❌ Bypassing public API
import { LoginForm } from '@/features/auth/components/ui/LoginForm'

// ✅ Shared components
import { Button } from '@/components/ui/Button'
```

### Component Examples

**Container (data + logic):**

```tsx
// features/users/components/containers/UserDashboard.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useUserStore } from '@/features/users/stores/userStore'
import { fetchProfile, updateProfile } from '@/features/users/api'
import type { ProfileUpdateData } from '@/features/users/types'

import { UserCard } from '../ui/UserCard'

export function UserDashboard() {
  const user = useUserStore((s) => s.currentUser)
  const queryClient = useQueryClient()

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user,
  })

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const handleEdit = (data: ProfileUpdateData) => {
    mutation.mutate(data)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>No profile found</div>
  }

  return (
    <UserCard
      user={user}
      profile={profile}
      onEdit={handleEdit}
      isUpdating={mutation.isPending}
    />
  )
}
```

**UI (presentation only):**

```tsx
// features/users/components/ui/UserCard.tsx
import type { User, Profile, ProfileUpdateData } from '@/features/users/types'

interface UserCardProps {
  user: User | null
  profile: Profile
  onEdit: (data: ProfileUpdateData) => void
  isUpdating: boolean
}

export function UserCard({ user, profile, onEdit, isUpdating }: UserCardProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onEdit({
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
    })
  }

  return (
    <div className="user-card">
      <h2>{user?.name}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" defaultValue={profile.name} />
        <textarea name="bio" defaultValue={profile.bio} />
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
```

### Feature Structure

```tsx
// features/auth/index.ts - Public API
export { LoginForm } from './components/ui/LoginForm'
export { useAuth } from './hooks/useAuth'
export { authStore } from './stores/authStore'
export type { LoginCredentials } from './types'
```

### Zustand Store

**Basic Store:**

```tsx
// features/tasks/stores/taskStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { Task } from '../types'

interface TaskStore {
  tasks: Task[]
  addTask: (task: Task) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
}

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      immer((set) => ({
        tasks: [],

        addTask: (task) =>
          set((state) => {
            state.tasks.push(task) // Immer allows direct mutation
          }),

        removeTask: (id) =>
          set((state) => {
            const index = state.tasks.findIndex((t) => t.id === id)
            if (index !== -1) state.tasks.splice(index, 1)
          }),

        toggleTask: (id) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === id)
            if (task) task.completed = !task.completed
          }),

        updateTask: (id, updates) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === id)
            if (task) Object.assign(task, updates)
          }),
      })),
      {
        name: 'task-storage',
        partialize: (state) => ({ tasks: state.tasks }),
      }
    )
  )
)
```

**Computed Values (Selectors):**

```tsx
// features/tasks/stores/selectors.ts
import { useTaskStore } from './taskStore'

export const useCompletedTasks = () =>
  useTaskStore((state) => state.tasks.filter((t) => t.completed))

export const useActiveTasks = () =>
  useTaskStore((state) => state.tasks.filter((t) => !t.completed))

export const useTaskById = (id: string) =>
  useTaskStore((state) => state.tasks.find((t) => t.id === id))
```

### React Query

**API Layer:**

```tsx
// features/tasks/api/tasks.ts
import { api } from '@/lib/api'

import type { Task, CreateTaskData, UpdateTaskData } from '../types'

export const tasksApi = {
  getAll: () => api.get<Task[]>('/tasks'),

  getById: (id: string) => api.get<Task>(`/tasks/${id}`),

  create: (data: CreateTaskData) => api.post<Task>('/tasks', data),

  update: (id: string, data: UpdateTaskData) =>
    api.patch<Task>(`/tasks/${id}`, data),

  delete: (id: string) => api.delete(`/tasks/${id}`),
}
```

**Query Hooks:**

```tsx
// features/tasks/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { tasksApi } from '../api/tasks'

// Query hook
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutation hooks with optimistic updates
export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.create,
    onMutate: async (newTask) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData(['tasks'])

      // Optimistically update
      queryClient.setQueryData(['tasks'], (old: Task[] = []) => [
        ...old,
        { ...newTask, id: 'temp-' + Date.now() },
      ])

      return { previousTasks }
    },
    onError: (_err, _newTask, context) => {
      // Rollback on error
      queryClient.setQueryData(['tasks'], context?.previousTasks)
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      tasksApi.update(id, data),
    onSuccess: (updatedTask) => {
      // Update specific task in cache
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      )
      // Also update individual task query
      queryClient.setQueryData(['tasks', updatedTask.id], updatedTask)
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: (_data, deletedId) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.filter((task) => task.id !== deletedId)
      )
    },
  })
}
```

**Usage in Container:**

```tsx
// features/tasks/components/containers/TaskList.tsx
export function TaskList() {
  const { data: tasks, isLoading, error } = useTasks()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()

  const handleCreate = (title: string) => {
    createTask.mutate({ title, completed: false })
  }

  const handleToggle = (id: string, completed: boolean) => {
    updateTask.mutate({ id, data: { completed } })
  }

  if (isLoading) return <div>Loading tasks...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <TaskListUI
      tasks={tasks ?? []}
      onCreate={handleCreate}
      onToggle={handleToggle}
      onDelete={(id) => deleteTask.mutate(id)}
      isCreating={createTask.isPending}
    />
  )
}
```

**Suspense Query (React 18+):**

```tsx
// features/tasks/hooks/useTasks.ts
import { useSuspenseQuery } from '@tanstack/react-query'

export function useTasksSuspense() {
  return useSuspenseQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getAll,
  })
}

// Usage with Suspense boundary
export function TaskList() {
  const { data: tasks } = useTasksSuspense() // No loading state needed

  return <TaskListUI tasks={tasks} />
}
```

````

### Design Tokens
```css
/* styles/tokens/primitives.css */
:root {
  --color-blue-500: #3b82f6;
  --spacing-4: 1rem;
}

/* styles/tokens/semantic.css */
:root {
  --color-primary: var(--color-blue-500);
  --spacing-section: var(--spacing-4);
}

/* styles/tokens/components.css */
:root {
  --button-primary-bg: var(--color-primary);
  --card-padding: var(--spacing-section);
}

/* Component usage */
.button-primary {
  background: var(--button-primary-bg);  /* ✅ Use component token */
  /* background: var(--color-primary);     ❌ Don't skip layer */
  /* background: #3b82f6;                  ❌ Never hardcode */
}
````

## Storybook (CSF 3)

Add stories for:

- All shared UI components
- Feature UI components used 3+ times

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Save',
    variant: 'primary',
  },
  render: (args) => (
    <Button {...args}>
      <span>💾</span> {args.children}
    </Button>
  ),
}
```

## Modern React 18+ Patterns

### Suspense for Data Fetching

```tsx
// app/routes/DashboardRoute.tsx
import { Suspense } from 'react'

import { DashboardContainer } from '@/features/dashboard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function DashboardRoute() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContainer />
    </Suspense>
  )
}

// features/dashboard/components/containers/DashboardContainer.tsx
import { useSuspenseQuery } from '@tanstack/react-query'

export function DashboardContainer() {
  // useSuspenseQuery throws promise on loading - handled by Suspense
  const { data } = useSuspenseQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  })

  return <DashboardUI data={data} />
}
```

### Error Boundaries

```tsx
// components/ui/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.reset) ?? (
          <div className="error-fallback">
            <h2>Something went wrong</h2>
            <button onClick={this.reset}>Try again</button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

// Usage in routes
export function DashboardRoute() {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <p>Failed to load dashboard: {error.message}</p>
          <button onClick={reset}>Retry</button>
        </div>
      )}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardContainer />
      </Suspense>
    </ErrorBoundary>
  )
}
```

### useTransition for Non-Urgent Updates

```tsx
// features/search/components/containers/SearchContainer.tsx
import { useState, useTransition } from 'react'

export function SearchContainer() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Item[]>([])
  const [isPending, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    setQuery(value) // Urgent: update input immediately

    startTransition(() => {
      // Non-urgent: filter results
      setResults(performExpensiveFilter(value))
    })
  }

  return (
    <>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <span>Updating...</span>}
      <ResultsList results={results} />
    </>
  )
}
```

### useDeferredValue for Performance

```tsx
// features/products/components/containers/ProductGrid.tsx
import { useDeferredValue, useMemo } from 'react'

export function ProductGrid({ searchTerm }: { searchTerm: string }) {
  const deferredSearchTerm = useDeferredValue(searchTerm)
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const filteredProducts = useMemo(
    () => products?.filter((p) => p.name.includes(deferredSearchTerm)),
    [products, deferredSearchTerm]
  )

  return (
    <div className="product-grid">
      {filteredProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### useId for Accessible Components

```tsx
// components/ui/FormField.tsx
import { useId } from 'react'

interface Props {
  label: string
  error?: string
  children: React.ReactNode
}

export function FormField({ label, error, children }: Props) {
  const id = useId()
  const errorId = useId()

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span id={errorId} role="alert" aria-live="polite">
          {error}
        </span>
      )}
    </div>
  )
}
```

### useOptimistic for Instant Feedback

```tsx
// features/todos/components/containers/TodoList.tsx
import { useOptimistic } from 'react'

export function TodoList() {
  const { data: todos } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
  const mutation = useMutation({ mutationFn: toggleTodo })

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos ?? [],
    (state, newTodo: Todo) => [...state, newTodo]
  )

  const handleAdd = async (text: string) => {
    const tempTodo = { id: crypto.randomUUID(), text, completed: false }
    addOptimisticTodo(tempTodo) // Instant UI update
    await mutation.mutateAsync(tempTodo) // Server sync
  }

  return (
    <div>
      {optimisticTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
```

### Lazy Loading Routes

```tsx
// app/router.tsx
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Dashboard = lazy(() => import('@/features/dashboard'))
const Settings = lazy(() => import('@/features/settings'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
])
```

## Testing

### Setup

```tsx
// test/setup.ts
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

### UI Component Tests (Unit)

```tsx
// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  test('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('applies variant classes', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--primary')
  })
})
```

### Container Tests (Integration with MSW)

```tsx
// features/users/components/containers/UserDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'

import { UserDashboard } from './UserDashboard'

const server = setupServer(
  http.get('/api/users/profile', () => {
    return HttpResponse.json({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('UserDashboard', () => {
  test('fetches and displays user profile', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <UserDashboard />
      </QueryClientProvider>
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })
  })

  test('handles error state', async () => {
    server.use(
      http.get('/api/users/profile', () => {
        return HttpResponse.json({ error: 'Not found' }, { status: 404 })
      })
    )

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <UserDashboard />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
```

### Testing Zustand Stores

```tsx
// features/tasks/stores/taskStore.test.ts
import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, beforeEach } from 'vitest'

import { useTaskStore } from './taskStore'

describe('taskStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useTaskStore.setState({ tasks: [] })
  })

  test('adds a task', () => {
    const { result } = renderHook(() => useTaskStore())

    act(() => {
      result.current.addTask({ id: '1', title: 'Test task', completed: false })
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Test task')
  })

  test('removes a task', () => {
    const { result } = renderHook(() => useTaskStore())

    act(() => {
      result.current.addTask({ id: '1', title: 'Test', completed: false })
      result.current.removeTask('1')
    })

    expect(result.current.tasks).toHaveLength(0)
  })
})
```

### Testing Custom Hooks

```tsx
// features/auth/hooks/useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, test } from 'vitest'

import { useAuth } from './useAuth'

const server = setupServer(
  http.get('/api/auth/user', () => {
    return HttpResponse.json({ id: '1', name: 'John' })
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('useAuth', () => {
  test('fetches current user', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.user).toEqual({ id: '1', name: 'John' })
    })
  })
})
```

### Testing with Suspense

```tsx
// features/dashboard/components/containers/DashboardContainer.test.tsx
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { describe, expect, test } from 'vitest'

import { DashboardContainer } from './DashboardContainer'

describe('DashboardContainer with Suspense', () => {
  test('shows loading state then content', async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardContainer />
        </Suspense>
      </QueryClientProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })
  })
})
```

## Quick Decisions

**When to extract to shared?** Used in 3+ places

**UI vs Container split?** Only if UI component is reused

**State tool choice?**

- Server data → React Query
- Global client state → Zustand
- Dependency injection → Context
- Local UI state → useState

**Import layer?**

- Feature code → `features/[domain]`
- Reusable UI → `components/ui`
- Utilities → `shared/utils`, `hooks`, etc.

**Storybook?** Yes for shared UI + frequently reused feature UI

**Design tokens?** Always use Layer 3 (component tokens) in CSS

## Commands

```bash
npm run dev              # Dev server
npm run storybook        # Open Storybook
npm run lint            # ESLint (includes import boundaries)
npm test                # Run tests
npm run build           # Production build
```

## ESLint Configuration

### Complete .eslintrc.cjs

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    // React Refresh
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Code style - enforce double quotes and semicolons
    quotes: ['error', 'double', { avoidEscape: true }],
    semi: ['error', 'always'],
    '@typescript-eslint/quotes': ['error', 'double', { avoidEscape: true }],
    '@typescript-eslint/semi': ['error', 'always'],

    // Import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/app/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/features/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/stores/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/lib/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/types/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // Layer boundary enforcement
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Shared cannot import from Features or App
          {
            target: './src/components',
            from: './src/features',
            message: 'Shared components cannot import from features',
          },
          {
            target: './src/components',
            from: './src/app',
            message: 'Shared components cannot import from app',
          },
          {
            target: './src/hooks',
            from: './src/features',
            message: 'Shared hooks cannot import from features',
          },
          {
            target: './src/hooks',
            from: './src/app',
            message: 'Shared hooks cannot import from app',
          },
          {
            target: './src/stores',
            from: './src/features',
            message: 'Shared stores cannot import from features',
          },
          {
            target: './src/stores',
            from: './src/app',
            message: 'Shared stores cannot import from app',
          },
          {
            target: './src/utils',
            from: './src/features',
            message: 'Shared utils cannot import from features',
          },
          {
            target: './src/utils',
            from: './src/app',
            message: 'Shared utils cannot import from app',
          },
          {
            target: './src/lib',
            from: './src/features',
            message: 'Shared lib cannot import from features',
          },
          {
            target: './src/lib',
            from: './src/app',
            message: 'Shared lib cannot import from app',
          },
          {
            target: './src/types',
            from: './src/features',
            message: 'Shared types cannot import from features',
          },
          {
            target: './src/types',
            from: './src/app',
            message: 'Shared types cannot import from app',
          },
          // Features cannot import from App
          {
            target: './src/features',
            from: './src/app',
            message: 'Features cannot import from app layer',
          },
          // Features cannot import from other features (enforce through index.ts)
          {
            target: './src/features/*/!(index).ts',
            from: './src/features/*',
            message:
              'Features must import from other features via index.ts public API only',
          },
        ],
      },
    ],

    // Enforce public API usage
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          // Allow internal imports within same feature
          '**/features/*/components/**',
          '**/features/*/hooks/**',
          '**/features/*/stores/**',
          '**/features/*/api/**',
          '**/features/*/utils/**',
          '**/features/*/types/**',
          // Allow shared internal imports
          '**/components/**',
          '**/hooks/**',
          '**/stores/**',
          '**/lib/**',
          '**/utils/**',
          '**/types/**',
          '**/styles/**',
          '**/config/**',
          '**/constants/**',
          // Allow node_modules
          '**/*.css',
          '**/*.scss',
        ],
      },
    ],
  },
}
```

### Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "@tanstack/react-query": "^5.28.0",
    "zustand": "^4.5.0",
    "immer": "^10.0.4"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "@storybook/react": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "@testing-library/react": "^14.2.0",
    "@testing-library/user-event": "^14.5.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@vitest/ui": "^1.3.0",
    "eslint": "^8.57.0",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "eslint-import-resolver-typescript": "^3.6.1",
    "msw": "^2.2.0",
    "typescript": "^5.4.0",
    "vite": "^5.1.0",
    "vitest": "^1.3.0"
  }
}
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Strict type checking */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/app/*": ["src/app/*"],
      "@/features/*": ["src/features/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/stores/*": ["src/stores/*"],
      "@/lib/*": ["src/lib/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/config/*": ["src/config/*"],
      "@/constants/*": ["src/constants/*"],
      "@/styles/*": ["src/styles/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### .prettierrc.json

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## Code Style Examples

### Good Examples ✅

```tsx
import { useState, useTransition } from 'react'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth'
import { dashboardApi } from '@/features/dashboard/api'

import type { DashboardData } from '@/features/dashboard/types'

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: () => dashboardApi.getData(user!.id),
    enabled: !!user,
  })

  const mutation = useMutation({
    mutationFn: dashboardApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })

  const handleClick = () => {
    startTransition(() => {
      setIsOpen(true)
    })
  }

  const handleUpdate = (updates: Partial<DashboardData>) => {
    mutation.mutate(updates)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard">
      <Button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Opening...' : 'Open'}
      </Button>
      {data && <DashboardContent data={data} onUpdate={handleUpdate} />}
    </div>
  )
}
```

### Modern Pattern Examples ✅

```tsx
// Using Suspense with useSuspenseQuery
import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

export function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  return <div>{user.name}</div> // No loading state needed
}

// Wrap with Suspense boundary
export function UserProfileRoute() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId="123" />
    </Suspense>
  )
}

// Using Error Boundary
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export function DashboardRoute() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  )
}

// Proper TypeScript with satisfies
import type { RouteObject } from 'react-router-dom'

export const routes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
] satisfies RouteObject[]

// Using Immer with Zustand
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useStore = create<State>()(
  immer((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        state.items.push(item) // Direct mutation with Immer
      }),
  }))
)
```

### Bad Examples ❌

```tsx
// Single quotes - Wrong!
import { Button } from '@/components/ui/Button';

// Missing semicolons - Wrong!
const [isOpen, setIsOpen] = useState(false)

// Bypassing public API - Wrong!
import { LoginForm } from "@/features/auth/components/ui/LoginForm";

// Wrong import order - Wrong!
import { useAuth } from "@/features/auth";
import { useState } from "react";

// Using useState for server data - Wrong!
const [users, setUsers] = useState([]);
useEffect(() => {
  fetchUsers().then(setUsers);
}, []);

// Not using TypeScript properly - Wrong!
export function Component(props: any) { // Don't use 'any'
  return <div>{props.data}</div>;
}

// Manual immutability without Immer - Unnecessary!
set((state) => ({
  ...state,
  items: [...state.items, newItem], // Use Immer instead
}));

// Not handling loading/error states - Wrong!
const { data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
return <div>{data.map(...)}</div>; // data might be undefined!

// Optimistic updates without rollback - Wrong!
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: (newUser) => {
    queryClient.setQueryData(["users"], newUser); // No rollback on error!
  },
});
```

---

**Remember:** Start simple, scale when needed. Respect layer boundaries. Use design tokens. Test behavior, not implementation. Follow double quotes and semicolons consistently.
