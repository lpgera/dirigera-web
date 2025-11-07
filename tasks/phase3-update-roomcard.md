# Phase 3: Update RoomCard Container

## Task 3.1: Update RoomCard Imports

**File**: `frontend/src/features/rooms/components/containers/RoomCard.tsx`

**Action**: Replace legacy imports with feature imports

**Requirements**:
- Remove: `import Scenes from "@/components/Scenes"`
- Remove: `import DeviceControl from "@/components/DeviceControl"`
- Remove: `import BatteryIcon from "@/components/BatteryIcon"`
- Add: `import { Scenes } from "@/features/scenes"`
- Add: `import { DeviceControl, BatteryIndicator } from "@/features/devices"`
- Verify no other legacy imports

**Acceptance Criteria**:
- [ ] All legacy imports removed
- [ ] Feature imports added
- [ ] TypeScript compiles
- [ ] No import errors

---

## Task 3.2: Update Component Usage

**File**: `frontend/src/features/rooms/components/containers/RoomCard.tsx`

**Action**: Update component usage to match new APIs

**Requirements**:
- Update `<Scenes>` usage with new props
- Update `<DeviceControl>` usage with new props
- Replace `<BatteryIcon>` with `<BatteryIndicator>`
- Verify prop types match new interfaces
- Handle any API differences

**Acceptance Criteria**:
- [ ] All components updated
- [ ] Props match new interfaces
- [ ] TypeScript compiles without errors
- [ ] No runtime warnings
- [ ] Component renders correctly

---

## Task 3.3: Test RoomCard Rendering

**Action**: Manual testing of RoomCard component

**Requirements**:
- Open browser and navigate to floor view
- Verify room cards display
- Test scene buttons work
- Test device controls work
- Verify battery indicators show
- Check console for errors

**Acceptance Criteria**:
- [ ] Room cards render correctly
- [ ] Scenes display and activate
- [ ] Device controls functional
- [ ] Battery indicators visible
- [ ] No console errors
- [ ] No visual regressions

---

## Verification Steps

1. Run dev server: `npm run dev`
2. Navigate to a floor with rooms
3. Verify all room card features work
4. Check browser console for errors
5. Test scene activation
6. Test device controls
7. Verify battery indicators display
8. Take screenshots for comparison (optional)
