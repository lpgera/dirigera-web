# Repository Instructions for Coding Agent

## Project Overview

This is a React application built with TypeScript, focusing on maintainable, scalable architecture with clear separation of concerns.

**Tech Stack:**

- React 18+ with TypeScript
- Zustand for global client state management
- React Query (TanStack Query) for server state management
- Pure CSS with layered design token system (3-layer architecture)
- Storybook for UI component development and documentation
- Component architecture: UI components (presentational) + Container components (data logic)

**Purpose:** [Describe your app's main purpose here]

## Visual Architecture Overview

### Import Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        APP LAYER                             │
│  (Routes, Pages, Root Components)                           │
│                                                              │
│  app/routes/Dashboard.tsx                                   │
│  app/routes/UserProfile.tsx                                 │
│  app/App.tsx, app/router.tsx                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ ✅ CAN IMPORT FROM
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                     FEATURES LAYER                           │
│  (Business Domain Logic)                                    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Feature: Auth│  │Feature: User │  │Feature: Posts│     │
│  │              │  │              │  │              │     │
│  │ • Components │  │ • Components │  │ • Components │     │
│  │ • Stores     │  │ • Stores     │  │ • Stores     │     │
│  │ • API calls  │  │ • API calls  │  │ • API calls  │     │
│  │ • Hooks      │  │ • Hooks      │  │ • Hooks      │     │
│  │ • Types      │  │ • Types      │  │ • Types      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  Features can import from each other via public APIs        │
│  (minimize this - prefer composition at App layer)          │
└──────────────────────┬──────────────────────────────────────┘
                       │ ✅ CAN IMPORT FROM
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                      SHARED LAYER                            │
│  (Reusable Code - No Business Logic)                        │
│                                                              │
│  components/ui/  •  hooks/  •  utils/  •  lib/             │
│  stores/  •  types/  •  config/  •  constants/             │
│                                                              │
│  ⛔ CANNOT import from Features or App layers               │
└─────────────────────────────────────────────────────────────┘
```

### Container/UI Component Relationship

```
┌─────────────────────────────────────────────────────────────┐
│         FEATURE: User Management                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTAINER COMPONENT (Data + Logic)                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │ UserDashboard.tsx                                   │    │
│  │                                                     │    │
│  │ • Connects to Zustand store                        │    │
│  │ • Fetches data with React Query                    │    │
│  │ • Handles user interactions                        │    │
│  │ • Contains business logic                          │    │
│  │                                                     │    │
│  │   const user = useUserStore(s => s.currentUser)   │    │
│  │   const { data } = useQuery(...)                   │    │
│  │   const handleEdit = () => { ... }                 │    │
│  │                                                     │    │
│  │   return <UserCard {...props} />                   │    │
│  └──────────────────┬─────────────────────────────────┘    │
│                     │ Passes props                          │
│                     ↓                                        │
│  UI COMPONENT (Presentation Only)                           │
│  ┌────────────────────────────────────────────────────┐    │
│  │ UserCard.tsx                                        │    │
│  │                                                     │    │
│  │ • Pure presentational                              │    │
│  │ • Receives data via props                          │    │
│  │ • No store access                                  │    │
│  │ • No API calls                                     │    │
│  │ • Reusable & testable                              │    │
│  │                                                     │    │
│  │   interface Props {                                │    │
│  │     name: string;                                  │    │
│  │     onEdit: () => void;                            │    │
│  │   }                                                 │    │
│  │                                                     │    │
│  │   return <div>...</div>                            │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Design Token Layers (Simplified 3-Layer System)

```
LAYER 1: PRIMITIVES (Raw Values - Source of Truth)
┌─────────────────────────────────────────────────────────┐
│ --color-blue-50: #eff6ff;                               │
│ --color-blue-500: #3b82f6;                              │
│ --color-blue-900: #1e3a8a;                              │
│ --spacing-2: 0.5rem;                                    │
│ --spacing-4: 1rem;                                      │
│ --font-size-base: 1rem;                                 │
│ --border-radius-md: 0.375rem;                           │
└─────────────────────────────────────────────────────────┘
                          ↓
LAYER 2: SEMANTIC TOKENS (Meaning - Theming Layer)
┌─────────────────────────────────────────────────────────┐
│ --color-primary: var(--color-blue-500);                 │
│ --color-surface: var(--color-white);                    │
│ --color-text-primary: var(--color-gray-900);            │
│ --spacing-section: var(--spacing-4);                    │
│                                                          │
│ DARK THEME OVERRIDE:                                    │
│ --color-primary: var(--color-blue-400);                 │
│ --color-surface: var(--color-gray-900);                 │
│ --color-text-primary: var(--color-gray-50);             │
└─────────────────────────────────────────────────────────┘
                          ↓
LAYER 3: COMPONENT TOKENS (Usage - Components Use These)
┌─────────────────────────────────────────────────────────┐
│ --button-primary-bg: var(--color-primary);              │
│ --button-primary-text: var(--color-white);              │
│ --card-bg: var(--color-surface);                        │
│ --card-padding: var(--spacing-section);                 │
│ --input-border: var(--color-border);                    │
└─────────────────────────────────────────────────────────┘
                          ↓
ACTUAL CSS USAGE
┌─────────────────────────────────────────────────────────┐
│ .button-primary {                                        │
│   background: var(--button-primary-bg);                 │
│   color: var(--button-primary-text);                    │
│ }                                                        │
│                                                          │
│ .card {                                                  │
│   background: var(--card-bg);                           │
│   padding: var(--card-padding);                         │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
```

## Quick Reference

**Key Concepts:**

- 📁 **Feature-based structure** - Code organized by business domain in `src/features/`
- 🔒 **Unidirectional imports** - App → Features → Shared (enforced by ESLint)
- 🎨 **UI/Container split** - Presentational vs logic components (only when reused)
- 📦 **Public APIs** - Each feature exports via `index.ts`
- 🎭 **Storybook for reusable components** - Shared UI and feature UI used 3+ times
- ⚛️ **State management trinity** - React Query (server) + Zustand (client) + Context (DI)
- 🎨 **Layered design tokens** - 3 layers: Primitives → Semantic → Component
- 📏 **TypeScript strict** - No `any`, explicit types everywhere

**Quick Commands:**

```bash
npm run dev          # Start dev server
npm run storybook    # Open Storybook
npm run lint         # Check for errors (includes import boundaries)
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
```

**Import Examples:**

```tsx
// ✅ Correct - Feature public API
import { LoginForm, useAuth } from '@/features/auth'
import { Button } from '@/components/ui/Button'
import { useDebounce } from '@/hooks/useDebounce'

// ❌ Wrong - Bypassing public API
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/features/auth/stores/authStore'
```

**CSS Token Usage:**

```css
/* ✅ Correct - Use component tokens */
.my-button {
  background: var(--button-primary-bg);
  padding: var(--button-padding);
}

/* ❌ Wrong - Don't use primitives or hardcoded values */
.my-button {
  background: var(--color-blue-500);
} /* Primitive */
.my-button {
  background: #3b82f6;
} /* Hardcoded */
```

## Decision Trees

### Decision Tree 1: Where Should This Code Live?

```
START: I need to write some code
│
├─ Is it a complete feature with business logic?
│  (Login, User Profile, Shopping Cart, etc.)
│  │
│  YES → Place in: src/features/[feature-name]/
│  │       └─ Create feature structure with components, hooks, stores, etc.
│  │
│  NO → Continue ↓
│
├─ Is it a UI component used across multiple features?
│  (Button, Input, Modal, Card, etc.)
│  │
│  YES → Place in: src/components/ui/[ComponentName]/
│  │       └─ Create with .tsx, .css, .stories.tsx, .test.tsx
│  │
│  NO → Continue ↓
│
├─ Is it a custom hook used across features?
│  (useDebounce, useLocalStorage, useMediaQuery, etc.)
│  │
│  YES → Place in: src/hooks/[hookName].ts
│  │
│  NO → Continue ↓
│
├─ Is it global client state (user prefs, theme, auth)?
│  │
│  YES → Place in: src/stores/[storeName]Store.ts
│  │
│  NO → Continue ↓
│
├─ Is it a utility function?
│  (formatDate, parseQuery, validateEmail, etc.)
│  │
│  YES → Place in: src/utils/[utilName].ts
│  │
│  NO → Continue ↓
│
├─ Is it a type used by 3+ features?
│  (ApiResponse, PaginationParams, etc.)
│  │
│  YES → Place in: src/types/[typeName].types.ts
│  │
│  NO → Continue ↓
│
├─ Is it configuration or constants?
│  (API URLs, feature flags, env vars, etc.)
│  │
│  YES → Place in: src/config/ or src/constants/
│  │
│  NO → Continue ↓
│
└─ Is it feature-specific?
   │
   YES → Place in: src/features/[feature-name]/[subfolder]/
   │       - Feature-specific component → components/
   │       - Feature-specific hook → hooks/
   │       - Feature-specific util → utils/
   │       - Feature-specific type → types/
   │
   └─ Still unsure? Default to feature folder and refactor later
```

### Decision Tree 2: Which State Management Tool?

```
START: I need to manage state
│
├─ Is this UI-only state?
│  (Modal open/closed, form input values, accordion expanded, etc.)
│  │
│  YES → Use: useState / useReducer in component
│  │       Example: const [isOpen, setIsOpen] = useState(false);
│  │
│  NO → Continue ↓
│
├─ Is this server data (from API)?
│  (User list, posts, product details, etc.)
│  │
│  YES → Use: React Query (TanStack Query)
│  │       └─ Provides: caching, refetching, loading/error states
│  │       Example: const { data, isLoading } = useQuery({...});
│  │
│  NO → Continue ↓
│
├─ Is this global client state that persists?
│  (Auth token, user preferences, theme, sidebar collapsed, etc.)
│  │
│  YES → Use: Zustand
│  │       └─ Lives in: src/stores/ or src/features/[name]/stores/
│  │       Example: const user = useAuthStore(s => s.user);
│  │
│  NO → Continue ↓
│
├─ Is this dependency injection or rarely-changing data?
│  (Feature flags, config, theme provider, i18n, etc.)
│  │
│  YES → Use: React Context
│  │       └─ Avoid frequent updates (causes re-renders)
│  │       Example: const config = useContext(ConfigContext);
│  │
│  NO → Continue ↓
│
└─ Need to share state between sibling components?
   │
   ├─ Is parent component nearby?
   │  │
   │  YES → Lift state to parent component
   │  │       Example: Parent manages state, passes to children
   │  │
   │  NO → Use: Zustand for that feature
   │          Example: Feature-specific store
   │
   └─ SUMMARY:
      - Component state: useState/useReducer
      - Server data: React Query
      - Global client state: Zustand
      - Config/DI: Context
```

### Decision Tree 3: Should I Create a Container Component?

```
START: I'm creating a component
│
├─ Is this component REUSED in 2+ places?
│  │
│  NO → DON'T split - Keep state and UI together
│  │      └─ Create single component file with hooks and JSX
│  │      Example: features/user/components/UserDashboard.tsx
│  │
│  YES → Continue ↓
│
├─ Does this component need data from stores/APIs?
│  │
│  NO → Create only UI component
│  │      └─ Example: components/ui/Button/Button.tsx
│  │      Props: onClick, children, variant, etc.
│  │
│  YES → Continue ↓
│
├─ Would this UI component be useful with different data?
│  (Could you imagine using it in Storybook with mock data?)
│  │
│  YES → CREATE SPLIT:
│  │      1. UI Component (props only, no logic)
│  │         └─ features/[name]/components/ui/UserCard.tsx
│  │      2. Container Component (logic, connects to stores)
│  │         └─ features/[name]/components/UserDashboard.tsx
│  │
│  NO → DON'T split - Keep together
│         └─ The component is too coupled to its data source
│
└─ SUMMARY:
   Split when: Reused + Needs data + UI is independent
   Keep together: Single use OR tightly coupled to data
```

## Real-World Examples

### Example 1: Complete Feature Implementation (Task Management)

#### Feature Structure

```
features/tasks/
├── api/
│   ├── getTasks.ts
│   ├── createTask.ts
│   ├── updateTask.ts
│   ├── deleteTask.ts
│   └── index.ts
├── components/
│   ├── TaskDashboard/
│   │   ├── TaskDashboard.tsx       # Container
│   │   ├── TaskDashboard.css
│   │   └── index.ts
│   └── ui/
│       ├── TaskCard/
│       │   ├── TaskCard.tsx        # UI Component
│       │   ├── TaskCard.css
│       │   ├── TaskCard.stories.tsx
│       │   ├── TaskCard.test.tsx
│       │   └── index.ts
│       └── TaskForm/
│           ├── TaskForm.tsx
│           ├── TaskForm.css
│           ├── TaskForm.stories.tsx
│           ├── TaskForm.test.tsx
│           └── index.ts
├── hooks/
│   ├── useTasks.ts                 # React Query wrapper
│   ├── useTaskFilters.ts           # Local filter state
│   └── index.ts
├── stores/
│   ├── taskUIStore.ts              # UI state (filters, sort)
│   └── index.ts
├── types/
│   ├── task.types.ts
│   └── index.ts
├── utils/
│   ├── taskValidation.ts
│   └── index.ts
└── index.ts                         # Public API
```

#### API Layer (`features/tasks/api/getTasks.ts`)

```typescript
import { apiClient } from '@/lib/apiClient'
import { Task } from '../types'

export interface GetTasksParams {
  status?: 'pending' | 'completed'
  assigneeId?: string
  limit?: number
}

export const getTasks = async (params?: GetTasksParams): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>('/tasks', { params })
  return response.data
}

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`)
  return response.data
}
```

#### Types (`features/tasks/types/task.types.ts`)

```typescript
export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  assigneeId: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDTO {
  title: string
  description: string
  assigneeId: string
  dueDate: string
  priority: Task['priority']
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
  status?: Task['status']
}
```

#### React Query Hook (`features/tasks/hooks/useTasks.ts`)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTasks, createTask, updateTask, deleteTask } from '../api'
import { CreateTaskDTO, UpdateTaskDTO } from '../types'

// Query keys
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters: string) => [...taskKeys.lists(), filters] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
}

// Fetch all tasks
export const useTasks = (filters?: GetTasksParams) => {
  return useQuery({
    queryKey: taskKeys.list(JSON.stringify(filters)),
    queryFn: () => getTasks(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Create task mutation
export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTaskDTO) => createTask(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
    onError: (error) => {
      console.error('Failed to create task:', error)
      // Handle error (show toast, etc.)
    },
  })
}

// Update task mutation
export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDTO }) =>
      updateTask(id, data),
    onSuccess: (updatedTask) => {
      // Update cache optimistically
      queryClient.setQueryData(taskKeys.detail(updatedTask.id), updatedTask)
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
  })
}

// Delete task mutation
export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: taskKeys.detail(deletedId) })
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
  })
}
```

#### Zustand Store for UI State (`features/tasks/stores/taskUIStore.ts`)

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Task } from '../types'

interface TaskUIState {
  // Filters
  statusFilter: Task['status'] | 'all'
  priorityFilter: Task['priority'] | 'all'
  sortBy: 'dueDate' | 'priority' | 'createdAt'
  sortOrder: 'asc' | 'desc'

  // UI state
  viewMode: 'list' | 'grid' | 'kanban'
  selectedTaskId: string | null
  isCreateModalOpen: boolean

  // Actions
  setStatusFilter: (status: Task['status'] | 'all') => void
  setPriorityFilter: (priority: Task['priority'] | 'all') => void
  setSortBy: (sortBy: TaskUIState['sortBy']) => void
  toggleSortOrder: () => void
  setViewMode: (mode: TaskUIState['viewMode']) => void
  selectTask: (id: string | null) => void
  openCreateModal: () => void
  closeCreateModal: () => void
  resetFilters: () => void
}

export const useTaskUIStore = create<TaskUIState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        statusFilter: 'all',
        priorityFilter: 'all',
        sortBy: 'dueDate',
        sortOrder: 'asc',
        viewMode: 'list',
        selectedTaskId: null,
        isCreateModalOpen: false,

        // Actions
        setStatusFilter: (status) => set({ statusFilter: status }),
        setPriorityFilter: (priority) => set({ priorityFilter: priority }),
        setSortBy: (sortBy) => set({ sortBy }),
        toggleSortOrder: () =>
          set((state) => ({
            sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
          })),
        setViewMode: (mode) => set({ viewMode: mode }),
        selectTask: (id) => set({ selectedTaskId: id }),
        openCreateModal: () => set({ isCreateModalOpen: true }),
        closeCreateModal: () => set({ isCreateModalOpen: false }),
        resetFilters: () =>
          set({
            statusFilter: 'all',
            priorityFilter: 'all',
            sortBy: 'dueDate',
            sortOrder: 'asc',
          }),
      }),
      {
        name: 'task-ui-storage', // localStorage key
        partialize: (state) => ({
          // Only persist these fields
          viewMode: state.viewMode,
          sortBy: state.sortBy,
          sortOrder: state.sortOrder,
        }),
      }
    ),
    { name: 'TaskUIStore' }
  )
)
```

#### UI Component (`features/tasks/components/ui/TaskCard/TaskCard.tsx`)

```typescript
import './TaskCard.css';
import { Task } from '../../../types';

export interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) => {
  const priorityClass = `task-card__priority--${task.priority}`;
  const statusClass = `task-card__status--${task.status}`;

  return (
    <div className={`task-card ${statusClass}`}>
      <div className="task-card__header">
        <h3 className="task-card__title">{task.title}</h3>
        <span className={`task-card__priority ${priorityClass}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-card__description">{task.description}</p>

      <div className="task-card__meta">
        <span className="task-card__due-date">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
        <span className={`task-card__status ${statusClass}`}>
          {task.status}
        </span>
      </div>

      <div className="task-card__actions">
        <button
          onClick={() => onStatusChange(task.id, getNextStatus(task.status))}
          className="task-card__button"
        >
          {task.status === 'completed' ? 'Reopen' : 'Complete'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="task-card__button task-card__button--secondary"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="task-card__button task-card__button--danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Helper function
const getNextStatus = (current: Task['status']): Task['status'] => {
  if (current === 'completed') return 'pending';
  return 'completed';
};
```

#### UI Component CSS (`features/tasks/components/ui/TaskCard/TaskCard.css`)

```css
.task-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  transition: var(--transition-standard);
}

.task-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.task-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3);
}

.task-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.task-card__priority {
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
}

.task-card__priority--low {
  background: var(--priority-low-bg);
  color: var(--priority-low-text);
}

.task-card__priority--medium {
  background: var(--priority-medium-bg);
  color: var(--priority-medium-text);
}

.task-card__priority--high {
  background: var(--priority-high-bg);
  color: var(--priority-high-text);
}

.task-card__description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-3);
}

.task-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3);
  font-size: var(--font-size-sm);
}

.task-card__due-date {
  color: var(--text-tertiary);
}

.task-card__status {
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-sm);
  font-weight: var(--font-weight-medium);
}

.task-card__status--pending {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
}

.task-card__status--in-progress {
  background: var(--status-in-progress-bg);
  color: var(--status-in-progress-text);
}

.task-card__status--completed {
  background: var(--status-completed-bg);
  color: var(--status-completed-text);
}

.task-card__actions {
  display: flex;
  gap: var(--spacing-2);
}

.task-card__button {
  flex: 1;
  padding: var(--button-padding-sm);
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  border: none;
  border-radius: var(--button-border-radius);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-standard);
}

.task-card__button:hover {
  background: var(--button-primary-bg-hover);
}

.task-card__button--secondary {
  background: var(--button-secondary-bg);
  color: var(--button-secondary-text);
}

.task-card__button--secondary:hover {
  background: var(--button-secondary-bg-hover);
}

.task-card__button--danger {
  background: var(--button-danger-bg);
  color: var(--button-danger-text);
}

.task-card__button--danger:hover {
  background: var(--button-danger-bg-hover);
}
```

#### Storybook Story (`features/tasks/components/ui/TaskCard/TaskCard.stories.tsx`)

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { TaskCard } from './TaskCard'
import { Task } from '../../../types'

const meta: Meta<typeof TaskCard> = {
  title: 'Features/Tasks/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TaskCard>

const mockTask: Task = {
  id: '1',
  title: 'Implement user authentication',
  description: 'Add JWT-based authentication with refresh tokens',
  status: 'in-progress',
  priority: 'high',
  assigneeId: 'user-123',
  dueDate: '2024-12-31',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-15',
}

export const Default: Story = {
  args: {
    task: mockTask,
    onEdit: (task) => console.log('Edit', task),
    onDelete: (id) => console.log('Delete', id),
    onStatusChange: (id, status) => console.log('Status change', id, status),
  },
}

export const Pending: Story = {
  args: {
    ...Default.args,
    task: { ...mockTask, status: 'pending' },
  },
}

export const Completed: Story = {
  args: {
    ...Default.args,
    task: { ...mockTask, status: 'completed' },
  },
}

export const LowPriority: Story = {
  args: {
    ...Default.args,
    task: { ...mockTask, priority: 'low' },
  },
}

export const MediumPriority: Story = {
  args: {
    ...Default.args,
    task: { ...mockTask, priority: 'medium' },
  },
}

export const LongDescription: Story = {
  args: {
    ...Default.args,
    task: {
      ...mockTask,
      description:
        'This is a very long description that should demonstrate how the card handles multiple lines of text. It should wrap properly and maintain good readability even with longer content.',
    },
  },
}
```

#### Container Component (`features/tasks/components/TaskDashboard/TaskDashboard.tsx`)

```typescript
import { useMemo } from 'react';
import { TaskCard } from '../ui/TaskCard';
import { useTasks, useUpdateTask, useDeleteTask } from '../../hooks/useTasks';
import { useTaskUIStore } from '../../stores/taskUIStore';
import { Task } from '../../types';
import './TaskDashboard.css';

export const TaskDashboard = () => {
  // Get UI state from Zustand
  const {
    statusFilter,
    priorityFilter,
    sortBy,
    sortOrder,
    viewMode,
    setStatusFilter,
    setPriorityFilter,
    toggleSortOrder,
    openCreateModal,
  } = useTaskUIStore();

  // Fetch tasks with React Query
  const { data: tasks = [], isLoading, error } = useTasks();

  // Mutations
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply filters
    if (statusFilter !== 'all') {
      result = result.filter((task) => task.status === statusFilter);
    }
    if (priorityFilter !== 'all') {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, statusFilter, priorityFilter, sortBy, sortOrder]);

  // Event handlers
  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTaskMutation.mutate({ id, data: { status } });
  };

  const handleEdit = (task: Task) => {
    // Open edit modal with task data
    console.log('Edit task:', task);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="task-dashboard__loading">Loading tasks...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="task-dashboard__error">
        Failed to load tasks. Please try again.
      </div>
    );
  }

  return (
    <div className="task-dashboard">
      <div className="task-dashboard__header">
        <h1>Task Dashboard</h1>
        <button onClick={openCreateModal} className="task-dashboard__create-btn">
          Create Task
        </button>
      </div>

      <div className="task-dashboard__filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="task-dashboard__filter"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as any)}
          className="task-dashboard__filter"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={toggleSortOrder} className="task-dashboard__sort-btn">
          Sort: {sortBy} ({sortOrder})
        </button>
      </div>

      <div className={`task-dashboard__grid task-dashboard__grid--${viewMode}`}>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="task-dashboard__empty">
          No tasks found. Create your first task!
        </div>
      )}
    </div>
  );
};
```

#### Public API (`features/tasks/index.ts`)

```typescript
// Components
export { TaskDashboard } from './components/TaskDashboard'
export { TaskCard } from './components/ui/TaskCard'
export { TaskForm } from './components/ui/TaskForm'

// Hooks
export {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from './hooks/useTasks'
export { useTaskFilters } from './hooks/useTaskFilters'

// Stores
export { useTaskUIStore } from './stores/taskUIStore'

// Types
export type { Task, CreateTaskDTO, UpdateTaskDTO } from './types'

// Constants (if any)
export { TASK_STATUSES, TASK_PRIORITIES } from './constants'
```

### Example 2: Common Pattern - Modal with Form

#### Shared Modal Component (`components/ui/Modal/Modal.tsx`)

```typescript
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal modal--${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="modal__close"
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.body
  );
};
```

#### Form Component with Validation (`features/tasks/components/ui/TaskForm/TaskForm.tsx`)

```typescript
import { useState, FormEvent } from 'react';
import { CreateTaskDTO } from '../../../types';
import './TaskForm.css';

export interface TaskFormProps {
  initialValues?: Partial<CreateTaskDTO>;
  onSubmit: (data: CreateTaskDTO) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const TaskForm = ({
  initialValues = {},
  onSubmit,
  onCancel,
  isSubmitting = false,
}: TaskFormProps) => {
  const [formData, setFormData] = useState<CreateTaskDTO>({
    title: initialValues.title || '',
    description: initialValues.description || '',
    assigneeId: initialValues.assigneeId || '',
    dueDate: initialValues.dueDate || '',
    priority: initialValues.priority || 'medium',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateTaskDTO, string>>>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.assigneeId) {
      newErrors.assigneeId = 'Assignee is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        newErrors.dueDate = 'Due date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    field: keyof CreateTaskDTO,
    value: string | CreateTaskDTO['priority']
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="task-form__field">
        <label htmlFor="title" className="task-form__label">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={`task-form__input ${errors.title ? 'task-form__input--error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.title && <span className="task-form__error">{errors.title}</span>}
      </div>

      <div className="task-form__field">
        <label htmlFor="description" className="task-form__label">
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className={`task-form__textarea ${errors.description ? 'task-form__input--error' : ''}`}
          rows={4}
          disabled={isSubmitting}
        />
        {errors.description && (
          <span className="task-form__error">{errors.description}</span>
        )}
      </div>

      <div className="task-form__field">
        <label htmlFor="priority" className="task-form__label">
          Priority *
        </label>
        <select
          id="priority"
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value as any)}
          className="task-form__select"
          disabled={isSubmitting}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="task-form__field">
        <label htmlFor="dueDate" className="task-form__label">
          Due Date *
        </label>
        <input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          className={`task-form__input ${errors.dueDate ? 'task-form__input--error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.dueDate && <span className="task-form__error">{errors.dueDate}</span>}
      </div>

      <div className="task-form__field">
        <label htmlFor="assigneeId" className="task-form__label">
          Assignee ID *
        </label>
        <input
          id="assigneeId"
          type="text"
          value={formData.assigneeId}
          onChange={(e) => handleChange('assigneeId', e.target.value)}
          className={`task-form__input ${errors.assigneeId ? 'task-form__input--error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.assigneeId && (
          <span className="task-form__error">{errors.assigneeId}</span>
        )}
      </div>

      <div className="task-form__actions">
        <button
          type="button"
          onClick={onCancel}
          className="task-form__button task-form__button--secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="task-form__button task-form__button--primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Task'}
        </button>
      </div>
    </form>
  );
};
```

#### Using Modal + Form Together

```typescript
// In TaskDashboard.tsx or separate CreateTaskModal.tsx
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from '../ui/TaskForm';
import { useCreateTask } from '../../hooks/useTasks';
import { useTaskUIStore } from '../../stores/taskUIStore';

export const CreateTaskModal = () => {
  const { isCreateModalOpen, closeCreateModal } = useTaskUIStore();
  const createTask = useCreateTask();

  const handleSubmit = (data: CreateTaskDTO) => {
    createTask.mutate(data, {
      onSuccess: () => {
        closeCreateModal();
        // Show success toast
      },
    });
  };

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={closeCreateModal}
      title="Create New Task"
      size="md"
    >
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={closeCreateModal}
        isSubmitting={createTask.isPending}
      />
    </Modal>
  );
};
```

### Example 3: Anti-Patterns to Avoid

#### ❌ Anti-Pattern 1: Prop Drilling Hell

```typescript
// DON'T DO THIS - Passing props through 5 levels
const App = () => {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} setUser={setUser} />;
};

const Dashboard = ({ user, setUser }) => {
  return <Sidebar user={user} setUser={setUser} />;
};

const Sidebar = ({ user, setUser }) => {
  return <UserMenu user={user} setUser={setUser} />;
};

const UserMenu = ({ user, setUser }) => {
  return <UserProfile user={user} setUser={setUser} />;
};

const UserProfile = ({ user, setUser }) => {
  return <div>{user.name}</div>;
};
```

#### ✅ Solution: Use Zustand for Global State

```typescript
// Create auth store
// src/stores/authStore.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Use directly in any component
const UserProfile = () => {
  const user = useAuthStore((state) => state.user);
  return <div>{user?.name}</div>;
};
```

#### ❌ Anti-Pattern 2: Mixing Server and Client State

```typescript
// DON'T DO THIS - Managing server data in Zustand
export const usePostsStore = create((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    set({ isLoading: true })
    try {
      const posts = await getPosts()
      set({ posts, isLoading: false })
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
}))
```

#### ✅ Solution: Use React Query for Server State

```typescript
// Use React Query for server data
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 5 * 60 * 1000,
  })
}

// Component
const PostList = () => {
  const { data: posts, isLoading, error } = usePosts()
  // React Query handles caching, refetching, etc.
}
```

#### ❌ Anti-Pattern 3: Hardcoded Styles

```typescript
// DON'T DO THIS - Inline styles and hardcoded colors
const Button = () => {
  return (
    <button
      style={{
        background: '#3b82f6',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '4px',
      }}
    >
      Click me
    </button>
  );
};
```

#### ✅ Solution: Use Design Tokens

```css
/* Button.css */
.button {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
}
```

#### ❌ Anti-Pattern 4: Massive Components

```typescript
// DON'T DO THIS - 500+ line component with everything
const UserDashboard = () => {
  // 50 lines of state
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('name');
  // ... 20 more useState

  // 100 lines of logic
  const fetchUsers = async () => { /* ... */ };
  const filterUsers = () => { /* ... */ };
  const sortUsers = () => { /* ... */ };
  // ... 10 more functions

  // 300 lines of JSX
  return (
    <div>
      {/* Massive nested JSX */}
    </div>
  );
};
```

#### ✅ Solution: Break into Smaller Components

```typescript
// Separate concerns
const UserDashboard = () => {
  return (
    <div>
      <UserFilters />
      <UserList />
      <UserStats />
    </div>
  );
};

// Each component focused on one thing
const UserList = () => {
  const { data: users } = useUsers();
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};
```

#### ❌ Anti-Pattern 5: Bypassing Public APIs

```typescript
// DON'T DO THIS - Deep imports
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { validateEmail } from '@/features/auth/utils/validation'
```

#### ✅ Solution: Use Feature Public API

```typescript
// DO THIS - Import from index.ts
import { LoginForm, useAuth, validateEmail } from '@/features/auth'
```

#### ❌ Anti-Pattern 6: God Objects/Stores

```typescript
// DON'T DO THIS - One store for everything
export const useAppStore = create((set) => ({
  user: null,
  posts: [],
  comments: [],
  settings: {},
  theme: 'light',
  notifications: [],
  cart: [],
  orders: [],
  // ... 50 more fields
}))
```

#### ✅ Solution: Split by Domain

```typescript
// DO THIS - Separate stores by domain
export const useAuthStore = create(...);      // User auth only
export const useThemeStore = create(...);     // Theme only
export const useCartStore = create(...);      // Shopping cart only

// Or use feature stores
// features/posts/stores/postStore.ts
// features/comments/stores/commentStore.ts
```

## Architecture Principles

### Feature-Based Architecture (Bulletproof React)

This project follows the **bulletproof-react** architecture pattern, organizing code by features rather than technical types. This approach scales better as the application grows and makes it easier to understand, maintain, and collaborate on the codebase.

**Core Principles:**

1. **Most code lives in the `features/` folder** - organized by business domain
2. **Shared code lives in root-level folders** - reusable across features
3. **Unidirectional imports** - enforced with ESLint rules
4. **Each feature is self-contained** - with its own components, hooks, stores, types, etc.
5. **Public API per feature** - via index.ts barrel exports

### Component Architecture Within Features

We maintain separation between UI and logic **within each feature** - but only when it makes sense:

**When to Split (UI vs Container):**

- Component is **reused in 2+ places**
- UI would be useful with different data sources
- You need to test presentation separately from logic
- Component will be in Storybook

**When to Keep Together:**

- Component is used only once
- Tightly coupled to specific data source
- Simple component with minimal logic

**UI Components** (`features/[feature-name]/components/ui/`)

- Pure presentational components
- Receive all data via props
- No direct access to Zustand stores or API calls
- No business logic
- Can be reused within the feature or promoted to shared components

**Container Components** (`features/[feature-name]/components/`)

- Handle data fetching and state management
- Connect to feature stores or shared stores
- Pass data down to UI components
- Handle user interactions and side effects
- Contain business logic specific to the feature

**Example Feature Structure:**

```
features/user-management/
├── api/                    # API calls for user management
│   ├── getUsers.ts
│   ├── updateUser.ts
│   └── index.ts
├── assets/                 # Feature-specific assets
│   └── default-avatar.png
├── components/             # Feature components
│   ├── UserDashboard/      # Container component
│   │   ├── UserDashboard.tsx
│   │   ├── UserDashboard.css
│   │   └── index.ts
│   └── ui/                 # UI components for this feature
│       ├── UserCard/
│       │   ├── UserCard.tsx
│       │   ├── UserCard.css
│       │   ├── UserCard.stories.tsx
│       │   ├── UserCard.test.tsx
│       │   └── index.ts
│       └── UserAvatar/
│           ├── UserAvatar.tsx
│           ├── UserAvatar.css
│           ├── UserAvatar.stories.tsx
│           ├── UserAvatar.test.tsx
│           └── index.ts
├── hooks/                  # Feature-specific hooks
│   ├── useUsers.ts         # React Query wrapper
│   ├── useUserPermissions.ts
│   └── index.ts
├── stores/                 # Feature state management (client state only)
│   ├── userUIStore.ts      # UI state (filters, view mode, etc.)
│   └── index.ts
├── types/                  # Feature-specific types
│   ├── user.types.ts
│   └── index.ts
├── utils/                  # Feature-specific utilities
│   ├── userValidation.ts
│   └── index.ts
└── index.ts                # Public API - exports what's usable outside
```

### Import Rules & Boundaries

**Enforce with ESLint** (`eslint.config.js`):

```js
'import/no-restricted-paths': [
  'error',
  {
    zones: [
      // Features cannot import from app layer
      {
        target: './src/features',
        from: './src/app',
      },
      // Shared modules cannot import from features or app
      {
        target: [
          './src/components',
          './src/hooks',
          './src/lib',
          './src/stores',
          './src/types',
          './src/utils',
        ],
        from: ['./src/features', './src/app'],
      },
    ],
  },
],
```

**Import Hierarchy:**

```
App Layer (pages/routes)
    ↓ can import from
Features Layer
    ↓ can import from
Shared Layer (components, hooks, stores, utils, etc.)
```

**✅ Allowed Imports:**

- App → Features → Shared
- Features can import from other features (but minimize this - prefer composition at App layer)
- Shared cannot import from Features or App

**❌ Prohibited Imports:**

- Features → App
- Shared → Features
- Shared → App

**Cross-Feature Import Guidelines:**

✅ **Allowed cross-feature imports:**

- Auth checks and user data: `import { useAuth } from '@/features/auth';`
- Shared domain types: `import { User } from '@/features/users/types';`
- Feature composition at App layer only

❌ **Not allowed:**

- Direct store access from other features
- Reaching into internal components
- Business logic coupling between features

**When in doubt:** Extract shared code to `src/` folders (components, hooks, utils, types).

## State Management Strategy

### The State Management Trinity

Use the right tool for the right job:

#### 1. React Query (TanStack Query) - Server State

**Use for:** Any data from APIs

**Why:**

- Automatic caching and revalidation
- Loading and error states built-in
- Optimistic updates
- Automatic retries
- Request deduplication

**Example:**

```typescript
// ✅ Server data with React Query
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// In component
const { data: users, isLoading, error } = useUsers()
```

#### 2. Zustand - Global Client State

**Use for:** Global application state that persists across routes

**Examples:**

- Auth token and user session
- User preferences (theme, language, sidebar collapsed)
- UI state shared across pages (notification count, cart items)
- Feature flags

**Why:**

- Simple API, no boilerplate
- TypeScript-friendly
- Built-in DevTools support
- Can persist to localStorage
- No Context re-render issues

**Example:**

```typescript
// ✅ Global client state with Zustand
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'theme-storage' }
  )
)

// In any component
const { theme, toggleTheme } = useThemeStore()
```

#### 3. React Context - Dependency Injection

**Use for:** Providing dependencies and rarely-changing values

**Examples:**

- Feature flags configuration
- i18n instance
- Theme provider (not theme state)
- Router instance
- API client configuration

**Why:**

- Built into React
- Good for dependency injection
- Works well for config that rarely changes

**Avoid for:** Frequently changing state (causes unnecessary re-renders)

**Example:**

```typescript
// ✅ Config with Context
interface ConfigContextValue {
  apiUrl: string;
  featureFlags: FeatureFlags;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const config = {
    apiUrl: import.meta.env.VITE_API_URL,
    featureFlags: getFeatureFlags(),
  };

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within ConfigProvider');
  return context;
};
```

#### 4. Component State - Local UI State

**Use for:** State that only matters to a single component

**Examples:**

- Form input values (before submission)
- Modal open/closed
- Accordion expanded/collapsed
- Hover states, focus states

**Example:**

```typescript
// ✅ Local state with useState
const [isOpen, setIsOpen] = useState(false)
const [inputValue, setInputValue] = useState('')
```

### When to Use What - Decision Matrix

| State Type          | Tool         | Example                 | Persist?           |
| ------------------- | ------------ | ----------------------- | ------------------ |
| Server data         | React Query  | User list, posts        | Cache              |
| Global client state | Zustand      | Auth, theme, prefs      | Yes (localStorage) |
| Config/DI           | Context      | API URL, feature flags  | No                 |
| Local UI            | useState     | Modal state, form input | No                 |
| Complex local       | useReducer   | Multi-step form         | No                 |
| URL state           | React Router | Page, filters, search   | URL params         |

### Async Patterns in Zustand

When you need to handle async operations in Zustand:

```typescript
// ✅ Async actions in Zustand
export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true })
    try {
      const notifications = await getNotifications()
      set({
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        isLoading: false,
      })
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      set({ isLoading: false })
    }
  },

  markAsRead: async (id: string) => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - 1,
    }))

    try {
      await markNotificationAsRead(id)
    } catch (error) {
      // Revert on error
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: false } : n
        ),
        unreadCount: state.unreadCount + 1,
      }))
    }
  },
}))
```

### Error Handling Strategy

#### React Query Error Handling

```typescript
// Global error handler
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: (error) => {
        console.error('Query error:', error)
        // Show toast notification
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error)
        // Show error toast
      },
    },
  },
})

// Per-query error handling
const { data, error, isError } = useQuery({
  queryKey: ['user', id],
  queryFn: () => getUser(id),
  retry: false, // Don't retry on 404
  onError: (error) => {
    if (error.response?.status === 404) {
      navigate('/not-found')
    }
  },
})
```

#### Zustand Error Handling

```typescript
// Store with error state
interface UserState {
  users: User[]
  error: string | null
  clearError: () => void
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  error: null,

  clearError: () => set({ error: null }),

  deleteUser: async (id: string) => {
    set({ error: null })
    try {
      await deleteUser(id)
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }))
    } catch (error) {
      set({ error: 'Failed to delete user' })
      throw error // Re-throw so caller can handle
    }
  },
}))
```

## Testing Strategy

### Testing Philosophy

**Test the behavior, not the implementation.**

Focus on:

1. What the user sees and interacts with
2. What the component outputs given inputs
3. Critical business logic
4. Error states and edge cases

Avoid:

- Testing implementation details
- Testing library code
- Testing styles (use visual regression instead)

### Testing Structure

```
features/tasks/
├── components/
│   ├── TaskDashboard/
│   │   ├── TaskDashboard.tsx
│   │   ├── TaskDashboard.test.tsx      # Integration test
│   │   └── index.ts
│   └── ui/
│       └── TaskCard/
│           ├── TaskCard.tsx
│           ├── TaskCard.test.tsx       # Unit test
│           ├── TaskCard.stories.tsx    # Visual test
│           └── index.ts
├── hooks/
│   └── useTasks.test.ts                # Hook test
├── utils/
│   └── taskValidation.test.ts          # Utility test
```

### Unit Tests - UI Components

Test presentation and user interactions without real data.

```typescript
// TaskCard.test.tsx
import { render, screen, userEvent } from '@/test/utils';
import { TaskCard } from './TaskCard';
import { Task } from '../../../types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'pending',
  priority: 'high',
  assigneeId: 'user-1',
  dueDate: '2024-12-31',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEdit = vi.fn();
    render(
      <TaskCard
        task={mockTask}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(
      <TaskCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onStatusChange={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('shows correct status badge class', () => {
    const { container } = render(
      <TaskCard
        task={{ ...mockTask, status: 'completed' }}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    const statusBadge = container.querySelector('.task-card__status--completed');
    expect(statusBadge).toBeInTheDocument();
  });
});
```

### Integration Tests - Container Components

Test components with real stores and mocked API calls.

```typescript
// TaskDashboard.test.tsx
import { render, screen, waitFor } from '@/test/utils';
import { TaskDashboard } from './TaskDashboard';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

describe('TaskDashboard', () => {
  it('loads and displays tasks', async () => {
    render(<TaskDashboard />);

    // Loading state
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText('Implement authentication')).toBeInTheDocument();
    });

    expect(screen.getByText('Fix bug in dashboard')).toBeInTheDocument();
  });

  it('filters tasks by status', async () => {
    render(<TaskDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Implement authentication')).toBeInTheDocument();
    });

    // Change filter
    const statusFilter = screen.getByRole('combobox', { name: /status/i });
    await userEvent.selectOptions(statusFilter, 'completed');

    // Should only show completed tasks
    await waitFor(() => {
      expect(screen.queryByText('Implement authentication')).not.toBeInTheDocument();
      expect(screen.getByText('Complete project setup')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock API error
    server.use(
      http.get('/api/tasks', () => {
        return HttpResponse.error();
      })
    );

    render(<TaskDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load tasks/i)).toBeInTheDocument();
    });
  });

  it('deletes a task when confirmed', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<TaskDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Implement authentication')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    await userEvent.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText('Implement authentication')).not.toBeInTheDocument();
    });

    confirmSpy.mockRestore();
  });
});
```

### Testing React Query Hooks

```typescript
// useTasks.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTasks, useCreateTask } from './useTasks';
import { getTasks, createTask } from '../api';

// Mock API
vi.mock('../api');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useTasks', () => {
  it('fetches tasks successfully', async () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', status: 'pending' },
      { id: '2', title: 'Task 2', status: 'completed' },
    ];
    vi.mocked(getTasks).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockTasks);
  });

  it('handles errors', async () => {
    vi.mocked(getTasks).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});

describe('useCreateTask', () => {
  it('creates a task successfully', async () => {
    const newTask = { id: '3', title: 'New Task', status: 'pending' };
    vi.mocked(createTask).mockResolvedValue(newTask);

    const { result } = renderHook(() => useCreateTask(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      title: 'New Task',
      description: 'Description',
      assigneeId: 'user-1',
      dueDate: '2024-12-31',
      priority: 'medium',
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(newTask);
  });
});
```

### Testing Zustand Stores

```typescript
// taskUIStore.test.ts
import { renderHook, act } from '@testing-library/react'
import { useTaskUIStore } from './taskUIStore'

describe('useTaskUIStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { resetFilters, closeCreateModal } = useTaskUIStore.getState()
    resetFilters()
    closeCreateModal()
  })

  it('sets status filter', () => {
    const { result } = renderHook(() => useTaskUIStore())

    expect(result.current.statusFilter).toBe('all')

    act(() => {
      result.current.setStatusFilter('completed')
    })

    expect(result.current.statusFilter).toBe('completed')
  })

  it('toggles sort order', () => {
    const { result } = renderHook(() => useTaskUIStore())

    expect(result.current.sortOrder).toBe('asc')

    act(() => {
      result.current.toggleSortOrder()
    })

    expect(result.current.sortOrder).toBe('desc')

    act(() => {
      result.current.toggleSortOrder()
    })

    expect(result.current.sortOrder).toBe('asc')
  })

  it('opens and closes create modal', () => {
    const { result } = renderHook(() => useTaskUIStore())

    expect(result.current.isCreateModalOpen).toBe(false)

    act(() => {
      result.current.openCreateModal()
    })

    expect(result.current.isCreateModalOpen).toBe(true)

    act(() => {
      result.current.closeCreateModal()
    })

    expect(result.current.isCreateModalOpen).toBe(false)
  })

  it('resets all filters', () => {
    const { result } = renderHook(() => useTaskUIStore())

    act(() => {
      result.current.setStatusFilter('completed')
      result.current.setPriorityFilter('high')
      result.current.setSortBy('priority')
    })

    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.statusFilter).toBe('all')
    expect(result.current.priorityFilter).toBe('all')
    expect(result.current.sortBy).toBe('dueDate')
  })
})
```

### Mocking Patterns

#### Mock Service Worker (MSW) Setup

```typescript
// test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Get all tasks
  http.get('/api/tasks', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Implement authentication',
        status: 'in-progress',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Fix bug in dashboard',
        status: 'pending',
        priority: 'medium',
      },
    ])
  }),

  // Create task
  http.post('/api/tasks', async ({ request }) => {
    const newTask = await request.json()
    return HttpResponse.json(
      {
        id: '3',
        ...newTask,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    )
  }),

  // Update task
  http.patch('/api/tasks/:id', async ({ params, request }) => {
    const updates = await request.json()
    return HttpResponse.json({
      id: params.id,
      ...updates,
      updatedAt: new Date().toISOString(),
    })
  }),

  // Delete task
  http.delete('/api/tasks/:id', ({ params }) => {
    return new HttpResponse(null, { status: 204 })
  }),
]
```

```typescript
// test/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

```typescript
// test/setup.ts
import '@testing-library/jest-dom'
import { server } from './mocks/server'

// Start server before all tests
beforeAll(() => server.listen())

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Clean up after all tests
afterAll(() => server.close())
```

### Test Utilities

```typescript
// test/utils.tsx
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## Performance Guidelines

### Code Splitting Strategy

#### 1. Route-Based Splitting (Priority 1)

Split by routes for the biggest impact.

```typescript
// app/router.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy load route components
const Dashboard = lazy(() => import('./routes/Dashboard'));
const TaskPage = lazy(() => import('./routes/TaskPage'));
const UserProfile = lazy(() => import('./routes/UserProfile'));
const Settings = lazy(() => import('./routes/Settings'));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

#### 2. Component-Based Splitting (Priority 2)

Split large, rarely-used components.

```typescript
// Lazy load heavy components
const ChartDashboard = lazy(() => import('@/components/ChartDashboard'));
const RichTextEditor = lazy(() => import('@/components/RichTextEditor'));
const VideoPlayer = lazy(() => import('@/components/VideoPlayer'));

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setShowChart(true)}>Show Chart</button>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <ChartDashboard />
        </Suspense>
      )}
    </div>
  );
};
```

#### 3. Feature-Based Splitting (Priority 3)

Split entire features that aren't always needed.

```typescript
// Lazy load feature modules
const AdminPanel = lazy(() => import('@/features/admin'));
const AdvancedReporting = lazy(() => import('@/features/reporting'));

const App = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Navigation />
      {user.isAdmin && (
        <Suspense fallback={<LoadingSpinner />}>
          <AdminPanel />
        </Suspense>
      )}
    </>
  );
};
```

### React Performance Optimization

#### 1. Memoization - Use Strategically

```typescript
// ✅ Good: Memoize expensive computations
const TaskList = ({ tasks, filters }: Props) => {
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => matchesFilters(task, filters))
      .sort((a, b) => compareTaskPriority(a, b));
  }, [tasks, filters]);

  return <div>{filteredTasks.map(task => <TaskCard key={task.id} task={task} />)}</div>;
};

// ✅ Good: Memo components that receive complex props
export const TaskCard = memo(({ task, onEdit, onDelete }: TaskCardProps) => {
  return <div>{/* ... */}</div>;
});

// ❌ Bad: Over-memoization
const Counter = () => {
  // Don't memoize simple operations
  const count = useMemo(() => 1 + 1, []); // Unnecessary
  return <div>{count}</div>;
};
```

#### 2. useCallback - For Callback Props

```typescript
// ✅ Good: Memoize callbacks passed to child components
const ParentComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskDelete = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []); // No dependencies

  const handleTaskUpdate = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []); // No dependencies

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={handleTaskDelete}
          onUpdate={handleTaskUpdate}
        />
      ))}
    </div>
  );
};

// ❌ Bad: Creating new function every render
const ParentComponent = () => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          // New function every render - causes TaskCard to re-render
          onDelete={(id) => deleteTask(id)}
        />
      ))}
    </div>
  );
};
```

#### 3. Key Prop - Stable Keys

```typescript
// ✅ Good: Use stable IDs
{tasks.map(task => (
  <TaskCard key={task.id} task={task} />
))}

// ❌ Bad: Using array index (causes issues when order changes)
{tasks.map((task, index) => (
  <TaskCard key={index} task={task} />
))}

// ❌ Bad: Using random values (recreates component every render)
{tasks.map(task => (
  <TaskCard key={Math.random()} task={task} />
))}
```

#### 4. Zustand Selectors - Avoid Unnecessary Re-renders

```typescript
// ✅ Good: Select only what you need
const TaskCounter = () => {
  const taskCount = useTaskStore((state) => state.tasks.length);
  return <div>Tasks: {taskCount}</div>;
};

// ❌ Bad: Selecting entire state (re-renders on any change)
const TaskCounter = () => {
  const state = useTaskStore();
  return <div>Tasks: {state.tasks.length}</div>;
};

// ✅ Good: Use shallow for multiple values
import { shallow } from 'zustand/shallow';

const TaskFilters = () => {
  const { statusFilter, priorityFilter } = useTaskStore(
    (state) => ({
      statusFilter: state.statusFilter,
      priorityFilter: state.priorityFilter,
    }),
    shallow
  );

  return (
    <div>
      <FilterSelect value={statusFilter} />
      <FilterSelect value={priorityFilter} />
    </div>
  );
};
```

### Bundle Optimization

#### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // Analyze bundle size
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    // Split vendor code
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React
          react: ['react', 'react-dom', 'react-router-dom'],

          // Separate React Query
          'react-query': ['@tanstack/react-query'],

          // Separate Zustand
          zustand: ['zustand'],

          // Separate UI library (if using)
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],

          // Split by feature (for large features)
          'feature-tasks': ['./src/features/tasks'],
          'feature-users': ['./src/features/users'],
        },
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    // Source maps for production debugging
    sourcemap: true,
  },

  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
```

#### Analyze Bundle Size

```bash
# Build with analysis
npm run build

# Open the generated stats.html to see bundle composition
# Look for:
# - Large dependencies that can be replaced
# - Duplicate code across chunks
# - Heavy features that should be lazy loaded
```

### Image Optimization

```typescript
// ✅ Good: Lazy load images below the fold
import { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src;
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className={isLoaded ? 'loaded' : 'loading'}
    />
  );
};

// ✅ Good: Use appropriate image formats
// - WebP for photos (smaller than JPEG)
// - SVG for icons and logos
// - PNG only when transparency needed

// ✅ Good: Provide multiple sizes
<picture>
  <source media="(min-width: 1024px)" srcSet="/hero-large.webp" />
  <source media="(min-width: 768px)" srcSet="/hero-medium.webp" />
  <img src="/hero-small.webp" alt="Hero" />
</picture>
```

### React Query Optimization

```typescript
// ✅ Good: Prefetch data on hover
const TaskList = () => {
  const queryClient = useQueryClient();

  const prefetchTask = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['task', id],
      queryFn: () => getTaskById(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <div>
      {tasks.map((task) => (
        <Link
          key={task.id}
          to={`/tasks/${task.id}`}
          onMouseEnter={() => prefetchTask(task.id)}
        >
          {task.title}
        </Link>
      ))}
    </div>
  );
};

// ✅ Good: Use staleTime to reduce refetches
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
  staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
});

// ✅ Good: Use select to transform data
const { data: taskTitles } = useQuery({
  queryKey: ['tasks'],
  queryFn: getTasks,
  select: (data) => data.map((task) => task.title), // Only extract titles
});
```

### Performance Monitoring

```typescript
// Add performance monitoring
// app/provider.tsx
import { useEffect } from 'react';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry);
            // Send to analytics
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    }
  }, []);

  return <>{children}</>;
};
```

### Performance Checklist

- [ ] Route-based code splitting implemented
- [ ] Heavy components lazy loaded
- [ ] Images lazy loaded and optimized
- [ ] Bundle analysis run and large deps identified
- [ ] Zustand selectors use specific state slices
- [ ] React Query staleTime configured appropriately
- [ ] Memoization used for expensive calculations
- [ ] useCallback used for child component callbacks
- [ ] Key props use stable IDs
- [ ] Large lists virtualized (use react-virtual or react-window)
- [ ] Performance monitoring added
- [ ] Web Vitals tracked (LCP, FID, CLS)

## Design Token System (Simplified 3-Layer)

### Layer 1: Primitives (Raw Values)

These are the raw design values - your source of truth.

```css
/* styles/tokens/primitives.css */
:root {
  /* Colors */
  --color-white: #ffffff;
  --color-black: #000000;

  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;

  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;

  --color-red-50: #fef2f2;
  --color-red-100: #fee2e2;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;

  --color-green-50: #f0fdf4;
  --color-green-100: #dcfce7;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --color-green-700: #15803d;

  --color-yellow-50: #fefce8;
  --color-yellow-100: #fef9c3;
  --color-yellow-500: #eab308;
  --color-yellow-600: #ca8a04;
  --color-yellow-700: #a16207;

  /* Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-8: 2rem; /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem; /* 48px */
  --spacing-16: 4rem; /* 64px */

  /* Typography */
  --font-family-sans:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'Fira Code', 'Courier New', monospace;

  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Border radius */
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem; /* 2px */
  --border-radius-md: 0.375rem; /* 6px */
  --border-radius-lg: 0.5rem; /* 8px */
  --border-radius-xl: 0.75rem; /* 12px */
  --border-radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-standard: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Layer 2: Semantic Tokens (Meaning - Theming Layer)

Map primitives to semantic roles. Override these for themes.

```css
/* styles/tokens/semantic.css */
:root {
  /* Brand colors */
  --color-primary: var(--color-blue-600);
  --color-primary-hover: var(--color-blue-700);
  --color-primary-light: var(--color-blue-50);

  --color-secondary: var(--color-gray-600);
  --color-secondary-hover: var(--color-gray-700);

  --color-accent: var(--color-blue-500);

  /* Semantic colors */
  --color-success: var(--color-green-600);
  --color-success-light: var(--color-green-50);
  --color-warning: var(--color-yellow-600);
  --color-warning-light: var(--color-yellow-50);
  --color-error: var(--color-red-600);
  --color-error-light: var(--color-red-50);
  --color-info: var(--color-blue-600);
  --color-info-light: var(--color-blue-50);

  /* Surface colors */
  --color-background: var(--color-white);
  --color-surface: var(--color-white);
  --color-surface-elevated: var(--color-gray-50);
  --color-surface-hover: var(--color-gray-100);

  /* Border colors */
  --color-border: var(--color-gray-200);
  --color-border-hover: var(--color-gray-300);
  --color-border-focus: var(--color-primary);

  /* Text colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary: var(--color-gray-500);
  --color-text-disabled: var(--color-gray-400);
  --color-text-inverse: var(--color-white);

  /* Interactive colors */
  --color-link: var(--color-primary);
  --color-link-hover: var(--color-primary-hover);
  --color-link-visited: var(--color-blue-800);

  /* Spacing semantic */
  --spacing-xs: var(--spacing-1);
  --spacing-sm: var(--spacing-2);
  --spacing-md: var(--spacing-4);
  --spacing-lg: var(--spacing-6);
  --spacing-xl: var(--spacing-8);
  --spacing-section: var(--spacing-12);
}
```

### Layer 3: Component Tokens (Component-Specific Values)

Components reference these tokens.

```css
/* styles/tokens/components.css */
:root {
  /* Button tokens */
  --button-padding-sm: var(--spacing-2) var(--spacing-3);
  --button-padding-md: var(--spacing-3) var(--spacing-4);
  --button-padding-lg: var(--spacing-4) var(--spacing-6);

  --button-primary-bg: var(--color-primary);
  --button-primary-bg-hover: var(--color-primary-hover);
  --button-primary-text: var(--color-text-inverse);
  --button-primary-border: var(--color-primary);

  --button-secondary-bg: var(--color-surface);
  --button-secondary-bg-hover: var(--color-surface-hover);
  --button-secondary-text: var(--color-text-primary);
  --button-secondary-border: var(--color-border);

  --button-danger-bg: var(--color-error);
  --button-danger-bg-hover: var(--color-red-700);
  --button-danger-text: var(--color-text-inverse);

  --button-border-radius: var(--border-radius-md);
  --button-font-weight: var(--font-weight-medium);
  --button-font-size: var(--font-size-sm);
  --button-transition: var(--transition-fast);

  /* Card tokens */
  --card-bg: var(--color-surface);
  --card-bg-hover: var(--color-surface-elevated);
  --card-border: var(--color-border);
  --card-border-radius: var(--border-radius-lg);
  --card-padding: var(--spacing-md);
  --card-shadow: var(--shadow-sm);
  --card-shadow-hover: var(--shadow-md);

  /* Input tokens */
  --input-bg: var(--color-surface);
  --input-border: var(--color-border);
  --input-border-hover: var(--color-border-hover);
  --input-border-focus: var(--color-border-focus);
  --input-text: var(--color-text-primary);
  --input-placeholder: var(--color-text-tertiary);
  --input-padding: var(--spacing-2) var(--spacing-3);
  --input-border-radius: var(--border-radius-md);
  --input-font-size: var(--font-size-base);

  /* Status badge tokens */
  --status-pending-bg: var(--color-warning-light);
  --status-pending-text: var(--color-warning);
  --status-in-progress-bg: var(--color-info-light);
  --status-in-progress-text: var(--color-info);
  --status-completed-bg: var(--color-success-light);
  --status-completed-text: var(--color-success);

  /* Priority badge tokens */
  --priority-low-bg: var(--color-gray-100);
  --priority-low-text: var(--color-gray-700);
  --priority-medium-bg: var(--color-yellow-100);
  --priority-medium-text: var(--color-yellow-700);
  --priority-high-bg: var(--color-error-light);
  --priority-high-text: var(--color-error);

  /* Modal tokens */
  --modal-bg: var(--color-surface);
  --modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --modal-border-radius: var(--border-radius-xl);
  --modal-padding: var(--spacing-lg);
  --modal-shadow: var(--shadow-xl);

  /* Navigation tokens */
  --nav-bg: var(--color-surface);
  --nav-border: var(--color-border);
  --nav-item-hover-bg: var(--color-surface-hover);
  --nav-item-active-bg: var(--color-primary-light);
  --nav-item-active-text: var(--color-primary);
}
```

### Dark Theme Override

Override Layer 2 (semantic) tokens for dark mode.

```css
/* styles/themes/dark.css */
[data-theme='dark'] {
  /* Invert semantic colors */
  --color-background: var(--color-gray-950);
  --color-surface: var(--color-gray-900);
  --color-surface-elevated: var(--color-gray-800);
  --color-surface-hover: var(--color-gray-700);

  --color-border: var(--color-gray-700);
  --color-border-hover: var(--color-gray-600);

  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-300);
  --color-text-tertiary: var(--color-gray-400);
  --color-text-disabled: var(--color-gray-600);

  /* Adjust primary for better contrast */
  --color-primary: var(--color-blue-400);
  --color-primary-hover: var(--color-blue-300);
  --color-primary-light: var(--color-blue-900);

  /* Adjust semantic colors for dark background */
  --color-success: var(--color-green-400);
  --color-success-light: var(--color-green-900);
  --color-warning: var(--color-yellow-400);
  --color-warning-light: var(--color-yellow-900);
  --color-error: var(--color-red-400);
  --color-error-light: var(--color-red-900);

  /* Adjust shadows for dark mode */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
}
```

### Usage in Components

```css
/* ✅ Correct - Use component tokens */
.button-primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: var(--button-padding-md);
  border-radius: var(--button-border-radius);
  font-weight: var(--button-font-weight);
  transition: var(--button-transition);
}

.button-primary:hover {
  background: var(--button-primary-bg-hover);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
}

/* ❌ Wrong - Don't use primitives directly */
.button {
  background: var(--color-blue-600); /* Use --button-primary-bg instead */
  padding: 0.75rem 1rem; /* Use --button-padding-md instead */
}

/* ❌ Wrong - Don't hardcode values */
.card {
  background: #ffffff; /* Use --card-bg instead */
  border-radius: 8px; /* Use --card-border-radius instead */
}
```

### Implementing Theme Switching

```typescript
// hooks/useTheme.ts
import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'theme-storage' }
  )
)

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore()

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return { theme, setTheme, toggleTheme }
}
```

```typescript
// components/ThemeToggle.tsx
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

## Directory Structure

```
src/
├── app/                         # Application layer
│   ├── routes/                  # Application routes/pages
│   │   ├── Home/
│   │   ├── Dashboard/
│   │   └── index.tsx
│   ├── App.tsx                  # Main application component
│   ├── provider.tsx             # Global providers (theme, auth, etc.)
│   └── router.tsx               # Router configuration
│
├── features/                    # Feature-based modules (MOST CODE LIVES HERE)
│   ├── auth/                    # Authentication feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.ts
│   ├── tasks/                   # Task management feature
│   ├── users/                   # User management feature
│   └── [feature-name]/          # Each feature follows same structure
│
├── components/                  # Shared UI components
│   └── ui/                      # Reusable UI components
│       ├── Button/
│       │   ├── Button.tsx
│       │   ├── Button.css
│       │   ├── Button.stories.tsx
│       │   ├── Button.test.tsx
│       │   └── index.ts
│       ├── Modal/
│       ├── Input/
│       └── [ComponentName]/
│
├── hooks/                       # Shared custom hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   ├── useTheme.ts
│   └── index.ts
│
├── stores/                      # Global Zustand stores
│   ├── authStore.ts             # Global auth state
│   ├── themeStore.ts            # Global theme state
│   └── index.ts
│
├── lib/                         # External library wrappers
│   ├── apiClient.ts             # Axios/fetch wrapper
│   ├── queryClient.ts           # React Query config
│   └── index.ts
│
├── utils/                       # Shared utility functions
│   ├── date.ts
│   ├── string.ts
│   ├── validation.ts
│   └── index.ts
│
├── types/                       # Shared TypeScript types
│   ├── api.types.ts
│   ├── common.types.ts
│   └── index.ts
│
├── config/                      # Configuration files
│   ├── env.ts                   # Environment variables
│   ├── constants.ts             # App constants
│   └── index.ts
│
├── styles/                      # Global styles and design tokens
│   ├── tokens/
│   │   ├── primitives.css       # Layer 1: Raw values
│   │   ├── semantic.css         # Layer 2: Semantic roles
│   │   └── components.css       # Layer 3: Component tokens
│   ├── themes/
│   │   ├── dark.css             # Dark theme overrides
│   │   └── high-contrast.css    # High contrast theme
│   ├── reset.css                # CSS reset
│   ├── global.css               # Global styles
│   └── variables.css            # All tokens combined (imports above)
│
├── test/                        # Test utilities and setup
│   ├── setup.ts                 # Test setup (MSW, etc.)
│   ├── utils.tsx                # Test utilities (render with providers)
│   └── mocks/
│       ├── handlers.ts          # MSW handlers
│       └── server.ts            # MSW server setup
│
├── main.tsx                     # Application entry point
└── vite-env.d.ts                # Vite type definitions
```

## Path Aliases with TypeScript

**TypeScript configuration** (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Vite configuration** (`vite.config.ts`):

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

This allows clean imports:

```tsx
// ❌ Avoid
import { Button } from '../../../components/ui/Button'

// ✅ Use
import { Button } from '@/components/ui/Button'

// ✅ Or feature imports via public API
import { LoginForm, useAuth } from '@/features/auth'
```

## ESLint Configuration for Import Boundaries

**CRITICAL:** Configure ESLint to enforce unidirectional imports and maintain architectural boundaries.

Install required packages:

```bash
npm install -D eslint-plugin-import eslint-import-resolver-typescript
```

**ESLint configuration** (`eslint.config.js` or `.eslintrc.js`):

```js
module.exports = {
  // ... other config
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    // Enforce import boundaries
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Disallow features from importing from app layer
          {
            target: './src/features',
            from: './src/app',
            message:
              'Features cannot import from the app layer. Move shared code to src/ or keep it in the feature.',
          },

          // Disallow shared code from importing from features or app
          {
            target: [
              './src/components',
              './src/hooks',
              './src/lib',
              './src/stores',
              './src/types',
              './src/utils',
            ],
            from: ['./src/features', './src/app'],
            message:
              'Shared code cannot import from features or app. Move the code to the feature or make it truly shared.',
          },
        ],
      },
    ],

    // Enforce index.ts usage for feature imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              '@/features/*/components/*',
              '@/features/*/hooks/*',
              '@/features/*/stores/*',
            ],
            message:
              'Import from the feature\'s public API (index.ts) instead: import { X } from "@/features/feature-name"',
          },
        ],
      },
    ],
  },
}
```

These rules will:

1. **Prevent features from importing from app** - Keeps features independent
2. **Prevent shared code from importing from features** - Maintains one-way dependency
3. **Enforce public API usage** - Imports must go through feature's index.ts

When you violate these rules, ESLint will show an error during development and in CI/CD.

## Setup Instructions

```bash
# Install dependencies
npm install

# Install core dependencies
npm install react react-dom react-router-dom
npm install zustand @tanstack/react-query
npm install axios  # or your preferred HTTP client

# Install dev dependencies
npm install -D typescript @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react
npm install -D eslint eslint-plugin-import eslint-import-resolver-typescript
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D msw  # Mock Service Worker for testing

# Run development server
npm run dev

# Run Storybook (for UI component development)
npm run storybook

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Build Storybook
npm run build-storybook

# Lint code
npm run lint

# Lint and fix
npm run lint:fix

# Format code
npm run format
```

## Environment Variables

Create `.env.local` file:

```
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

## Importing Global Styles

In your main entry file (`src/main.tsx` or `src/index.tsx`):

```tsx
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './app/App'

// Import global styles and design tokens
import './styles/reset.css' // CSS reset first
import './styles/tokens/primitives.css' // Layer 1: Primitives
import './styles/tokens/semantic.css' // Layer 2: Semantic
import './styles/tokens/components.css' // Layer 3: Components
import './styles/themes/dark.css' // Theme overrides
import './styles/global.css' // Global styles last

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
```

The order matters:

1. Reset styles first
2. Design token layers (primitives → semantic → components)
3. Theme overrides
4. Global styles last

## Additional Context

**Why this architecture (Bulletproof React)?**

- **Feature-based organization:** Code is organized by business domain, not technical type
- **Scalability:** Easy to add new features without touching existing code
- **Team collaboration:** Multiple teams can work on different features independently
- **Separation of concerns:** UI components are reusable and testable in isolation
- **Type safety:** TypeScript prevents runtime errors
- **State management trinity:** React Query (server) + Zustand (client) + Context (DI) = comprehensive solution
- **Simplified design tokens:** 3-layer CSS system enables effortless theming and rebranding
  - Layer 1: Primitives (raw values) - source of truth
  - Layer 2: Semantic roles (what values mean) - theming layer
  - Layer 3: Component tokens (how components use values) - consistency layer
- **Living documentation:** Storybook serves as interactive documentation for reusable UI components
- **Isolated development:** Build and test components without running the full application
- **Clear boundaries:** Enforced import rules prevent architectural violations
- **Screaming architecture:** Folder structure immediately tells you what the app does

**Design Token Benefits:**

- **One-click rebranding:** Change Layer 2 semantic tokens to rebrand entire application
- **Effortless theming:** Override Layer 2 for dark mode, high contrast, etc.
- **A/B testing:** Test different styles without touching components
- **Design-dev sync:** Mirrors design tools like Figma's design token structure
- **Maintenance:** Change once, propagate everywhere
- **Reduced complexity:** 3 layers instead of 4 balances power with simplicity

**Performance First:**

- Route-based code splitting for smaller initial bundles
- Lazy loading for heavy components
- React Query caching reduces unnecessary API calls
- Zustand minimizes re-renders with precise selectors
- Design tokens enable CSS-only theming (no JS re-renders)

**Testing Philosophy:**

- Test behavior, not implementation
- Integration tests for containers
- Unit tests for UI components
- MSW for API mocking
- React Query testing utilities
- Zustand testable stores

**When to scale up:**

- Start with this structure for teams of 2-10
- Move to workspaces when you have 15+ developers
- Extract features to packages when they're truly independent
- Consider micro-frontends only for very large organizations

**Known Technical Debt:**

- [List any known issues or planned refactoring]

**Future Plans:**

- [List any planned architectural changes]

---

## Quick Decision Guide

When in doubt, prioritize:

1. **Feature colocation** - Keep feature code together
2. **Design token discipline** - Use component tokens (Layer 3), never primitives or hardcoded values
3. **Right tool for the job** - React Query for server, Zustand for client, Context for DI, useState for local
4. **Type safety** - Explicit types everywhere, no `any`
5. **Import boundaries** - Respect the unidirectional import rules (App → Features → Shared)
6. **Component separation** - Split UI/Container only when component is reused
7. **Public APIs** - Only export what's needed via index.ts
8. **Reusability** - Extract to shared when used 3+ times
9. **Storybook for shared** - Build reusable UI components in isolation
10. **Performance awareness** - Code split routes, lazy load heavy components
11. **Test behavior** - Focus on what users see and do, not implementation
12. **Readability over cleverness** - Code is read more than written

**Key Patterns to Follow:**

```typescript
// ✅ Good patterns
import { TaskCard } from '@/features/tasks';                    // Public API
const count = useTaskStore((state) => state.tasks.length);     // Precise selector
const { data } = useQuery({ queryKey: ['tasks'], ... });       // React Query for server
const [isOpen, setIsOpen] = useState(false);                   // useState for local UI

// ❌ Anti-patterns to avoid
import { TaskCard } from '@/features/tasks/components/ui/TaskCard';  // Bypassing public API
const state = useTaskStore();                                         // Selecting entire state
const [tasks, setTasks] = useState([]);                              // Local state for server data
```

Remember:

- Start simple, scale when needed
- Use the 3-layer design token system for all styling
- React Query for server state, Zustand for client state
- Split components only when they're reused
- Test behavior, not implementation
- Performance matters - code split and lazy load
