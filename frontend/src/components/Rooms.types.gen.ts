import * as Types from "../graphql.types";

export type RoomsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type RoomsQuery = {
  __typename?: "Query";
  rooms: Array<{
    __typename?: "Room";
    id: string;
    name: string;
    quickControls: Array<{
      __typename?: "QuickControl";
      id: string;
      name: string;
      isReachable: boolean;
      isOn?: boolean | null;
      playback?: string | null;
      type: Types.ControlType;
    }>;
    devices: Array<{
      __typename?: "Device";
      id: string;
      name: string;
      type: Types.ControlType;
      isReachable: boolean;
      batteryPercentage?: number | null;
      isOn?: boolean | null;
      lightLevel?: number | null;
      colorTemperature?: number | null;
      colorHue?: number | null;
      colorSaturation?: number | null;
    }>;
  }>;
};

export type QuickControlMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  type: Types.ControlType;
  isOn?: Types.InputMaybe<Types.Scalars["Boolean"]["input"]>;
  playback?: Types.InputMaybe<Types.Playback>;
}>;

export type QuickControlMutation = {
  __typename?: "Mutation";
  quickControl?: boolean | null;
};
