import type { Meta, StoryObj } from "@storybook/react";
import { FloorSectionUI } from "./FloorSection";
import { CompactRoomCardUI } from "./CompactRoomCardUI";
import type { ProcessedDevice } from "../../types";
import { Row, Col } from "@/components/ui";

/**
 * FloorSectionUI is a pure presentational component that displays:
 * - Floor header with icon and name
 * - Content area for rooms (passed as children)
 * - Active state styling
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

const meta = {
  component: FloorSectionUI,
  tags: ["autodocs"],
  title: "Features/Rooms/FloorSectionUI",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1200, margin: "20px auto" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    floorId: {
      description: "Unique identifier for the floor",
    },
    floorName: {
      description: "Display name of the floor",
    },
    floorOrder: {
      description: "Order of the floor (used for icon display)",
    },
    totalFloors: {
      description: "Total number of floors in the building",
    },
    isActive: {
      description: "Whether this floor is currently active/selected",
    },
    iconSize: {
      description: "Size of the floor icon in pixels",
    },
    onRefChange: {
      description: "Callback when the ref changes (for scroll tracking)",
    },
    children: {
      description: "Content to display in the floor section (usually rooms)",
    },
  },
} satisfies Meta<typeof FloorSectionUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const columnSizes = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
  xxl: 4,
};

export const Default: Story = {
  args: {
    floorId: "floor-1",
    floorName: "Ground Floor",
    floorOrder: 0,
    totalFloors: 3,
    isActive: false,
    iconSize: 48,
    children: (
      <Row gutter={[16, 16]}>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Living Room"
            devices={mockDevices}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Kitchen"
            devices={mockDevices.slice(0, 2)}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
      </Row>
    ),
  },
};

export const Active: Story = {
  args: {
    floorId: "floor-1",
    floorName: "Ground Floor",
    floorOrder: 0,
    totalFloors: 3,
    isActive: true,
    iconSize: 48,
    children: (
      <Row gutter={[16, 16]}>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Living Room"
            devices={mockDevices}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Kitchen"
            devices={mockDevices.slice(0, 2)}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
      </Row>
    ),
  },
};

export const FirstFloor: Story = {
  args: {
    floorId: "floor-2",
    floorName: "First Floor",
    floorOrder: 1,
    totalFloors: 3,
    isActive: false,
    iconSize: 48,
    children: (
      <Row gutter={[16, 16]}>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Master Bedroom"
            devices={mockDevices}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Bedroom 2"
            devices={mockDevices.slice(0, 1)}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Bathroom"
            devices={mockDevices.slice(1, 3)}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
      </Row>
    ),
  },
};

export const SecondFloor: Story = {
  args: {
    floorId: "floor-3",
    floorName: "Second Floor",
    floorOrder: 2,
    totalFloors: 3,
    isActive: true,
    iconSize: 48,
    children: (
      <Row gutter={[16, 16]}>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Office"
            devices={mockDevices.slice(0, 2)}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Guest Room"
            devices={mockDevices}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
      </Row>
    ),
  },
};

export const WithManyRooms: Story = {
  args: {
    floorId: "floor-1",
    floorName: "Ground Floor",
    floorOrder: 0,
    totalFloors: 2,
    isActive: false,
    iconSize: 48,
    children: (
      <Row gutter={[16, 16]}>
        {[
          "Living Room",
          "Kitchen",
          "Dining Room",
          "Hallway",
          "Bathroom",
          "Garage",
        ].map((roomName, idx) => (
          <Col key={idx} {...columnSizes}>
            <CompactRoomCardUI
              roomName={roomName}
              devices={mockDevices.slice(0, (idx % 3) + 1)}
              onDeviceClick={(device) => console.log("Clicked:", device.name)}
            />
          </Col>
        ))}
      </Row>
    ),
  },
};

export const EmptyFloor: Story = {
  args: {
    floorId: "floor-basement",
    floorName: "Basement",
    floorOrder: -1,
    totalFloors: 4,
    isActive: false,
    iconSize: 48,
    children: (
      <div style={{ padding: "20px", opacity: 0.6 }}>
        No rooms on this floor
      </div>
    ),
  },
};

export const SmallIcon: Story = {
  args: {
    floorId: "floor-1",
    floorName: "Ground Floor",
    floorOrder: 0,
    totalFloors: 3,
    isActive: false,
    iconSize: 32,
    children: (
      <Row gutter={[16, 16]}>
        <Col {...columnSizes}>
          <CompactRoomCardUI
            roomName="Living Room"
            devices={mockDevices}
            onDeviceClick={(device) => console.log("Clicked:", device.name)}
          />
        </Col>
      </Row>
    ),
  },
};
