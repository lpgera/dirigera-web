import { useMutation } from "@apollo/client/react";
import {
  useLocalLightLevel,
  useLocalIsOn,
  useDeviceLocalStateStore,
} from "../../hooks/useDeviceLocalState";
import { SET_LIGHT_LEVEL_MUTATION } from "../../api/devicesApi";
import { LightLevelControl } from "../ui/LightLevelControl";
import type {
  SetLightLevelMutation,
  SetLightLevelMutationVariables,
} from "@/components/deviceControls/LightLevel.types.gen";
import type { ControlType } from "@/graphql.types";

export interface LightLevelControlContainerProps {
  /** Device ID */
  id: string;
  /** Device type for API calls */
  type: ControlType;
  /** Server-side light level state (0-100) */
  lightLevel: number | null | undefined;
  /** Server-side isOn state for enabling/disabling slider */
  isOn: boolean | null | undefined;
  /** Whether the device is reachable */
  isReachable: boolean;
}

export function LightLevelControlContainer({
  id,
  type,
  lightLevel,
  isOn,
  isReachable,
}: LightLevelControlContainerProps) {
  const localLightLevel = useLocalLightLevel(id);
  const localIsOn = useLocalIsOn(id);
  const { setDeviceLightLevel } = useDeviceLocalStateStore();

  const [setLightLevelMutation, { loading }] = useMutation<
    SetLightLevelMutation,
    SetLightLevelMutationVariables
  >(SET_LIGHT_LEVEL_MUTATION);

  // If device doesn't support light level, don't render
  if (lightLevel === null || lightLevel === undefined) {
    return null;
  }

  const handleChange = async (newLightLevel: number) => {
    setDeviceLightLevel(id, newLightLevel);
    await setLightLevelMutation({
      variables: {
        id,
        type,
        lightLevel: newLightLevel,
      },
    });
  };

  const effectiveIsOn = localIsOn ?? isOn ?? false;

  return (
    <LightLevelControl
      lightLevel={localLightLevel ?? lightLevel}
      isReachable={isReachable}
      disabled={!effectiveIsOn}
      onChange={handleChange}
      loading={loading}
    />
  );
}
