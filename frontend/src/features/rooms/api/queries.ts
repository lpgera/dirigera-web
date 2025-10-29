import { gql } from "@apollo/client";

export const ROOMS_QUERY = gql`
  query Rooms {
    rooms {
      id
      name
      quickControls {
        id
        name
        isReachable
        isOn
        playback
        type
      }
      devices {
        id
        name
        type
        isReachable
        batteryPercentage
        isOn
        lightLevel
        colorTemperature
        colorHue
        colorSaturation
      }
    }
  }
`;

export const QUICK_CONTROL_MUTATION = gql`
  mutation QuickControl(
    $id: String!
    $type: ControlType!
    $isOn: Boolean
    $playback: Playback
  ) {
    quickControl(id: $id, type: $type, isOn: $isOn, playback: $playback)
  }
`;
