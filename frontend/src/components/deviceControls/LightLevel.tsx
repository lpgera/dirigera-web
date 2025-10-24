import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Slider } from "antd";
import type {
  SetLightLevelMutation,
  SetLightLevelMutationVariables,
} from "./LightLevel.types.gen";
import type { ControlType } from "../../graphql.types";

const SET_LIGHT_LEVEL_MUTATION = gql`
  mutation SetLightLevel($id: String!, $type: ControlType!, $lightLevel: Int!) {
    setLightLevel(id: $id, type: $type, lightLevel: $lightLevel)
  }
`;

const LightLevel = ({
  id,
  type,
  isReachable,
  lightLevel,
}: {
  id: string;
  type: ControlType;
  isReachable: boolean;
  lightLevel: number;
}) => {
  const [lightLevelValue, setLightLevelValue] = useState(lightLevel);
  useEffect(() => {
    setLightLevelValue(lightLevel);
  }, [lightLevel]);

  const [setLightLevel, { loading }] = useMutation<
    SetLightLevelMutation,
    SetLightLevelMutationVariables
  >(SET_LIGHT_LEVEL_MUTATION);

  return (
    <Slider
      min={1}
      max={100}
      value={lightLevelValue}
      disabled={!isReachable || loading}
      onChange={(newValue: number) => setLightLevelValue(newValue)}
      tooltip={{ formatter: (value) => `Light level: ${value}%` }}
      onChangeComplete={async (newValue: number) => {
        await setLightLevel({
          variables: {
            id,
            type,
            lightLevel: newValue,
          },
        });
      }}
    />
  );
};

export default LightLevel;
