## Plan: FloorTabs Subcomponents Refactoring

Refactor FloorTabs subcomponents (Scenes, DeviceControl, BatteryIcon) from legacy Ant Design components to feature-based architecture using local UI components, following established patterns.

**Phases: 7**

### Phase 1: Create Scenes Feature Module
- **Objective:** Extract Scenes component from legacy into a proper feature module with UI/Container split, removing all Ant Design dependencies
- **Files/Functions to Modify/Create:**
  - Create `frontend/src/features/scenes/api/scenesApi.ts` (GraphQL queries/mutations)
  - Create `frontend/src/features/scenes/hooks/useScenes.ts` (query hook)
  - Create `frontend/src/features/scenes/hooks/useActivateScene.ts` (mutation hook)
  - Create `frontend/src/features/scenes/components/ui/SceneButton.tsx` (pure UI)
  - Create `frontend/src/features/scenes/components/ui/SceneButton.css` (styles)
  - Create `frontend/src/features/scenes/components/ui/ScenesList.tsx` (layout UI)
  - Create `frontend/src/features/scenes/components/ui/ScenesList.css` (styles)
  - Create `frontend/src/features/scenes/components/containers/Scenes.tsx` (business logic)
  - Create `frontend/src/features/scenes/types/index.ts` (type exports)
  - Create `frontend/src/features/scenes/index.ts` (public API)
- **Tests to Write:**
  - `SceneButton.test.tsx` - Test button rendering, onClick, disabled/loading states
  - `ScenesList.test.tsx` - Test layout rendering with children
  - `Scenes.test.tsx` - Test scope filtering (house/floor/room), scene activation
  - `useScenes.test.ts` - Test query hook returns scenes data
  - `useActivateScene.test.ts` - Test mutation hook calls activateScene
- **Steps:**
  1. Write tests for SceneButton component (render, click handler, states)
  2. Run tests to see them fail
  3. Create SceneButton UI component using existing Button from shared UI
  4. Run tests to confirm they pass
  5. Write tests for ScenesList layout component
  6. Run tests to see them fail
  7. Create ScenesList UI component using Row/Col from shared UI
  8. Run tests to confirm they pass
  9. Write tests for useScenes and useActivateScene hooks
  10. Run tests to see them fail
  11. Create API layer (scenesApi.ts) with GraphQL queries
  12. Create hooks (useScenes, useActivateScene)
  13. Run tests to confirm they pass
  14. Write tests for Scenes container (scope filtering, activation)
  15. Run tests to see them fail
  16. Create Scenes container with business logic using useSceneScopes
  17. Run tests to confirm they pass
  18. Create types/index.ts and public API index.ts
  19. Verify TypeScript compilation passes

### Phase 2: Create Missing UI Components (Switch, Modal, and Slider)
- **Objective:** Create Switch, Modal, and Slider components in shared UI library to support full device control functionality
- **Files/Functions to Modify/Create:**
  - Create `frontend/src/components/ui/Switch.tsx` (toggle switch component)
  - Create `frontend/src/components/ui/Switch.css` (switch styles)
  - Create `frontend/src/components/ui/Modal.tsx` (modal dialog component)
  - Create `frontend/src/components/ui/Modal.css` (modal styles)
  - Create `frontend/src/components/ui/Slider.tsx` (range slider component)
  - Create `frontend/src/components/ui/Slider.css` (slider styles)
  - Modify `frontend/src/components/ui/index.ts` (export Switch, Modal, and Slider)
- **Tests to Write:**
  - `Switch.test.tsx` - Test checked/unchecked states, onChange handler, disabled state
  - `Modal.test.tsx` - Test open/close, onCancel, footer rendering, portal
  - `Slider.test.tsx` - Test value changes, min/max/step, disabled state
- **Steps:**
  1. Write tests for Switch component (toggle behavior, states)
  2. Run tests to see them fail
  3. Create Switch component using semantic HTML (checkbox input with custom styling)
  4. Create Switch.css with design tokens
  5. Run tests to confirm they pass
  6. Write tests for Modal component (visibility, close handlers)
  7. Run tests to see them fail
  8. Create Modal component with portal rendering, overlay, close button
  9. Create Modal.css with design tokens
  10. Run tests to confirm they pass
  11. Write tests for Slider component (value, range, onChange)
  12. Run tests to see them fail
  13. Create Slider component using input[type="range"] with custom styling
  14. Create Slider.css with design tokens
  15. Run tests to confirm they pass
  16. Export Switch, Modal, and Slider from ui/index.ts
  17. Verify TypeScript compilation passes

### Phase 3: Create BatteryIndicator Feature Component
- **Objective:** Refactor BatteryIcon to BatteryIndicator in devices feature, using new Modal component
- **Files/Functions to Modify/Create:**
  - Create `frontend/src/features/devices/components/ui/BatteryIndicator.tsx` (pure UI)
  - Create `frontend/src/features/devices/components/ui/BatteryIndicator.css` (styles)
  - Create `frontend/src/features/devices/types/index.ts` (type exports)
  - Create `frontend/src/features/devices/index.ts` (public API)
- **Tests to Write:**
  - `BatteryIndicator.test.tsx` - Test battery level rendering, icon selection, modal display
- **Steps:**
  1. Write tests for BatteryIndicator component (percentage display, modal)
  2. Run tests to see them fail
  3. Create BatteryIndicator UI component using Button and Modal from shared UI
  4. Implement battery icon selection logic (react-icons)
  5. Create BatteryIndicator.css with design tokens
  6. Run tests to confirm they pass
  7. Create types/index.ts and public API index.ts for devices feature
  8. Verify TypeScript compilation passes

### Phase 4: Create DeviceControl Components with Full Controls
- **Objective:** Create DeviceControl container with full device control UI components including toggle, light level, and volume controls using Slider
- **Files/Functions to Modify/Create:**
  - Create `frontend/src/features/devices/api/devicesApi.ts` (GraphQL mutations)
  - Create `frontend/src/features/devices/components/ui/DeviceControlUI.tsx` (main UI)
  - Create `frontend/src/features/devices/components/ui/DeviceControlUI.css` (styles)
  - Create `frontend/src/features/devices/components/ui/DeviceToggle.tsx` (IsOn control)
  - Create `frontend/src/features/devices/components/ui/LightLevelControl.tsx` (light brightness)
  - Create `frontend/src/features/devices/components/ui/VolumeControl.tsx` (volume slider)
  - Create `frontend/src/features/devices/components/containers/DeviceControl.tsx` (container)
  - Create `frontend/src/features/devices/hooks/useDeviceControl.ts` (control hook)
  - Update `frontend/src/features/devices/index.ts` (export DeviceControl)
- **Tests to Write:**
  - `DeviceToggle.test.tsx` - Test toggle switch rendering and onChange
  - `LightLevelControl.test.tsx` - Test slider for light level control
  - `VolumeControl.test.tsx` - Test slider for volume control
  - `DeviceControlUI.test.tsx` - Test device name, image, battery display, conditional controls
  - `DeviceControl.test.tsx` - Test container orchestration, all handlers
  - `useDeviceControl.test.ts` - Test device control mutations
- **Steps:**
  1. Write tests for DeviceToggle component (Switch integration)
  2. Run tests to see them fail
  3. Create DeviceToggle UI using Switch component
  4. Run tests to confirm they pass
  5. Write tests for LightLevelControl and VolumeControl
  6. Run tests to see them fail
  7. Create LightLevelControl and VolumeControl using Slider component
  8. Run tests to confirm they pass
  9. Write tests for DeviceControlUI (layout, props, conditional rendering)
  10. Run tests to see them fail
  11. Create DeviceControlUI with Row/Col layout, device name, image, battery, and all controls
  12. Create DeviceControlUI.css with design tokens
  13. Run tests to confirm they pass
  14. Write tests for useDeviceControl hook (mutations for toggle, lightLevel, volume)
  15. Run tests to see them fail
  16. Create devicesApi.ts with GraphQL mutations
  17. Create useDeviceControl hook with all device mutations
  18. Run tests to confirm they pass
  19. Write tests for DeviceControl container
  20. Run tests to see them fail
  21. Create DeviceControl container orchestrating UI and hooks
  22. Run tests to confirm they pass
  23. Update devices feature public API
  24. Verify TypeScript compilation passes

### Phase 5: Update Feature Containers to Use New Components
- **Objective:** Update RoomCard, FloorTabs, and Rooms containers to import from feature modules instead of legacy components
- **Files/Functions to Modify/Create:**
  - Modify `frontend/src/features/rooms/components/containers/RoomCard.tsx` (update imports)
  - Modify `frontend/src/features/rooms/components/containers/FloorTabs.tsx` (update imports)
  - Modify `frontend/src/features/rooms/components/containers/Rooms.tsx` (update imports)
- **Tests to Write:**
  - `RoomCard.test.tsx` - Verify Scenes and DeviceControl render correctly
  - `FloorTabs.test.tsx` - Verify floor scenes render
  - `Rooms.test.tsx` - Verify house scenes render
- **Steps:**
  1. Write tests for RoomCard with new feature imports
  2. Run tests to see them fail
  3. Update RoomCard imports to use @/features/scenes and @/features/devices
  4. Replace legacy Scenes, DeviceControl, BatteryIcon usage
  5. Run tests to confirm they pass
  6. Write tests for FloorTabs with new Scenes import
  7. Run tests to see them fail
  8. Update FloorTabs imports to use @/features/scenes
  9. Run tests to confirm they pass
  10. Write tests for Rooms with new Scenes import
  11. Run tests to see them fail
  12. Update Rooms imports to use @/features/scenes
  13. Run tests to confirm they pass
  14. Verify all containers render correctly
  15. Run full test suite to ensure no regressions

### Phase 6: Add Design Tokens and Styling
- **Objective:** Add component-specific design tokens for scenes and devices components to components.css
- **Files/Functions to Modify/Create:**
  - Modify `frontend/src/styles/tokens/components.css` (add new tokens)
- **Tests to Write:**
  - Manual visual testing in browser/Storybook
  - No automated tests for CSS tokens
- **Steps:**
  1. Add scenes component tokens (list gap, title size, button min-height)
  2. Add devices component tokens (control padding, gap, icon size)
  3. Add battery indicator tokens (color thresholds)
  4. Update component CSS files to reference new tokens
  5. Verify styles render correctly in browser
  6. Test responsive behavior at different breakpoints
  7. Verify dark/light theme compatibility (if applicable)

### Phase 7: Delete Legacy Components and Update Documentation
- **Objective:** Delete legacy components after verifying no active usage and document the completed migration
- **Files/Functions to Modify/Create:**
  - Delete `frontend/src/components/Scenes.tsx`
  - Delete `frontend/src/components/DeviceControl.tsx`
  - Delete `frontend/src/components/BatteryIcon.tsx`
  - Delete `frontend/src/components/deviceControls/` directory (all subcomponents)
  - Create `plans/floortabs-subcomponents-refactoring-complete.md` (completion doc)
- **Tests to Write:**
  - No new tests - verification only
- **Steps:**
  1. Search codebase for imports of legacy Scenes component
  2. Verify only old/unused files (components/App.tsx, components/Rooms.tsx) import legacy components
  3. Delete frontend/src/components/Scenes.tsx
  4. Delete frontend/src/components/DeviceControl.tsx
  5. Delete frontend/src/components/BatteryIcon.tsx
  6. Delete frontend/src/components/deviceControls/ directory
  7. Verify TypeScript compilation with no errors
  8. Run full test suite to ensure everything passes
  9. Create completion document summarizing all changes

**Open Questions:**

All questions resolved based on user decisions:
1. ✅ Include Slider component in Phase 2 for full device control support
2. ✅ Skip Storybook stories (can be added later if needed)
3. ✅ Move GraphQL types to feature folders (feature-specific type generation)
4. ✅ Delete legacy components immediately after migration (no grace period)
5. ✅ Defer E2E tests to future work (rely on unit tests and manual testing)
