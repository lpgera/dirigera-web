import type { Meta, StoryObj } from "@storybook/react";
import { FloorTabsUI } from "./FloorTabsUI";
import { CompactRoomCardUI } from "./CompactRoomCardUI";
import { ScenesUI } from "@/features/scenes/components/ui/ScenesUI";
import type { ProcessedDevice } from "../../types";
import { Row, Col } from "@/components/ui";
import { useState } from "react";

/**
 * FloorTabsUI is a pure presentational component that displays:
 * - Floor navigation sidebar
 * - Floor sections with content
 * - Active floor highlighting
 * - Scroll tracking via refs
 *
 * This component uses composition - floor content is provided via a render prop.
 */

const mockDevices: ProcessedDevice[] = [
  {
    __typename: "Device",
    id: "device-1",
    name: "Ceiling Light",
    type: "DEVICE",
    isReachable: true,
    batteryPercentage: null,
    isOn: true,
    lightLevel: 75,
    colorTemperature: 3000,
    colorHue: null,
    colorSaturation: null,
    imagePath: "https://picsum.photos/id/199/80/80",
    deviceColor: "#ffeab3",
  },
  {
    __typename: "Device",
    id: "device-2",
    name: "Table Lamp",
    type: "DEVICE",
    isReachable: true,
    batteryPercentage: null,
    isOn: false,
    lightLevel: null,
    colorTemperature: null,
    colorHue: null,
    colorSaturation: null,
    imagePath: "https://picsum.photos/id/200/80/80",
    deviceColor: "rgb(255, 217, 146)",
  },
  {
    __typename: "Device",
    id: "device-3",
    name: "RGB Strip",
    type: "DEVICE",
    isReachable: true,
    batteryPercentage: null,
    isOn: true,
    lightLevel: 100,
    colorTemperature: null,
    colorHue: 120,
    colorSaturation: 0.8,
    imagePath: "https://picsum.photos/id/201/80/80",
    deviceColor: "#00FF00",
  },
];

const mockFloors = [
  { id: "floor-1", name: "First Floor", order: 1 },
  { id: "floor-0", name: "Ground Floor", order: 0 },
];

const mockFloorsThree = [
  { id: "floor-2", name: "Second Floor", order: 2 },
  { id: "floor-1", name: "First Floor", order: 1 },
  { id: "floor-0", name: "Ground Floor", order: 0 },
];

const columnSizes = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
  xxl: 4,
};

const meta = {
  component: FloorTabsUI,
  tags: ["autodocs"],
  title: "Features/Rooms/FloorTabsUI",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    floors: {
      description: "Array of floor data objects",
    },
    activeFloorId: {
      description: "ID of the currently active/selected floor",
    },
    iconSize: {
      description: "Size of floor icons in the sections",
    },
    onFloorClick: {
      description: "Callback when a floor nav button is clicked",
      action: "floor-clicked",
    },
    onFloorRefChange: {
      description:
        "Callback when a floor section ref changes (for scroll tracking)",
    },
    children: {
      description: "Render prop function that provides content for each floor",
    },
  },
} satisfies Meta<typeof FloorTabsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoFloors: Story = {
  args: {
    floors: mockFloors,
    activeFloorId: "floor-0",
    iconSize: 48,
    children: (floor) => {
      const roomsData = {
        "floor-0": [
          { name: "Living Room", devices: mockDevices },
          { name: "Kitchen", devices: mockDevices.slice(0, 2) },
          { name: "Dining Room", devices: mockDevices.slice(1, 3) },
        ],
        "floor-1": [
          { name: "Master Bedroom", devices: mockDevices },
          { name: "Bedroom 2", devices: mockDevices.slice(0, 1) },
          { name: "Bathroom", devices: mockDevices.slice(1, 3) },
        ],
      };

      const rooms = roomsData[floor.id as keyof typeof roomsData] || [];

      return (
        <Row gutter={[16, 16]}>
          {rooms.map((room, idx) => (
            <Col key={idx} {...columnSizes}>
              <CompactRoomCardUI
                roomName={room.name}
                devices={room.devices}
                onDeviceClick={(device) =>
                  console.log("Device clicked:", device.name)
                }
              />
            </Col>
          ))}
        </Row>
      );
    },
  },
};

export const ThreeFloors: Story = {
  args: {
    floors: mockFloorsThree,
    activeFloorId: "floor-1",
    iconSize: 48,
    children: (floor) => {
      const roomsData = {
        "floor-0": [
          { name: "Living Room", devices: mockDevices },
          { name: "Kitchen", devices: mockDevices.slice(0, 2) },
          { name: "Dining Room", devices: mockDevices.slice(1, 3) },
          { name: "Hallway", devices: mockDevices.slice(0, 1) },
        ],
        "floor-1": [
          { name: "Master Bedroom", devices: mockDevices },
          { name: "Bedroom 2", devices: mockDevices.slice(0, 1) },
          { name: "Bedroom 3", devices: mockDevices.slice(1, 2) },
          { name: "Bathroom", devices: mockDevices.slice(1, 3) },
        ],
        "floor-2": [
          { name: "Office", devices: mockDevices.slice(0, 2) },
          { name: "Guest Room", devices: mockDevices },
          { name: "Storage", devices: [] },
        ],
      };

      const rooms = roomsData[floor.id as keyof typeof roomsData] || [];

      return (
        <Row gutter={[16, 16]}>
          {rooms.map((room, idx) => (
            <Col key={idx} {...columnSizes}>
              <CompactRoomCardUI
                roomName={room.name}
                devices={room.devices}
                onDeviceClick={(device) =>
                  console.log("Device clicked:", device.name)
                }
              />
            </Col>
          ))}
        </Row>
      );
    },
  },
};

export const WithScenes: Story = {
  args: {
    floors: mockFloors,
    activeFloorId: "floor-0",
    iconSize: 48,
    children: (floor) => {
      const roomsData = {
        "floor-0": [
          {
            name: "Living Room",
            devices: mockDevices,
            scenes: [
              { id: "cozy", name: "Cozy" },
              { id: "bright", name: "Bright" },
            ],
          },
          {
            name: "Kitchen",
            devices: mockDevices.slice(0, 2),
            scenes: [
              { id: "cooking", name: "Cooking" },
              { id: "dinner", name: "Dinner" },
            ],
          },
        ],
        "floor-1": [
          {
            name: "Bedroom",
            devices: mockDevices,
            scenes: [
              { id: "sleep", name: "Sleep" },
              { id: "reading", name: "Reading" },
            ],
          },
        ],
      };

      const rooms = roomsData[floor.id as keyof typeof roomsData] || [];

      return (
        <Row gutter={[16, 16]}>
          {rooms.map((room, idx) => (
            <Col key={idx} {...columnSizes}>
              <CompactRoomCardUI
                roomName={room.name}
                devices={room.devices}
                onDeviceClick={(device) =>
                  console.log("Device clicked:", device.name)
                }
                scenes={
                  room.scenes ? (
                    <ScenesUI
                      scenes={room.scenes}
                      onActivateScene={(sceneId) =>
                        console.log(`Scene ${sceneId} activated`)
                      }
                    />
                  ) : undefined
                }
              />
            </Col>
          ))}
        </Row>
      );
    },
  },
};

// Interactive example with state
function InteractiveFloorTabs() {
  const [activeFloorId, setActiveFloorId] = useState("floor-0");

  return (
    <FloorTabsUI
      floors={mockFloors}
      activeFloorId={activeFloorId}
      iconSize={48}
      onFloorClick={(floorId) => {
        console.log("Floor clicked:", floorId);
        setActiveFloorId(floorId);
      }}
    >
      {(floor) => {
        const roomsData = {
          "floor-0": [
            { name: "Living Room", devices: mockDevices },
            { name: "Kitchen", devices: mockDevices.slice(0, 2) },
          ],
          "floor-1": [
            { name: "Bedroom", devices: mockDevices },
            { name: "Bathroom", devices: mockDevices.slice(1, 3) },
          ],
        };

        const rooms = roomsData[floor.id as keyof typeof roomsData] || [];

        return (
          <Row gutter={[16, 16]}>
            {rooms.map((room, idx) => (
              <Col key={idx} {...columnSizes}>
                <CompactRoomCardUI
                  roomName={room.name}
                  devices={room.devices}
                  onDeviceClick={(device) =>
                    console.log("Device clicked:", device.name)
                  }
                />
              </Col>
            ))}
          </Row>
        );
      }}
    </FloorTabsUI>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveFloorTabs />,
  args: {} as any,
  parameters: {
    docs: {
      description: {
        story: "Click on floor navigation buttons to switch active floor.",
      },
    },
  },
};

export const ManyRoomsPerFloor: Story = {
  args: {
    floors: mockFloors,
    activeFloorId: "floor-0",
    iconSize: 48,
    children: (floor) => {
      const rooms = [
        "Living Room",
        "Kitchen",
        "Dining Room",
        "Hallway",
        "Bathroom",
        "Garage",
        "Laundry",
        "Office",
      ];

      return (
        <Row gutter={[16, 16]}>
          {rooms.map((roomName, idx) => (
            <Col key={idx} {...columnSizes}>
              <CompactRoomCardUI
                roomName={`${roomName} (${floor.name})`}
                devices={mockDevices.slice(0, (idx % 3) + 1)}
                onDeviceClick={(device) =>
                  console.log("Device clicked:", device.name)
                }
              />
            </Col>
          ))}
        </Row>
      );
    },
  },
};

export const EmptyFloors: Story = {
  args: {
    floors: mockFloorsThree,
    activeFloorId: "floor-1",
    iconSize: 48,
    children: (floor) => (
      <div style={{ padding: "40px", textAlign: "center", opacity: 0.6 }}>
        No rooms configured on {floor.name}
      </div>
    ),
  },
};
