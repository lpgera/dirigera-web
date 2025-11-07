# Development Guide

## Project Structure

```
src/
├── app/                    # Application layer
│   ├── routes/            # Route components
│   │   ├── Dashboard.tsx
│   │   └── UserProfile.tsx
│   ├── App.tsx            # Root component
│   └── router.tsx         # Route configuration
│
├── features/              # Feature modules
│   ├── auth/
│   │   ├── api/          # API services
│   │   │   └── authService.ts
│   │   ├── components/   # Feature components
│   │   │   ├── LoginForm.tsx
│   │   │   └── ui/       # Internal UI components
│   │   │       └── LoginCard.tsx
│   │   ├── hooks/        # Custom hooks
│   │   │   └── useAuth.ts
│   │   ├── stores/       # Zustand stores
│   │   │   └── authStore.ts
│   │   ├── types/        # TypeScript types
│   │   │   └── auth.types.ts
│   │   ├── utils/        # Feature utilities
│   │   │   └── tokenUtils.ts
│   │   └── index.ts      # Public API
│   │
│   └── user/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── stores/
│       ├── types/
│       └── index.ts
│
├── components/            # Shared components
│   ├── ui/               # UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   └── layout/           # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── PageLayout.tsx
│
├── hooks/                # Shared hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
│
├── lib/                  # Third-party integrations
│   ├── api/
│   │   ├── client.ts     # HTTP client
│   │   ├── errors.ts     # Error handling
│   │   └── types.ts      # API types
│   ├── analytics/
│   │   └── AnalyticsContext.tsx
│   └── features/
│       └── FeatureFlagsContext.tsx
│
├── stores/               # Global Zustand stores
│   ├── useUIStore.ts
│   └── useAppStore.ts
│
├── utils/                # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── date.ts
│
├── types/                # Shared TypeScript types
│   ├── common.types.ts
│   └── api.types.ts
│
├── config/               # Configuration
│   ├── env.ts           # Environment variables
│   └── constants.ts     # App constants
│
├── styles/              # Global styles
│   ├── reset.css
│   ├── tokens/
│   │   ├── primitives.css
│   │   ├── semantic.css
│   │   └── components.css
│   ├── themes/
│   │   └── dark.css
│   └── global.css
│
├── test/                # Test utilities
│   ├── setup.ts
│   ├── mocks/
│   │   ├── handlers.ts
│   │   └── server.ts
│   ├── factories/
│   │   └── userFactory.ts
│   └── utils/
│       └── render.tsx
│
└── main.tsx             # Entry point
```

## Naming Conventions

### Files

```
# Components - PascalCase
Button.tsx
UserProfile.tsx
LoginForm.tsx

# Hooks - camelCase with 'use' prefix
useAuth.ts
useDebounce.ts
useLocalStorage.ts

# Utilities - camelCase
formatters.ts
validators.ts
apiClient.ts

# Types - camelCase with .types suffix
user.types.ts
auth.types.ts
api.types.ts

# Stores - camelCase with 'use' prefix and 'Store' suffix
useUserStore.ts
useUIStore.ts

# Services - camelCase with 'Service' suffix
userService.ts
authService.ts

# Tests - Same as file with .test suffix
Button.test.tsx
useAuth.test.ts
formatters.test.ts

# Stories - Same as file with .stories suffix
Button.stories.tsx
Card.stories.tsx

# CSS Modules - Same as component with .module.css
Button.module.css
UserCard.module.css
```

### Variables and Functions

```tsx
// Variables - camelCase
const userName = 'John'
const isLoggedIn = true
const userList = []

// Functions - camelCase, verb + noun
function getUserData() {}
function formatDate() {}
function validateEmail() {}

// Event handlers - handle + Event
function handleClick() {}
function handleSubmit() {}
function handleChange() {}

// Boolean variables/props - is/has/should prefix
const isLoading = true
const hasError = false
const shouldRender = true

// Constants - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3
```

### Components

```tsx
// Component names - PascalCase
function UserProfile() {}
function LoginForm() {}
function DataTable() {}

// Props interfaces - ComponentName + Props
interface UserProfileProps {}
interface LoginFormProps {}

// Component files should match component name
UserProfile.tsx  // exports function UserProfile
LoginForm.tsx    // exports function LoginForm
```

### Types and Interfaces

```tsx
// Types - PascalCase
type User = { ... }
type UserRole = 'admin' | 'user'

// Interfaces - PascalCase
interface User { ... }
interface AuthState { ... }

// Generics - Single uppercase letter or PascalCase
function identity<T>(arg: T): T {}
function map<TItem, TResult>(items: TItem[]): TResult[] {}

// DTOs (Data Transfer Objects) - PascalCase + DTO suffix
interface UserDTO { ... }
interface ProductDTO { ... }
```

## TypeScript Patterns

### Component Props

```tsx
// Basic props
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

// With discriminated union for variants
interface ButtonProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'danger'
}

// Extending HTML element props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button {...props} className={`button-${variant}`} />
}
```

### Generic Components

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// Usage
<List
  items={users}
  renderItem={user => <UserCard user={user} />}
  keyExtractor={user => user.id}
/>
```

### API Response Types

```tsx
// Backend DTO (snake_case)
interface UserDTO {
  id: string
  full_name: string
  email: string
  created_at: string
}

// Frontend model (camelCase)
interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

// Transform function
function transformUser(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.full_name,
    email: dto.email,
    createdAt: new Date(dto.created_at),
  }
}
```

### Utility Types

```tsx
// Make all properties optional
type PartialUser = Partial<User>

// Make all properties required
type RequiredUser = Required<User>

// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>

// Omit specific properties
type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

// Extract from union
type Role = 'admin' | 'user' | 'guest'
type AdminRole = Extract<Role, 'admin'> // 'admin'

// Exclude from union
type NonAdminRole = Exclude<Role, 'admin'> // 'user' | 'guest'
```

## Common Recipes

### Creating a New Feature

1. **Create feature directory:**
```bash
mkdir -p src/features/my-feature/{api,components,hooks,stores,types}
```

2. **Create types:**
```tsx
// features/my-feature/types/my-feature.types.ts
export interface MyFeatureData {
  id: string
  name: string
}
```

3. **Create API service:**
```tsx
// features/my-feature/api/myFeatureService.ts
import { apiClient } from '@/lib/api/client'
import type { MyFeatureData } from '../types/my-feature.types'

export const getMyFeatureData = async (id: string): Promise<MyFeatureData> => {
  return apiClient.get(`/my-feature/${id}`)
}
```

4. **Create React Query hook:**
```tsx
// features/my-feature/hooks/useMyFeature.ts
import { useQuery } from '@tanstack/react-query'
import { getMyFeatureData } from '../api/myFeatureService'

export function useMyFeature(id: string) {
  return useQuery({
    queryKey: ['my-feature', id],
    queryFn: () => getMyFeatureData(id),
  })
}
```

5. **Create component:**
```tsx
// features/my-feature/components/MyFeatureView.tsx
import { useMyFeature } from '../hooks/useMyFeature'

export function MyFeatureView({ id }: { id: string }) {
  const { data, isLoading } = useMyFeature(id)
  
  if (isLoading) return <div>Loading...</div>
  
  return <div>{data?.name}</div>
}
```

6. **Export public API:**
```tsx
// features/my-feature/index.ts
export { MyFeatureView } from './components/MyFeatureView'
export { useMyFeature } from './hooks/useMyFeature'
export type { MyFeatureData } from './types/my-feature.types'
```

### Creating a Shared UI Component

1. **Create component directory:**
```bash
mkdir -p src/components/ui/MyComponent
```

2. **Create component:**
```tsx
// components/ui/MyComponent/MyComponent.tsx
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
```

3. **Create styles:**
```css
/* components/ui/MyComponent/MyComponent.module.css */
.container {
  background: var(--card-bg);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
}

.title {
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
}

.content {
  margin-top: var(--spacing-4);
}
```

4. **Create tests:**
```tsx
// components/ui/MyComponent/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders title and children', () => {
    render(
      <MyComponent title="Test Title">
        <p>Test content</p>
      </MyComponent>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
```

5. **Create Storybook story:**
```tsx
// components/ui/MyComponent/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './MyComponent'

const meta: Meta<typeof MyComponent> = {
  title: 'UI/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MyComponent>

export const Default: Story = {
  args: {
    title: 'Example Title',
    children: <p>Example content goes here</p>,
  },
}
```

6. **Create barrel export:**
```tsx
// components/ui/MyComponent/index.ts
export { MyComponent } from './MyComponent'
export type { MyComponentProps } from './MyComponent'
```

### Adding a New Route

1. **Create route component:**
```tsx
// app/routes/MyPage.tsx
import { MyFeatureView } from '@/features/my-feature'

export function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <MyFeatureView id="123" />
    </div>
  )
}
```

2. **Add to router:**
```tsx
// app/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { MyPage } from './routes/MyPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'my-page',
        element: <MyPage />,
      },
    ],
  },
])
```

3. **Add navigation:**
```tsx
// components/layout/Navigation.tsx
import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <nav>
      <Link to="/my-page">My Page</Link>
    </nav>
  )
}
```

### Creating a Zustand Store

```tsx
// stores/useMyStore.ts
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface MyState {
  count: number
  items: string[]
  
  // Actions
  increment: () => void
  decrement: () => void
  addItem: (item: string) => void
  removeItem: (item: string) => void
  reset: () => void
}

const initialState = {
  count: 0,
  items: [],
}

export const useMyStore = create<MyState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        
        addItem: (item) => set((state) => ({
          items: [...state.items, item]
        })),
        
        removeItem: (item) => set((state) => ({
          items: state.items.filter(i => i !== item)
        })),
        
        reset: () => set(initialState),
      }),
      {
        name: 'my-store',
      }
    ),
    {
      name: 'MyStore',
    }
  )
)
```

### Adding Design Tokens

1. **Add primitive tokens:**
```css
/* styles/tokens/primitives.css */
:root {
  --color-purple-500: #8b5cf6;
  --spacing-24: 6rem;
}
```

2. **Add semantic tokens:**
```css
/* styles/tokens/semantic.css */
:root {
  --color-accent: var(--color-purple-500);
  --spacing-large: var(--spacing-24);
}
```

3. **Add component tokens:**
```css
/* styles/tokens/components.css */
:root {
  --badge-accent-bg: var(--color-accent);
  --section-spacing: var(--spacing-large);
}
```

4. **Use in component:**
```css
/* MyComponent.module.css */
.badge {
  background: var(--badge-accent-bg);
}

.section {
  padding: var(--section-spacing);
}
```

## Git Workflow

### Branch Naming

```bash
# Features
feature/user-authentication
feature/dashboard-redesign

# Bug fixes
fix/login-validation
fix/memory-leak

# Refactoring
refactor/api-layer
refactor/component-structure

# Documentation
docs/api-guide
docs/setup-instructions
```

### Commit Messages

```bash
# Format: type(scope): description

feat(auth): add login form validation
fix(user): correct email validation regex
refactor(api): simplify error handling
docs(readme): update installation steps
test(button): add accessibility tests
style(card): fix alignment issues
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings

## Screenshots (if applicable)
```

## Code Quality

### ESLint Configuration

```js
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/components',
            from: './src/features',
          },
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

### Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

## Performance Tips

### Code Splitting

```tsx
// Lazy load routes
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./routes/Dashboard'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  )
}
```

### Memoization

```tsx
// Memoize expensive computations
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name))
}, [users])

// Memoize callbacks
const handleClick = useCallback(() => {
  console.log(value)
}, [value])

// Memoize components
const MemoizedComponent = memo(ExpensiveComponent)
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run build:analyze
```

## Quick Decision Guide

**When in doubt, prioritize:**

1. **Feature colocation** - Keep feature code together
2. **Design token discipline** - Use component tokens (Layer 3)
3. **Right tool for the job** - React Query for server, Zustand for client
4. **Type safety** - Explicit types everywhere, no `any`
5. **Import boundaries** - Respect unidirectional imports
6. **Component separation** - Split UI/Container only when reused
7. **Public APIs** - Only export what's needed via index.ts
8. **Reusability** - Extract to shared when used 3+ times
9. **Storybook for shared** - Build reusable UI in isolation
10. **Performance awareness** - Code split routes, lazy load
11. **Test behavior** - Focus on what users see and do
12. **Readability over cleverness** - Code is read more than written

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Application structure
- **[COMPONENTS.md](./COMPONENTS.md)** - Component patterns
- **[STYLING.md](./STYLING.md)** - Design tokens and CSS
- **[STATE-MANAGEMENT.md](./STATE-MANAGEMENT.md)** - State patterns
- **[API-LAYER.md](./API-LAYER.md)** - API services
- **[TESTING.md](./TESTING.md)** - Testing strategies
