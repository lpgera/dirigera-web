import { useMutation } from "@apollo/client/react";
import {
  useLocalIsOn,
  useDeviceLocalStateStore,
} from "../../hooks/useDeviceLocalState";
import { SET_IS_ON_MUTATION } from "../../api/devicesApi";
import { DeviceToggle } from "../ui/DeviceToggle";
import type {
  SetIsOnMutation,
  SetIsOnMutationVariables,
} from "@/components/deviceControls/IsOn.types.gen";
import type { ControlType } from "@/graphql.types";

export interface DeviceToggleContainerProps {
  /** Device ID */
  id: string;
  /** Device type for API calls */
  type: ControlType;
  /** Server-side isOn state */
  isOn: boolean | null | undefined;
  /** Whether the device is reachable */
  isReachable: boolean;
}

export function DeviceToggleContainer({
  id,
  type,
  isOn,
  isReachable,
}: DeviceToggleContainerProps) {
  const localIsOn = useLocalIsOn(id);
  const { setDeviceIsOn } = useDeviceLocalStateStore();

  const [setIsOnMutation, { loading }] = useMutation<
    SetIsOnMutation,
    SetIsOnMutationVariables
  >(SET_IS_ON_MUTATION);

  // If device doesn't support on/off, don't render
  if (isOn === null || isOn === undefined) {
    return null;
  }

  const handleChange = async (newIsOn: boolean) => {
    setDeviceIsOn(id, newIsOn);
    await setIsOnMutation({
      variables: {
        id,
        type,
        isOn: newIsOn,
      },
    });
  };

  return (
    <DeviceToggle
      isOn={localIsOn ?? isOn}
      isReachable={isReachable}
      onChange={handleChange}
      loading={loading}
    />
  );
}
