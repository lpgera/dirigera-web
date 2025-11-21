import { useMutation } from "@apollo/client/react";
import {
  SET_IS_ON_MUTATION,
  SET_LIGHT_LEVEL_MUTATION,
  SET_VOLUME_MUTATION,
  SET_COLOR_TEMPERATURE_MUTATION,
  SET_COLOR_HUE_AND_SATURATION_MUTATION,
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
import type {
  SetColorTemperatureMutation,
  SetColorTemperatureMutationVariables,
  SetColorHueAndSaturationMutation,
  SetColorHueAndSaturationMutationVariables,
} from "@/components/deviceControls/LightColor.types.gen";
import type { ControlType } from "@/graphql.types";
import { useDeviceLocalStateStore } from "./useDeviceLocalState";

export interface UseDeviceControlProps {
  id: string;
  type: ControlType;
}

export function useDeviceControl({ id, type }: UseDeviceControlProps) {
  const {
    setDeviceIsOn,
    setDeviceLightLevel,
    setDeviceVolume,
    setDeviceColorSaturation,
    setDeviceColorHue,
    setDeviceColorTemperature,
  } = useDeviceLocalStateStore();

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

  const [setColorTemperature, { loading: colorTemperatureLoading }] =
    useMutation<
      SetColorTemperatureMutation,
      SetColorTemperatureMutationVariables
    >(SET_COLOR_TEMPERATURE_MUTATION);

  const [setColorHueAndSaturation, { loading: colorHueSaturationLoading }] =
    useMutation<
      SetColorHueAndSaturationMutation,
      SetColorHueAndSaturationMutationVariables
    >(SET_COLOR_HUE_AND_SATURATION_MUTATION);

  const handleIsOnChange = async (isOn: boolean) => {
    setDeviceIsOn(id, isOn);
    await setIsOn({
      variables: {
        id,
        type,
        isOn,
      },
    });
  };

  const handleLightLevelChange = async (lightLevel: number) => {
    setDeviceLightLevel(id, lightLevel);
    await setLightLevel({
      variables: {
        id,
        type,
        lightLevel,
      },
    });
  };

  const handleVolumeChange = async (volume: number) => {
    setDeviceVolume(id, volume);
    await setVolume({
      variables: {
        id,
        type,
        volume,
      },
    });
  };

  const handleColorTemperatureChange = async (colorTemperature: number) => {
    console.log("handleColorTemperatureChange", colorTemperature);
    setDeviceColorTemperature(id, colorTemperature);
    await setColorTemperature({
      variables: {
        id,
        type,
        colorTemperature,
      },
    });
  };

  const handleColorHueSaturationChange = async (
    colorHue: number,
    colorSaturation: number
  ) => {
    setDeviceColorHue(id, colorHue);
    setDeviceColorSaturation(id, colorSaturation);
    await setColorHueAndSaturation({
      variables: {
        id,
        type,
        colorHue,
        colorSaturation,
      },
    });
  };

  return {
    handleIsOnChange,
    handleLightLevelChange,
    handleVolumeChange,
    handleColorTemperatureChange,
    handleColorHueSaturationChange,
    loading: {
      isOn: isOnLoading,
      lightLevel: lightLevelLoading,
      volume: volumeLoading,
      colorTemperature: colorTemperatureLoading,
      colorHueSaturation: colorHueSaturationLoading,
      playback: false,
    },
  };
}
