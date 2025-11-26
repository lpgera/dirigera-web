import type { Meta, StoryObj } from "@storybook/react";
import FloorSectionUI from "./FloorSectionUI";
import { CompactRoomCardUI } from "./CompactRoomCardUI";
import { ScenesUI } from "@/features/scenes/components/ui/ScenesUI";
import type { Device } from "@/graphql.types";
import { Row, Col } from "@/components/ui";
import { FloorPlanRenderer } from "@jesperkihlberg/floor-plan";

// Import types
import type { FloorPlanConfig } from "@jesperkihlberg/floor-plan";

// Import config
import floorsConfig from "@jesperkihlberg/floor-plan/floors-config.json";
import { Scenes } from "@/features/scenes";

/**
 * FloorSectionUI is a pure presentational component that displays:
 * - Floor header with icon and name
 * - Content area for rooms (passed as children)
 * - Active state styling
 */

const mockGetDeviceImage = (deviceId: string) => {
  const imageMap: Record<string, string> = {
    "device-1": "https://picsum.photos/id/199/80/80",
    "device-2": "https://picsum.photos/id/200/80/80",
    "device-3": "https://picsum.photos/id/201/80/80",
  };
  return imageMap[deviceId];
};

const mockDevices: Device[] = [
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
  },
];

const defaultScenes = (
  <ScenesUI
    scenes={[
      { id: "scene-1", name: "All Lights On" },
      { id: "scene-2", name: "Movie Time" },
    ]}
    title={"Floor Scenes"}
    onActivateScene={() => {}}
    wrapScenes={false}
  />
);

const defaultFloorPlan = (
  <FloorPlanRenderer
    config={floorsConfig.floors[1] as FloorPlanConfig}
    scale={0.8}
  />
);

const defaultRooms = [
  <CompactRoomCardUI
    roomName="Living Room"
    devices={mockDevices}
    onDeviceClick={(device) => console.log("Clicked:", device.name)}
    getDeviceImage={mockGetDeviceImage}
  />,
  <CompactRoomCardUI
    roomName="Kitchen"
    devices={mockDevices.slice(0, 2)}
    onDeviceClick={(device) => console.log("Clicked:", device.name)}
    getDeviceImage={mockGetDeviceImage}
  />,
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
  args: {
    floorId: "floor-1",
    floorName: "Ground Floor",
    floorOrder: 0,
    totalFloors: 3,
    isActive: false,
    iconSize: 48,
    scenes: defaultScenes,
    floorPlan: defaultFloorPlan,
    rooms: defaultRooms,
  },
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
    scenes: {
      description: "Scenes component to display scenes related to the floor",
    },
    floorPlan: {
      description: "Floor plan component to display the floor layout",
    },
    rooms: {
      description: "Rooms component to display rooms on the floor",
    },
  },
} satisfies Meta<typeof FloorSectionUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const WithManyScenes: Story = {
  args: {
    scenes: (
      <ScenesUI
        scenes={[
          { id: "s1", name: "All Lights On" },
          { id: "s2", name: "All Lights Off" },
          { id: "s3", name: "Daytime" },
          { id: "s4", name: "Evening" },
          { id: "s5", name: "Welcome Home" },
          { id: "s6", name: "Goodnight" },
        ]}
        onActivateScene={(sceneId) =>
          console.log(`Floor scene ${sceneId} activated`)
        }
        wrapScenes={false}
      />
    ),
  },
};

// export const FirstFloor: Story = {
//   args: {
//     floorId: "floor-2",
//     floorName: "First Floor",
//     floorOrder: 1,
//     totalFloors: 3,
//     isActive: false,
//     iconSize: 48,
//     children: (
//       <Row gutter={[16, 16]}>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Master Bedroom"
//             devices={mockDevices}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//           />
//         </Col>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Bedroom 2"
//             devices={mockDevices.slice(0, 1)}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//           />
//         </Col>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Bathroom"
//             devices={mockDevices.slice(1, 3)}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//           />
//         </Col>
//       </Row>
//     ),
//   },
// };

// export const SecondFloor: Story = {
//   args: {
//     floorId: "floor-3",
//     floorName: "Second Floor",
//     floorOrder: 2,
//     totalFloors: 3,
//     isActive: true,
//     iconSize: 48,
//     children: (
//       <Row gutter={[16, 16]}>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Office"
//             devices={mockDevices.slice(0, 2)}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//           />
//         </Col>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Guest Room"
//             devices={mockDevices}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//           />
//         </Col>
//       </Row>
//     ),
//   },
// };

// export const WithManyRooms: Story = {
//   args: {
//     floorId: "floor-1",
//     floorName: "Ground Floor",
//     floorOrder: 0,
//     totalFloors: 2,
//     isActive: false,
//     iconSize: 48,
//     children: (
//       <Row gutter={[16, 16]}>
//         {[
//           "Living Room",
//           "Kitchen",
//           "Dining Room",
//           "Hallway",
//           "Bathroom",
//           "Garage",
//         ].map((roomName, idx) => (
//           <Col key={idx} {...columnSizes}>
//             <CompactRoomCardUI
//               roomName={roomName}
//               devices={mockDevices.slice(0, (idx % 3) + 1)}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//             />
//           </Col>
//         ))}
//       </Row>
//     ),
//   },
// };

// export const EmptyFloor: Story = {
//   args: {
//     floorId: "floor-basement",
//     floorName: "Basement",
//     floorOrder: -1,
//     totalFloors: 4,
//     isActive: false,
//     iconSize: 48,
//     children: (
//       <div style={{ padding: "20px", opacity: 0.6 }}>
//         No rooms on this floor
//       </div>
//     ),
//   },
// };

// export const SmallIcon: Story = {
//   args: {
//     floorId: "floor-1",
//     floorName: "Ground Floor",
//     floorOrder: 0,
//     totalFloors: 3,
//     isActive: false,
//     iconSize: 32,
//     children: (
//       <Row gutter={[16, 16]}>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Living Room"
//             devices={mockDevices}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//           />
//         </Col>
//       </Row>
//     ),
//   },
// };

// export const WithFloorScenes: Story = {
//   args: {
//     floorId: "floor-1",
//     floorName: "Ground Floor",
//     floorOrder: 0,
//     totalFloors: 3,
//     isActive: true,
//     iconSize: 48,
//     children: (
//       <>
//         <ScenesUI
//           scenes={[
//             { id: "floor-relax", name: "Relax" },
//             { id: "floor-bright", name: "Bright" },
//             { id: "floor-evening", name: "Evening" },
//           ]}
//           onActivateScene={(sceneId) =>
//             console.log(`Floor scene ${sceneId} activated`)
//           }
//         />
//         <Row gutter={[16, 16]}>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Living Room"
//               devices={mockDevices}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//             />
//           </Col>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Kitchen"
//               devices={mockDevices.slice(0, 2)}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//             />
//           </Col>
//         </Row>
//       </>
//     ),
//   },
// };

// export const WithRoomScenes: Story = {
//   args: {
//     floorId: "floor-1",
//     floorName: "Ground Floor",
//     floorOrder: 0,
//     totalFloors: 3,
//     isActive: false,
//     iconSize: 48,
//     children: (
//       <Row gutter={[16, 16]}>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Living Room"
//             devices={mockDevices}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//             scenes={
//               <ScenesUI
//                 scenes={[
//                   { id: "cozy", name: "Cozy" },
//                   { id: "movie", name: "Movie Time" },
//                   { id: "party", name: "Party" },
//                 ]}
//                 onActivateScene={(sceneId) =>
//                   console.log(`Room scene ${sceneId} activated`)
//                 }
//               />
//             }
//           />
//         </Col>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Kitchen"
//             devices={mockDevices.slice(0, 2)}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//             scenes={
//               <ScenesUI
//                 scenes={[
//                   { id: "cooking", name: "Cooking" },
//                   { id: "dinner", name: "Dinner" },
//                 ]}
//                 onActivateScene={(sceneId) =>
//                   console.log(`Room scene ${sceneId} activated`)
//                 }
//               />
//             }
//           />
//         </Col>
//         <Col {...columnSizes}>
//           <CompactRoomCardUI
//             roomName="Dining Room"
//             devices={mockDevices.slice(1, 3)}
//             onDeviceClick={(device) => console.log("Clicked:", device.name)}
//             getDeviceImage={mockGetDeviceImage}
//             scenes={
//               <ScenesUI
//                 scenes={[
//                   { id: "casual", name: "Casual" },
//                   { id: "formal", name: "Formal" },
//                 ]}
//                 onActivateScene={(sceneId) =>
//                   console.log(`Room scene ${sceneId} activated`)
//                 }
//               />
//             }
//           />
//         </Col>
//       </Row>
//     ),
//   },
// };

// export const WithFloorAndRoomScenes: Story = {
//   args: {
//     floorId: "floor-2",
//     floorName: "First Floor",
//     floorOrder: 1,
//     totalFloors: 3,
//     isActive: true,
//     iconSize: 48,
//     children: (
//       <>
//         <ScenesUI
//           scenes={[
//             { id: "floor-morning", name: "Morning Routine" },
//             { id: "floor-night", name: "Night Time" },
//             { id: "floor-away", name: "Away Mode" },
//           ]}
//           onActivateScene={(sceneId) =>
//             console.log(`Floor scene ${sceneId} activated`)
//           }
//         />
//         <Row gutter={[16, 16]}>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Master Bedroom"
//               devices={mockDevices}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "wake-up", name: "Wake Up" },
//                     { id: "sleep", name: "Sleep" },
//                     { id: "reading", name: "Reading" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Bedroom 2"
//               devices={mockDevices.slice(0, 1)}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "bedtime", name: "Bedtime" },
//                     { id: "study", name: "Study Time" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Bathroom"
//               devices={mockDevices.slice(1, 3)}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "morning-routine", name: "Morning" },
//                     { id: "night-routine", name: "Night" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//         </Row>
//       </>
//     ),
//   },
// };

// export const WithFloorPlanFloorAndRoomScenes: Story = {
//   args: {
//     floorId: "floor-2",
//     floorName: "First Floor",
//     floorOrder: 1,
//     totalFloors: 3,
//     isActive: true,
//     iconSize: 48,
//     children: (
//       <>
//         <ScenesUI
//           scenes={[
//             { id: "floor-morning", name: "Morning Routine" },
//             { id: "floor-night", name: "Night Time" },
//             { id: "floor-away", name: "Away Mode" },
//           ]}
//           onActivateScene={(sceneId) =>
//             console.log(`Floor scene ${sceneId} activated`)
//           }
//         />
//         <Row gutter={[16, 16]}>
//           <Col
//             style={{ textAlign: "center", background: "#030303", padding: 16 }}
//           >
//             <FloorPlanRenderer
//               config={floorsConfig.floors[1] as FloorPlanConfig}
//               scale={0.8}
//             />
//           </Col>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Master Bedroom"
//               devices={mockDevices}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "wake-up", name: "Wake Up" },
//                     { id: "sleep", name: "Sleep" },
//                     { id: "reading", name: "Reading" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Bedroom 2"
//               devices={mockDevices.slice(0, 1)}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "bedtime", name: "Bedtime" },
//                     { id: "study", name: "Study Time" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Bathroom"
//               devices={mockDevices.slice(1, 3)}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "morning-routine", name: "Morning" },
//                     { id: "night-routine", name: "Night" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//         </Row>
//       </>
//     ),
//   },
// };
// export const WithManyScenes: Story = {
//   args: {
//     floorId: "floor-1",
//     floorName: "Ground Floor",
//     floorOrder: 0,
//     totalFloors: 2,
//     isActive: false,
//     iconSize: 48,
//     children: (
//       <>
//         <ScenesUI
//           scenes={[
//             { id: "s1", name: "All Lights On" },
//             { id: "s2", name: "All Lights Off" },
//             { id: "s3", name: "Daytime" },
//             { id: "s4", name: "Evening" },
//             { id: "s5", name: "Welcome Home" },
//             { id: "s6", name: "Leaving" },
//           ]}
//           onActivateScene={(sceneId) =>
//             console.log(`Floor scene ${sceneId} activated`)
//           }
//         />
//         <Row gutter={[16, 16]}>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Living Room"
//               devices={mockDevices}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "r1", name: "Cozy" },
//                     { id: "r2", name: "Bright" },
//                     { id: "r3", name: "Movie" },
//                     { id: "r4", name: "Gaming" },
//                     { id: "r5", name: "Party" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//           <Col {...columnSizes}>
//             <CompactRoomCardUI
//               roomName="Kitchen"
//               devices={mockDevices.slice(0, 2)}
//               onDeviceClick={(device) => console.log("Clicked:", device.name)}
//               getDeviceImage={mockGetDeviceImage}
//               scenes={
//                 <ScenesUI
//                   scenes={[
//                     { id: "k1", name: "Cooking" },
//                     { id: "k2", name: "Breakfast" },
//                     { id: "k3", name: "Dinner" },
//                   ]}
//                   onActivateScene={(sceneId) =>
//                     console.log(`Room scene ${sceneId} activated`)
//                   }
//                 />
//               }
//             />
//           </Col>
//         </Row>
//       </>
//     ),
//   },
// };
