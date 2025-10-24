import React from "react";
import { Switch } from "antd";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type {
  SetIsOnMutation,
  SetIsOnMutationVariables,
} from "./IsOn.types.gen";
import type { ControlType } from "../../graphql.types";

const SET_IS_ON_MUTATION = gql`
  mutation SetIsOn($id: String!, $type: ControlType!, $isOn: Boolean!) {
    setIsOn(id: $id, type: $type, isOn: $isOn)
  }
`;

const IsOn = ({
  id,
  name,
  type,
  isReachable,
  isOn,
}: {
  id: string;
  name: string;
  type: ControlType;
  isReachable: boolean;
  isOn: boolean;
}) => {
  const [setIsOn, { loading }] = useMutation<
    SetIsOnMutation,
    SetIsOnMutationVariables
  >(SET_IS_ON_MUTATION);

  return (
    <Switch
      style={{ marginTop: "9px", marginBottom: "9px" }}
      size="small"
      checked={isOn}
      disabled={!isReachable || loading}
      onChange={async (newValue) => {
        await setIsOn({
          variables: {
            id,
            type,
            isOn: newValue,
          },
        });
      }}
      title={`Toggle ${name}`}
    />
  );
};

export default IsOn;
