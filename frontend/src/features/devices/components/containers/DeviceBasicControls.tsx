import { DeviceBasicControlsUI } from "../ui/DeviceBasicControlsUI";
import { DeviceToggleContainer } from "./DeviceToggleContainer";
import { LightLevelControlContainer } from "./LightLevelControlContainer";
import { VolumeControlContainer } from "./VolumeControlContainer";
import { BatteryIndicatorContainer } from "./BatteryIndicatorContainer";
import type { Device } from "@/graphql.types";

export interface DeviceBasicControlsProps {
  device: Device;
}

export function DeviceBasicControls({ device }: DeviceBasicControlsProps) {
  return (
    <DeviceBasicControlsUI
      toggleSlot={
        device.isOn != null ? (
          <DeviceToggleContainer
            id={device.id}
            type={device.type}
            isOn={device.isOn}
            isReachable={device.isReachable}
          />
        ) : undefined
      }
      lightLevelSlot={
        device.lightLevel != null ? (
          <LightLevelControlContainer
            id={device.id}
            type={device.type}
            lightLevel={device.lightLevel}
            isOn={device.isOn}
            isReachable={device.isReachable}
          />
        ) : undefined
      }
      volumeSlot={
        device.volume != null ? (
          <VolumeControlContainer
            id={device.id}
            type={device.type}
            volume={device.volume}
            isReachable={device.isReachable}
          />
        ) : undefined
      }
      batterySlot={
        device.batteryPercentage != null ? (
          <BatteryIndicatorContainer
            batteryPercentage={device.batteryPercentage}
            name={device.name}
          />
        ) : undefined
      }
    />
  );
}
