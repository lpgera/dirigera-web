# Compact Room Card Component

A compact variant of the room card that displays:
- Room name as header
- Scene buttons associated with the room (horizontal row)
- Device images only (no controls)
- Click handlers for each device

## Features

- **Clean Layout**: Header with room name, scenes, then device images
- **Device Images**: Shows device images with visual indicators for on/off state, light level, and color
- **Scene Integration**: Displays room-scoped scenes from configuration
- **Clickable Devices**: Each device image has an onClick handler
- **Accessibility**: Keyboard navigation support (Enter/Space to activate)
- **Responsive**: Uses Grid layout with proper spacing

## Usage

```tsx
import { CompactRoomCard } from "@/features/rooms";
import type { Room, Device } from "@/graphql.types";

function MyComponent({ room }: { room: Room }) {
  const handleDeviceClick = (device: Device) => {
    console.log("Device clicked:", device.name);
    // Handle device interaction (e.g., navigate to device details, toggle, etc.)
  };

  return (
    <CompactRoomCard 
      room={room} 
      onDeviceClick={handleDeviceClick} 
    />
  );
}
```

## Props

### CompactRoomCard (Container)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `room` | `Room` | Yes | Room object with id, name, and devices |
| `onDeviceClick` | `(device: Device) => void` | No | Callback when device is clicked |

### Room Type

```typescript
interface Room {
  id: string;
  name: string;
  devices: Device[];
}
```

### Device Type

Devices include properties like:
- `id` - Unique identifier
- `name` - Device name
- `isOn` - On/off state
- `isReachable` - Connectivity status
- `lightLevel` - Brightness (0-100)
- `colorHue`, `colorSaturation`, `colorTemperature` - Color properties

## Component Structure

```
CompactRoomCard (Container)
  └── CompactRoomCardUI (UI)
      ├── Card title={roomName}
      ├── Scenes (room-scoped)
      └── Device Images Grid
          └── DeviceImage (for each device)
```

## Scene Configuration

Scenes are configured via `frontend/public/scenes.config.json`:

```json
{
  "rooms": {
    "room-id-here": ["scene-1-id", "scene-2-id"]
  }
}
```

## Device Images

Device images are configured via `frontend/public/device-images.config.json`:

```json
{
  "device-id-here": "device-image.png"
}
```

Place images in `frontend/public/devices/` folder.

## Styling

Uses design tokens from `styles/tokens/components.css`:

- `--device-image-size`: Size of device images
- `--device-image-border-radius`: Border radius
- `--spacing-sm`, `--spacing-xs`: Layout spacing
- `--color-primary`: Focus outline color

Custom styles in `CompactRoomCardUI.css`:
- Hover scale effect
- Focus outline for accessibility
- Active press effect

## Differences from RoomCard

| Feature | RoomCard | CompactRoomCard |
|---------|----------|-----------------|
| Device Controls | Full controls (switches, sliders) | Images only |
| Battery Devices | Separate section | Included in main grid |
| Navigation Button | Yes (to room details) | No |
| Layout | Vertical list with dividers | Horizontal grid |
| Use Case | Full control panel | Quick overview/navigation |

## Example Use Cases

1. **Quick Overview**: Display all rooms in a dashboard
2. **Device Navigation**: Click device to open detail view
3. **Space-Constrained**: When full controls aren't needed
4. **Touch Interfaces**: Larger clickable areas for tablets

## Accessibility

- **Keyboard Navigation**: Tab to focus, Enter/Space to activate
- **Focus Indicators**: Clear outline on focus
- **Screen Readers**: Proper role and tabIndex attributes
- **Touch**: Adequate touch targets for mobile

## Dependencies

- `@/components/ui` - Card, Row, Col
- `@/features/scenes` - Scenes component
- `@/features/devices` - DeviceImage component
- `@/hooks/useDeviceImages` - Device image configuration
- `@/features/devices/stores/deviceColorStore` - Device color state

## Architecture

Follows the established pattern:

```
features/rooms/
  components/
    ui/
      CompactRoomCardUI.tsx     # Pure presentation
      CompactRoomCardUI.css     # Styles
    containers/
      CompactRoomCard.tsx       # Data + logic
  index.ts                      # Public API
```

**Container**: Handles data fetching, state, and callbacks  
**UI**: Pure presentation with props only

## Testing

Test scenarios:
- Renders room name correctly
- Displays all devices
- onClick handler called with correct device
- Keyboard navigation works
- Scenes rendered when configured
- Handles empty device list
- Accessibility attributes present
