# Component Patterns Guide

## Container/UI Component Pattern

### Visual Relationship

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

## When to Split Components

### ✅ DO Split When:

1. **Component is reused 3+ times**
   ```tsx
   // Used in UserProfile, UserList, and UserSearch
   // → Extract UserCard as UI component
   ```

2. **Testing requires complex setup**
   ```tsx
   // Container with stores, API mocks makes testing hard
   // → Extract UI component for easy testing
   ```

3. **UI logic is complex enough to test separately**
   ```tsx
   // Complex rendering logic independent of data fetching
   // → Extract UI component
   ```

### ❌ DON'T Split When:

1. **Component is used only once**
   ```tsx
   // DashboardHeader only used in Dashboard
   // → Keep as single component
   ```

2. **Component is simple (< 50 lines)**
   ```tsx
   // Simple component that fetches and displays
   // → Unnecessary abstraction
   ```

3. **UI and logic are tightly coupled**
   ```tsx
   // Form with complex validation logic
   // → Keep together for clarity
   ```

## Container Component Pattern

### Responsibilities
- Connect to stores (Zustand)
- Fetch data (React Query)
- Handle user interactions
- Contain business logic
- Manage local state
- Error handling

### Example

```tsx
// features/user/components/UserProfile.tsx
import { useUserStore } from '../stores/userStore'
import { useUserQuery } from '../hooks/useUser'
import { UserCard } from './ui/UserCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'

export function UserProfile() {
  // Store connection
  const currentUser = useUserStore(s => s.currentUser)
  const updateUser = useUserStore(s => s.updateUser)
  
  // Data fetching
  const { data, isLoading, error } = useUserQuery(currentUser.id)
  
  // Business logic
  const handleEdit = () => {
    // Navigate to edit page or open modal
  }
  
  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      await deleteUser(currentUser.id)
      updateUser(null)
    }
  }
  
  // Loading and error states
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return null
  
  // Render UI component with props
  return (
    <UserCard
      name={data.name}
      email={data.email}
      avatar={data.avatarUrl}
      role={data.role}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
```

## UI Component Pattern

### Responsibilities
- Pure presentation
- Receive data via props
- Emit events via callbacks
- No store access
- No API calls
- Fully testable in isolation

### Example

```tsx
// features/user/components/ui/UserCard.tsx
import styles from './UserCard.module.css'

interface UserCardProps {
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user'
  onEdit: () => void
  onDelete: () => void
}

export function UserCard({ 
  name, 
  email, 
  avatar, 
  role, 
  onEdit, 
  onDelete 
}: UserCardProps) {
  return (
    <div className={styles.card}>
      <img src={avatar} alt={name} className={styles.avatar} />
      <div className={styles.info}>
        <h2>{name}</h2>
        <p>{email}</p>
        <span className={styles.role}>{role}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
```

## Component Organization

### Feature Component Structure

```
features/user/
├── components/
│   ├── UserProfile.tsx          # Container - exported via index.ts
│   ├── UserList.tsx             # Container - exported
│   ├── UserSettings.tsx         # Container - exported
│   └── ui/                      # Internal UI components
│       ├── UserCard.tsx         # UI - may be exported if reused
│       ├── UserAvatar.tsx       # UI - internal
│       └── UserStats.tsx        # UI - internal
```

### Shared Component Structure

```
components/ui/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Button.stories.tsx       # Storybook story
│   ├── Button.test.tsx          # Tests
│   └── index.ts
├── Input/
│   ├── Input.tsx
│   ├── Input.module.css
│   ├── Input.stories.tsx
│   ├── Input.test.tsx
│   └── index.ts
└── Card/
    ├── Card.tsx
    ├── Card.module.css
    ├── Card.stories.tsx
    ├── Card.test.tsx
    └── index.ts
```

## Component Types

### 1. Container Components
**Location:** `features/{domain}/components/`
**Exports:** Via `features/{domain}/index.ts`

```tsx
// Container Component Checklist:
✅ Connects to stores
✅ Uses React Query hooks
✅ Contains business logic
✅ Handles events
✅ Manages loading/error states
✅ Composes UI components
```

### 2. Feature UI Components
**Location:** `features/{domain}/components/ui/`
**Exports:** Only if reused outside feature

```tsx
// Feature UI Component Checklist:
✅ Pure presentation
✅ Receives props only
✅ No store/API access
✅ Emits events via callbacks
✅ Used within same feature
```

### 3. Shared UI Components
**Location:** `components/ui/`
**Exports:** Via `components/ui/{component}/index.ts`

```tsx
// Shared UI Component Checklist:
✅ Pure presentation
✅ Domain-agnostic
✅ Used 3+ times across features
✅ Has Storybook story
✅ Fully tested
✅ Documented props
```

### 4. Layout Components
**Location:** `components/layout/`
**Examples:** Header, Sidebar, Footer, PageLayout

```tsx
// components/layout/PageLayout.tsx
interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  sidebar?: React.ReactNode
}

export function PageLayout({ children, title, sidebar }: PageLayoutProps) {
  return (
    <div className="page-layout">
      {title && <h1>{title}</h1>}
      <div className="content-wrapper">
        {sidebar && <aside>{sidebar}</aside>}
        <main>{children}</main>
      </div>
    </div>
  )
}
```

## Composition Patterns

### Compound Components

```tsx
// Card component with compound pattern
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>
}

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>
}

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>
}

Card.Footer = function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer">{children}</div>
}

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Render Props

```tsx
// DataLoader with render prop
interface DataLoaderProps<T> {
  data: T | undefined
  isLoading: boolean
  error: Error | null
  render: (data: T) => React.ReactNode
}

export function DataLoader<T>({ 
  data, 
  isLoading, 
  error, 
  render 
}: DataLoaderProps<T>) {
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return null
  return <>{render(data)}</>
}

// Usage
<DataLoader
  data={userData}
  isLoading={isLoading}
  error={error}
  render={data => <UserCard user={data} />}
/>
```

### Higher-Order Components (Use Sparingly)

Prefer hooks over HOCs in modern React:

```tsx
// ❌ Old pattern - HOC
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = useAuth()
    if (!isAuthenticated) return <Login />
    return <Component {...props} />
  }
}

// ✅ Modern pattern - Hook
export function useRequireAuth() {
  const isAuthenticated = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])
  
  return isAuthenticated
}
```

## Component Naming Conventions

```tsx
// Containers: Noun describing the feature
UserProfile.tsx
TaskList.tsx
ProductCatalog.tsx

// UI Components: Noun describing the visual element
UserCard.tsx
TaskItem.tsx
ProductGrid.tsx

// Shared Components: Generic noun
Button.tsx
Input.tsx
Card.tsx
Modal.tsx

// Layout Components: Layout + purpose
PageLayout.tsx
DashboardLayout.tsx
SidebarLayout.tsx

// Higher-Order: "with" prefix
withErrorBoundary.tsx
withAuth.tsx
```

## Props Best Practices

### TypeScript Interfaces

```tsx
// ✅ Good - Explicit interface
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick 
}: ButtonProps) {
  // ...
}

// ❌ Bad - Inline types
export function Button({ 
  children, 
  variant, 
  size 
}: { 
  children: React.ReactNode
  variant?: string
  size?: string 
}) {
  // ...
}
```

### Event Handlers

```tsx
// ✅ Good - Descriptive handler names
interface UserCardProps {
  onEdit: () => void
  onDelete: () => void
  onShare: () => void
}

// ❌ Bad - Generic handler names
interface UserCardProps {
  onClick: () => void
  onAction: () => void
}
```

### Optional vs Required Props

```tsx
// Make essential data required, UI preferences optional
interface ProductCardProps {
  // Required - can't display without these
  id: string
  name: string
  price: number
  
  // Optional - has sensible defaults
  image?: string
  description?: string
  variant?: 'compact' | 'expanded'
  showActions?: boolean
}
```

## Component Documentation

### Props Documentation

```tsx
interface ButtonProps {
  /**
   * The content to display inside the button
   */
  children: React.ReactNode
  
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger'
  
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  
  /**
   * Disables the button and prevents interactions
   * @default false
   */
  disabled?: boolean
  
  /**
   * Callback fired when the button is clicked
   */
  onClick?: () => void
}
```

### Component Examples

```tsx
/**
 * Primary button for main actions
 * 
 * @example
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * 
 * @example
 * <Button variant="danger" size="large">
 *   Delete Account
 * </Button>
 */
export function Button(props: ButtonProps) {
  // ...
}
```

## Storybook Integration

### When to Create Stories

**Always:**
- All shared UI components
- Reusable feature UI components (used 3+ times)

**Sometimes:**
- Complex container components (for documentation)

**Never:**
- One-off components
- App-level routing components

### Story Example

```tsx
// components/ui/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
}
```

## Related Documentation

- **[STYLING.md](./STYLING.md)** - CSS patterns and design tokens
- **[TESTING.md](./TESTING.md)** - Component testing strategies
- **[DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md)** - File organization
