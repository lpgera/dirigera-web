# FloorTabs Subcomponents Refactoring Plan

## Overview

Refactor the remaining Ant Design dependencies in FloorTabs subcomponents (Scenes and RoomCard) to use local components, following the established architecture patterns and composition principles.

## Current State Analysis

### Components Using Ant Design

1. **Scenes.tsx** (`frontend/src/components/Scenes.tsx`)
   - Uses: `Button`, `Col`, `Row` from `antd`
   - Status: Legacy component in `components/` folder
   - Usage: Imported by FloorTabs container

2. **RoomCard** (`frontend/src/features/rooms/components/containers/RoomCard.tsx`)
   - Imports: `Scenes`, `DeviceControl`, `BatteryIcon` from legacy `components/`
   - Status: Already uses composition pattern with `RoomCardUI`

3. **DeviceControl.tsx** (referenced by RoomCard)
   - Location: `frontend/src/components/DeviceControl.tsx`
   - Likely uses Ant Design components

4. **BatteryIcon.tsx** (referenced by RoomCard)
   - Location: `frontend/src/components/BatteryIcon.tsx`
   - Needs verification

### Current FloorTabs Container Dependencies

```tsx
import Scenes from "@/components/Scenes"; // ❌ Legacy antd component
import { RoomCard } from "./RoomCard"; // ✅ Uses composition, but imports legacy
```

### Architecture Issues

1. **Violates layer boundaries**: Features importing from legacy `components/`
2. **Ant Design dependencies**: Scenes uses `antd` components
3. **Missing feature API**: No scenes feature module
4. **Tight coupling**: Components depend on legacy implementations

---

## Architecture Alignment

### Target Layer Structure

```
features/
├── scenes/
│   ├── api/
│   │   └── scenesApi.ts              # GraphQL queries/mutations
│   ├── components/
│   │   ├── ui/
│   │   │   ├── SceneButton.tsx       # Single scene button
│   │   │   ├── SceneButton.css
│   │   │   ├── ScenesList.tsx        # Scenes grid layout
│   │   │   └── ScenesList.css
│   │   └── containers/
│   │       └── Scenes.tsx            # Data + business logic
│   ├── hooks/
│   │   ├── useScenes.ts              # Query hook
│   │   └── useActivateScene.ts       # Mutation hook
│   ├── types/
│   │   └── index.ts                  # Scene types
│   └── index.ts                      # Public API
│
├── devices/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── DeviceControlUI.tsx   # Pure UI
│   │   │   ├── BatteryIndicator.tsx  # Pure UI
│   │   │   └── DeviceIcon.tsx        # Pure UI
│   │   └── containers/
│   │       └── DeviceControl.tsx     # Business logic
│   ├── hooks/
│   │   └── useDeviceControl.ts
│   └── index.ts
│
└── rooms/
    ├── components/
    │   ├── ui/
    │   │   └── RoomCardUI.tsx        # Already refactored ✅
    │   └── containers/
    │       ├── RoomCard.tsx          # Update imports
    │       └── FloorTabs.tsx         # Update imports
    └── index.ts
```

---

## Refactoring Strategy

### Principle: Bottom-Up Approach

Refactor from the most primitive components up to complex containers:

1. Shared UI primitives (if needed)
2. Device components
3. Scenes components
4. Update RoomCard container
5. Update FloorTabs container

---

## Phase 1: Create Scenes Feature Module

### 1.1 Create Scenes API Layer

**Location**: `frontend/src/features/scenes/api/scenesApi.ts`

**Purpose**: GraphQL queries and mutations for scenes

```typescript
import { gql } from "@apollo/client";

export const SCENES_QUERY = gql`
  query Scenes {
    scenes {
      id
      name
    }
  }
`;

export const ACTIVATE_SCENE_MUTATION = gql`
  mutation ActivateScene($id: String!) {
    activateScene(id: $id)
  }
`;
```

**Changes**:

- Extract GraphQL operations from component
- Co-locate with feature
- Enable reuse across components

---

### 1.2 Create Scenes Hooks

**Location**: `frontend/src/features/scenes/hooks/useScenes.ts`

**Purpose**: Query hook for fetching scenes

```typescript
import { useQuery } from "@apollo/client/react";
import { SCENES_QUERY } from "../api/scenesApi";
import type { ScenesQuery, ScenesQueryVariables } from "../types";

export function useScenes() {
  const { data, loading, error, refetch } = useQuery<
    ScenesQuery,
    ScenesQueryVariables
  >(SCENES_QUERY);

  return {
    scenes: data?.scenes ?? [],
    loading,
    error,
    refetch,
  };
}
```

**Location**: `frontend/src/features/scenes/hooks/useActivateScene.ts`

**Purpose**: Mutation hook for activating scenes

```typescript
import { useMutation } from "@apollo/client/react";
import { ACTIVATE_SCENE_MUTATION } from "../api/scenesApi";
import type {
  ActivateSceneMutation,
  ActivateSceneMutationVariables,
} from "../types";

export function useActivateScene() {
  const [activateScene, { loading, error }] = useMutation<
    ActivateSceneMutation,
    ActivateSceneMutationVariables
  >(ACTIVATE_SCENE_MUTATION);

  return {
    activateScene: (id: string) => activateScene({ variables: { id } }),
    loading,
    error,
  };
}
```

---

### 1.3 Create SceneButton UI Component

**Location**: `frontend/src/features/scenes/components/ui/SceneButton.tsx`

**Purpose**: Pure UI for a single scene button

**Props**:

```typescript
interface SceneButtonProps {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}
```

**Implementation**:

```tsx
import { Button } from "@/components/ui";
import "./SceneButton.css";

export function SceneButton({
  name,
  onClick,
  disabled,
  loading,
}: SceneButtonProps) {
  return (
    <Button
      variant="default"
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      className="scene-button"
    >
      {name}
    </Button>
  );
}
```

**CSS** (`SceneButton.css`):

```css
.scene-button {
  width: 100%;
  height: auto;
  min-height: 40px;
  text-align: left;
  justify-content: flex-start;
}
```

---

### 1.4 Create ScenesList UI Component

**Location**: `frontend/src/features/scenes/components/ui/ScenesList.tsx`

**Purpose**: Layout component for scenes grid

**Props**:

```typescript
interface ScenesListProps {
  title?: string;
  children: React.ReactNode;
}
```

**Implementation**:

```tsx
import { Row, Col } from "@/components/ui";
import "./ScenesList.css";

export function ScenesList({ title, children }: ScenesListProps) {
  return (
    <div className="scenes-list">
      {title && <h3 className="scenes-list-title">{title}</h3>}
      <Row gutter={[8, 8]}>{children}</Row>
    </div>
  );
}
```

**CSS** (`ScenesList.css`):

```css
.scenes-list {
  margin-bottom: var(--spacing-md);
}

.scenes-list-title {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
```

---

### 1.5 Create Scenes Container

**Location**: `frontend/src/features/scenes/components/containers/Scenes.tsx`

**Purpose**: Business logic for scenes (filtering, activation)

**Props**:

```typescript
interface ScenesProps {
  scope?: "house" | "floor" | "room";
  scopeId?: string;
  title?: string;
}
```

**Implementation**:

```tsx
import { Col } from "@/components/ui";
import { useScenes } from "../../hooks/useScenes";
import { useActivateScene } from "../../hooks/useActivateScene";
import { useSceneScopes } from "@/hooks/useSceneScopes";
import { SceneButton } from "../ui/SceneButton";
import { ScenesList } from "../ui/ScenesList";

export function Scenes({ scope = "house", scopeId, title }: ScenesProps) {
  const { scenes, loading } = useScenes();
  const { activateScene, loading: activating } = useActivateScene();
  const {
    getHouseScenes,
    getFloorScenes,
    getRoomScenes,
    filterScenes,
    hasConfiguration,
  } = useSceneScopes();

  if (loading) return null;
  if (!hasConfiguration) return null;

  // Filter scenes based on scope
  const filteredScenes =
    scope === "house"
      ? getHouseScenes(scenes)
      : scope === "floor" && scopeId
        ? getFloorScenes(scenes, scopeId)
        : scope === "room" && scopeId
          ? getRoomScenes(scenes, scopeId)
          : filterScenes(scenes, scope, scopeId);

  if (filteredScenes.length === 0) return null;

  const handleActivateScene = (sceneId: string) => {
    activateScene(sceneId);
  };

  return (
    <ScenesList title={title}>
      {filteredScenes.map((scene) => (
        <Col key={scene.id} xs={12} sm={8} md={6} lg={4}>
          <SceneButton
            name={scene.name}
            onClick={() => handleActivateScene(scene.id)}
            loading={activating}
          />
        </Col>
      ))}
    </ScenesList>
  );
}
```

---

### 1.6 Create Scenes Public API

**Location**: `frontend/src/features/scenes/index.ts`

**Purpose**: Export only public interfaces

```typescript
export { Scenes } from "./components/containers/Scenes";
export { useScenes } from "./hooks/useScenes";
export { useActivateScene } from "./hooks/useActivateScene";
export type * from "./types";
```

---

## Phase 2: Create Devices Feature Module

### 2.1 Analyze Current DeviceControl Component

**Action**: Examine `frontend/src/components/DeviceControl.tsx`

**Tasks**:

1. Identify Ant Design dependencies
2. Extract business logic
3. Create UI/Container split
4. Move to `features/devices/`

### 2.2 Create DeviceControl UI Components

**Location**: `frontend/src/features/devices/components/ui/`

**Components to create**:

- `DeviceControlUI.tsx` - Main device control UI
- `BatteryIndicator.tsx` - Battery display (refactor from BatteryIcon)
- `DeviceButton.tsx` - Reusable device action button
- `LightControl.tsx` - Light-specific controls
- `PlaybackControl.tsx` - Playback controls

**Design tokens** (`devices.css`):

```css
.device-control {
  --device-control-padding: var(--spacing-sm);
  --device-control-gap: var(--spacing-xs);
  --battery-low-threshold: 20;
  --battery-warning-color: var(--color-warning);
  --battery-critical-color: var(--color-error);
}
```

### 2.3 Create DeviceControl Container

**Location**: `frontend/src/features/devices/components/containers/DeviceControl.tsx`

**Purpose**: Business logic for device control

**Implementation pattern**:

```tsx
import { useDeviceControl } from "../../hooks/useDeviceControl";
import { DeviceControlUI } from "../ui/DeviceControlUI";
import type { Device } from "@/graphql.types";

export function DeviceControl({ device }: { device: Device }) {
  const { toggleDevice, updateLevel, isUpdating } = useDeviceControl(device.id);

  return (
    <DeviceControlUI
      device={device}
      onToggle={toggleDevice}
      onLevelChange={updateLevel}
      isUpdating={isUpdating}
    />
  );
}
```

### 2.4 Create Devices Public API

**Location**: `frontend/src/features/devices/index.ts`

```typescript
export { DeviceControl } from "./components/containers/DeviceControl";
export { BatteryIndicator } from "./components/ui/BatteryIndicator";
export type * from "./types";
```

---

## Phase 3: Update RoomCard Container

### 3.1 Update RoomCard Imports

**Location**: `frontend/src/features/rooms/components/containers/RoomCard.tsx`

**Current**:

```tsx
import Scenes from "@/components/Scenes"; // ❌ Legacy
import DeviceControl from "@/components/DeviceControl"; // ❌ Legacy
import BatteryIcon from "@/components/BatteryIcon"; // ❌ Legacy
```

**New**:

```tsx
import { Scenes } from "@/features/scenes";
import { DeviceControl, BatteryIndicator } from "@/features/devices";
```

**Changes**:

- Replace legacy imports with feature APIs
- Update component usage to match new interfaces
- Ensure composition pattern is maintained

---

## Phase 4: Update FloorTabs Container

### 4.1 Update FloorTabs Imports

**Location**: `frontend/src/features/rooms/components/containers/FloorTabs.tsx`

**Current**:

```tsx
import Scenes from "@/components/Scenes"; // ❌ Legacy
```

**New**:

```tsx
import { Scenes } from "@/features/scenes";
```

**Changes**:

- Replace legacy import with feature API
- Verify `renderFloorContent` still works correctly
- No changes to logic needed

---

## Phase 5: Design Tokens

### 5.1 Create Scenes Design Tokens

**Location**: `frontend/src/styles/tokens/components.css`

**Add**:

```css
/* Scenes Component Tokens */
.scenes-list {
  --scenes-list-gap: var(--spacing-sm);
  --scenes-list-title-size: var(--font-size-md);
}

.scene-button {
  --scene-button-min-height: 40px;
  --scene-button-padding: var(--spacing-sm) var(--spacing-md);
}
```

### 5.2 Create Devices Design Tokens

**Location**: `frontend/src/styles/tokens/components.css`

**Add**:

```css
/* Device Control Tokens */
.device-control {
  --device-control-padding: var(--spacing-sm);
  --device-control-gap: var(--spacing-xs);
  --device-icon-size: 24px;
}

.battery-indicator {
  --battery-low-color: var(--color-warning);
  --battery-critical-color: var(--color-error);
  --battery-good-color: var(--color-success);
  --battery-threshold-low: 20;
  --battery-threshold-critical: 10;
}
```

---

## Phase 6: Cleanup Legacy Components

### 6.1 Mark Legacy Components as Deprecated

**Action**: Add deprecation notice to legacy components

**Files**:

- `frontend/src/components/Scenes.tsx`
- `frontend/src/components/DeviceControl.tsx`
- `frontend/src/components/BatteryIcon.tsx`

**Add to top of file**:

```tsx
/**
 * @deprecated This component is deprecated. Use @features/scenes instead.
 * This file will be removed in a future version.
 */
```

### 6.2 Verify No Usage of Legacy Components

**Action**: Search for imports of legacy components

```bash
# Search for legacy imports
grep -r "from.*components/Scenes" frontend/src
grep -r "from.*components/DeviceControl" frontend/src
grep -r "from.*components/BatteryIcon" frontend/src
```

**Expected**: Only old `components/Rooms.tsx` and `components/App.tsx` (not in use)

### 6.3 Delete Legacy Components (Future Task)

**Action**: Once verified, delete legacy components

**Files to delete**:

- `frontend/src/components/Scenes.tsx`
- `frontend/src/components/DeviceControl.tsx`
- `frontend/src/components/BatteryIcon.tsx`

---

## Implementation Checklist

### Phase 1: Scenes Feature Module

- [ ] 1.1 Create `features/scenes/api/scenesApi.ts`
- [ ] 1.2 Create `features/scenes/hooks/useScenes.ts`
- [ ] 1.3 Create `features/scenes/hooks/useActivateScene.ts`
- [ ] 1.4 Create `features/scenes/components/ui/SceneButton.tsx`
- [ ] 1.5 Create `features/scenes/components/ui/SceneButton.css`
- [ ] 1.6 Create `features/scenes/components/ui/ScenesList.tsx`
- [ ] 1.7 Create `features/scenes/components/ui/ScenesList.css`
- [ ] 1.8 Create `features/scenes/components/containers/Scenes.tsx`
- [ ] 1.9 Create `features/scenes/types/index.ts`
- [ ] 1.10 Create `features/scenes/index.ts` (public API)

### Phase 2: Devices Feature Module

- [ ] 2.1 Analyze `components/DeviceControl.tsx`
- [ ] 2.2 Create `features/devices/components/ui/DeviceControlUI.tsx`
- [ ] 2.3 Create `features/devices/components/ui/BatteryIndicator.tsx`
- [ ] 2.4 Create `features/devices/components/containers/DeviceControl.tsx`
- [ ] 2.5 Create `features/devices/hooks/useDeviceControl.ts`
- [ ] 2.6 Create `features/devices/types/index.ts`
- [ ] 2.7 Create `features/devices/index.ts` (public API)

### Phase 3: Update RoomCard

- [ ] 3.1 Update imports in `RoomCard.tsx`
- [ ] 3.2 Update component usage
- [ ] 3.3 Test RoomCard rendering

### Phase 4: Update FloorTabs

- [ ] 4.1 Update imports in `FloorTabs.tsx`
- [ ] 4.2 Verify `renderFloorContent` works
- [ ] 4.3 Test FloorTabs rendering

### Phase 5: Design Tokens

- [ ] 5.1 Add scenes tokens to `components.css`
- [ ] 5.2 Add devices tokens to `components.css`
- [ ] 5.3 Update component CSS to use tokens

### Phase 6: Cleanup

- [ ] 6.1 Add deprecation notices
- [ ] 6.2 Verify no legacy imports
- [ ] 6.3 Delete legacy components (after verification)

### Testing & Validation

- [ ] 7.1 TypeScript compilation passes
- [ ] 7.2 Scenes render correctly (house/floor/room scope)
- [ ] 7.3 Scene activation works
- [ ] 7.4 Device controls work
- [ ] 7.5 Battery indicators display correctly
- [ ] 7.6 Room cards render with all features
- [ ] 7.7 FloorTabs displays scenes and devices
- [ ] 7.8 No console errors
- [ ] 7.9 No Ant Design imports in features/

### Documentation

- [ ] 8.1 Update feature README files
- [ ] 8.2 Create Storybook stories for new components
- [ ] 8.3 Document composition patterns used
- [ ] 8.4 Add migration notes

---

## Benefits of This Refactoring

### Architecture Compliance

✅ **Proper layer structure**: Features properly organized
✅ **Unidirectional imports**: Features import from shared, not legacy
✅ **Container/UI split**: Business logic separated from presentation
✅ **Composition pattern**: Components accept render props/children
✅ **Design tokens**: All styling via CSS variables

### Code Quality

✅ **Feature cohesion**: Scenes and devices are self-contained modules
✅ **Testability**: Pure UI components easy to test in isolation
✅ **Reusability**: Components can be used across features
✅ **Maintainability**: Clear separation of concerns
✅ **Type safety**: Strict TypeScript throughout

### Performance

✅ **Bundle size**: Remove all Ant Design dependencies
✅ **Tree shaking**: Feature-based code splitting
✅ **React Query**: Proper cache management for scenes/devices
✅ **Optimistic updates**: Better UX for device control

### Developer Experience

✅ **Clear imports**: `@/features/scenes` vs legacy `@/components/Scenes`
✅ **Public APIs**: Features expose only what's needed
✅ **Discoverability**: Related code co-located
✅ **Documentation**: Each feature can have its own README

---

## Success Criteria

### Functional Requirements

- ✅ All scenes render correctly (house/floor/room scopes)
- ✅ Scene activation works without errors
- ✅ Device controls maintain functionality
- ✅ Battery indicators display correctly
- ✅ Room cards show all information
- ✅ FloorTabs displays scenes and devices per floor

### Non-Functional Requirements

- ✅ Zero Ant Design imports in `features/` folder
- ✅ All components use local UI library
- ✅ 100% TypeScript type coverage
- ✅ All styling via design tokens
- ✅ Features export via public API only
- ✅ No legacy component imports from features

### Technical Validation

- ✅ TypeScript compiles without errors
- ✅ No console warnings in development
- ✅ React Query devtools shows proper cache
- ✅ Bundle analyzer shows no antd in features chunk
- ✅ All tests pass

---

## Timeline Estimate

- **Phase 1**: Scenes feature module (3-4 hours)
- **Phase 2**: Devices feature module (4-5 hours)
- **Phase 3**: Update RoomCard (30 minutes)
- **Phase 4**: Update FloorTabs (30 minutes)
- **Phase 5**: Design tokens (1 hour)
- **Phase 6**: Cleanup (1 hour)
- **Testing**: 2-3 hours
- **Documentation**: 1-2 hours

**Total**: ~13-17 hours

---

## Notes

- Start with Scenes as it's simpler and has clear scope boundaries
- Devices module might need more analysis of DeviceControl complexity
- Keep legacy components until all features are migrated
- Test each phase independently before moving to next
- Use React Query devtools to verify data flow
- Consider Storybook stories for visual component testing
- Add error boundaries around scene/device features
- Consider loading states for async operations

---

## Related Documentation

- Main FloorTabs refactoring: `FLOORTABS_REFACTORING_PLAN.md`
- Architecture guidelines: `.github/copilot-instructions.md`
- Design tokens reference: `frontend/src/styles/tokens/`
- Feature structure examples: `frontend/src/features/auth/`
