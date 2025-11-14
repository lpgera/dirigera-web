import React, { useState } from "react";
import { CompactRoomCardUI } from "../ui/CompactRoomCardUI";
import { Scenes } from "@/features/scenes";
import {
  DeviceImage,
  BatteryIndicator,
  DeviceControl,
} from "@/features/devices";
import { useDeviceImages } from "@/hooks/useDeviceImages";
import { useDeviceColor } from "@/features/devices/stores/deviceColorStore";
import { Modal } from "@/components/ui";
import type { Room, Device } from "@/graphql.types";

interface CompactRoomCardProps {
  room: Room;
  onDeviceClick?: (device: Device) => void;
  scenes?: React.ReactNode;
}

export function CompactRoomCard({
  room,
  onDeviceClick,
  scenes,
}: CompactRoomCardProps) {
  const { getDeviceImage } = useDeviceImages();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    if (onDeviceClick) {
      onDeviceClick(device);
    }
  };

  const renderScenes = scenes ?? <Scenes scope="room" scopeId={room.id} />;

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
    <>
      <CompactRoomCardUI
        roomName={room.name}
        devices={room.devices}
        renderScenes={renderScenes}
        renderDeviceImage={renderDeviceImage}
        renderBatteryIcon={renderBatteryIcon}
        onDeviceClick={handleDeviceClick}
      />

      <Modal
        open={!!selectedDevice}
        onCancel={() => setSelectedDevice(null)}
        title={selectedDevice?.name}
        footer={null}
        width={400}
      >
        {selectedDevice && <DeviceControl device={selectedDevice} />}
      </Modal>
    </>
  );
}
