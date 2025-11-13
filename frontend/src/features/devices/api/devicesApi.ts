import { gql } from "@apollo/client";

export const SET_IS_ON_MUTATION = gql`
  mutation SetIsOn($id: String!, $type: ControlType!, $isOn: Boolean!) {
    setIsOn(id: $id, type: $type, isOn: $isOn)
  }
`;

export const SET_LIGHT_LEVEL_MUTATION = gql`
  mutation SetLightLevel($id: String!, $type: ControlType!, $lightLevel: Int!) {
    setLightLevel(id: $id, type: $type, lightLevel: $lightLevel)
  }
`;

export const SET_VOLUME_MUTATION = gql`
  mutation SetVolume($id: String!, $type: ControlType!, $volume: Int!) {
    setVolume(id: $id, type: $type, volume: $volume)
  }
`;

export const SET_COLOR_TEMPERATURE_MUTATION = gql`
  mutation SetColorTemperature(
    $id: String!
    $type: ControlType!
    $colorTemperature: Int!
  ) {
    setColorTemperature(
      id: $id
      type: $type
      colorTemperature: $colorTemperature
    )
  }
`;

export const SET_COLOR_HUE_AND_SATURATION_MUTATION = gql`
  mutation SetColorHueAndSaturation(
    $id: String!
    $type: ControlType!
    $colorHue: Float!
    $colorSaturation: Float!
  ) {
    setColorHueAndSaturation(
      id: $id
      type: $type
      colorHue: $colorHue
      colorSaturation: $colorSaturation
    )
  }
`;
