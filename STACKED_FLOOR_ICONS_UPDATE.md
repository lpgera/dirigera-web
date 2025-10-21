# Stacked Floor Icons Update

## Overview

Updated the floor icons to show the entire building structure with all floors stacked vertically. The current floor is highlighted, making it easy to understand the building layout at a glance.

## What Changed

### Visual Concept

**Before (Single Floor Icon):**

```
Tab 1:  ╱▔▔╲
       ╱ 1 ╲   Ground Floor
       └───┘

Tab 2:  ╱▔▔╲
       ╱ 2 ╲   First Floor
       └───┘
```

**After (Stacked Building Icon):**

```
Tab 1:  ┌───┐      ← Floor 2 (gray, inactive)
        ├───┤
        └───┘
        ┌───┐      ← Floor 1 (gray, inactive)
        ├───┤
        └───┘
        ┏━━━┓      ← Floor 0 (blue, active/highlighted)
        ┣━━━┫
        ┗━━━┛

Tab 2:  ┌───┐      ← Floor 2 (gray, inactive)
        ├───┤
        └───┘
        ┏━━━┓      ← Floor 1 (blue, active/highlighted)
        ┣━━━┫
        ┗━━━┛
        ┌───┐      ← Floor 0 (gray, inactive)
        ├───┤
        └───┘
```

## Implementation Details

### FloorIcon Component

**New Props:**

```typescript
interface FloorIconProps {
  totalFloors: number // Total number of floors in building
  currentFloor: number // Current floor being displayed (0-indexed)
  floorOrder: number // This tab's floor order (0 = bottom)
  isActive: boolean // Whether this tab is currently active
  size?: number // Icon size (default: 48px)
}
```

### Color Scheme

| State                               | Top Face              | Sides | Opacity | Usage               |
| ----------------------------------- | --------------------- | ----- | ------- | ------------------- |
| **Active Floor (this tab)**         | Bright Blue (#1890ff) | Blue  | 100%    | Current tab's floor |
| **Highlighted Floor (active view)** | Green (#52c41a)       | Green | 100%    | Floor being viewed  |
| **Inactive Floor**                  | Gray (#d9d9d9)        | Gray  | 50%     | Other floors        |

**Color Logic:**

```typescript
if (isThisFloor && isActive) {
  // This tab's floor AND it's selected
  color = 'bright-blue'
} else if (isCurrent) {
  // This is the floor being viewed (in a different tab)
  color = 'green'
} else {
  // Other floors
  color = 'gray'
}
```

### Floor Stacking

Floors are rendered from **bottom to top**:

- **Order 0** = Bottom floor (drawn at bottom)
- **Order 1** = Second floor (drawn above order 0)
- **Order 2** = Third floor (drawn at top)

```typescript
const floors = Array.from({ length: totalFloors }, (_, i) => ({
  order: totalFloors - 1 - i, // Reverse order
  y: baseY + i * floorHeight, // Stack vertically
  isThisFloor: totalFloors - 1 - i === floorOrder,
}))
```

### Floor Height Calculation

```typescript
const floorHeight = 6 // Pixels between each floor
const baseY = 8 // Top starting position

// Floor 2: y = 8
// Floor 1: y = 8 + 6 = 14
// Floor 0: y = 8 + 12 = 20
```

## Visual Examples

### 3-Story Building

**Ground Floor Tab (Active):**

```
        ┌─────┐  ← Order 2 (gray, dim)
        ├─────┤
        └─────┘

        ┌─────┐  ← Order 1 (gray, dim)
        ├─────┤
        └─────┘

        ┏━━━━━┓  ← Order 0 (BLUE, active + highlighted)
        ┣━━━━━┫     Floor number "1" shown
        ┗━━━━━┛
```

**First Floor Tab (Active):**

```
        ┌─────┐  ← Order 2 (gray, dim)
        ├─────┤
        └─────┘

        ┏━━━━━┓  ← Order 1 (BLUE, active + highlighted)
        ┣━━━━━┫     Floor number "2" shown
        ┗━━━━━┛

        ┌─────┐  ← Order 0 (gray, dim)
        ├─────┤
        └─────┘
```

**Second Floor Tab (Active):**

```
        ┏━━━━━┓  ← Order 2 (BLUE, active + highlighted)
        ┣━━━━━┫     Floor number "3" shown
        ┗━━━━━┛

        ┌─────┐  ← Order 1 (gray, dim)
        ├─────┤
        └─────┘

        ┌─────┐  ← Order 0 (gray, dim)
        ├─────┤
        └─────┘
```

### 5-Story Building

```
Tab for Ground Floor:

    ┌──┐  ← Floor 5 (dim)
    ├──┤
    └──┘
    ┌──┐  ← Floor 4 (dim)
    ├──┤
    └──┘
    ┌──┐  ← Floor 3 (dim)
    ├──┤
    └──┘
    ┌──┐  ← Floor 2 (dim)
    ├──┤
    └──┘
    ┏━━┓  ← Floor 1 (HIGHLIGHTED)
    ┣━━┫
    ┗━━┛
```

## Features

✅ **Complete Building View** - All floors visible in each tab
✅ **Visual Hierarchy** - Active floor highlighted in blue
✅ **Physical Layout** - Bottom floor at bottom, top floor at top
✅ **Context Awareness** - See where you are in the building
✅ **Consistent Icons** - Same building shown in all tabs
✅ **Floor Numbers** - Displayed on active floor only
✅ **Opacity Levels** - Active floors brighter, inactive dimmed

## Benefits

### User Experience

- **Spatial Awareness**: Instantly see where you are in building
- **Quick Navigation**: Visual cue shows relative floor positions
- **Consistency**: Same building structure in all tabs
- **Context**: Understand building layout at a glance

### Visual Design

- **Unified**: All tabs show same building
- **Highlight**: Active floor clearly marked
- **Stacking**: Physical building representation
- **Professional**: Clean, modern appearance

## Comparison

| Aspect           | Before             | After                   |
| ---------------- | ------------------ | ----------------------- |
| **View**         | Single floor only  | Entire building         |
| **Context**      | No building layout | Complete structure      |
| **Active Floor** | Color-coded        | Highlighted + blue      |
| **Navigation**   | Abstract           | Physical representation |
| **Consistency**  | Different per tab  | Same building always    |

## Usage in Rooms.tsx

```typescript
<FloorIcon
  totalFloors={groupedRooms.size}           // e.g., 3
  currentFloor={currentFloorOrder}          // e.g., 1
  floorOrder={floor?.order ?? index}        // e.g., 0, 1, 2
  isActive={floorId === activeFloorId}      // true/false
  size={isDesktop ? 48 : 40}                // Responsive
/>
```

**Parameters Explained:**

- `totalFloors`: How many floors to draw (3 = draw 3 stacked floors)
- `currentFloor`: Which floor is being viewed (0 = ground, highlights it green)
- `floorOrder`: Which floor this tab represents (0 = ground)
- `isActive`: Is this the active tab? (highlights in blue vs green)

## Color States

### Tab is Active AND showing its floor

```
┏━━━┓  ← BRIGHT BLUE (#1890ff)
┣━━━┫     Floor number shown
┗━━━┛
```

### Tab is Inactive BUT showing this floor

```
┏━━━┓  ← GREEN (#52c41a)
┣━━━┫     No floor number
┗━━━┛
```

### Other floors

```
┌───┐  ← GRAY (#d9d9d9)
├───┤     Dimmed (50% opacity)
└───┘
```

## Configuration

No configuration needed! Works automatically with existing:

- `floors.config.json` - Determines floor order
- Responsive tabs - Works with existing breakpoints

## Edge Cases

### Single Floor Building

```
┏━━━┓  ← Only one floor shown
┣━━━┫     Always highlighted
┗━━━┛
```

### "Other" Floor

- Treated as highest floor by default
- Stacks above all configured floors

## Accessibility

- **Visual Hierarchy**: Clear through size and color
- **High Contrast**: Active floors stand out
- **Floor Numbers**: Only shown on active for clarity
- **Screen Readers**: Floor names still in text label

## Performance

- **SVG Based**: Scales perfectly at any size
- **Minimal DOM**: Single SVG per tab
- **No Images**: Pure vector graphics
- **Gradients**: CSS gradients for depth

## Responsive Sizing

| Breakpoint      | Size | Usage             |
| --------------- | ---- | ----------------- |
| Desktop (md+)   | 48px | Larger, side tabs |
| Mobile (xs, sm) | 40px | Smaller, top tabs |

Larger icons on desktop provide better visibility in side tabs.

## Testing Checklist

- [ ] All floors render in stack
- [ ] Active floor highlighted blue
- [ ] Floor numbers show on active tab
- [ ] Inactive floors dimmed (gray)
- [ ] Bottom floor at bottom visually
- [ ] Top floor at top visually
- [ ] Works with 1 floor
- [ ] Works with 2 floors
- [ ] Works with 5+ floors
- [ ] "Other" floor displays correctly
- [ ] Tab switching updates highlight
- [ ] Responsive sizing works
- [ ] Gradients visible
- [ ] No visual glitches

## Future Enhancements

Potential improvements:

- **Hover effects**: Highlight floor on hover
- **Animations**: Smooth transition when switching
- **Custom colors**: Per-floor color customization
- **Floor labels**: Short text on each floor
- **Room counts**: Show number of rooms per floor
- **Activity indicators**: Dots for active devices

## Summary

The updated icon shows the complete building structure with visual hierarchy:

- **All floors visible** in every tab
- **Active floor highlighted** in bright blue
- **Physical layout** matches real building (bottom to top)
- **Consistent view** across all tabs
- **Better spatial awareness** for users

**The stacked floor icons provide complete building context at a glance!** 🏢
