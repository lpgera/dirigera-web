# FloorTabsUI Refactoring Plan

## Overview

Refactor FloorTabsUI component to remove Ant Design dependencies and implement composition pattern for scenes and rooms, adhering to project guidelines.

## Current State Analysis

### Dependencies to Remove

- `antd` imports: `Space` component
- Currently uses local `Button`, `Row`, `Col` from `@/components/ui` (already migrated)
- Hard-coded `Scenes` component import
- Tight coupling to `RoomCard` container

### Current Issues

1. **Composition violation**: Scenes component is hardcoded inside FloorTabsUI
2. **Missing Space component**: Uses antd's Space, needs local replacement
3. **Tight coupling**: Room rendering logic embedded in UI layer
4. **Props drilling**: activeFloorId and scroll logic mixed in container/UI split
5. **No design tokens**: Some hardcoded values (HEADER_OFFSET: 146, colors)

## Architecture Alignment

### Layer Structure

```
features/rooms/
├── components/
│   ├── ui/
│   │   ├── FloorTabsUI.tsx          # Pure presentation (NEW)
│   │   ├── FloorNav.tsx             # Navigation sidebar (NEW)
│   │   ├── FloorSection.tsx         # Single floor content (NEW)
│   │   └── FloorTabsUI.css          # Component tokens
│   └── containers/
│       └── FloorTabs.tsx            # Data + scroll logic
```

### Shared Components Needed

```
components/ui/
├── Space.tsx    # ADD: Layout spacing utility (already exists in Utils.tsx)
└── index.ts     # Export Space from Utils
```

## Refactoring Steps

### Phase 1: Create Atomic UI Components (3 new files)

#### 1.1 Create `FloorNav.tsx` (Pure UI)

**Location**: `frontend/src/features/rooms/components/ui/FloorNav.tsx`

**Purpose**: Render floor navigation sidebar

**Props**:

```typescript
interface FloorNavProps {
  floors: Floor[];
  activeFloorId: string | null;
  onFloorClick: (floorId: string) => void;
}
```

**Features**:

- Uses local `Button`, `Space`, `FloorIcon` from shared UI
- No business logic, pure presentation
- CSS class-based styling with component tokens

---

#### 1.2 Create `FloorSection.tsx` (Pure UI with composition)

**Location**: `frontend/src/features/rooms/components/ui/FloorSection.tsx`

**Purpose**: Render single floor section with composable children

**Props**:

```typescript
interface FloorSectionProps {
  floor: Floor;
  isActive: boolean;
  isDesktop: boolean;
  onRefChange: (element: HTMLDivElement | null) => void;
  children: React.ReactNode; // Composition slot for scenes + rooms
}
```

**Features**:

- Uses composition pattern via `children` prop
- Renders floor header with icon
- Container div with ref callback
- No knowledge of Scenes or RoomCard

---

#### 1.3 Update `FloorTabsUI.tsx` (Orchestration UI)

**Location**: `frontend/src/features/rooms/components/ui/FloorTabsUI.tsx`

**New Props**:

```typescript
interface FloorTabsUIProps {
  floors: Floor[];
  activeFloorId: string | null;
  onFloorClick: (floorId: string) => void;
  onFloorRefChange: (floorId: string, element: HTMLDivElement | null) => void;
  renderFloorContent: (floor: Floor) => React.ReactNode; // Composition callback
}
```

**Structure**:

```tsx
<div className="floor-tabs">
  <FloorNav
    floors={floors}
    activeFloorId={activeFloorId}
    onFloorClick={onFloorClick}
  />

  <div className="floor-tabs-content">
    {floors.map((floor) => (
      <FloorSection
        key={floor.id}
        floor={floor}
        isActive={floor.id === activeFloorId}
        isDesktop={isDesktop}
        onRefChange={(el) => onFloorRefChange(floor.id, el)}
      >
        {renderFloorContent(floor)}
      </FloorSection>
    ))}
  </div>
</div>
```

**Benefits**:

- No hardcoded Scenes or RoomCard
- Pure UI orchestration
- Container controls what renders per floor

---

### Phase 2: Update Container Component

#### 2.1 Update `FloorTabs.tsx` Container

**Location**: `frontend/src/features/rooms/components/containers/FloorTabs.tsx`

**Changes**:

1. Add scroll management logic (from old FloorTabs.tsx)
2. Implement `renderFloorContent` callback
3. Import Scenes and RoomCard here (business logic layer)
4. Pass isDesktop to FloorTabsUI

**New Implementation**:

```typescript
export function FloorTabs({ rooms, columnSizes }: FloorTabsProps) {
  const screens = useBreakpoint();
  const { groupRoomsByFloor, floors } = useFloors();
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
  const floorRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const isScrollingToFloor = useRef(false);

  const groupedRooms = groupRoomsByFloor(rooms);
  const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

  // Scroll management effects (from old component)
  useEffect(() => { /* initialize active floor */ });
  useEffect(() => { /* handle scroll tracking */ });

  const handleFloorClick = (floorId: string) => {
    // Smooth scroll logic
  };

  const handleFloorRefChange = (floorId: string, el: HTMLDivElement | null) => {
    // Ref map management
  };

  const renderFloorContent = (floor: Floor) => {
    const floorData = groupedRooms.get(floor.id);
    const floorRooms = floorData?.rooms || [];

    return (
      <>
        <Scenes scope="floor" scopeId={floor.id} />

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {floorRooms.map((room) => (
            <Col key={room.id} {...columnSizes}>
              <RoomCard room={room} />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  return (
    <FloorTabsUI
      floors={floors}
      activeFloorId={activeFloorId}
      onFloorClick={handleFloorClick}
      onFloorRefChange={handleFloorRefChange}
      renderFloorContent={renderFloorContent}
    />
  );
}
```

---

### Phase 3: Design Tokens & Styling

#### 3.1 Update `FloorTabsUI.css`

**Location**: `frontend/src/features/rooms/components/ui/FloorTabsUI.css`

**Changes**:

1. Add component tokens for header offset
2. Replace hardcoded rgba color with semantic token
3. Ensure all values use CSS variables

**New Tokens**:

```css
/* Component tokens */
.floor-tabs {
  --floor-tabs-nav-width: 200px;
  --floor-tabs-nav-top: 146px; /* From HEADER_OFFSET constant */
  --floor-tabs-gap: var(--spacing-md);
}

.floor-section-active {
  background-color: var(
    --color-primary-bg-hover
  ); /* Replace rgba(24, 144, 255, 0.1) */
}
```

#### 3.2 Add to Semantic Tokens (if needed)

**Location**: `frontend/src/styles/semantic.css`

Add if not exists:

```css
--color-primary-bg-hover: rgba(24, 144, 255, 0.1);
```

---

### Phase 4: Shared Components

#### 4.1 Export Space from Utils

**Location**: `frontend/src/components/ui/index.ts`

**Add export**:

```typescript
export { Space, Divider, Skeleton, Result } from "./Utils";
```

**No new component needed** - Space already exists in Utils.tsx

---

### Phase 5: Remove Old Component

#### 5.1 Delete Legacy Component

**Location**: `frontend/src/components/FloorTabs.tsx`

**Action**: DELETE this file (legacy antd implementation)

**Verification**: Ensure no other files import from this location

---

### Phase 6: Update Public API

#### 6.1 Update Feature Index

**Location**: `frontend/src/features/rooms/index.ts`

**Changes**:

```typescript
// Export new UI components if needed externally
export { FloorTabs } from "./components/containers/FloorTabs";

// Do NOT export FloorNav, FloorSection (internal UI only)
```

---

## Migration Checklist

### Pre-Refactoring

- [ ] Review current FloorTabs usage across codebase
- [ ] Identify all import locations
- [ ] Ensure Space component exported from `@/components/ui`
- [ ] Verify design tokens in semantic.css

### Implementation Order

1. [ ] Create `FloorNav.tsx` (UI component)
2. [ ] Create `FloorSection.tsx` (UI component)
3. [ ] Update `FloorTabsUI.tsx` with composition
4. [ ] Update `FloorTabs.tsx` container with scroll logic
5. [ ] Update `FloorTabsUI.css` with component tokens
6. [ ] Export `Space` from `@/components/ui/index.ts`
7. [ ] Delete legacy `components/FloorTabs.tsx`
8. [ ] Update imports in consuming components
9. [ ] Test scroll behavior
10. [ ] Test responsive behavior
11. [ ] Validate accessibility

### Testing Strategy

- [ ] Unit tests for FloorNav rendering
- [ ] Unit tests for FloorSection composition
- [ ] Integration tests for scroll behavior
- [ ] Visual regression tests with Storybook
- [ ] Responsive breakpoint testing

### Storybook Stories

Create stories for each UI component:

- [ ] `FloorNav.stories.tsx`
- [ ] `FloorSection.stories.tsx`
- [ ] `FloorTabsUI.stories.tsx`

---

## Benefits of Refactoring

### Architecture Compliance

✅ **Unidirectional imports**: Shared ← Features ← App
✅ **Container/UI split**: Business logic separated from presentation
✅ **Composition pattern**: Scenes/Rooms injected via props
✅ **Design tokens**: All styling via CSS variables

### Code Quality

✅ **Testability**: Pure UI components easy to test
✅ **Reusability**: FloorNav/FloorSection can be reused
✅ **Maintainability**: Clear separation of concerns
✅ **Type safety**: Strict TypeScript interfaces

### Performance

✅ **Bundle size**: Remove antd dependency from this feature
✅ **Tree shaking**: Local components optimize better
✅ **Re-renders**: Composition reduces unnecessary renders

---

## Potential Challenges

### Challenge 1: Scroll Logic Complexity

**Issue**: Scroll tracking and smooth scrolling might break during refactor
**Solution**:

- Keep scroll logic isolated in container
- Add comprehensive scroll behavior tests
- Use constants for timing values (1000ms timeout)

### Challenge 2: Design Token Gaps

**Issue**: Semantic tokens might not cover all use cases
**Solution**:

- Add missing tokens to semantic.css first
- Document new tokens in style guide
- Use primitive tokens only as fallback

### Challenge 3: Backward Compatibility

**Issue**: Other components might import old FloorTabs
**Solution**:

- Search codebase for all imports
- Update imports in single commit
- Deprecate old component with warning first

---

## Success Criteria

### Functional Requirements

- ✅ Floor navigation remains sticky at correct position
- ✅ Scroll tracking activates correct floor tab
- ✅ Smooth scroll to floor on tab click
- ✅ Scenes render correctly per floor
- ✅ Rooms render in responsive grid
- ✅ Active floor highlights with correct color

### Non-Functional Requirements

- ✅ Zero antd dependencies in FloorTabsUI
- ✅ All components use local UI library
- ✅ 100% TypeScript type coverage
- ✅ All styling via design tokens
- ✅ Storybook stories for all UI components
- ✅ Unit test coverage > 80%

---

## Timeline Estimate

- **Phase 1**: Create UI components (2-3 hours)
- **Phase 2**: Update container (1-2 hours)
- **Phase 3**: Design tokens (1 hour)
- **Phase 4**: Shared components (30 minutes)
- **Phase 5**: Cleanup (30 minutes)
- **Phase 6**: Public API (30 minutes)
- **Testing & Storybook**: 2-3 hours

**Total**: ~8-11 hours

---

## Post-Refactoring Tasks

1. Update documentation:
   - Component usage guide
   - Composition pattern examples
   - Design token reference

2. Create migration guide for similar components:
   - Template for antd removal
   - Composition pattern best practices

3. Performance benchmarks:
   - Bundle size comparison
   - Render performance metrics
   - Lighthouse audit

4. Accessibility audit:
   - Keyboard navigation
   - Screen reader testing
   - Focus management

---

## File Structure After Refactoring

```
frontend/src/
├── components/ui/
│   ├── Space.tsx (already exists in Utils.tsx)
│   └── index.ts (export Space)
│
├── features/rooms/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── FloorNav.tsx          (NEW)
│   │   │   ├── FloorSection.tsx      (NEW)
│   │   │   ├── FloorTabsUI.tsx       (UPDATED)
│   │   │   └── FloorTabsUI.css       (UPDATED)
│   │   └── containers/
│   │       └── FloorTabs.tsx         (UPDATED)
│   └── index.ts (export FloorTabs)
│
└── styles/
    └── semantic.css (add missing tokens if needed)
```

**Deleted**:

- `components/FloorTabs.tsx` (legacy)

---

## Notes

- Preserve existing scroll behavior exactly
- Maintain backward compatibility for consuming components
- Follow strict TypeScript mode
- Use double quotes for strings
- Ensure all components have proper error boundaries
- Add loading states where appropriate
- Consider Suspense boundaries for async rendering
