import { Switch } from "@/components/ui/Switch";
import { DeviceImage } from "@/features/devices";
import { DeviceImageGlow } from "@/features/devices/components/ui/DeviceImageGlow";
import "./CompactDeviceControlUI.css";

export interface CompactDeviceControlUIProps {
  name: string;
  imagePath: string | undefined;
  isOn: boolean;
  isReachable: boolean;
  lightLevel: number;
  lightColor: string;
  showGlow: boolean;
  lightLevelControl?: React.ReactNode;
  colorControl?: React.ReactNode;
  onOffControl?: React.ReactNode;
}

export function CompactDeviceControlUI({
  name,
  imagePath,
  isOn,
  isReachable,
  lightLevel,
  lightColor,
  showGlow,
  lightLevelControl,
  colorControl,
  onOffControl,
}: CompactDeviceControlUIProps) {
  return (
    <div className="compact-device-control-wrapper">
      <DeviceImageGlow
        showGlow={showGlow}
        color={lightColor}
        percentage={lightLevel}
        orientation="horizontal"
      />
      <div className="compact-device-control">
        <div className="compact-device-control-image">
          <DeviceImage
            imagePath={imagePath}
            name={name}
            isOn={isOn}
            isReachable={isReachable}
            lightLevel={lightLevel}
            lightColor={lightColor}
            showGlow={false}
          />
        </div>
        <div className="compact-device-control-name">{name}</div>
        <div
          className="compact-device-control-toggle"
          onClick={(e) => e.stopPropagation()}
        >
          {onOffControl}
        </div>
      </div>
    </div>
  );
}
