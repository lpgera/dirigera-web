# Styling - Agent Guide

## 3-Layer Design Token System

```
Layer 1: Primitives (raw values) → Never use in components
Layer 2: Semantic (themed) → Override for themes
Layer 3: Component (usage) → USE THESE IN COMPONENTS
```

## Layer 1: Primitives (styles/tokens/primitives.css)

**Raw values - source of truth**

```css
:root {
  /* Colors */
  --color-blue-500: #3b82f6;
  --color-gray-900: #111827;

  /* Spacing */
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;

  /* Typography */
  --font-size-base: 1rem;
  --font-weight-medium: 500;

  /* Border radius */
  --border-radius-md: 0.375rem;

  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

## Layer 2: Semantic (styles/tokens/semantic.css)

**Meaning - theming layer**

```css
:root {
  /* Brand */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);

  /* Surface */
  --color-surface: var(--color-white);
  --color-background: var(--color-gray-50);

  /* Text */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);

  /* Interactive */
  --color-interactive-hover: var(--color-gray-100);

  /* Semantic spacing */
  --spacing-component: var(--spacing-4);
  --spacing-section: var(--spacing-8);
}
```

## Layer 3: Component (styles/tokens/components.css)

**Component-specific - USE THESE**

```css
:root {
  /* Button */
  --button-primary-bg: var(--color-primary);
  --button-primary-bg-hover: var(--color-primary-hover);
  --button-primary-text: var(--color-white);
  --button-padding-y: var(--spacing-2);
  --button-padding-x: var(--spacing-4);
  --button-border-radius: var(--border-radius-md);

  /* Card */
  --card-bg: var(--color-surface);
  --card-padding: var(--spacing-component);
  --card-border-radius: var(--border-radius-lg);
  --card-shadow: var(--shadow-md);

  /* Input */
  --input-border: var(--color-border);
  --input-border-focus: var(--color-primary);
  --input-bg: var(--color-surface);
  --input-padding-y: var(--spacing-2);
  --input-padding-x: var(--spacing-3);
}
```

## Using Tokens

### ✅ Correct

```css
/* Use Layer 3 component tokens */
.button-primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-border-radius);
}

.card {
  background: var(--card-bg);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
}
```

### ❌ Incorrect

```css
/* Never use primitives directly */
.button {
  background: var(--color-blue-500); /* ❌ Use --button-primary-bg */
  padding: var(--spacing-2); /* ❌ Use --button-padding-y */
}

/* Never hardcode values */
.card {
  background: #ffffff; /* ❌ Use var(--card-bg) */
  padding: 16px; /* ❌ Use var(--card-padding) */
}
```

## Theme Override (styles/themes/dark.css)

```css
/* Override Layer 2 only */
[data-theme="dark"] {
  --color-primary: var(--color-blue-400);
  --color-surface: var(--color-gray-900);
  --color-background: var(--color-black);
  --color-text-primary: var(--color-gray-50);
  --color-border: var(--color-gray-700);
}
```

## Import Order (main.tsx)

```tsx
import "./styles/reset.css"; // 1. Reset
import "./styles/tokens/primitives.css"; // 2. Layer 1
import "./styles/tokens/semantic.css"; // 3. Layer 2
import "./styles/tokens/components.css"; // 4. Layer 3
import "./styles/themes/dark.css"; // 5. Theme overrides
import "./styles/global.css"; // 6. Global styles
```

## Component Styles

### CSS Modules (Recommended)

```tsx
// Button.tsx
import styles from "./Button.module.css";

export function Button() {
  return <button className={styles.button}>Click</button>;
}
```

```css
/* Button.module.css */
.button {
  background: var(--button-primary-bg);
  padding: var(--button-padding-y) var(--button-padding-x);
}
```

## Class Naming (BEM-inspired)

```css
/* Block */
.card {
}

/* Element */
.card__header {
}
.card__body {
}

/* Modifier */
.card--elevated {
}
.card--compact {
}
```

```tsx
<div className="card card--elevated">
  <div className="card__header">Title</div>
  <div className="card__body">Content</div>
</div>
```

## Responsive Design

```css
/* Mobile-first */
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

## Theme Switching

```tsx
// hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
```

## Conditional Styling

```tsx
import classNames from "classnames";
import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({ variant = "primary", disabled }: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, styles[`button--${variant}`], {
        [styles["button--disabled"]]: disabled,
      })}
    />
  );
}
```

## File Structure

```
styles/
├── reset.css
├── tokens/
│   ├── primitives.css     # Layer 1
│   ├── semantic.css       # Layer 2
│   └── components.css     # Layer 3
├── themes/
│   └── dark.css
└── global.css

components/ui/Button/
├── Button.tsx
├── Button.module.css      # Component styles
├── Button.test.tsx
└── index.ts
```

## Rules

- ✅ Always use Layer 3 component tokens in components
- ✅ Override Layer 2 for themes (never Layer 1)
- ✅ Create component tokens for new components
- ✅ Use CSS Modules for scoping
- ❌ Never use primitives (Layer 1) in components
- ❌ Never hardcode colors, spacing, etc.
- ❌ Never skip the token system

## Quick Reference

```css
/* ALWAYS DO THIS */
background: var(--button-primary-bg);
padding: var(--card-padding);
color: var(--color-text-primary);

/* NEVER DO THIS */
background: #3b82f6;
padding: 16px;
color: #111827;
```

## Benefits

- One-click rebranding
- Effortless theming
- CSS-only theme switching
- Design-dev sync
- Easy maintenance
