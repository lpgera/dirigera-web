# Phase 5: Design Tokens

## Task 5.1: Add Scenes Design Tokens

**File**: `frontend/src/styles/tokens/components.css`

**Action**: Add component-level design tokens for scenes

**Requirements**:
- Add `--scene-button-bg` (background color)
- Add `--scene-button-text` (text color)
- Add `--scene-button-hover-bg` (hover background)
- Add `--scene-button-active-bg` (active background)
- Add `--scene-button-disabled-bg` (disabled background)
- Add `--scene-list-gap` (grid gap)
- Add `--scene-button-radius` (border radius)
- Map to semantic tokens

**Acceptance Criteria**:
- [ ] All scene tokens defined
- [ ] Mapped to semantic tokens
- [ ] Consistent with design system
- [ ] Values match current styling
- [ ] CSS compiles without errors

---

## Task 5.2: Add Devices Design Tokens

**File**: `frontend/src/styles/tokens/components.css`

**Action**: Add component-level design tokens for devices

**Requirements**:
- Add `--device-control-bg` (background)
- Add `--device-control-border` (border color)
- Add `--device-control-active-bg` (active state)
- Add `--battery-high-color` (green)
- Add `--battery-medium-color` (yellow)
- Add `--battery-low-color` (red)
- Add `--battery-indicator-size` (icon size)
- Map to semantic tokens

**Acceptance Criteria**:
- [ ] All device tokens defined
- [ ] Battery colors use semantic tokens
- [ ] Consistent naming convention
- [ ] Values match current styling
- [ ] CSS compiles without errors

---

## Task 5.3: Update Component CSS Files

**Files**:
- `frontend/src/features/scenes/components/ui/SceneButton.css`
- `frontend/src/features/scenes/components/ui/ScenesList.css`
- `frontend/src/features/devices/components/ui/DeviceControlUI.css`
- `frontend/src/features/devices/components/ui/BatteryIndicator.css`

**Action**: Replace hardcoded values with design tokens

**Requirements**:
- Replace all color values with token references
- Replace spacing values with tokens
- Replace font sizes with tokens
- Remove any hardcoded hex/rgb colors
- Verify all tokens are defined

**Acceptance Criteria**:
- [ ] No hardcoded colors
- [ ] All tokens referenced correctly
- [ ] Styles match previous appearance
- [ ] CSS compiles without errors
- [ ] Visual regression test passes

---

## Verification Steps

1. Run dev server: `npm run dev`
2. Verify scenes button colors match tokens
3. Verify device control colors match tokens
4. Check battery indicator colors (test different levels)
5. Test dark mode (if applicable)
6. Verify spacing and sizing
7. Check responsive behavior
8. Compare with previous visual appearance
