# Components - Agent Guide

## Container/UI Pattern

### When to Split

✅ **DO Split:**

- Component reused 3+ times
- Testing requires complex setup
- Complex UI logic to test separately

❌ **DON'T Split:**

- Used only once
- Simple (< 50 lines)
- UI and logic tightly coupled

## Container Component

**Responsibilities:** Data fetching, state, logic, events

```tsx
// features/user/components/UserProfile.tsx
import { useUserStore } from "../stores/userStore";
import { useUserQuery } from "../hooks/useUser";
import { UserCard } from "./ui/UserCard";

export function UserProfile() {
  const currentUser = useUserStore((s) => s.currentUser);
  const { data, isLoading, error } = useUserQuery(currentUser.id);

  const handleEdit = () => {
    /* logic */
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return null;

  return <UserCard {...data} onEdit={handleEdit} />;
}
```

## UI Component

**Responsibilities:** Pure presentation, props only

```tsx
// features/user/components/ui/UserCard.tsx
interface UserCardProps {
  name: string;
  email: string;
  onEdit: () => void;
}

export function UserCard({ name, email, onEdit }: UserCardProps) {
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <p>{email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}
```

## Component Types

### 1. Container Components

- Location: `features/{domain}/components/`
- Exports: Via `features/{domain}/index.ts`
- Has: store access, API calls, logic

### 2. Feature UI Components

- Location: `features/{domain}/components/ui/`
- Exports: Only if reused outside feature
- Has: props only, no stores/API

### 3. Shared UI Components

- Location: `components/ui/`
- Exports: Via `components/ui/{component}/index.ts`
- Must have: Storybook story, tests, docs

### 4. Layout Components

- Location: `components/layout/`
- Examples: Header, Sidebar, PageLayout

## File Structure

```
components/ui/Button/
├── Button.tsx
├── Button.module.css
├── Button.stories.tsx
├── Button.test.tsx
└── index.ts

features/user/components/
├── UserProfile.tsx          # Container - exported
├── UserList.tsx             # Container - exported
└── ui/                      # Internal UI
    ├── UserCard.tsx
    └── UserAvatar.tsx
```

## Props Best Practices

```tsx
// ✅ Explicit interface with defaults
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
}: ButtonProps) {
  // ...
}
```

## Naming Conventions

```tsx
// Containers: Noun describing feature
(UserProfile.tsx, TaskList.tsx);

// UI: Noun describing visual element
(UserCard.tsx, TaskItem.tsx);

// Shared: Generic noun
(Button.tsx, Input.tsx, Card.tsx);

// Layout: Layout + purpose
(PageLayout.tsx, DashboardLayout.tsx);
```

## Storybook

**Create stories for:**

- ✅ All shared UI components
- ✅ Reusable feature UI (used 3+ times)
- ❌ One-off components
- ❌ Container components (usually)

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Button", variant: "primary" },
};
```

## Rules

- ✅ Container = data + logic, UI = presentation only
- ✅ Split only when reused 3+ times
- ✅ TypeScript explicit props interfaces
- ✅ Descriptive event handler names (`onEdit`, not `onClick`)
- ✅ Storybook for shared UI
- ❌ No store/API access in UI components
- ❌ No inline types
- ❌ No generic handler names
