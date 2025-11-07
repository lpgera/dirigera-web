# Testing Guide

## Testing Philosophy

**Test behavior, not implementation**

Focus on what users see and do, not how the code works internally. Tests should be resilient to refactoring.

```tsx
// ✅ Good - Tests behavior
test('displays user name after loading', async () => {
  render(<UserProfile userId="1" />)
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  
  const userName = await screen.findByText('John Doe')
  expect(userName).toBeInTheDocument()
})

// ❌ Bad - Tests implementation
test('calls useUserStore and useQuery', () => {
  const mockStore = jest.fn()
  const mockQuery = jest.fn()
  // Testing implementation details
})
```

## Testing Pyramid

```
        ┌─────────────┐
        │     E2E     │  ← Few (Playwright)
        │             │
        ├─────────────┤
        │ Integration │  ← Some (React Testing Library)
        │             │
        ├─────────────┤
        │    Unit     │  ← Many (Vitest)
        │             │
        └─────────────┘
```

- **Unit Tests (70%)** - Individual functions, utilities, UI components
- **Integration Tests (20%)** - Components with state, API calls, user flows
- **E2E Tests (10%)** - Critical user journeys

## Setup

### Vitest Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.stories.tsx',
        '**/*.test.tsx',
      ],
    },
  },
})
```

### Test Setup

```tsx
// src/test/setup.ts
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return []
  }
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

## Testing UI Components

### Basic Component Test

```tsx
// components/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
  
  it('applies variant classes', () => {
    render(<Button variant="danger">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--danger')
  })
})
```

### Testing Component Variants

```tsx
// components/ui/Card/Card.test.tsx
describe('Card', () => {
  it.each([
    ['default', undefined, 'card'],
    ['elevated', 'elevated', 'card--elevated'],
    ['compact', 'compact', 'card--compact'],
  ])('renders %s variant correctly', (name, variant, expectedClass) => {
    render(<Card variant={variant}>Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card).toHaveClass(expectedClass)
  })
})
```

### Testing Accessibility

```tsx
describe('Button accessibility', () => {
  it('has accessible name', () => {
    render(<Button aria-label="Close dialog">×</Button>)
    expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument()
  })
  
  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Submit</Button>)
    
    const button = screen.getByRole('button')
    button.focus()
    
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalled()
  })
})
```

## Testing Container Components

### With React Query

```tsx
// features/user/components/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProfile } from './UserProfile'
import { server } from '@/test/mocks/server'
import { rest } from 'msw'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('UserProfile', () => {
  it('displays user data after loading', async () => {
    render(<UserProfile userId="1" />, { wrapper: createWrapper() })
    
    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })
  
  it('displays error when fetch fails', async () => {
    // Override MSW handler for this test
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }))
      })
    )
    
    render(<UserProfile userId="1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
```

### With Zustand

```tsx
// features/user/components/UserSettings.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserSettings } from './UserSettings'
import { useUserStore } from '../stores/userStore'

// Reset store before each test
beforeEach(() => {
  useUserStore.setState({
    preferences: {
      notifications: true,
      language: 'en',
    },
  })
})

describe('UserSettings', () => {
  it('displays current preferences', () => {
    render(<UserSettings />)
    
    expect(screen.getByLabelText(/notifications/i)).toBeChecked()
    expect(screen.getByDisplayValue('en')).toBeInTheDocument()
  })
  
  it('updates preferences when changed', async () => {
    const user = userEvent.setup()
    render(<UserSettings />)
    
    const notificationsToggle = screen.getByLabelText(/notifications/i)
    await user.click(notificationsToggle)
    
    expect(useUserStore.getState().preferences.notifications).toBe(false)
  })
})
```

## MSW (Mock Service Worker)

### Setup

```ts
// test/mocks/handlers.ts
import { rest } from 'msw'
import type { User } from '@/features/user/types/user.types'

export const handlers = [
  // GET /users/:id
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params
    
    return res(
      ctx.status(200),
      ctx.json<User>({
        id: id as string,
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: null,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    )
  }),
  
  // GET /users
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'admin',
          },
        ],
        total: 2,
      })
    )
  }),
  
  // POST /users
  rest.post('/api/users', async (req, res, ctx) => {
    const body = await req.json()
    
    return res(
      ctx.status(201),
      ctx.json({
        id: Math.random().toString(),
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    )
  }),
  
  // PUT /users/:id
  rest.put('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params
    const body = await req.json()
    
    return res(
      ctx.status(200),
      ctx.json({
        id,
        ...body,
        updatedAt: new Date().toISOString(),
      })
    )
  }),
  
  // DELETE /users/:id
  rest.delete('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(204))
  }),
]
```

```ts
// test/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Clean up after all tests
afterAll(() => server.close())
```

### Override Handlers in Tests

```tsx
describe('UserProfile error handling', () => {
  it('shows error message when user not found', async () => {
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ message: 'User not found' })
        )
      })
    )
    
    render(<UserProfile userId="999" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument()
    })
  })
})
```

## Testing Custom Hooks

### Testing React Query Hooks

```tsx
// features/user/hooks/useUser.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUser } from './useUser'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useUser', () => {
  it('fetches user data', async () => {
    const { result } = renderHook(() => useUser('1'), {
      wrapper: createWrapper(),
    })
    
    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    
    expect(result.current.data).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  })
})
```

### Testing Zustand Hooks

```tsx
// stores/useUIStore.test.ts
import { renderHook, act } from '@testing-library/react'
import { useUIStore } from './useUIStore'

describe('useUIStore', () => {
  beforeEach(() => {
    // Reset store
    useUIStore.setState({ theme: 'light', sidebarOpen: true })
  })
  
  it('toggles theme', () => {
    const { result } = renderHook(() => useUIStore())
    
    expect(result.current.theme).toBe('light')
    
    act(() => {
      result.current.setTheme('dark')
    })
    
    expect(result.current.theme).toBe('dark')
  })
  
  it('toggles sidebar', () => {
    const { result } = renderHook(() => useUIStore())
    
    expect(result.current.sidebarOpen).toBe(true)
    
    act(() => {
      result.current.toggleSidebar()
    })
    
    expect(result.current.sidebarOpen).toBe(false)
  })
})
```

## Testing Utilities

### Unit Tests

```tsx
// utils/formatters.test.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate } from './formatters'

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56')
  })
  
  it('formats EUR correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56')
  })
  
  it('handles zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00')
  })
})

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('January 15, 2024')
  })
  
  it('handles invalid date', () => {
    expect(() => formatDate(new Date('invalid'))).toThrow()
  })
})
```

## Test Utilities

### Custom Render

```tsx
// test/utils/render.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
```

### Mock Data Factory

```tsx
// test/factories/userFactory.ts
import type { User } from '@/features/user/types/user.types'

let idCounter = 0

export function createUser(overrides?: Partial<User>): User {
  idCounter++
  
  return {
    id: `user-${idCounter}`,
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: null,
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

export function createUsers(count: number): User[] {
  return Array.from({ length: count }, () => createUser())
}
```

## Testing Patterns

### Testing Forms

```tsx
describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(<LoginForm onSubmit={onSubmit} />)
    
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    })
  })
  
  it('displays validation errors', async () => {
    const user = userEvent.setup()
    
    render(<LoginForm />)
    
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })
})
```

### Testing Conditional Rendering

```tsx
describe('UserProfile', () => {
  it('shows loading state initially', () => {
    render(<UserProfile userId="1" />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
  
  it('shows user data when loaded', async () => {
    render(<UserProfile userId="1" />)
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
  
  it('shows error state on failure', async () => {
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    
    render(<UserProfile userId="1" />)
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
```

### Testing User Interactions

```tsx
describe('UserCard', () => {
  it('opens menu on button click', async () => {
    const user = userEvent.setup()
    
    render(<UserCard user={createUser()} />)
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    
    await user.click(screen.getByRole('button', { name: /options/i }))
    
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
  
  it('closes menu on outside click', async () => {
    const user = userEvent.setup()
    
    render(<UserCard user={createUser()} />)
    
    await user.click(screen.getByRole('button', { name: /options/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    
    await user.click(document.body)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
```

## Coverage Goals

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**Coverage Targets:**
- Overall: 80%
- Critical paths: 100%
- UI components: 80%
- Utilities: 90%
- Features: 80%

## Best Practices

### ✅ Do

```tsx
// Test user-facing behavior
test('displays error message on invalid input', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)
  
  await user.type(screen.getByLabelText(/email/i), 'invalid')
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
})

// Use accessible queries
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email/i)
screen.getByText(/welcome/i)

// Wait for async updates
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```

### ❌ Don't

```tsx
// Don't test implementation details
test('useState is called', () => {
  const spy = jest.spyOn(React, 'useState')
  render(<Component />)
  expect(spy).toHaveBeenCalled()
})

// Don't use IDs/classes for queries
screen.getByClassName('submit-button') // ❌
screen.getById('email-input') // ❌

// Don't use arbitrary timeouts
await new Promise(resolve => setTimeout(resolve, 1000)) // ❌
```

## Related Documentation

- **[STATE-MANAGEMENT.md](./STATE-MANAGEMENT.md)** - Testing state
- **[API-LAYER.md](./API-LAYER.md)** - Testing API calls with MSW
- **[COMPONENTS.md](./COMPONENTS.md)** - Component testing strategies
