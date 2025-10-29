# Repository Instructions

## Tech Stack

- **React 18+** with TypeScript (strict mode) - Suspense, useTransition, ErrorBoundary
- **Zustand 4+** with Immer middleware (client state)
- **React Query v5** (server state with optimistic updates)
- **Context** (DI only, not state)
- **Vitest + Testing Library** with MSW v2
- **Storybook 8+** (CSF 3 format)
- **Pure CSS** with 3-layer design tokens
- **UI/Container split** (only when reused 3+ times)

## Workflow

Analyze the requirements and start with a simple implementation. As complexity grows, refactor to introduce layers, state management, and design tokens. Always prioritize maintainability and clarity.

Use playwright for evaluating the UI.

Use storybook for developing and documenting components in isolation.

Always evaluate if a component already exists in the shared library before creating a new one. Attempt to reuse and extend existing components when possible.

When refactoring, aim to adhere to the established architecture and patterns. Ensure that new code follows the same conventions for imports, state management, and component structure. Aim to split components into UI and Containers, and adhere to single responsibility principles.

Split large features into smaller, manageable tasks. Implement and test each task incrementally to ensure stability and correctness.

## Architecture

### Layer Structure

```
App (routes, pages)
  ↓ can import
Features (business domains: auth, users, posts)
  ↓ can import
Shared (components/ui, hooks, utils, lib, stores, types)
```

**Rule:** Unidirectional imports only. Shared cannot import Features/App.

### Component Pattern

- **Container**: Data fetching, state, business logic, handlers
- **UI**: Pure presentation, props only, no store/API access
- **Split only when reused 3+ times**

### Design Tokens (3 Layers)

```
Primitives (--color-blue-500)
  → Semantic (--color-primary)
    → Component (--button-primary-bg)
```

Always use component tokens in CSS.

## Folder Structure

```
src/
├── app/              # Routes, App component, router
├── features/         # Business domains
│   └── auth/
│       ├── api/
│       ├── components/
│       │   ├── ui/          # Presentational
│       │   └── containers/  # Data + logic
│       ├── hooks/
│       ├── stores/
│       ├── types/
│       └── index.ts         # Public API exports only
├── components/ui/    # Shared components
├── hooks/
├── stores/
├── lib/              # Third-party wrappers
├── utils/
├── types/
├── config/
├── constants/
└── styles/
    └── tokens/
        ├── primitives.css
        ├── semantic.css
        └── components.css
```

## Key Rules

### State Management

```tsx
// ✅ Server state
const { data } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

// ✅ Client state
const count = useTaskStore((s) => s.tasks.length);

// ✅ Local UI state
const [isOpen, setIsOpen] = useState(false);

// ❌ Never use useState for server data
```

### Imports

```tsx
// ✅ Feature public API
import { LoginForm, useAuth } from "@/features/auth";

// ❌ Bypassing public API
import { LoginForm } from "@/features/auth/components/ui/LoginForm";
```

### Container Example

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/features/users/stores/userStore";
import { fetchProfile, updateProfile } from "@/features/users/api";
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  return <UserCard user={user} profile={profile} onEdit={mutation.mutate} />;
}
```

### UI Example

```tsx
import type { User, Profile, ProfileUpdateData } from "@/features/users/types";

interface UserCardProps {
  user: User | null;
  profile: Profile;
  onEdit: (data: ProfileUpdateData) => void;
}

export function UserCard({ user, profile, onEdit }: UserCardProps) {
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
```

### Zustand Store

```tsx
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  immer((set) => ({
    tasks: [],
    addTask: (task) =>
      set((state) => {
        state.tasks.push(task);
      }),
    removeTask: (id) =>
      set((state) => {
        const index = state.tasks.findIndex((t) => t.id === id);
        if (index !== -1) state.tasks.splice(index, 1);
      }),
  }))
);

// Selectors
export const useCompletedTasks = () =>
  useTaskStore((state) => state.tasks.filter((t) => t.completed));
```

### React Query Patterns

```tsx
// API Layer
export const tasksApi = {
  getAll: () => api.get<Task[]>("/tasks"),
  create: (data: CreateTaskData) => api.post<Task>("/tasks", data),
  update: (id: string, data: UpdateTaskData) =>
    api.patch<Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

// Query Hook
export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAll,
    staleTime: 5 * 60 * 1000,
  });
}

// Mutation Hook with Optimistic Updates
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      tasksApi.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: Task[] | undefined) =>
        old?.map((task) => (task.id === id ? { ...task, ...data } : task))
      );

      return { previous };
    },
    onError: (err, vars, context) => {
      queryClient.setQueryData(["tasks"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
```

## Testing

### Component Test

```tsx
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TaskList } from "./TaskList";

test("adds new task", async () => {
  const user = userEvent.setup();
  render(<TaskList />);

  await user.type(screen.getByRole("textbox"), "New task");
  await user.click(screen.getByRole("button", { name: /add/i }));

  expect(screen.getByText("New task")).toBeInTheDocument();
});
```

### API Mock (MSW)

```tsx
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.get("/api/tasks", () => {
    return HttpResponse.json([{ id: "1", title: "Task 1", completed: false }]);
  }),
];

export const server = setupServer(...handlers);
```

## Storybook

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "Button" },
};
```

## Import Order

```tsx
// 1. React
import { useState, useEffect } from "react";

// 2. External libraries
import { useQuery } from "@tanstack/react-query";

// 3. Internal (alphabetical by path segment)
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth";
import { api } from "@/lib/api";

// 4. Types
import type { User } from "@/types/user";

// 5. Relative imports
import { helper } from "./utils";
```

## TypeScript Rules

- Use `satisfies` for type validation while preserving inference
- Never use `any` - use `unknown` if truly dynamic
- Enable strict mode: `strictNullChecks`, `noImplicitAny`, `exactOptionalPropertyTypes`
- Use `type` for objects, `interface` for extensible shapes
- Leverage discriminated unions for variants

## Code Style

- **Double quotes** for strings
- **Semicolons** required
- **2-space** indentation
- **100 char** line length
- Named exports (no default exports except for route components)

## Anti-Patterns to Avoid

```tsx
// ❌ useState for server data
const [users, setUsers] = useState([]);

// ❌ Bypassing feature public API
import { LoginForm } from "@/features/auth/components/ui/LoginForm";

// ❌ Wrong import order
import { useAuth } from "@/features/auth";
import { useState } from "react";

// ❌ Using "any"
export function Component(props: any) { }

// ❌ Manual spread with Zustand+Immer
set((state) => ({ ...state, items: [...state.items, item] }));

// ❌ No error handling
const { data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
return <div>{data.map(...)}</div>; // data might be undefined
```

## Modern React Patterns

```tsx
// Suspense with useSuspenseQuery
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
  return <div>{user.name}</div>;
}

// Wrap with boundaries
export function UserProfileRoute() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Skeleton />}>
        <UserProfile userId="123" />
      </Suspense>
    </ErrorBoundary>
  );
}

// useTransition for non-urgent updates
const [isPending, startTransition] = useTransition();
const handleClick = () => {
  startTransition(() => {
    setFilter(newValue);
  });
};
```

---

**Remember:** Start simple, scale when needed. Respect layer boundaries. Use design tokens. Test behavior, not implementation.
