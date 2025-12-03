import React, { useState, useMemo, useCallback } from "react";
import { useMutation } from "@apollo/client/react";
import { CompactRoomCardUI } from "../ui/CompactRoomCardUI";
import { Scenes } from "@/features/scenes";
import { DeviceControl } from "@/features/devices";
import { SET_IS_ON_MUTATION } from "@/features/devices/api/devicesApi";
import { useRoomConfig } from "@/hooks";
import { Modal } from "@/components/ui";
import type { Room, Device, ControlType } from "@/graphql.types";
import type {
  SetIsOnMutation,
  SetIsOnMutationVariables,
} from "@/components/deviceControls/IsOn.types.gen";

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
  const [toggleLoading, setToggleLoading] = useState(false);
  const { getRoomIcon } = useRoomConfig();

  const [setIsOn] = useMutation<SetIsOnMutation, SetIsOnMutationVariables>(
    SET_IS_ON_MUTATION
  );

  // Get toggleable devices (have isOn property)
  const toggleableDevices = useMemo(
    () =>
      room.devices.filter(
        (device) =>
          device.isOn !== null &&
          device.isOn !== undefined &&
          (device.batteryPercentage === null ||
            device.batteryPercentage === undefined)
      ),
    [room.devices]
  );

  const handleToggleAllLamps = useCallback(
    async (isOn: boolean) => {
      setToggleLoading(true);
      try {
        await Promise.all(
          toggleableDevices
            .filter((device) => device.isReachable)
            .map((device) =>
              setIsOn({
                variables: {
                  id: device.id,
                  type: device.type as ControlType,
                  isOn,
                },
              })
            )
        );
      } finally {
        setToggleLoading(false);
      }
    },
    [toggleableDevices, setIsOn]
  );

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
        onToggleAllLamps={handleToggleAllLamps}
        toggleAllLampsLoading={toggleLoading}
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
