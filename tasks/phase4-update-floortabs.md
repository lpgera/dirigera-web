# Phase 4: Update FloorTabs Container

## Task 4.1: Update FloorTabs Imports

**File**: `frontend/src/features/rooms/components/containers/FloorTabs.tsx`

**Action**: Replace legacy Scenes import with feature import

**Requirements**:
- Remove: `import Scenes from "@/components/Scenes"`
- Add: `import { Scenes } from "@/features/scenes"`
- Verify RoomCard import is correct (should already be local)
- Check for any other legacy imports

**Acceptance Criteria**:
- [ ] Legacy Scenes import removed
- [ ] Feature Scenes import added
- [ ] TypeScript compiles
- [ ] No import errors
- [ ] All paths use feature structure

---

## Task 4.2: Verify renderFloorContent

**File**: `frontend/src/features/rooms/components/containers/FloorTabs.tsx`

**Action**: Verify renderFloorContent function works with new Scenes

**Requirements**:
- Check `<Scenes>` usage in renderFloorContent
- Verify scope prop is passed correctly
- Ensure props match new Scenes API
- Test floor-level scenes display
- Verify integration with RoomCard

**Acceptance Criteria**:
- [ ] renderFloorContent function works
- [ ] Scenes component receives correct props
- [ ] Floor-level scenes display
- [ ] RoomCard integration works
- [ ] TypeScript compiles
- [ ] No prop type mismatches

---

## Task 4.3: Test FloorTabs Rendering

**Action**: Manual testing of FloorTabs component

**Requirements**:
- Open browser and navigate to home page
- Test floor tabs navigation
- Verify floor-level scenes display
- Test scene activation at floor level
- Verify room cards render per floor
- Check all device controls
- Verify no console errors

**Acceptance Criteria**:
- [ ] Floor tabs render correctly
- [ ] Navigation between floors works
- [ ] Floor-level scenes display
- [ ] Scene activation works
- [ ] Room cards display per floor
- [ ] All device controls work
- [ ] No console errors
- [ ] No visual regressions

---

## Verification Steps

1. Run dev server: `npm run dev`
2. Navigate to home page
3. Test each floor tab
4. Verify floor-level scenes
5. Test scene activation
6. Verify room cards per floor
7. Test device controls in rooms
8. Check browser console
9. Test responsive layout
10. Compare with previous behavior
