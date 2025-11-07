# Testing - Agent Guide

## Philosophy

**Test behavior, not implementation**

Focus on what users see and do, not how code works internally.

## Testing Pyramid

```
E2E (10%)          ← Critical user journeys
Integration (20%)  ← Components + state + API
Unit (70%)         ← Functions, utilities, UI
```

## Setup

### Vitest Config

```ts
// vite.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

### Test Setup

```ts
// test/setup.ts
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

## Testing UI Components

### Basic Test

```tsx
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

describe("Button", () => {
  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### Variants Testing

```tsx
it.each([
  ["primary", "button--primary"],
  ["secondary", "button--secondary"],
])("renders %s variant", (variant, expectedClass) => {
  render(<Button variant={variant}>Click</Button>);
  expect(screen.getByRole("button")).toHaveClass(expectedClass);
});
```

## Testing Container Components

### With React Query

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("UserProfile", () => {
  it("displays user after loading", async () => {
    render(<UserProfile userId="1" />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });
});
```

### With Zustand

```tsx
import { useUserStore } from "../stores/userStore";

beforeEach(() => {
  useUserStore.setState({
    preferences: { notifications: true },
  });
});

describe("UserSettings", () => {
  it("updates preferences", async () => {
    const user = userEvent.setup();
    render(<UserSettings />);

    await user.click(screen.getByLabelText(/notifications/i));

    expect(useUserStore.getState().preferences.notifications).toBe(false);
  });
});
```

## MSW (Mock Service Worker)

### Setup

```ts
// test/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
  rest.get("/api/users/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: req.params.id,
        name: "John Doe",
        email: "john@example.com",
      })
    );
  }),
];
```

```ts
// test/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Override in Tests

```tsx
it("shows error on 404", async () => {
  server.use(
    rest.get("/api/users/:id", (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  render(<UserProfile userId="999" />, { wrapper: createWrapper() });

  await waitFor(() => {
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
```

## Testing Hooks

### React Query Hook

```tsx
import { renderHook, waitFor } from "@testing-library/react";

describe("useUser", () => {
  it("fetches user data", async () => {
    const { result } = renderHook(() => useUser("1"), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.name).toBe("John Doe");
  });
});
```

### Zustand Hook

```tsx
import { renderHook, act } from "@testing-library/react";

describe("useUIStore", () => {
  it("toggles theme", () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
  });
});
```

## Testing Utilities

```tsx
// formatters.test.ts
describe("formatCurrency", () => {
  it("formats USD correctly", () => {
    expect(formatCurrency(1234.56, "USD")).toBe("$1,234.56");
  });
});
```

## Test Utilities

### Custom Render

```tsx
// test/utils/render.tsx
function Providers({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function customRender(ui, options) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from "@testing-library/react";
export { customRender as render };
```

### Mock Factory

```tsx
// test/factories/userFactory.ts
let idCounter = 0;

export function createUser(overrides?: Partial<User>): User {
  return {
    id: `user-${++idCounter}`,
    name: "John Doe",
    email: "john@example.com",
    ...overrides,
  };
}
```

## Common Patterns

### Form Testing

```tsx
it("submits form with valid data", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<LoginForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/email/i), "john@example.com");
  await user.type(screen.getByLabelText(/password/i), "password123");
  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: "john@example.com",
    password: "password123",
  });
});
```

### Async Testing

```tsx
it("shows data after loading", async () => {
  render(<UserProfile userId="1" />);

  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  expect(screen.getByText("John Doe")).toBeInTheDocument();
});
```

### User Interactions

```tsx
it("opens menu on click", async () => {
  const user = userEvent.setup();

  render(<Dropdown />);

  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("menu")).toBeInTheDocument();
});
```

## Query Selectors (Priority Order)

```tsx
// 1. Accessible queries (best)
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByText(/welcome/i);

// 2. Test IDs (last resort)
screen.getByTestId("custom-element");

// ❌ Never use
screen.getByClassName("button");
screen.getById("submit-btn");
```

## Commands

```bash
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

## Coverage Targets

- Overall: 80%
- Critical paths: 100%
- UI components: 80%
- Utilities: 90%

## Best Practices

### ✅ Do

```tsx
// Test user behavior
test("shows error on invalid input", async () => {
  await user.type(screen.getByLabelText(/email/i), "invalid");
  await user.click(screen.getByRole("button"));
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});

// Use accessible queries
screen.getByRole("button");
screen.getByLabelText(/email/i);

// Wait for async
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

### ❌ Don't

```tsx
// Don't test implementation
const spy = jest.spyOn(React, "useState");

// Don't use class/ID queries
screen.getByClassName("button");

// Don't use arbitrary timeouts
await new Promise((r) => setTimeout(r, 1000));
```

## Rules

- ✅ Test behavior, not implementation
- ✅ Use accessible queries (role, label, text)
- ✅ Mock API with MSW
- ✅ Wait for async with waitFor
- ✅ Use userEvent for interactions
- ❌ Never test internal state/props
- ❌ Never use class/ID selectors
- ❌ Never use arbitrary timeouts
