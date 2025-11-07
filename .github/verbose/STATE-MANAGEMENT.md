# State Management Guide

## State Management Trinity

```
┌────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  REACT QUERY                                               │
│  └─ Server State (API data)                               │
│     • Caching, refetching, synchronization                │
│     • Loading & error states                              │
│     • Optimistic updates                                  │
│                                                            │
│  ZUSTAND                                                   │
│  └─ Global Client State                                   │
│     • User preferences                                    │
│     • UI state shared across features                     │
│     • Application-wide settings                           │
│                                                            │
│  CONTEXT API                                               │
│  └─ Dependency Injection                                  │
│     • Services & utilities                                │
│     • Feature flags                                       │
│     • Configuration                                       │
│                                                            │
│  USESTATE                                                  │
│  └─ Local Component State                                 │
│     • Form inputs                                         │
│     • Toggles, modals                                     │
│     • Component-specific UI state                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Decision Tree: Which State Management Tool?

```
Is this data from a server/API?
├─ YES → React Query
└─ NO ↓

Does this state need to be shared across multiple features/routes?
├─ YES → Zustand
└─ NO ↓

Is this a service/configuration that needs injection?
├─ YES → Context API
└─ NO ↓

Is this local to a single component?
└─ YES → useState/useReducer
```

## React Query (Server State)

### When to Use
- ✅ Fetching data from APIs
- ✅ Caching server responses
- ✅ Automatic refetching
- ✅ Optimistic updates
- ✅ Infinite scrolling
- ✅ Polling/real-time sync

### Setup

```tsx
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 minutes
      gcTime: 10 * 60 * 1000,       // 10 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

### Basic Query

```tsx
// features/user/hooks/useUser.ts
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/userService'
import type { User } from '../types/user.types'

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId, // Only run if userId exists
  })
}

// Usage in component
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useUser(userId)
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return null
  
  return <UserCard user={data} />
}
```

### Mutations

```tsx
// features/user/hooks/useUpdateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '../api/userService'
import type { User } from '../types/user.types'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<User>) => updateUser(data),
    
    // Optimistic update
    onMutate: async (newUser) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user', newUser.id] })
      
      // Snapshot previous value
      const previousUser = queryClient.getQueryData<User>(['user', newUser.id])
      
      // Optimistically update
      queryClient.setQueryData<User>(['user', newUser.id], old => ({
        ...old!,
        ...newUser,
      }))
      
      return { previousUser }
    },
    
    // On error, rollback
    onError: (err, newUser, context) => {
      queryClient.setQueryData(
        ['user', newUser.id],
        context?.previousUser
      )
    },
    
    // Always refetch after error or success
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
    },
  })
}

// Usage
function UserEditor({ user }: { user: User }) {
  const updateUser = useUpdateUser()
  
  const handleSave = (data: Partial<User>) => {
    updateUser.mutate({ id: user.id, ...data })
  }
  
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {/* form fields */}
    </form>
  )
}
```

### Query Invalidation

```tsx
// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['user', userId] })

// Invalidate all user queries
queryClient.invalidateQueries({ queryKey: ['user'] })

// Invalidate multiple query types
queryClient.invalidateQueries({ queryKey: ['user'] })
queryClient.invalidateQueries({ queryKey: ['posts'] })
```

### Dependent Queries

```tsx
function UserPosts({ userId }: { userId: string }) {
  // First query
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  })
  
  // Dependent query - only runs after user is loaded
  const { data: posts } = useQuery({
    queryKey: ['posts', user?.id],
    queryFn: () => getUserPosts(user!.id),
    enabled: !!user, // Only run when user exists
  })
  
  return <PostsList posts={posts} />
}
```

### Pagination

```tsx
function UserList() {
  const [page, setPage] = useState(1)
  
  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers({ page, limit: 10 }),
    keepPreviousData: true, // Keep old data while fetching new
  })
  
  return (
    <>
      <UserGrid users={data?.users} />
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages}
        onPageChange={setPage}
      />
    </>
  )
}
```

### Infinite Queries

```tsx
function InfiniteUserList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 0 }) => getUsers({ page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length : undefined
    },
  })
  
  return (
    <>
      {data?.pages.map((page, i) => (
        <UserGrid key={i} users={page.users} />
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load More
        </button>
      )}
    </>
  )
}
```

## Zustand (Global Client State)

### When to Use
- ✅ Global UI state (theme, sidebar open/closed)
- ✅ User preferences (language, settings)
- ✅ Cross-feature state (shopping cart, notifications)
- ✅ Application-wide data not from API

### ❌ Don't Use For
- Server/API data (use React Query)
- Local component state (use useState)
- Forms (use React Hook Form or useState)

### Basic Store

```tsx
// stores/useUIStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ 
        sidebarOpen: !state.sidebarOpen 
      })),
    }),
    {
      name: 'ui-storage', // localStorage key
    }
  )
)
```

### Feature Store

```tsx
// features/user/stores/userStore.ts
import { create } from 'zustand'
import type { User } from '../types/user.types'

interface UserState {
  currentUser: User | null
  preferences: {
    notifications: boolean
    language: string
  }
  
  // Actions
  setCurrentUser: (user: User | null) => void
  updatePreferences: (prefs: Partial<UserState['preferences']>) => void
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  preferences: {
    notifications: true,
    language: 'en',
  },
  
  setCurrentUser: (user) => set({ currentUser: user }),
  updatePreferences: (prefs) => set((state) => ({
    preferences: { ...state.preferences, ...prefs }
  })),
}))
```

### Using the Store

```tsx
// ✅ Good - Precise selector (only re-renders when theme changes)
function ThemeToggle() {
  const theme = useUIStore(state => state.theme)
  const setTheme = useUIStore(state => state.setTheme)
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

// ❌ Bad - Selecting entire state (re-renders on any change)
function ThemeToggle() {
  const { theme, setTheme } = useUIStore()
  // Component re-renders when ANY store value changes
}

// ✅ Good - Multiple precise selectors
function UserSettings() {
  const notifications = useUserStore(s => s.preferences.notifications)
  const language = useUserStore(s => s.preferences.language)
  const updatePreferences = useUserStore(s => s.updatePreferences)
}
```

### Middleware

```tsx
// With devtools
import { devtools } from 'zustand/middleware'

export const useStore = create<State>()(
  devtools(
    (set) => ({
      // state and actions
    }),
    { name: 'MyStore' }
  )
)

// With persistence and devtools
export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        // state and actions
      }),
      { name: 'storage-key' }
    ),
    { name: 'MyStore' }
  )
)
```

### Async Actions

```tsx
interface TodoState {
  todos: Todo[]
  isLoading: boolean
  
  fetchTodos: () => Promise<void>
  addTodo: (text: string) => Promise<void>
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  
  fetchTodos: async () => {
    set({ isLoading: true })
    try {
      const todos = await api.getTodos()
      set({ todos, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  
  addTodo: async (text) => {
    const newTodo = await api.createTodo({ text })
    set({ todos: [...get().todos, newTodo] })
  },
}))
```

### Computed Values

```tsx
interface CartState {
  items: CartItem[]
  
  // Computed values as getters
  get total(): number
  get itemCount(): number
  
  addItem: (item: CartItem) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  
  get itemCount() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
}))

// Usage
function CartSummary() {
  const total = useCartStore(state => state.total)
  const itemCount = useCartStore(state => state.itemCount)
}
```

## Context API (Dependency Injection)

### When to Use
- ✅ Service injection (analytics, logger)
- ✅ Feature flags
- ✅ Configuration
- ✅ Third-party SDK instances

### ❌ Don't Use For
- Server state (use React Query)
- Global UI state (use Zustand)
- Passing props down 2-3 levels (just pass props)

### Service Provider

```tsx
// lib/analytics/AnalyticsContext.tsx
import { createContext, useContext, ReactNode } from 'react'

interface AnalyticsService {
  track: (event: string, properties?: Record<string, any>) => void
  identify: (userId: string) => void
}

const AnalyticsContext = createContext<AnalyticsService | null>(null)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const analytics: AnalyticsService = {
    track: (event, properties) => {
      // Implementation
      console.log('Track:', event, properties)
    },
    identify: (userId) => {
      // Implementation
      console.log('Identify:', userId)
    },
  }
  
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider')
  }
  return context
}
```

### Feature Flags

```tsx
// lib/features/FeatureContext.tsx
import { createContext, useContext, ReactNode } from 'react'

interface FeatureFlags {
  newDashboard: boolean
  betaFeatures: boolean
  advancedSearch: boolean
}

const FeatureFlagsContext = createContext<FeatureFlags | null>(null)

export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
  const flags: FeatureFlags = {
    newDashboard: true,
    betaFeatures: false,
    advancedSearch: true,
  }
  
  return (
    <FeatureFlagsContext.Provider value={flags}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error('useFeatureFlags must be used within FeatureFlagsProvider')
  }
  return context
}

export function useFeature(flag: keyof FeatureFlags) {
  const flags = useFeatureFlags()
  return flags[flag]
}
```

### Usage

```tsx
function Dashboard() {
  const hasNewDashboard = useFeature('newDashboard')
  const analytics = useAnalytics()
  
  useEffect(() => {
    analytics.track('dashboard_viewed')
  }, [])
  
  if (hasNewDashboard) {
    return <NewDashboard />
  }
  
  return <LegacyDashboard />
}
```

## Local State (useState/useReducer)

### When to Use useState
- ✅ Form inputs
- ✅ Toggles (modals, dropdowns)
- ✅ Local UI state
- ✅ Simple component state

```tsx
function Modal() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <ModalComponent onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}
```

### When to Use useReducer
- ✅ Complex state logic
- ✅ Multiple related state values
- ✅ State transitions

```tsx
type State = {
  step: number
  data: FormData
  errors: Record<string, string>
}

type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DATA'; payload: Partial<FormData> }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 }
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 }
    case 'UPDATE_DATA':
      return { ...state, data: { ...state.data, ...action.payload } }
    case 'SET_ERRORS':
      return { ...state, errors: action.payload }
    default:
      return state
  }
}

function MultiStepForm() {
  const [state, dispatch] = useReducer(reducer, {
    step: 1,
    data: {},
    errors: {},
  })
  
  return (
    <form>
      {/* Form steps */}
      <button onClick={() => dispatch({ type: 'PREV_STEP' })}>
        Previous
      </button>
      <button onClick={() => dispatch({ type: 'NEXT_STEP' })}>
        Next
      </button>
    </form>
  )
}
```

## State Management Anti-Patterns

### ❌ Using State for Server Data

```tsx
// ❌ Bad
function UserProfile() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser)
  }, [])
}

// ✅ Good - Use React Query
function UserProfile() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  })
}
```

### ❌ Selecting Entire Store

```tsx
// ❌ Bad - Re-renders on any store change
const { theme, sidebar, notifications } = useUIStore()

// ✅ Good - Only re-renders when theme changes
const theme = useUIStore(state => state.theme)
```

### ❌ Prop Drilling Through Context

```tsx
// ❌ Bad - Context for every prop
<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <SettingsContext.Provider value={settings}>
      <App />
    </SettingsContext.Provider>
  </UserContext.Provider>
</ThemeContext.Provider>

// ✅ Good - Use Zustand for UI state, React Query for server state
```

## Best Practices

1. **Choose the right tool**
   - Server data → React Query
   - Global client state → Zustand
   - Services/DI → Context
   - Local state → useState

2. **Precise selectors in Zustand**
   ```tsx
   // ✅ Do this
   const name = useStore(s => s.user.name)
   
   // ❌ Not this
   const { user } = useStore()
   ```

3. **Colocate state**
   - Feature stores in `features/{domain}/stores/`
   - Shared stores in `stores/`

4. **Keep stores focused**
   - One store per domain/feature
   - Don't create a god store

5. **Type everything**
   - Explicit TypeScript types for all state
   - No `any` types

## Related Documentation

- **[API-LAYER.md](./API-LAYER.md)** - API services and React Query integration
- **[TESTING.md](./TESTING.md)** - Testing state management
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Where to place state files
