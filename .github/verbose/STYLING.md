# Styling Guide

## Design Token System (3-Layer Architecture)

### Visual Overview

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

## Layer 1: Primitives

**Purpose:** Raw, immutable design values - the single source of truth

**File:** `src/styles/tokens/primitives.css`

```css
/* primitives.css */
:root {
  /* Colors - Full palette */
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
  
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-green-500: #10b981;
  --color-green-600: #059669;
  --color-yellow-500: #f59e0b;
  
  --color-white: #ffffff;
  --color-black: #000000;
  
  /* Spacing scale */
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
  
  /* Typography */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Border radius */
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem;  /* 2px */
  --border-radius-md: 0.375rem;  /* 6px */
  --border-radius-lg: 0.5rem;    /* 8px */
  --border-radius-xl: 0.75rem;   /* 12px */
  --border-radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  /* Z-index scale */
  --z-index-base: 0;
  --z-index-dropdown: 1000;
  --z-index-sticky: 1100;
  --z-index-modal: 1200;
  --z-index-popover: 1300;
  --z-index-tooltip: 1400;
}
```

**Rules:**
- ❌ Never use primitives directly in components
- ✅ Only reference primitives in semantic tokens
- ✅ Never change existing values (add new ones instead)

## Layer 2: Semantic Tokens

**Purpose:** Give meaning to primitives - the theming layer

**File:** `src/styles/tokens/semantic.css`

```css
/* semantic.css */
:root {
  /* Brand colors */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-primary-light: var(--color-blue-100);
  
  --color-secondary: var(--color-gray-500);
  --color-secondary-hover: var(--color-gray-600);
  
  /* Status colors */
  --color-success: var(--color-green-500);
  --color-warning: var(--color-yellow-500);
  --color-danger: var(--color-red-500);
  --color-info: var(--color-blue-500);
  
  /* Surface colors */
  --color-surface: var(--color-white);
  --color-surface-raised: var(--color-white);
  --color-surface-overlay: var(--color-white);
  
  /* Background colors */
  --color-background: var(--color-gray-50);
  --color-background-alt: var(--color-gray-100);
  
  /* Text colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary: var(--color-gray-400);
  --color-text-inverse: var(--color-white);
  
  /* Border colors */
  --color-border: var(--color-gray-200);
  --color-border-strong: var(--color-gray-300);
  
  /* Interactive states */
  --color-interactive-hover: var(--color-gray-100);
  --color-interactive-active: var(--color-gray-200);
  --color-focus: var(--color-primary);
  
  /* Semantic spacing */
  --spacing-component: var(--spacing-4);
  --spacing-section: var(--spacing-8);
  --spacing-page: var(--spacing-12);
  
  /* Semantic typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --font-family-heading: var(--font-family-base);
  --font-family-mono: 'Monaco', 'Courier New', monospace;
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

**Dark Theme Override:**

**File:** `src/styles/themes/dark.css`

```css
/* dark.css */
[data-theme='dark'] {
  /* Override semantic tokens only */
  --color-primary: var(--color-blue-400);
  --color-primary-hover: var(--color-blue-300);
  --color-primary-light: var(--color-blue-900);
  
  --color-surface: var(--color-gray-900);
  --color-surface-raised: var(--color-gray-800);
  --color-surface-overlay: var(--color-gray-800);
  
  --color-background: var(--color-black);
  --color-background-alt: var(--color-gray-900);
  
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-300);
  --color-text-tertiary: var(--color-gray-500);
  
  --color-border: var(--color-gray-700);
  --color-border-strong: var(--color-gray-600);
  
  --color-interactive-hover: var(--color-gray-800);
  --color-interactive-active: var(--color-gray-700);
}
```

## Layer 3: Component Tokens

**Purpose:** Component-specific tokens for consistency

**File:** `src/styles/tokens/components.css`

```css
/* components.css */
:root {
  /* Button tokens */
  --button-padding-y: var(--spacing-2);
  --button-padding-x: var(--spacing-4);
  --button-border-radius: var(--border-radius-md);
  --button-font-weight: var(--font-weight-medium);
  
  --button-primary-bg: var(--color-primary);
  --button-primary-bg-hover: var(--color-primary-hover);
  --button-primary-text: var(--color-text-inverse);
  
  --button-secondary-bg: var(--color-secondary);
  --button-secondary-bg-hover: var(--color-secondary-hover);
  --button-secondary-text: var(--color-text-inverse);
  
  --button-danger-bg: var(--color-danger);
  --button-danger-text: var(--color-text-inverse);
  
  /* Input tokens */
  --input-padding-y: var(--spacing-2);
  --input-padding-x: var(--spacing-3);
  --input-border-radius: var(--border-radius-md);
  --input-border: var(--color-border);
  --input-border-focus: var(--color-focus);
  --input-bg: var(--color-surface);
  --input-text: var(--color-text-primary);
  
  /* Card tokens */
  --card-bg: var(--color-surface);
  --card-border: var(--color-border);
  --card-border-radius: var(--border-radius-lg);
  --card-padding: var(--spacing-component);
  --card-shadow: var(--shadow-md);
  
  /* Modal tokens */
  --modal-bg: var(--color-surface-overlay);
  --modal-backdrop-bg: rgb(0 0 0 / 0.5);
  --modal-border-radius: var(--border-radius-xl);
  --modal-padding: var(--spacing-6);
  --modal-shadow: var(--shadow-xl);
  
  /* Navigation tokens */
  --nav-bg: var(--color-surface);
  --nav-border: var(--color-border);
  --nav-item-hover: var(--color-interactive-hover);
  --nav-item-active: var(--color-primary-light);
  
  /* Table tokens */
  --table-bg: var(--color-surface);
  --table-header-bg: var(--color-background-alt);
  --table-border: var(--color-border);
  --table-row-hover: var(--color-interactive-hover);
}
```

## Using Design Tokens

### ✅ Correct Usage

```css
/* Component CSS - Use Layer 3 component tokens */
.button-primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-border-radius);
  font-weight: var(--button-font-weight);
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
```

### ❌ Incorrect Usage

```css
/* ❌ Never use primitives directly */
.button-primary {
  background: var(--color-blue-500);  /* Use --button-primary-bg instead */
  padding: var(--spacing-2) var(--spacing-4);  /* Use component tokens */
}

/* ❌ Never use hardcoded values */
.card {
  background: #ffffff;  /* Use var(--card-bg) */
  padding: 16px;        /* Use var(--card-padding) */
  border-radius: 8px;   /* Use var(--card-border-radius) */
}
```

## CSS Conventions

### File Organization

```
src/styles/
├── reset.css              # CSS reset (import first)
├── tokens/
│   ├── primitives.css     # Layer 1
│   ├── semantic.css       # Layer 2
│   └── components.css     # Layer 3
├── themes/
│   ├── dark.css          # Dark theme overrides
│   └── high-contrast.css # Accessibility theme
└── global.css            # Global styles (import last)
```

### Component Styles

```tsx
// Option 1: CSS Modules (Recommended)
import styles from './Button.module.css'

export function Button() {
  return <button className={styles.button}>Click</button>
}

// Button.module.css
.button {
  background: var(--button-primary-bg);
  /* Component-scoped styles */
}
```

```tsx
// Option 2: Co-located CSS
import './Button.css'

export function Button() {
  return <button className="button-primary">Click</button>
}

// Button.css
.button-primary {
  background: var(--button-primary-bg);
}
```

### Class Naming (BEM-inspired)

```css
/* Block */
.card {
  /* Base styles */
}

/* Element */
.card__header {
  /* Header styles */
}

.card__body {
  /* Body styles */
}

.card__footer {
  /* Footer styles */
}

/* Modifier */
.card--elevated {
  box-shadow: var(--shadow-lg);
}

.card--compact {
  padding: var(--spacing-2);
}
```

### Usage Example

```tsx
<div className="card card--elevated">
  <div className="card__header">
    <h2>Title</h2>
  </div>
  <div className="card__body">
    <p>Content</p>
  </div>
  <div className="card__footer">
    <button>Action</button>
  </div>
</div>
```

## Importing Global Styles

**File:** `src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

// ⚠️ Order matters!
import './styles/reset.css'              // 1. Reset first
import './styles/tokens/primitives.css'  // 2. Layer 1
import './styles/tokens/semantic.css'    // 3. Layer 2
import './styles/tokens/components.css'  // 4. Layer 3
import './styles/themes/dark.css'        // 5. Theme overrides
import './styles/global.css'             // 6. Global styles last

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

## Responsive Design

### Breakpoints

```css
/* semantic.css */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### Media Queries

```css
/* Mobile-first approach */
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-8);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-12);
  }
}
```

## Theme Switching

```tsx
// hooks/useTheme.ts
import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  })
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return { theme, setTheme, toggleTheme }
}
```

## Design Token Benefits

1. **One-click rebranding** - Change Layer 2 semantic tokens
2. **Effortless theming** - Override Layer 2 for themes
3. **A/B testing** - Test different styles without touching components
4. **Design-dev sync** - Mirrors Figma token structure
5. **Maintenance** - Change once, propagate everywhere
6. **CSS-only theming** - No JS re-renders needed

## Common Patterns

### Conditional Styling

```tsx
// Using classnames library
import classNames from 'classnames'
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export function Button({ variant = 'primary', size = 'medium', disabled }: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        { [styles['button--disabled']]: disabled }
      )}
    >
      Click me
    </button>
  )
}
```

### Dynamic Styles

```tsx
// Using inline styles for dynamic values
<div
  style={{
    width: `${progress}%`,
    background: 'var(--color-primary)',
  }}
/>
```

### CSS-in-JS Alternative

If your project requires CSS-in-JS, still use design tokens:

```tsx
import styled from 'styled-components'

const Button = styled.button`
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-border-radius);
  
  &:hover {
    background: var(--button-primary-bg-hover);
  }
`
```

## Related Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** - Component patterns and organization
- **[DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md)** - File naming and structure
