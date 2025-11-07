# GraphQL Code Generation Required

## Changes Made

Updated `ROOMS_QUERY` in `frontend/src/components/Rooms.tsx` to include device control fields:

- `type` - Device type for control mutations
- `isOn` - On/off state
- `lightLevel` - Brightness level
- `colorTemperature` - Color temperature
- `colorHue` - Color hue
- `colorSaturation` - Color saturation

## Required Steps

### 1. Regenerate GraphQL Types

Run the GraphQL code generator to update the TypeScript types:

```bash
# From the project root directory
npm run graphql-codegen -w frontend
```

This will update `frontend/src/components/Rooms.types.gen.ts` with the new device fields.

### 2. Verify Changes

After code generation, check that the file includes the new fields in the `RoomsQuery` type:

```typescript
// frontend/src/components/Rooms.types.gen.ts
devices: Array<{
  __typename?: "Device";
  id: string;
  name: string;
  type: Types.ControlType; // NEW
  isReachable: boolean;
  batteryPercentage?: number | null;
  isOn?: boolean | null; // NEW
  lightLevel?: number | null; // NEW
  colorTemperature?: number | null; // NEW
  colorHue?: number | null; // NEW
  colorSaturation?: number | null; // NEW
}>;
```

### 3. Test the Application

```bash
# Start the frontend
npm run watch -w frontend

# Or build for production
npm run build
```

## What Was Changed

### Rooms.tsx Updates

1. **Added new imports:**
   - `IsOn` - On/off switch control
   - `LightLevel` - Brightness slider
   - `LightColor` - Color controls (temperature, hue, saturation)
   - `BulbOutlined` - Generic device icon fallback

2. **Updated query:** Added device control fields to ROOMS_QUERY

3. **New layout:** Replaced button-based controls with device rows showing:
   - **Left side:** Device image (if configured) or generic bulb icon
   - **Middle:** Device name
   - **Right side:** Control components (on/off, brightness, color)

4. **Filter logic:** Only shows devices without battery (non-battery devices are typically lights/actuators)

5. **Dividers:** Added thin dividers between devices for visual separation

## Visual Layout

```
┌─────────────────────────────────────┐
│ Room Name                  [i]      │
├─────────────────────────────────────┤
│ [img] Device 1      [switch] [≡] [🎨] │
│ ─────────────────────────────────── │
│ [img] Device 2      [switch] [≡]    │
│ ─────────────────────────────────── │
│ [🔆] Device 3       [switch]        │
│                                     │
│ [Quick Control Button]              │
│ [Quick Control Button]              │
│                                     │
│ 🔋 Battery Device 1  85%            │
└─────────────────────────────────────┘
```

Where:

- `[img]` = Device image (if configured)
- `[🔆]` = Generic bulb icon (fallback)
- `[switch]` = On/off toggle
- `[≡]` = Light level slider
- `[🎨]` = Color controls button
- `[i]` = Info button to room details
