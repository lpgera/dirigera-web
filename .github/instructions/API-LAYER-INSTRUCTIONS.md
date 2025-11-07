# API Layer - Agent Guide

## Architecture

```
Components → React Query Hooks → API Services → HTTP Client
```

## HTTP Client Setup

```tsx
// lib/api/client.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
});

// Request interceptor - add auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

## API Service Pattern

```tsx
// features/user/api/userService.ts
import { apiClient } from "@/lib/api/client";

export const getUser = async (id: string): Promise<User> => {
  return apiClient.get(`/users/${id}`);
};

export const updateUser = async (
  id: string,
  data: UpdateUserData
): Promise<User> => {
  return apiClient.put(`/users/${id}`, data);
};
```

## React Query Hooks

```tsx
// features/user/hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

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
```

## TypeScript Types

```tsx
// Backend DTO (snake_case)
interface UserDTO {
  id: string;
  full_name: string;
  created_at: string;
}

// Frontend model (camelCase)
interface User {
  id: string;
  name: string;
  createdAt: Date;
}

// Transform at service layer
function transformUser(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.full_name,
    createdAt: new Date(dto.created_at),
  };
}
```

## Query Keys Factory

```tsx
// features/user/hooks/queryKeys.ts
export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
};

// Usage
queryClient.invalidateQueries({ queryKey: userKeys.all });
queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
```

## Rules

- ✅ Transform DTOs in service layer, not components
- ✅ All types explicit, no `any`
- ✅ Use React Query hooks in components, never services directly
- ✅ Centralize error handling in client interceptors
- ❌ Never call API services directly from components
- ❌ Never transform data in components

## File Structure

```
features/user/
├── api/
│   └── userService.ts
├── hooks/
│   ├── useUser.ts
│   ├── useUpdateUser.ts
│   └── queryKeys.ts
└── types/
    └── user.types.ts
```
