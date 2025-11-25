import { MdLightbulbOutline } from "react-icons/md";
import { DeviceImageGlow } from "./DeviceImageGlow";
import "./DeviceImage.css";

export interface DeviceImageProps {
  imagePath?: string | undefined;
  name: string;
  isOn?: boolean;
  isReachable?: boolean;
  lightLevel?: number;
  lightColor?: string;
  showGlow?: boolean;
}

export function DeviceImage({
  imagePath,
  name,
  isOn,
  isReachable = true,
  lightLevel,
  lightColor = "#ffffff",
  showGlow = true,
}: DeviceImageProps) {
  const localLightLevel = 20 + (lightLevel ?? 0) * 0.8;
  const shouldShowGlow =
    showGlow && !!(lightColor && lightLevel && isOn && isReachable);

  return (
    <div className="device-image-wrapper">
      {showGlow && (
        <DeviceImageGlow
          showGlow={shouldShowGlow}
          color={lightColor}
          percentage={localLightLevel}
          orientation="horizontal"
        />
      )}
      <div className="device-image-container">
        {imagePath ? (
          <img
            src={imagePath}
            alt={name}
            className={`device-image ${!isReachable || !isOn ? "device-image-unreachable" : ""}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className={`device-icon ${!isReachable ? "device-icon-unreachable" : ""}`}
            style={{
              color: isOn ? lightColor : "var(--device-icon-off-color)",
            }}
          >
            <MdLightbulbOutline style={{ fontSize: 24 }} />
          </div>
        )}
        {isReachable === false && (
          <div className="device-unreachable-overlay">
            <div className="device-unreachable-slash" />
          </div>
        )}
      </div>
    </div>
  );
}
