import { useMutation } from "@apollo/client/react";
import {
  SET_IS_ON_MUTATION,
  SET_LIGHT_LEVEL_MUTATION,
  SET_VOLUME_MUTATION,
} from "../api/devicesApi";
import type {
  SetIsOnMutation,
  SetIsOnMutationVariables,
} from "@/components/deviceControls/IsOn.types.gen";
import type {
  SetLightLevelMutation,
  SetLightLevelMutationVariables,
} from "@/components/deviceControls/LightLevel.types.gen";
import type {
  SetVolumeMutation,
  SetVolumeMutationVariables,
} from "@/components/deviceControls/Volume.types.gen";
import type { ControlType } from "@/graphql.types";

export interface UseDeviceControlProps {
  id: string;
  type: ControlType;
}

export function useDeviceControl({ id, type }: UseDeviceControlProps) {
  const [setIsOn, { loading: isOnLoading }] = useMutation<
    SetIsOnMutation,
    SetIsOnMutationVariables
  >(SET_IS_ON_MUTATION);

  const [setLightLevel, { loading: lightLevelLoading }] = useMutation<
    SetLightLevelMutation,
    SetLightLevelMutationVariables
  >(SET_LIGHT_LEVEL_MUTATION);

  const [setVolume, { loading: volumeLoading }] = useMutation<
    SetVolumeMutation,
    SetVolumeMutationVariables
  >(SET_VOLUME_MUTATION);

  const handleIsOnChange = async (isOn: boolean) => {
    await setIsOn({
      variables: {
        id,
        type,
        isOn,
      },
    });
  };

  const handleLightLevelChange = async (lightLevel: number) => {
    await setLightLevel({
      variables: {
        id,
        type,
        lightLevel,
      },
    });
  };

  const handleVolumeChange = async (volume: number) => {
    await setVolume({
      variables: {
        id,
        type,
        volume,
      },
    });
  };

  return {
    handleIsOnChange,
    handleLightLevelChange,
    handleVolumeChange,
    loading: {
      isOn: isOnLoading,
      lightLevel: lightLevelLoading,
      volume: volumeLoading,
    },
  };
}
