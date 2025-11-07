# State Management - Agent Guide

## Decision Tree

```
Server/API data? → React Query
Global UI state? → Zustand
Service/config injection? → Context API
Local component state? → useState/useReducer
```

## React Query (Server State)

### Setup

```tsx
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### Query Hook

```tsx
// features/user/hooks/useUser.ts
export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
}

// Usage
const { data, isLoading, error } = useUser(userId);
```

### Mutation Hook

```tsx
// features/user/hooks/useUpdateUser.ts
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
    },
  });
}

// Usage
const updateUser = useUpdateUser();
updateUser.mutate({ id: "1", data: { name: "New Name" } });
```

### Query Keys Factory

```tsx
// features/user/hooks/queryKeys.ts
export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
};

// Invalidate all users
queryClient.invalidateQueries({ queryKey: userKeys.all });
```

## Zustand (Global Client State)

### Basic Store

```tsx
// stores/useUIStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        sidebarOpen: true,
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () =>
          set((state) => ({
            sidebarOpen: !state.sidebarOpen,
          })),
      }),
      { name: "ui-storage" }
    ),
    { name: "UIStore" }
  )
);
```

### Usage (Precise Selectors)

```tsx
// ✅ Good - only re-renders when theme changes
const theme = useUIStore((state) => state.theme);
const setTheme = useUIStore((state) => state.setTheme);

// ❌ Bad - re-renders on any state change
const { theme, setTheme } = useUIStore();
```

### Async Actions

```tsx
interface TodoState {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],

  fetchTodos: async () => {
    const todos = await api.getTodos();
    set({ todos });
  },
}));
```

## Context API (Dependency Injection)

### Service Provider

```tsx
// lib/analytics/AnalyticsContext.tsx
const AnalyticsContext = createContext<AnalyticsService | null>(null);

export function AnalyticsProvider({ children }) {
  const analytics: AnalyticsService = {
    track: (event, properties) => {
      /* implementation */
    },
    identify: (userId) => {
      /* implementation */
    },
  };

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context)
    throw new Error("useAnalytics must be within AnalyticsProvider");
  return context;
}
```

### Feature Flags

```tsx
// lib/features/FeatureContext.tsx
export function FeatureFlagsProvider({ children }) {
  const flags = {
    newDashboard: true,
    betaFeatures: false,
  };

  return (
    <FeatureFlagsContext.Provider value={flags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeature(flag: keyof FeatureFlags) {
  return useFeatureFlags()[flag];
}
```

## Local State (useState/useReducer)

### useState

```tsx
// Simple local state
const [isOpen, setIsOpen] = useState(false);
const [count, setCount] = useState(0);
```

### useReducer

```tsx
// Complex state with related values
type State = {
  step: number;
  data: FormData;
  errors: Record<string, string>;
};

type Action =
  | { type: "NEXT_STEP" }
  | { type: "UPDATE_DATA"; payload: Partial<FormData> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "UPDATE_DATA":
      return { ...state, data: { ...state.data, ...action.payload } };
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
```

## When to Use What

### React Query

- ✅ Fetching from API
- ✅ Caching server data
- ✅ Automatic refetching
- ❌ Local UI state

### Zustand

- ✅ Global UI state (theme, sidebar)
- ✅ User preferences
- ✅ Cross-feature state (cart)
- ❌ Server/API data
- ❌ Local component state

### Context

- ✅ Service injection (analytics)
- ✅ Feature flags
- ✅ Configuration
- ❌ Frequent updates (use Zustand)

### useState

- ✅ Forms, toggles, modals
- ✅ Local UI state
- ❌ Shared state
- ❌ Server data

## Anti-Patterns

### ❌ useState for Server Data

```tsx
// Bad
const [user, setUser] = useState(null);
useEffect(() => {
  fetch("/api/user")
    .then((r) => r.json())
    .then(setUser);
}, []);

// Good
const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });
```

### ❌ Selecting Entire Store

```tsx
// Bad - re-renders on any change
const { theme, sidebar } = useUIStore();

// Good - only re-renders when theme changes
const theme = useUIStore((s) => s.theme);
```

### ❌ Context for Everything

```tsx
// Bad - too many contexts
<ThemeContext>
  <UserContext>
    <SettingsContext>
      <App />
    </SettingsContext>
  </UserContext>
</ThemeContext>

// Good - Zustand for UI state, React Query for server state
```

## File Locations

```
stores/
├── useUIStore.ts          # Global UI state
└── useAppStore.ts

features/user/
├── stores/
│   └── userStore.ts       # Feature-specific state
└── hooks/
    ├── useUser.ts         # React Query query
    └── useUpdateUser.ts   # React Query mutation

lib/
├── analytics/
│   └── AnalyticsContext.tsx
└── features/
    └── FeatureFlagsContext.tsx
```

## Rules

- ✅ React Query for ALL server data
- ✅ Zustand with precise selectors
- ✅ Context for services/DI only
- ✅ Colocate feature stores with features
- ❌ Never useState for server data
- ❌ Never select entire Zustand store
- ❌ Never use Context for frequently updating state
