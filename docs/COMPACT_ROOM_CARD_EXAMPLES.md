# CompactRoomCard Usage Example

## Basic Usage

```tsx
import { CompactRoomCard } from "@/features/rooms";
import { useNavigate } from "react-router-dom";
import type { Room, Device } from "@/graphql.types";

function RoomOverview({ room }: { room: Room }) {
  const navigate = useNavigate();

  const handleDeviceClick = (device: Device) => {
    // Navigate to device details page
    navigate(`/devices/${device.id}`);
  };

  return <CompactRoomCard room={room} onDeviceClick={handleDeviceClick} />;
}
```

## In a Grid Layout

```tsx
import { Row, Col } from "@/components/ui/Grid";
import { CompactRoomCard } from "@/features/rooms";
import type { Room, Device } from "@/graphql.types";

function RoomsOverview({ rooms }: { rooms: Room[] }) {
  const handleDeviceClick = (device: Device) => {
    console.log("Device clicked:", device.name);
    // Your custom logic here
  };

  return (
    <Row gutter={[16, 16]}>
      {rooms.map((room) => (
        <Col key={room.id} xs={24} sm={12} md={8} lg={6}>
          <CompactRoomCard room={room} onDeviceClick={handleDeviceClick} />
        </Col>
      ))}
    </Row>
  );
}
```

## With Toggle Device

```tsx
import { CompactRoomCard } from "@/features/rooms";
import { useMutation } from "@tanstack/react-query";
import type { Device } from "@/graphql.types";

function RoomWithToggle({ room }: { room: Room }) {
  const toggleMutation = useMutation({
    mutationFn: async (device: Device) => {
      // Toggle device on/off
      const newState = !device.isOn;
      // Call your API here
      return fetch(`/api/devices/${device.id}/toggle`, {
        method: "POST",
        body: JSON.stringify({ isOn: newState }),
      });
    },
  });

  const handleDeviceClick = (device: Device) => {
    toggleMutation.mutate(device);
  };

  return <CompactRoomCard room={room} onDeviceClick={handleDeviceClick} />;
}
```

## With Device Modal

```tsx
import { useState } from "react";
import { CompactRoomCard } from "@/features/rooms";
import { Modal } from "@/components/ui";
import { DeviceControl } from "@/features/devices";
import type { Room, Device } from "@/graphql.types";

function RoomWithDeviceModal({ room }: { room: Room }) {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
  };

  return (
    <>
      <CompactRoomCard room={room} onDeviceClick={handleDeviceClick} />

      <Modal
        open={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        title={selectedDevice?.name}
      >
        {selectedDevice && <DeviceControl device={selectedDevice} />}
      </Modal>
    </>
  );
}
```

## Without onClick Handler

```tsx
import { CompactRoomCard } from "@/features/rooms";
import type { Room } from "@/graphql.types";

// Just for display, no interaction
function RoomDisplay({ room }: { room: Room }) {
  return <CompactRoomCard room={room} />;
}
```

## Comparison with RoomCard

```tsx
import { RoomCard, CompactRoomCard } from "@/features/rooms";

// Full RoomCard - with all device controls
<RoomCard room={room} />

// CompactRoomCard - device images only, custom onClick
<CompactRoomCard room={room} onDeviceClick={handleDeviceClick} />
```

## Key Features Demonstrated

1. **Scene Integration**: Automatically shows room-scoped scenes from configuration
2. **Device Images**: Shows device images with visual state (on/off, brightness, color)
3. **Click Handlers**: Custom onClick for each device
4. **Responsive**: Works in any grid layout
5. **Accessibility**: Full keyboard navigation support
