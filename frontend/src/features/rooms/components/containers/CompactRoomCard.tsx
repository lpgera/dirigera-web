import React, { useState, useMemo } from "react";
import { CompactRoomCardUI } from "../ui/CompactRoomCardUI";
import { Scenes } from "@/features/scenes";
import { DeviceControl } from "@/features/devices";
import { useRoomConfig } from "@/hooks";
import { Modal } from "@/components/ui";
import type { Room, Device } from "@/graphql.types";

interface CompactRoomCardProps {
  room: Room;
  onDeviceClick?: (device: Device) => void;
  scenes?: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function CompactRoomCard({
  room,
  onDeviceClick,
  scenes,
  defaultCollapsed = false,
}: CompactRoomCardProps) {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const { getRoomIcon } = useRoomConfig();

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    if (onDeviceClick) {
      onDeviceClick(device);
    }
  };

  const renderScenes = scenes ?? <Scenes scope="room" scopeId={room.id} />;
  const roomIcon = getRoomIcon(room.id);

  return (
    <>
      <CompactRoomCardUI
        roomName={room.name}
        roomIcon={roomIcon}
        devices={room.devices}
        scenes={renderScenes}
        onDeviceClick={handleDeviceClick}
        defaultCollapsed={defaultCollapsed}
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
