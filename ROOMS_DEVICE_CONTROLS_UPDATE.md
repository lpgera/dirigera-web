# Rooms Device Controls Update

## Overview

Replaced the button-based quick controls in `Rooms.tsx` with an enhanced device control interface that shows:

- Device images (if configured) or generic icons
- Device names
- Interactive controls (on/off, brightness, color)

## Changes Made

### 1. Updated GraphQL Query

Added device control fields to `ROOMS_QUERY`:

```graphql
devices {
  id
  name
  type              # NEW - for control mutations
  isReachable
  batteryPercentage
  isOn              # NEW - on/off state
  lightLevel        # NEW - brightness level
  colorTemperature  # NEW - color temperature
  colorHue          # NEW - color hue
  colorSaturation   # NEW - color saturation
}
```

### 2. Added New Imports

```typescript
import { BulbOutlined } from '@ant-design/icons'
import IsOn from './deviceControls/IsOn'
import LightLevel from './deviceControls/LightLevel'
import LightColor from './deviceControls/LightColor'
```

### 3. New Device Layout

#### Before (Buttons):

```
[Quick Control Button]
[Quick Control Button]
[Quick Control Button]
```

#### After (Device Rows):

```
┌──────────────────────────────────────┐
│ [img] Living Room Lamp                │
│       [●] [≡≡≡≡≡≡≡] [🎨]              │
│ ──────────────────────────────────── │
│ [img] Kitchen Light                   │
│       [○] [≡≡≡≡≡≡≡]                   │
│ ──────────────────────────────────── │
│ [🔆] Bedroom Light                    │
│       [●] [≡≡≡≡≡≡≡] [🎨]              │
└──────────────────────────────────────┘
```

Where:

- `[img]` = Device image (from config)
- `[🔆]` = Generic bulb icon (fallback)
- `[●]/[○]` = On/off switch
- `[≡≡≡≡≡≡≡]` = Brightness slider
- `[🎨]` = Color controls popover

### 4. Layout Structure

Each device is displayed as a horizontal row with:

**Left side (50x50px):**

- Device image (if configured in `device-images.config.json`)
- OR generic bulb icon with semi-transparent background

**Middle (flex auto):**

- Device name (truncated with ellipsis if too long)

**Right side:**

- On/off switch (if device supports `isOn`)
- Brightness slider (if device supports `lightLevel`)
- Color button (if device supports color controls)

### 5. Filtering Logic

**Device Controls Section:**

- Shows devices WHERE `batteryPercentage` is `null` or `undefined`
- These are typically lights, actuators, and other controllable devices
- Battery-powered devices (sensors, remotes) shown in separate battery section

**Quick Controls Section:**

- Kept unchanged for backward compatibility
- Useful for scene-like controls and speakers

### 6. Responsive Behavior

- Device images/icons: Fixed 50x50px
- Device name: Flexible width, text truncation
- Controls: Fixed width elements (switch, color button)
- Brightness slider: Flexible with min 80px, max 150px

### 7. Visual Enhancements

- **Dividers:** Thin horizontal lines between devices
- **Opacity:** Unreachable devices shown at 50% opacity
- **Icons:** Bulb icon as fallback when no image configured
- **Spacing:** Consistent 8px padding between elements

## Device Control Components

### IsOn (On/Off Switch)

- Ant Design `Switch` component
- Toggles device on/off state
- Disabled when device is unreachable
- Mutation: `setIsOn`

### LightLevel (Brightness Slider)

- Ant Design `Slider` component
- Range: 1-100%
- Local state for smooth dragging
- Mutation on change complete
- Mutation: `setLightLevel`

### LightColor (Color Controls)

- Ant Design `Popover` with `Button` trigger
- Contains up to 3 sliders:
  - **Color Temperature:** 2202-4000 (Warm to Cold)
  - **Hue:** 0-359 (Red → Green → Blue → Red)
  - **Saturation:** 0-1 (White to Full Color)
- Mutations: `setColorTemperature`, `setColorHueAndSaturation`

## Integration with Device Images

The new layout seamlessly integrates with the device images feature:

1. **Config Loading:** Uses `useDeviceImages()` hook
2. **Image Resolution:** `getDeviceImage(device.id)` returns path or undefined
3. **Fallback:** Shows generic bulb icon when no image configured
4. **Error Handling:** Hides broken images gracefully

## Testing Checklist

After running GraphQL codegen, test:

- [ ] Device images display correctly
- [ ] Generic bulb icon shows for devices without images
- [ ] On/off switches work
- [ ] Brightness sliders work
- [ ] Color controls popover opens and works
- [ ] Unreachable devices show at 50% opacity
- [ ] Dividers appear between devices (but not after last)
- [ ] Quick controls still work
- [ ] Battery devices still show in battery section
- [ ] Responsive on mobile (images don't break layout)
- [ ] No TypeScript errors
- [ ] No console errors

## Required Actions

### 1. Run GraphQL Code Generation

```bash
npm run graphql-codegen -w frontend
```

### 2. Verify Generated Types

Check `frontend/src/components/Rooms.types.gen.ts` includes new fields

### 3. Test Application

```bash
npm run watch -w frontend
# or
npm run build && npm start
```

### 4. Configure Device Images (Optional)

Edit `frontend/public/device-images.config.json`:

```json
{
  "device-id-1": "living_room_lamp.png",
  "device-id-2": "kitchen_light.png"
}
```

## Benefits

✅ **Visual Context:** Images help identify devices at a glance
✅ **Direct Controls:** No need to click through to device page
✅ **Compact Layout:** More information in less space
✅ **Consistent UX:** Same controls as device detail page
✅ **Graceful Fallbacks:** Generic icons when no image configured
✅ **Responsive:** Works on mobile and desktop
✅ **Type-Safe:** Full TypeScript integration

## Backward Compatibility

- Quick controls section remains unchanged
- Battery devices section remains unchanged
- Device detail pages unchanged
- GraphQL schema unchanged (only query modified)
- Existing device images feature enhanced (not replaced)

## Future Enhancements

Potential improvements:

- Click device image to navigate to device details
- Drag to reorder devices
- Grouping by device type
- Custom device icons beyond generic bulb
- Device status indicators (updating, error, etc.)
- Swipe gestures on mobile
