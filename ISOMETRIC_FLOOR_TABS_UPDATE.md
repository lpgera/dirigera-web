# Isometric Floor Tabs Update

## Overview

Updated the floor tabs with:

- **Isometric 3D floor icons** - Visual indicators showing stacked floors
- **Responsive tab positioning** - Side tabs on desktop, top tabs on mobile
- **Enhanced visual hierarchy** - Clear floor differentiation with colors

## What Changed

### Files Created

- **`frontend/src/components/FloorIcon.tsx`** - Isometric floor icon component

### Files Modified

- **`frontend/src/components/Rooms.tsx`** - Updated tabs with icons and responsive positioning

## Visual Design

### Isometric Floor Icons

Each floor is represented by a 3D-looking isometric platform:

```
     ╱▔▔▔▔▔╲
    ╱   1   ╲     ← Top face (with floor number)
   ╱         ╲
  ╱▔▔▔▔▔▔▔▔▔▔╲
  │          │    ← Side faces (darker)
  │          │
  └──────────┘
```

**Features:**

- Gradient top face (lighter)
- Shaded side faces (darker)
- Floor number centered
- Unique color per floor
- Stacked appearance

### Color Scheme

Floors are color-coded for quick identification:

| Floor Order | Color                 | Name          |
| ----------- | --------------------- | ------------- |
| 0 (Ground)  | Blue (#4a90e2)        | Ocean Blue    |
| 1 (First)   | Purple (#7b68ee)      | Medium Purple |
| 2 (Second)  | Green (#50c878)       | Emerald       |
| 3 (Third)   | Coral (#ff6b6b)       | Living Coral  |
| 4 (Fourth)  | Yellow (#ffd93d)      | Bright Yellow |
| 5+          | Cycles through colors | Various       |

## Responsive Layout

### Desktop (md, lg, xl, xxl breakpoints)

**Side Tabs:**

```
House Scenes
[Scene 1] [Scene 2]

┌──────────────┐
│              │
│  ╱▔▔▔╲      │
│ ╱ 1 ╲      │  Ground Floor
│└────┘      │
│              │
├──────────────┤
│              │
│  ╱▔▔▔╲      │
│ ╱ 2 ╲      │  First Floor
│└────┘      │
│              │
└──────────────┘
                 ┌────────────────────────┐
                 │                        │
                 │  [Floor Scenes]        │
                 │                        │
                 │  ┌──────┐  ┌──────┐   │
                 │  │Room 1│  │Room 2│   │
                 │  └──────┘  └──────┘   │
                 │                        │
                 └────────────────────────┘
```

### Mobile (xs, sm breakpoints)

**Top Tabs:**

```
House Scenes
[Scene 1] [Scene 2]

┌────────────┬────────────┬────────────┐
│  ╱▔▔╲     │  ╱▔▔╲     │  ╱▔▔╲     │
│ ╱1╲      │ ╱2╲      │ ╱3╲      │
│└──┘ Ground│└──┘ First │└──┘ Second│
└────────────┴────────────┴────────────┘
────────────────────────────────────────
[Floor Scenes]

┌──────────────┐  ┌──────────────┐
│   Room 1     │  │   Room 2     │
└──────────────┘  └──────────────┘
```

## Implementation Details

### FloorIcon Component

**Props:**

```typescript
interface FloorIconProps {
  order: number; // Floor order/number (0 = ground, 1 = first, etc.)
  name: string; // Floor name (for accessibility)
  size?: number; // Icon size in pixels (default: 32)
}
```

**SVG Structure:**

- **Top Face**: Diamond shape with gradient (lighter)
- **Right Face**: Right parallelogram (medium shade)
- **Left Face**: Left parallelogram (darker shade)
- **Floor Number**: Centered text (white, bold)

**Color Generation:**

```typescript
const getFloorColor = (order: number): string => {
  const colors = [
    "#4a90e2", // Blue
    "#7b68ee", // Purple
    "#50c878", // Green
    "#ff6b6b", // Coral
    "#ffd93d", // Yellow
    "#a78bfa", // Light purple
  ];
  return colors[order % colors.length];
};
```

### Responsive Detection

Uses Ant Design's `Grid.useBreakpoint()`:

```typescript
const screens = useBreakpoint();
const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;
```

**Breakpoint Definitions:**

- `xs`: < 576px (Mobile)
- `sm`: ≥ 576px (Mobile landscape)
- `md`: ≥ 768px (Tablet) → **Desktop starts here**
- `lg`: ≥ 992px (Desktop)
- `xl`: ≥ 1200px (Large desktop)
- `xxl`: ≥ 1600px (Extra large)

### Tab Configuration

```typescript
<Tabs
  tabPosition={isDesktop ? 'left' : 'top'}
  items={floors.map((floor, index) => ({
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FloorIcon
          order={floor.order ?? index}
          name={floor.name}
          size={isDesktop ? 40 : 32}
        />
        <span>{floor.name}</span>
      </div>
    ),
    children: (/* Floor content */)
  }))}
  style={{ minHeight: isDesktop ? 500 : 'auto' }}
/>
```

## Features

✅ **Isometric 3D Icons** - Visual floor representation
✅ **Color-Coded Floors** - Quick identification
✅ **Responsive Positioning** - Side on desktop, top on mobile
✅ **Adaptive Sizing** - Larger icons on desktop (40px), smaller on mobile (32px)
✅ **Automatic Colors** - Colors cycle through palette
✅ **Floor Numbers** - Displayed on icons (1, 2, 3, etc.)
✅ **Gradient Effects** - 3D appearance with shading
✅ **Accessibility** - Floor names included for screen readers

## Benefits

### Visual Hierarchy

- **Desktop**: Vertical side tabs create clear navigation structure
- **Mobile**: Horizontal top tabs save vertical space
- **Icons**: Quick visual reference for floor identification

### User Experience

- **Intuitive**: 3D icons represent physical building structure
- **Consistent**: Same visual language across devices
- **Efficient**: Side tabs on desktop don't scroll with content
- **Accessible**: Icons supplement text labels

### Design

- **Modern**: Isometric design is contemporary and appealing
- **Colorful**: Unique colors make floors memorable
- **Professional**: Clean geometric shapes
- **Scalable**: Works at different sizes

## Customization

### Changing Icon Colors

Edit `FloorIcon.tsx`:

```typescript
const colors = ["#yourColor1", "#yourColor2", "#yourColor3"];
```

### Adjusting Icon Size

**Desktop:**

```typescript
size={isDesktop ? 40 : 32}  // Change 40 to your preferred size
```

**Mobile:**

```typescript
size={isDesktop ? 40 : 32}  // Change 32 to your preferred size
```

### Changing Breakpoint

To change where desktop layout starts:

```typescript
// Currently: md (768px+)
const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

// To start at lg (992px+):
const isDesktop = screens.lg || screens.xl || screens.xxl;

// To start at sm (576px+):
const isDesktop =
  screens.sm || screens.md || screens.lg || screens.xl || screens.xxl;
```

## Floor Order

Icons use the `order` field from `floors.config.json`:

```json
{
  "floors": [
    {
      "id": "ground-floor",
      "name": "Ground Floor",
      "order": 0,    // Icon shows "1" (order + 1)
      "rooms": [...]
    },
    {
      "id": "first-floor",
      "name": "First Floor",
      "order": 1,    // Icon shows "2"
      "rooms": [...]
    }
  ]
}
```

**Note:** Icon displays `order + 1` as the floor number (so order 0 displays as "1")

## Comparison

### Before

```
[Ground Floor] [First Floor] [Second Floor]
──────────────────────────────────────────
Rooms...
```

### After (Desktop)

```
┌────────────┐
│ ╱▔╲       │
│╱1╲ Ground │
│└─┘        │
├────────────┤  Rooms...
│ ╱▔╲       │
│╱2╲ First  │
└────────────┘
```

### After (Mobile)

```
┌──────┬──────┬──────┐
│╱▔╲   │╱▔╲   │╱▔╲   │
│╱1╲ G │╱2╲ F │╱3╲ S │
└──────┴──────┴──────┘
──────────────────────
Rooms...
```

## Testing Checklist

- [ ] Isometric icons render correctly
- [ ] Floor numbers display properly (1, 2, 3...)
- [ ] Colors are distinct and visible
- [ ] Desktop shows side tabs (≥ 768px)
- [ ] Mobile shows top tabs (< 768px)
- [ ] Icon size adjusts for device (40px desktop, 32px mobile)
- [ ] Tab switching works smoothly
- [ ] Floor scenes appear correctly
- [ ] Rooms display in tabs
- [ ] Gradients and shading visible
- [ ] Text labels readable
- [ ] Responsive on resize

## Browser Compatibility

✅ **SVG Support**: All modern browsers
✅ **Gradients**: Full support
✅ **Flexbox**: Full support
✅ **Grid Breakpoints**: Ant Design handles polyfills

**Minimum Requirements:**

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Accessibility

- **Screen Readers**: Floor name included in `name` prop
- **Keyboard Navigation**: Standard Ant Design tabs keyboard support
- **Color Contrast**: High contrast between icon and text
- **Text Alternative**: Floor name shown alongside icon

## Future Enhancements

Potential improvements:

- **Custom icons per floor** - Upload custom floor images
- **Icon animations** - Subtle hover/active effects
- **Theme integration** - Icons match app theme colors
- **Floor photos** - Replace icons with actual floor photos
- **Dynamic stacking** - Icons stack vertically to show building structure
- **3D effects** - Enhanced depth with CSS transforms
