# API Layer Guide

## Overview

The API layer handles all communication with backend services, providing a clean interface for data fetching and manipulation.

**Key Principles:**
- Type-safe requests and responses
- Centralized error handling
- Request/response transformation
- Integration with React Query
- Proper HTTP client configuration

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     COMPONENTS                          │
│  (Use hooks, not services directly)                     │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────┐
│                  REACT QUERY HOOKS                      │
│  (features/*/hooks/)                                    │
│  • useUser()                                            │
│  • useUpdateUser()                                      │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────┐
│                   API SERVICES                          │
│  (features/*/api/)                                      │
│  • getUser()                                            │
│  • updateUser()                                         │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────┐
│                   HTTP CLIENT                           │
│  (lib/api/client.ts)                                    │
│  • axios/fetch wrapper                                  │
│  • Interceptors                                         │
│  • Base configuration                                   │
└─────────────────────────────────────────────────────────┘
```

## HTTP Client Setup

### Axios Client

```tsx
// lib/api/client.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { env } from '@/config/env'

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    
    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      // Show forbidden message
      console.error('Access forbidden')
    }
    
    return Promise.reject(error)
  }
)
```

### Fetch Alternative

```tsx
// lib/api/client.ts
import { env } from '@/config/env'

interface RequestConfig extends RequestInit {
  params?: Record<string, string>
}

class APIClient {
  private baseURL: string
  
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, ...options } = config
    
    // Build URL with query params
    const url = new URL(`${this.baseURL}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
    
    // Add auth token
    const token = localStorage.getItem('auth_token')
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    
    const response = await fetch(url.toString(), {
      ...options,
      headers,
    })
    
    // Handle errors
    if (!response.ok) {
      const error = await response.json()
      throw new APIError(error.message, response.status, error)
    }
    
    return response.json()
  }
  
  get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }
  
  post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
  
  put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
  
  delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

export const apiClient = new APIClient(env.apiUrl)
```

## Error Handling

### Custom Error Class

```tsx
// lib/api/errors.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
  
  get isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500
  }
  
  get isServerError(): boolean {
    return this.statusCode >= 500
  }
  
  get isNotFound(): boolean {
    return this.statusCode === 404
  }
  
  get isUnauthorized(): boolean {
    return this.statusCode === 401
  }
  
  get isForbidden(): boolean {
    return this.statusCode === 403
  }
}
```

### Error Handler Utility

```tsx
// lib/api/errorHandler.ts
import { AxiosError } from 'axios'
import { APIError } from './errors'

export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error
  }
  
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message
    const statusCode = error.response?.status || 500
    return new APIError(message, statusCode, error.response?.data)
  }
  
  if (error instanceof Error) {
    return new APIError(error.message, 500)
  }
  
  return new APIError('An unknown error occurred', 500)
}
```

## API Service Pattern

### Feature API Service

```tsx
// features/user/api/userService.ts
import { apiClient } from '@/lib/api/client'
import type { User, UpdateUserData } from '../types/user.types'

export const userService = {
  // GET /users/:id
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response
  },
  
  // GET /users
  getUsers: async (params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<{ users: User[]; total: number }> => {
    const response = await apiClient.get('/users', { params })
    return response
  },
  
  // POST /users
  createUser: async (data: Omit<User, 'id'>): Promise<User> => {
    const response = await apiClient.post<User>('/users', data)
    return response
  },
  
  // PUT /users/:id
  updateUser: async (id: string, data: UpdateUserData): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, data)
    return response
  },
  
  // DELETE /users/:id
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },
}

// Named exports for tree-shaking
export const getUser = userService.getUser
export const getUsers = userService.getUsers
export const createUser = userService.createUser
export const updateUser = userService.updateUser
export const deleteUser = userService.deleteUser
```

### Response Transformation

```tsx
// features/user/api/userService.ts
import { apiClient } from '@/lib/api/client'
import type { User, UserDTO } from '../types/user.types'

// Transform backend DTO to frontend model
function transformUser(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.full_name, // Transform snake_case to camelCase
    email: dto.email,
    avatarUrl: dto.avatar_url,
    role: dto.role,
    createdAt: new Date(dto.created_at), // Parse date string
  }
}

export const getUser = async (id: string): Promise<User> => {
  const dto = await apiClient.get<UserDTO>(`/users/${id}`)
  return transformUser(dto)
}

export const getUsers = async (): Promise<User[]> => {
  const dtos = await apiClient.get<UserDTO[]>('/users')
  return dtos.map(transformUser)
}
```

## TypeScript Types

### API Types

```tsx
// features/user/types/user.types.ts

// Backend DTO (snake_case from API)
export interface UserDTO {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

// Frontend model (camelCase for use in app)
export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

// Update payload
export interface UpdateUserData {
  name?: string
  email?: string
  avatarUrl?: string | null
}

// Create payload
export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
```

### Generic API Response Types

```tsx
// lib/api/types.ts

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface APIResponse<T> {
  data: T
  message?: string
}

export interface APIError {
  message: string
  code?: string
  field?: string
}
```

## React Query Integration

### Query Hooks

```tsx
// features/user/hooks/useUser.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getUser } from '../api/userService'
import type { User } from '../types/user.types'
import { handleAPIError } from '@/lib/api/errorHandler'

export function useUser(
  userId: string,
  options?: UseQueryOptions<User, Error>
) {
  return useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      try {
        return await getUser(userId)
      } catch (error) {
        throw handleAPIError(error)
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}
```

### Mutation Hooks

```tsx
// features/user/hooks/useUpdateUser.ts
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query'
import { updateUser } from '../api/userService'
import type { User, UpdateUserData } from '../types/user.types'
import { handleAPIError } from '@/lib/api/errorHandler'

interface UpdateUserVariables {
  id: string
  data: UpdateUserData
}

export function useUpdateUser(
  options?: UseMutationOptions<User, Error, UpdateUserVariables>
) {
  const queryClient = useQueryClient()
  
  return useMutation<User, Error, UpdateUserVariables>({
    mutationFn: async ({ id, data }) => {
      try {
        return await updateUser(id, data)
      } catch (error) {
        throw handleAPIError(error)
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user', data.id] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    ...options,
  })
}
```

### Optimistic Updates

```tsx
// features/user/hooks/useUpdateUser.ts
export function useUpdateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: UpdateUserVariables) => updateUser(id, data),
    
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user', id] })
      
      // Snapshot current value
      const previous = queryClient.getQueryData<User>(['user', id])
      
      // Optimistically update cache
      queryClient.setQueryData<User>(['user', id], (old) => ({
        ...old!,
        ...data,
      }))
      
      return { previous, id }
    },
    
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previous) {
        queryClient.setQueryData(['user', context.id], context.previous)
      }
    },
    
    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
    },
  })
}
```

## Query Keys

### Consistent Key Structure

```tsx
// features/user/hooks/queryKeys.ts

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

// Usage
useQuery({
  queryKey: userKeys.detail(userId),
  queryFn: () => getUser(userId),
})

// Invalidate all user queries
queryClient.invalidateQueries({ queryKey: userKeys.all })

// Invalidate all user lists
queryClient.invalidateQueries({ queryKey: userKeys.lists() })

// Invalidate specific user
queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) })
```

## Pagination

```tsx
// features/user/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/userService'

export function useUsers(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['users', 'list', { page, limit }],
    queryFn: () => getUsers({ page, limit }),
    keepPreviousData: true, // Keep showing old data while fetching new
  })
}

// Component usage
function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isPreviousData } = useUsers(page)
  
  return (
    <>
      <div style={{ opacity: isPreviousData ? 0.5 : 1 }}>
        {data?.users.map(user => <UserCard key={user.id} user={user} />)}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </>
  )
}
```

## File Upload

```tsx
// features/user/api/userService.ts
export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append('avatar', file)
  
  const response = await apiClient.post<{ url: string }>(
    `/users/${userId}/avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  
  return response
}

// Hook
export function useUploadAvatar() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      uploadAvatar(userId, file),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] })
    },
  })
}
```

## Polling/Real-time Updates

```tsx
// Polling
export function useRealtimeUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: false, // Stop when tab is inactive
  })
}

// Refetch on window focus
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    refetchOnWindowFocus: true, // Refetch when user returns to tab
  })
}
```

## Best Practices

### 1. Type Everything

```tsx
// ✅ Good - Explicit types
export async function getUser(id: string): Promise<User> {
  return apiClient.get<User>(`/users/${id}`)
}

// ❌ Bad - No types
export async function getUser(id) {
  return apiClient.get(`/users/${id}`)
}
```

### 2. Transform at the Boundary

```tsx
// ✅ Good - Transform in service
export async function getUser(id: string): Promise<User> {
  const dto = await apiClient.get<UserDTO>(`/users/${id}`)
  return transformUser(dto) // Transform here
}

// ❌ Bad - Transform in components
function UserProfile() {
  const { data } = useQuery(...)
  const user = transformUser(data) // Don't transform here
}
```

### 3. Centralize Error Handling

```tsx
// ✅ Good - Error handler utility
try {
  return await getUser(id)
} catch (error) {
  throw handleAPIError(error) // Consistent error handling
}

// ❌ Bad - Scattered error handling
try {
  return await getUser(id)
} catch (error) {
  console.error(error) // Inconsistent
}
```

### 4. Use Query Keys Factory

```tsx
// ✅ Good - Centralized keys
const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
}

// ❌ Bad - Inline keys everywhere
queryKey: ['users', userId]
queryKey: ['user', userId] // Typo!
```

### 5. Colocate API Code

```
features/user/
├── api/
│   └── userService.ts      # API calls
├── hooks/
│   ├── useUser.ts          # Query hook
│   └── useUpdateUser.ts    # Mutation hook
└── types/
    └── user.types.ts       # Types
```

## Related Documentation

- **[STATE-MANAGEMENT.md](./STATE-MANAGEMENT.md)** - React Query integration
- **[TESTING.md](./TESTING.md)** - API testing with MSW
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Where to place API files
