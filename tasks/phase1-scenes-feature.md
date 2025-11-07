# Phase 1: Create Scenes Feature Module

## Task 1.1: Create Scenes API Layer

**File**: `frontend/src/features/scenes/api/scenesApi.ts`

**Action**: Create new file with GraphQL queries and mutations

**Requirements**:
- Export `SCENES_QUERY` with fields: id, name
- Export `ACTIVATE_SCENE_MUTATION` with $id parameter
- Use gql from @apollo/client

**Acceptance Criteria**:
- [ ] File created at correct location
- [ ] Both query and mutation exported
- [ ] TypeScript compiles without errors

---

## Task 1.2: Create useScenes Hook

**File**: `frontend/src/features/scenes/hooks/useScenes.ts`

**Action**: Create React Query hook for fetching scenes

**Requirements**:
- Use useQuery from @apollo/client/react
- Import SCENES_QUERY from api layer
- Return data, loading, error, refetch
- Use proper TypeScript types

**Acceptance Criteria**:
- [ ] Hook created and exported
- [ ] Proper error handling
- [ ] TypeScript types correct
- [ ] No eslint warnings

---

## Task 1.3: Create useActivateScene Hook

**File**: `frontend/src/features/scenes/hooks/useActivateScene.ts`

**Action**: Create React Query mutation hook for scene activation

**Requirements**:
- Use useMutation from @apollo/client/react
- Import ACTIVATE_SCENE_MUTATION
- Handle success/error states
- Return mutate function and status

**Acceptance Criteria**:
- [ ] Hook created and exported
- [ ] Mutation triggers correctly
- [ ] Error handling in place
- [ ] TypeScript types correct

---

## Task 1.4: Create SceneButton UI Component

**File**: `frontend/src/features/scenes/components/ui/SceneButton.tsx`

**Action**: Create pure UI component for single scene button

**Requirements**:
- Accept props: scene (with id, name), onClick, isActivating
- Pure presentation component (no hooks)
- Use component design tokens
- Create accompanying CSS file

**Acceptance Criteria**:
- [ ] Component is pure (props only)
- [ ] Proper TypeScript interface
- [ ] CSS uses design tokens
- [ ] Accessible button implementation

---

## Task 1.5: Create SceneButton CSS

**File**: `frontend/src/features/scenes/components/ui/SceneButton.css`

**Action**: Create styles for SceneButton

**Requirements**:
- Use component design tokens (--scene-button-*)
- Handle hover/active/disabled states
- Responsive design
- Match existing UI aesthetic

**Acceptance Criteria**:
- [ ] All states styled
- [ ] Uses CSS variables only
- [ ] Responsive layout
- [ ] No hardcoded colors

---

## Task 1.6: Create ScenesList UI Component

**File**: `frontend/src/features/scenes/components/ui/ScenesList.tsx`

**Action**: Create grid layout component for scenes

**Requirements**:
- Accept props: children, layout props
- Pure presentation (no data fetching)
- Responsive grid layout
- Create accompanying CSS file

**Acceptance Criteria**:
- [ ] Component renders children
- [ ] Grid layout responsive
- [ ] TypeScript types correct
- [ ] CSS file created

---

## Task 1.7: Create ScenesList CSS

**File**: `frontend/src/features/scenes/components/ui/ScenesList.css`

**Action**: Create grid layout styles

**Requirements**:
- Responsive grid (auto-fit/minmax)
- Use component design tokens
- Proper spacing
- Match Ant Design Row/Col behavior

**Acceptance Criteria**:
- [ ] Responsive grid works
- [ ] Uses CSS variables
- [ ] Proper gaps/spacing
- [ ] Works on mobile

---

## Task 1.8: Create Scenes Container

**File**: `frontend/src/features/scenes/components/containers/Scenes.tsx`

**Action**: Create container with business logic and data fetching

**Requirements**:
- Use useScenes and useActivateScene hooks
- Compose ScenesList and SceneButton UI components
- Handle loading/error states
- Accept scope prop (house/floor/room)

**Acceptance Criteria**:
- [ ] Data fetching works
- [ ] Scene activation works
- [ ] Loading states displayed
- [ ] Error handling in place
- [ ] TypeScript compiles

---

## Task 1.9: Create Scene Types

**File**: `frontend/src/features/scenes/types/index.ts`

**Action**: Define TypeScript types for scenes feature

**Requirements**:
- Scene interface (id, name)
- ScenesQuery type
- ScenesQueryVariables type
- ActivateSceneMutation types

**Acceptance Criteria**:
- [ ] All types exported
- [ ] Matches GraphQL schema
- [ ] Used by hooks and components
- [ ] No any types

---

## Task 1.10: Create Scenes Public API

**File**: `frontend/src/features/scenes/index.ts`

**Action**: Export public API for scenes feature

**Requirements**:
- Export Scenes container (default)
- Export hooks (named exports)
- Export types (type exports)
- Do NOT export UI components or API internals

**Acceptance Criteria**:
- [ ] Only public API exported
- [ ] Container and hooks available
- [ ] Types exported as types
- [ ] No internal implementation details leaked

---

## Verification Steps

After completing all tasks:

1. Run TypeScript compiler: `npm run type-check`
2. Import in FloorTabs: `import { Scenes } from "@/features/scenes"`
3. Verify no Ant Design imports
4. Test scene activation in browser
5. Check React DevTools for proper component tree
