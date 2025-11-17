import React, { useState, useMemo } from "react";
import { CompactRoomCardUI } from "../ui/CompactRoomCardUI";
import { Scenes } from "@/features/scenes";
import { DeviceControl } from "@/features/devices";
import { useDeviceImages } from "@/hooks/useDeviceImages";
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

  return (
    <>
      <CompactRoomCardUI
        roomName={room.name}
        devices={room.devices}
        getDeviceImage={getDeviceImage}
        scenes={renderScenes}
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
