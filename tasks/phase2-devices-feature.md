# Phase 2: Create Devices Feature Module

## Task 2.1: Analyze Legacy DeviceControl

**File**: `frontend/src/components/DeviceControl.tsx`

**Action**: Analyze existing implementation to understand requirements

**Requirements**:
- Document all device types supported
- List all Ant Design dependencies
- Identify business logic vs UI
- Note prop interface
- Check for GraphQL queries/mutations

**Acceptance Criteria**:
- [ ] Component analyzed thoroughly
- [ ] Dependencies documented
- [ ] Logic/UI separation identified
- [ ] Notes created for implementation

---

## Task 2.2: Create DeviceControlUI Component

**File**: `frontend/src/features/devices/components/ui/DeviceControlUI.tsx`

**Action**: Create pure UI component for device controls

**Requirements**:
- Accept device object and control handlers as props
- Pure presentation (no hooks, no API calls)
- Support all device types from legacy component
- Use component design tokens
- Create accompanying CSS file

**Acceptance Criteria**:
- [ ] Component is pure (props only)
- [ ] All device types supported
- [ ] TypeScript interface defined
- [ ] CSS file created
- [ ] Accessible controls

---

## Task 2.3: Create BatteryIndicator Component

**File**: `frontend/src/features/devices/components/ui/BatteryIndicator.tsx`

**Action**: Create pure UI component for battery status

**Requirements**:
- Accept batteryLevel prop (0-100)
- Display visual indicator
- Show percentage text
- Use semantic colors (red/yellow/green)
- Create accompanying CSS file

**Acceptance Criteria**:
- [ ] Visual indicator works
- [ ] Colors match battery level
- [ ] Accessible (ARIA labels)
- [ ] CSS uses design tokens
- [ ] TypeScript types correct

---

## Task 2.4: Create DeviceControl Container

**File**: `frontend/src/features/devices/components/containers/DeviceControl.tsx`

**Action**: Create container with device control logic

**Requirements**:
- Use useDeviceControl hook for mutations
- Compose DeviceControlUI and BatteryIndicator
- Handle device state updates
- Manage loading/error states
- Support optimistic updates

**Acceptance Criteria**:
- [ ] Device controls work
- [ ] State updates properly
- [ ] Loading states shown
- [ ] Error handling present
- [ ] TypeScript compiles

---

## Task 2.5: Create useDeviceControl Hook

**File**: `frontend/src/features/devices/hooks/useDeviceControl.ts`

**Action**: Create hook for device control mutations

**Requirements**:
- Use Apollo Client mutations
- Handle different device types
- Support optimistic updates
- Return mutation functions and status
- Proper error handling

**Acceptance Criteria**:
- [ ] Hook handles all device types
- [ ] Optimistic updates work
- [ ] Error states handled
- [ ] TypeScript types correct
- [ ] Cache updates properly

---

## Task 2.6: Create Device Types

**File**: `frontend/src/features/devices/types/index.ts`

**Action**: Define TypeScript types for devices feature

**Requirements**:
- Device interface with all fields
- DeviceType enum/union
- Control mutation types
- Battery status types
- Query/mutation response types

**Acceptance Criteria**:
- [ ] All types exported
- [ ] Matches GraphQL schema
- [ ] Used by components and hooks
- [ ] No any types
- [ ] Proper type guards if needed

---

## Task 2.7: Create Devices Public API

**File**: `frontend/src/features/devices/index.ts`

**Action**: Export public API for devices feature

**Requirements**:
- Export DeviceControl container (named)
- Export BatteryIndicator UI (named, as it's reusable)
- Export hooks (named exports)
- Export types (type exports)
- Do NOT export internal UI components

**Acceptance Criteria**:
- [ ] Public API exports defined
- [ ] Container and reusable components available
- [ ] Hooks accessible
- [ ] Types exported as types
- [ ] No leaking of internals

---

## Verification Steps

After completing all tasks:

1. Run TypeScript compiler: `npm run type-check`
2. Import in RoomCard: `import { DeviceControl, BatteryIndicator } from "@/features/devices"`
3. Verify no Ant Design imports
4. Test device controls in browser
5. Verify battery indicator displays correctly
6. Test optimistic updates
7. Check React Query devtools for proper cache updates
