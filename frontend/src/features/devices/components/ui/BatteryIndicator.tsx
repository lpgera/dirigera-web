import React, { useState } from "react";
import {
  MdOutlineBattery0Bar,
  MdOutlineBattery1Bar,
  MdOutlineBattery2Bar,
  MdOutlineBattery3Bar,
  MdOutlineBattery4Bar,
  MdOutlineBattery5Bar,
  MdOutlineBattery6Bar,
  MdOutlineBatteryFull,
  MdOutlineBatteryUnknown,
} from "react-icons/md";
import { Button, Modal } from "@/components/ui";
import "./BatteryIndicator.css";

export interface BatteryIndicatorProps {
  batteryPercentage: number | null | undefined;
  name?: string | undefined;
}

export function BatteryIndicator({
  batteryPercentage,
  name,
}: BatteryIndicatorProps) {
  const [open, setOpen] = useState(false);

  if (batteryPercentage === null || batteryPercentage === undefined) {
    return null;
  }

  const pct = batteryPercentage;
  let icon: React.ReactNode;
  let color: string;

  if (pct === -1) {
    icon = <MdOutlineBatteryUnknown />;
    color = "#bfbfbf";
  } else if (pct <= 10) {
    icon = <MdOutlineBattery0Bar />;
    color = "#ff4d4f";
  } else if (pct <= 25) {
    icon = <MdOutlineBattery1Bar />;
    color = "#ff7a45";
  } else if (pct <= 40) {
    icon = <MdOutlineBattery2Bar />;
    color = "#ffa940";
  } else if (pct <= 55) {
    icon = <MdOutlineBattery3Bar />;
    color = "#ffd666";
  } else if (pct <= 70) {
    icon = <MdOutlineBattery4Bar />;
    color = "#bae637";
  } else if (pct <= 85) {
    icon = <MdOutlineBattery5Bar />;
    color = "#73d13d";
  } else if (pct <= 99) {
    icon = <MdOutlineBattery6Bar />;
    color = "#52c41a";
  } else {
    icon = <MdOutlineBatteryFull />;
    color = "#389e0d";
  }

  const iconWithColor = (
    <span style={{ color, fontSize: "20px", display: "flex" }}>{icon}</span>
  );

  return (
    <>
      <Button
        shape="circle"
        icon={iconWithColor}
        onClick={() => setOpen(true)}
        className="battery-indicator-button"
        aria-label={
          name
            ? `${name} Battery: ${batteryPercentage}%`
            : `Battery: ${batteryPercentage}%`
        }
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={name ? `${name} Battery Info` : "Battery Info"}
      >
        <div className="battery-modal-icon">{iconWithColor}</div>
        <div className="battery-modal-content">
          {name && <div className="battery-modal-name">{name}</div>}
          <div className="battery-modal-percentage">
            Battery:{" "}
            {batteryPercentage === -1 ? "Unknown" : `${batteryPercentage}%`}
          </div>
        </div>
      </Modal>
    </>
  );
}
