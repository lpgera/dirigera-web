# Dirigera Web - AI Coding Assistant Instructions

## Architecture Overview

This is a **TypeScript monorepo** with npm workspaces (`backend/` and `frontend/`) for controlling IKEA Dirigera smart home devices. The backend serves both GraphQL APIs and the built frontend as static files.

### Key Technology Stack

- **Backend**: Express + Apollo GraphQL Server + WebSocket updates
- **Frontend**: React + Vite + Ant Design + Apollo Client + PWA
- **Code Generation**: GraphQL Code Generator for type-safe operations
- **Testing**: Node.js native test runner (backend only)
- **Development**: Docker Compose for local development with hot reload

## Development Workflows

### Starting Development Environment

```bash
# Full development with Docker (recommended)
docker-compose up

# Or manually with npm workspaces
npm run watch -w backend    # Starts backend on :4000
npm run watch -w frontend   # Starts frontend on :3000
```

### Code Generation (Critical)

- **Backend**: `npm run graphql-codegen -w backend` generates `src/graphql/resolvers.gen.ts`
- **Frontend**: `npm run graphql-codegen -w frontend` generates types throughout `src/`
- Always run codegen after GraphQL schema changes before editing resolvers/components

### Testing & Building

```bash
npm test                    # Runs backend tests only
npm run build              # Builds frontend for production
npm start                  # Starts production server
```

## GraphQL Patterns

### Schema-First Architecture

- GraphQL schema defined in `backend/src/graphql/definitions/*.ts` files
- Each definition exports `typeDefs` and `resolvers`
- Resolvers use generated types from `resolvers.gen.ts`

### Frontend Type Generation

- Uses **near-operation-file preset** - generates `.types.gen.ts` files next to components
- Components import types: `import type { RoomQuery } from './Room.types.gen.ts'`
- All GraphQL operations in components trigger type generation

### Authentication Pattern

- Uses `@loggedIn` directive in schema for protected operations
- JWT tokens stored in React context (`AuthContext`)
- WebSocket connection includes token in URL params

## File Structure Conventions

### Backend Organization

```
backend/src/
├── index.ts              # Express server + WebSocket setup
├── dirigera.ts           # IKEA Dirigera API client
├── jwt.ts               # JWT utilities with tests
└── graphql/
    ├── server.ts        # Apollo server configuration
    ├── context.ts       # GraphQL context (user auth, etc.)
    ├── definitions/     # Schema definitions + resolvers
    └── directives/      # Custom GraphQL directives
```

### Frontend Organization

```
frontend/src/components/
├── App.tsx              # Router + providers setup
├── Frame.tsx            # Layout component
├── AuthContext.tsx     # Authentication state
├── WebSocketUpdateProvider.tsx  # Real-time updates
└── deviceControls/      # Reusable device control components
```

## Smart Home Domain Patterns

### Device Control Components

- Located in `frontend/src/components/deviceControls/`
- Each control has its own GraphQL mutation and types
- Examples: `IsOn.tsx`, `LightLevel.tsx`, `Volume.tsx`
- Use Ant Design components for UI consistency

### Real-time Updates

- WebSocket connection established in `WebSocketUpdateProvider`
- Backend broadcasts device state changes via WebSocket
- Frontend components refetch data on WebSocket messages using `useRefetch.ts`

## Environment Configuration

Required `.env` variables:

- `GATEWAY_IP`: IKEA Dirigera gateway IP (optional - auto-discovery)
- `ACCESS_TOKEN`: Gateway access token (get via `npx dirigera authenticate`)
- `JWT_SECRET`: For signing auth tokens
- `PASSWORD`: Web interface password
- `PORT`: Server port (default: 4000)

## Storybook Integration

- Stories located next to components (`.stories.tsx`)
- Run with `npm run storybook -w frontend`
- Used for component development and documentation
- Chromatic integration for visual testing

## Common Patterns

- **GraphQL operations**: Always include proper typing with generated types
- **Component props**: Use generated GraphQL types for device/room data
- **Error handling**: Follow existing patterns in device controls
- **State management**: React Context for auth, Apollo Client for data
- **Styling**: Use Ant Design components with dark theme configuration

## Testing Approach

- Backend: Node.js native test runner with `.test.ts` files
- Tests focus on business logic (JWT, GraphQL resolvers, auth)
- No frontend tests currently - relies on Storybook for component validation
