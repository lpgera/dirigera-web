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
const { data } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

// ✅ Client state
const count = useTaskStore((s) => s.tasks.length); // Precise selector

// ✅ Local UI state
const [isOpen, setIsOpen] = useState(false);

// ❌ Never use useState for server data
const [tasks, setTasks] = useState([]); // Wrong!
```

### Imports

```tsx
// ✅ Feature public API
import { LoginForm, useAuth } from "@/features/auth";

// ❌ Bypassing public API
import { LoginForm } from "@/features/auth/components/ui/LoginForm";

// ✅ Shared components
import { Button } from "@/components/ui/Button";
```

### Component Examples

**Container (data + logic):**

```tsx
// features/users/components/containers/UserDashboard.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserStore } from "@/features/users/stores/userStore";
import { fetchProfile, updateProfile } from "@/features/users/api";
import type { ProfileUpdateData } from "@/features/users/types";

import { UserCard } from "../ui/UserCard";

export function UserDashboard() {
  const user = useUserStore((s) => s.currentUser);
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleEdit = (data: ProfileUpdateData) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <UserCard
      user={user}
      profile={profile}
      onEdit={handleEdit}
      isUpdating={mutation.isPending}
    />
  );
}
```

**UI (presentation only):**

```tsx
// features/users/components/ui/UserCard.tsx
import type { User, Profile, ProfileUpdateData } from "@/features/users/types";

interface UserCardProps {
  user: User | null;
  profile: Profile;
  onEdit: (data: ProfileUpdateData) => void;
  isUpdating: boolean;
}

export function UserCard({ user, profile, onEdit, isUpdating }: UserCardProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onEdit({
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
    });
  };

  return (
    <div className="user-card">
      <h2>{user?.name}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" defaultValue={profile.name} />
        <textarea name="bio" defaultValue={profile.bio} />
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
```

### Feature Structure

```tsx
// features/auth/index.ts - Public API
export { LoginForm } from "./components/ui/LoginForm";
export { useAuth } from "./hooks/useAuth";
export { authStore } from "./stores/authStore";
export type { LoginCredentials } from "./types";
```

### Zustand Store

**Basic Store:**

```tsx
// features/tasks/stores/taskStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      immer((set) => ({
        tasks: [],

        addTask: (task) =>
          set((state) => {
            state.tasks.push(task); // Immer allows direct mutation
          }),

        removeTask: (id) =>
          set((state) => {
            const index = state.tasks.findIndex((t) => t.id === id);
            if (index !== -1) state.tasks.splice(index, 1);
          }),

        toggleTask: (id) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === id);
            if (task) task.completed = !task.completed;
          }),

        updateTask: (id, updates) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === id);
            if (task) Object.assign(task, updates);
          }),
      })),
      {
        name: "task-storage",
        partialize: (state) => ({ tasks: state.tasks }),
      }
    )
  )
);
```

**Computed Values (Selectors):**

```tsx
// features/tasks/stores/selectors.ts
import { useTaskStore } from "./taskStore";

export const useCompletedTasks = () =>
  useTaskStore((state) => state.tasks.filter((t) => t.completed));

export const useActiveTasks = () =>
  useTaskStore((state) => state.tasks.filter((t) => !t.completed));

export const useTaskById = (id: string) =>
  useTaskStore((state) => state.tasks.find((t) => t.id === id));
```

### React Query

**API Layer:**

```tsx
// features/tasks/api/tasks.ts
import { api } from "@/lib/api";

import type { Task, CreateTaskData, UpdateTaskData } from "../types";

export const tasksApi = {
  getAll: () => api.get<Task[]>("/tasks"),

  getById: (id: string) => api.get<Task>(`/tasks/${id}`),

  create: (data: CreateTaskData) => api.post<Task>("/tasks", data),

  update: (id: string, data: UpdateTaskData) =>
    api.patch<Task>(`/tasks/${id}`, data),

  delete: (id: string) => api.delete(`/tasks/${id}`),
};
```

**Query Hooks:**

```tsx
// features/tasks/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksApi } from "../api/tasks";
import type { CreateTaskData, UpdateTaskData } from "../types";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => tasksApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      tasksApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.id] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
```

**Optimistic Updates:**

```tsx
// features/tasks/hooks/useOptimisticTasks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksApi } from "../api/tasks";
import type { Task, UpdateTaskData } from "../types";

export const useOptimisticUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      tasksApi.update(id, data),

    // Optimistically update before mutation
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      // Optimistically update
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) => (task.id === id ? { ...task, ...data } : task))
      );

      // Return context for rollback
      return { previousTasks };
    },

    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    // Refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
```

**Infinite Queries:**

```tsx
// features/posts/hooks/useInfinitePosts.ts
import { useInfiniteQuery } from "@tanstack/react-query";

import { postsApi } from "../api/posts";

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => postsApi.getPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });
};

// Usage in component
export function PostsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  return (
    <div>
      {data?.pages.map((page) =>
        page.posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
```

### Testing

**Component Test:**

```tsx
// features/tasks/components/ui/TaskCard.test.tsx
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { TaskCard } from "./TaskCard";

describe("TaskCard", () => {
  it("renders task information", () => {
    const task = {
      id: "1",
      title: "Test Task",
      completed: false,
    };

    render(<TaskCard task={task} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", async () => {
    const onToggle = vi.fn();
    const task = {
      id: "1",
      title: "Test Task",
      completed: false,
    };

    render(<TaskCard task={task} onToggle={onToggle} onDelete={vi.fn()} />);

    await userEvent.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledWith("1");
  });
});
```

**Hook Test:**

```tsx
// features/tasks/hooks/useTasks.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { createWrapper } from "@/test/utils";

import { useTasks } from "./useTasks";

describe("useTasks", () => {
  it("fetches tasks successfully", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(2);
  });
});
```

**MSW Handler:**

```tsx
// test/mocks/handlers/tasks.ts
import { http, HttpResponse } from "msw";

import type { Task } from "@/features/tasks/types";

const tasks: Task[] = [
  { id: "1", title: "Task 1", completed: false },
  { id: "2", title: "Task 2", completed: true },
];

export const tasksHandlers = [
  http.get("/api/tasks", () => {
    return HttpResponse.json(tasks);
  }),

  http.get("/api/tasks/:id", ({ params }) => {
    const task = tasks.find((t) => t.id === params.id);
    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(task);
  }),

  http.post("/api/tasks", async ({ request }) => {
    const newTask = (await request.json()) as Task;
    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch("/api/tasks/:id", async ({ params, request }) => {
    const updates = (await request.json()) as Partial<Task>;
    const index = tasks.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    tasks[index] = { ...tasks[index], ...updates };
    return HttpResponse.json(tasks[index]);
  }),

  http.delete("/api/tasks/:id", ({ params }) => {
    const index = tasks.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    tasks.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
```

**Test Setup:**

```tsx
// test/utils.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

**Vitest Config:**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

**Test Setup File:**

```ts
// test/setup.ts
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "./mocks/server";

// Start MSW server
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
```

### Storybook

**Component Story:**

```tsx
// features/tasks/components/ui/TaskCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { TaskCard } from "./TaskCard";

const meta = {
  title: "Features/Tasks/TaskCard",
  component: TaskCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onToggle: { action: "toggled" },
    onDelete: { action: "deleted" },
  },
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: {
      id: "1",
      title: "Complete project documentation",
      completed: false,
    },
  },
};

export const Completed: Story = {
  args: {
    task: {
      id: "2",
      title: "Review pull requests",
      completed: true,
    },
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      id: "3",
      title:
        "This is a very long task title that should demonstrate how the component handles text overflow and wrapping",
      completed: false,
    },
  },
};
```

**Story with Decorators:**

```tsx
// features/auth/components/ui/LoginForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LoginForm } from "./LoginForm";

const queryClient = new QueryClient();

const meta = {
  title: "Features/Auth/LoginForm",
  component: LoginForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  play: async ({ canvasElement }) => {
    // Simulate error state
  },
};
```

### Context (Dependency Injection Only)

**API Client Context:**

```tsx
// lib/api/ApiContext.tsx
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import { ApiClient } from "./client";

const ApiContext = createContext<ApiClient | null>(null);

interface ApiProviderProps {
  client: ApiClient;
  children: ReactNode;
}

export function ApiProvider({ client, children }: ApiProviderProps) {
  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

export function useApiClient() {
  const client = useContext(ApiContext);
  if (!client) {
    throw new Error("useApiClient must be used within ApiProvider");
  }
  return client;
}
```

**Usage:**

```tsx
// app/App.tsx
import { ApiProvider } from "@/lib/api/ApiContext";
import { apiClient } from "@/lib/api/client";

export function App() {
  return (
    <ApiProvider client={apiClient}>
      <Router />
    </ApiProvider>
  );
}

// features/users/api/users.ts
import { useApiClient } from "@/lib/api/ApiContext";

export function useUserApi() {
  const api = useApiClient();

  return {
    getAll: () => api.get<User[]>("/users"),
    getById: (id: string) => api.get<User>(`/users/${id}`),
  };
}
```

### Router Setup

**Routes Configuration:**

```tsx
// app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// Lazy load routes
const Dashboard = lazy(() => import("./routes/Dashboard"));
const Profile = lazy(() => import("./routes/Profile"));
const Settings = lazy(() => import("./routes/Settings"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "profile",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "settings",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          </ErrorBoundary>
        ),
      },
    ],
  },
]);
```

**Root Layout:**

```tsx
// app/routes/RootLayout.tsx
import { Outlet } from "react-router-dom";

import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/Sidebar";

export function RootLayout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

### Design Tokens

**Primitives:**

```css
/* styles/tokens/primitives.css */
:root {
  /* Colors */
  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;

  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-500: #6b7280;
  --color-gray-700: #374151;
  --color-gray-900: #111827;

  --color-red-500: #ef4444;
  --color-green-500: #10b981;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Typography */
  --font-sans:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "SF Mono", Monaco, "Cascadia Code", monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Borders */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

**Semantic Tokens:**

```css
/* styles/tokens/semantic.css */
:root {
  /* Brand colors */
  --color-primary: var(--color-blue-600);
  --color-primary-hover: var(--color-blue-700);
  --color-primary-light: var(--color-blue-50);

  /* Status colors */
  --color-success: var(--color-green-500);
  --color-error: var(--color-red-500);

  /* Text colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-muted: var(--color-gray-500);

  /* Background colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: var(--color-gray-50);
  --color-bg-hover: var(--color-gray-100);

  /* Border colors */
  --color-border: var(--color-gray-200);
  --color-border-hover: var(--color-gray-300);
}
```

**Component Tokens:**

```css
/* styles/tokens/components.css */
:root {
  /* Button */
  --button-primary-bg: var(--color-primary);
  --button-primary-bg-hover: var(--color-primary-hover);
  --button-primary-text: #ffffff;
  --button-padding: var(--space-3) var(--space-6);
  --button-radius: var(--radius-md);
  --button-font-weight: var(--font-medium);

  /* Input */
  --input-bg: var(--color-bg-primary);
  --input-border: var(--color-border);
  --input-border-focus: var(--color-primary);
  --input-padding: var(--space-3);
  --input-radius: var(--radius-md);

  /* Card */
  --card-bg: var(--color-bg-primary);
  --card-border: var(--color-border);
  --card-shadow: var(--shadow-sm);
  --card-padding: var(--space-6);
  --card-radius: var(--radius-lg);
}
```

**Component Using Tokens:**

```css
/* components/ui/Button.module.css */
.button {
  padding: var(--button-padding);
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  border-radius: var(--button-radius);
  font-weight: var(--button-font-weight);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: var(--button-primary-bg-hover);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Linting Configuration

**ESLint Config:**

```js
// eslint.config.js
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...typescript.configs["recommended"].rules,
      ...react.configs["recommended"].rules,
      ...reactHooks.configs["recommended"].rules,

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",

      // Imports
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
];
```

**Import Boundaries:**

```js
// Additional ESLint rules for architecture enforcement
export default [
  // ... previous config
  {
    rules: {
      // Prevent circular dependencies
      "import/no-cycle": ["error", { maxDepth: 2 }],

      // Enforce layer boundaries
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // Shared cannot import from Features or App
            {
              target: "./src/(components|hooks|stores|lib|utils|types)",
              from: "./src/(features|app)",
              message: "Shared layer cannot import from Features or App",
            },
            // Features cannot import from App
            {
              target: "./src/features",
              from: "./src/app",
              message: "Features cannot import from App layer",
            },
            // Features cannot import from other features (enforce through index.ts)
            {
              target: "./src/features/*/!(index).ts",
              from: "./src/features/*",
              message:
                "Features must import from other features via index.ts public API only",
            },
          ],
        },
      ],
    },
  },

  // Enforce public API usage
  {
    rules: {
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            // Allow internal imports within same feature
            "**/features/*/components/**",
            "**/features/*/hooks/**",
            "**/features/*/stores/**",
            "**/features/*/api/**",
            "**/features/*/utils/**",
            "**/features/*/types/**",
            // Allow shared internal imports
            "**/components/**",
            "**/hooks/**",
            "**/stores/**",
            "**/lib/**",
            "**/utils/**",
            "**/types/**",
            "**/styles/**",
            "**/config/**",
            "**/constants/**",
            // Allow node_modules
            "**/*.css",
            "**/*.scss",
          ],
        },
      ],
    },
  },
];
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
import { useState, useTransition } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth";
import { dashboardApi } from "@/features/dashboard/api";

import type { DashboardData } from "@/features/dashboard/types";

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => dashboardApi.getData(user!.id),
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: dashboardApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const handleClick = () => {
    startTransition(() => {
      setIsOpen(true);
    });
  };

  const handleUpdate = (updates: Partial<DashboardData>) => {
    mutation.mutate(updates);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <Button onClick={handleClick} disabled={isPending}>
        {isPending ? "Opening..." : "Open"}
      </Button>
      {data && <DashboardContent data={data} onUpdate={handleUpdate} />}
    </div>
  );
}
```

### Modern Pattern Examples ✅

```tsx
// Using Suspense with useSuspenseQuery
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

export function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{user.name}</div>; // No loading state needed
}

// Wrap with Suspense boundary
export function UserProfileRoute() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId="123" />
    </Suspense>
  );
}

// Using Error Boundary
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export function DashboardRoute() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}

// Proper TypeScript with satisfies
import type { RouteObject } from "react-router-dom";

export const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
] satisfies RouteObject[];

// Using Immer with Zustand
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useStore = create<State>()(
  immer((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        state.items.push(item); // Direct mutation with Immer
      }),
  }))
);
```

### Bad Examples ❌

```tsx
// Single quotes - Wrong!
import { Button } from "@/components/ui/Button";

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
export function Component(props: any) { // Don't use "any"
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
