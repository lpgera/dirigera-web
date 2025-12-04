import { useMutation } from "@apollo/client/react";
import {
  useLocalVolume,
  useDeviceLocalStateStore,
} from "../../hooks/useDeviceLocalState";
import { SET_VOLUME_MUTATION } from "../../api/devicesApi";
import { VolumeControl } from "../ui/VolumeControl";
import type {
  SetVolumeMutation,
  SetVolumeMutationVariables,
} from "@/components/deviceControls/Volume.types.gen";
import type { ControlType } from "@/graphql.types";

export interface VolumeControlContainerProps {
  /** Device ID */
  id: string;
  /** Device type for API calls */
  type: ControlType;
  /** Server-side volume state (0-100) */
  volume: number | null | undefined;
  /** Whether the device is reachable */
  isReachable: boolean;
}

export function VolumeControlContainer({
  id,
  type,
  volume,
  isReachable,
}: VolumeControlContainerProps) {
  const localVolume = useLocalVolume(id);
  const { setDeviceVolume } = useDeviceLocalStateStore();

  const [setVolumeMutation, { loading }] = useMutation<
    SetVolumeMutation,
    SetVolumeMutationVariables
  >(SET_VOLUME_MUTATION);

  // If device doesn't support volume, don't render
  if (volume === null || volume === undefined) {
    return null;
  }

  const handleChange = async (newVolume: number) => {
    setDeviceVolume(id, newVolume);
    await setVolumeMutation({
      variables: {
        id,
        type,
        volume: newVolume,
      },
    });
  };

  return (
    <VolumeControl
      volume={localVolume ?? volume}
      isReachable={isReachable}
      onChange={handleChange}
      loading={loading}
    />
  );
}
