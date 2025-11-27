import type { Meta, StoryObj } from "@storybook/react";
import { FloorNavUI } from "./FloorNav";
import { useState } from "react";

/**
 * FloorNavUI is a pure presentational component that displays:
 * - Vertical navigation list for floors
 * - Floor icons and names
 * - Active state highlighting
 * - Click handlers for navigation
 */

const meta = {
  component: FloorNavUI,
  tags: ["autodocs"],
  title: "Features/Rooms/FloorNavUI",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250, margin: "20px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    floors: {
      description: "Array of floor items to display",
    },
    activeFloorId: {
      description: "ID of the currently active/selected floor",
    },
    iconSize: {
      description: "Size of floor icons in pixels",
    },
    onFloorClick: {
      description: "Callback when a floor is clicked",
      action: "floor-clicked",
    },
    scenes: {
      description: "Optional additional content to render before floors",
    },
  },
} satisfies Meta<typeof FloorNavUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockFloors = [
  { id: "floor-2", name: "Second Floor", shortName: "2.", order: 2 },
  { id: "floor-1", name: "First Floor", shortName: "1.", order: 1 },
  { id: "floor-0", name: "Ground Floor", shortName: "G.", order: 0 },
  { id: "floor-basement", name: "Basement", shortName: "B.", order: -1 },
];

export const Default: Story = {
  args: {
    floors: mockFloors,
    activeFloorId: "floor-0",
    iconSize: 32,
  },
};

export const TwoFloors: Story = {
  args: {
    floors: [
      { id: "floor-1", name: "Upstairs", shortName: "Up", order: 1 },
      { id: "floor-0", name: "Downstairs", shortName: "Dn", order: 0 },
    ],
    activeFloorId: "floor-1",
    iconSize: 32,
  },
};

export const ManyFloors: Story = {
  args: {
    floors: [
      { id: "floor-5", name: "Penthouse", shortName: "PH", order: 5 },
      { id: "floor-4", name: "Fourth Floor", shortName: "4.", order: 4 },
      { id: "floor-3", name: "Third Floor", shortName: "3.", order: 3 },
      { id: "floor-2", name: "Second Floor", shortName: "2.", order: 2 },
      { id: "floor-1", name: "First Floor", shortName: "1.", order: 1 },
      { id: "floor-0", name: "Ground Floor", shortName: "G.", order: 0 },
      { id: "floor-basement", name: "Basement", shortName: "B.", order: -1 },
      { id: "floor-parking", name: "Parking", shortName: "P.", order: -2 },
    ],
    activeFloorId: "floor-2",
    iconSize: 32,
  },
};

export const WithCustomNames: Story = {
  args: {
    floors: [
      { id: "attic", name: "Attic", shortName: "Att", order: 2 },
      { id: "main", name: "Main Level", shortName: "Main", order: 1 },
      { id: "lower", name: "Lower Level", shortName: "Low", order: 0 },
    ],
    activeFloorId: "main",
    iconSize: 32,
  },
};

export const SmallIcons: Story = {
  args: {
    floors: mockFloors,
    activeFloorId: "floor-1",
    iconSize: 24,
  },
};

export const LargeIcons: Story = {
  args: {
    floors: mockFloors,
    activeFloorId: "floor-basement",
    iconSize: 48,
  },
};

// Interactive example with state
function InteractiveFloorNav() {
  const [activeFloorId, setActiveFloorId] = useState("floor-0");

  return (
    <FloorNavUI
      floors={mockFloors}
      activeFloorId={activeFloorId}
      iconSize={32}
      onFloorClick={(floorId) => {
        console.log("Floor clicked:", floorId);
        setActiveFloorId(floorId);
      }}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveFloorNav />,
  args: {} as any,
  parameters: {
    docs: {
      description: {
        story: "Click on different floors to see the active state change.",
      },
    },
  },
};

export const WithHeaderContent: Story = {
  args: {
    floors: mockFloors,
    activeFloorId: "floor-0",
    iconSize: 32,
    scenes: (
      <div
        style={{
          padding: "12px",
          marginBottom: "8px",
          borderBottom: "1px solid #333",
        }}
      >
        <strong>Building Floors</strong>
      </div>
    ),
  },
};
