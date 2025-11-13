import React from "react";
import { CompactRoomCardUI } from "../ui/CompactRoomCardUI";
import { Scenes } from "@/features/scenes";
import { DeviceImage, BatteryIndicator } from "@/features/devices";
import { useDeviceImages } from "@/hooks/useDeviceImages";
import { useDeviceColor } from "@/features/devices/stores/deviceColorStore";
import type { Room, Device } from "@/graphql.types";

interface CompactRoomCardProps {
  room: Room;
  onDeviceClick?: (device: Device) => void;
}

export function CompactRoomCard({ room, onDeviceClick }: CompactRoomCardProps) {
  const { getDeviceImage } = useDeviceImages();

  const handleDeviceClick = (device: Device) => {
    if (onDeviceClick) {
      onDeviceClick(device);
    }
  };

  const renderScenes = <Scenes scope="room" scopeId={room.id} />;

  const renderDeviceImage = (device: Device, onClick: () => void) => {
    const imagePath = getDeviceImage(device.id);
    const deviceColor = useDeviceColor(device.id);

    return (
      <DeviceImage
        imagePath={imagePath}
        name={device.name}
        isOn={!!device.isOn}
        isReachable={device.isReachable}
        {...(device.lightLevel != null && {
          lightLevel: device.lightLevel,
        })}
        {...(deviceColor && { lightColor: deviceColor })}
      />
    );
  };

  const renderBatteryIcon = (device: Device) => (
    <BatteryIndicator
      batteryPercentage={device.batteryPercentage!}
      name={device.name}
    />
  );

  return (
    <CompactRoomCardUI
      roomName={room.name}
      devices={room.devices}
      renderScenes={renderScenes}
      renderDeviceImage={renderDeviceImage}
      renderBatteryIcon={renderBatteryIcon}
      onDeviceClick={handleDeviceClick}
    />
  );
}
