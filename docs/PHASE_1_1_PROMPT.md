# Phase 1.1: Create Scenes API Layer

## Objective

Create the GraphQL API layer for the scenes feature module by extracting GraphQL operations from the legacy `components/Scenes.tsx` component and placing them in a new feature-based API module.

## Context

We are refactoring the FloorTabs subcomponents to remove Ant Design dependencies and align with proper feature-based architecture. The first step is to create a dedicated scenes feature module starting with its API layer.

### Current State

- Legacy component: `frontend/src/components/Scenes.tsx` contains inline GraphQL operations
- The component uses `gql` from `@apollo/client` for queries and mutations
- GraphQL operations are tightly coupled with the component
- No proper feature module exists for scenes

### Target Architecture

```
features/scenes/
├── api/
│   └── scenesApi.ts       # GraphQL queries and mutations
├── components/
├── hooks/
├── types/
└── index.ts
```

## Task Requirements

### 1. Analyze Current Implementation

**Action**: Examine `frontend/src/components/Scenes.tsx` to identify:
- All GraphQL queries defined with `gql`
- All GraphQL mutations defined with `gql`
- The structure of the Scene type (from query/mutation usage)
- Any query variables or parameters

### 2. Create Feature Directory Structure

**Action**: Create the following directories if they don't exist:
```
frontend/src/features/scenes/
frontend/src/features/scenes/api/
```

### 3. Create scenesApi.ts

**Location**: `frontend/src/features/scenes/api/scenesApi.ts`

**Requirements**:
- Import `gql` from `@apollo/client`
- Export a `SCENES_QUERY` constant containing the GraphQL query for fetching scenes
- Export an `ACTIVATE_SCENE_MUTATION` constant containing the GraphQL mutation for activating a scene
- Ensure the query includes all fields currently used by the Scenes component (at minimum: `id`, `name`)
- Follow the exact GraphQL schema structure from the current implementation

**Expected Structure**:
```typescript
import { gql } from "@apollo/client";

export const SCENES_QUERY = gql`
  // Extract the actual query from Scenes.tsx
`;

export const ACTIVATE_SCENE_MUTATION = gql`
  // Extract the actual mutation from Scenes.tsx
`;
```

### 4. Validation

**Verify**:
- [ ] File created at correct location: `frontend/src/features/scenes/api/scenesApi.ts`
- [ ] All GraphQL operations extracted from legacy component
- [ ] Query includes all required fields (id, name, and any others used)
- [ ] Mutation includes correct parameters and structure
- [ ] Imports are correct (`gql` from `@apollo/client`)
- [ ] TypeScript has no compilation errors
- [ ] Exports are named exports (not default)

## Constraints

- **Do not modify** the legacy `components/Scenes.tsx` component yet
- **Do not create** hooks or types yet (those are separate phases)
- **Do not change** the GraphQL schema or field names
- **Extract only** - this phase is about moving code, not refactoring logic
- Use **double quotes** for strings
- Include **semicolons**
- Use **2-space** indentation

## Success Criteria

- ✅ New file `scenesApi.ts` created in correct location
- ✅ GraphQL query and mutation properly exported
- ✅ Code compiles without TypeScript errors
- ✅ GraphQL operations match the legacy component's implementation
- ✅ File follows project code style (double quotes, semicolons, 2-space indent)

## Next Steps (Not in This Phase)

After completing this phase, subsequent phases will:
- Create React Query hooks that use these operations
- Create UI components for scenes
- Create container components with business logic
- Update RoomCard and FloorTabs to use the new feature module

## Reference Files

- Legacy component: `frontend/src/components/Scenes.tsx`
- Architecture guidelines: `.github/copilot-instructions.md`
- Main refactoring plan: `FLOORTABS_SUBCOMPONENTS_REFACTORING_PLAN.md`
