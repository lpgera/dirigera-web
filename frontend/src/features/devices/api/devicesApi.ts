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
