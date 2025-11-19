import { MdLightbulbOutline } from "react-icons/md";
import "./DeviceImage.css";

export interface DeviceImageProps {
  imagePath?: string | undefined;
  name: string;
  isOn?: boolean;
  isReachable?: boolean;
  lightLevel?: number;
  lightColor?: string;
}

export function DeviceImage({
  imagePath,
  name,
  isOn,
  isReachable = true,
  lightLevel,
  lightColor = "#ffffff",
}: DeviceImageProps) {
  const localLightLevel = 20 + (lightLevel ?? 0) * 0.8;
  return (
    <div className="device-image-wrapper">
      <div
        className="device-image-glow"
        style={{
          boxShadow:
            lightColor && lightLevel && isOn && isReachable
              ? `0 0 10px ${lightColor}, 0 0 20px ${lightColor}, 0 0 30px ${lightColor}`
              : "none",
          backgroundColor: "transparent",
          borderTopLeftRadius:
            localLightLevel < 80
              ? 0
              : "calc(var(--device-image-border-radius) + var(--device-image-border-width))",
          borderTopRightRadius:
            localLightLevel < 80
              ? 0
              : "calc(var(--device-image-border-radius) + var(--device-image-border-width))",
          opacity:
            localLightLevel !== undefined
              ? (24 + (lightLevel ?? 0) * 0.6) / 100
              : 1,
          height: `calc((var(--device-image-size)  + var(--device-image-border-width) * 2 ) * ${localLightLevel !== undefined ? localLightLevel / 100 : 0})`,
        }}
      />
      <div className="device-image-border">
        {isOn && isReachable && (
          <div
            className="device-image-border-inner"
            style={{
              backgroundColor: lightColor,
              opacity:
                localLightLevel !== undefined
                  ? (40 + (lightLevel ?? 0) * 0.6) / 100
                  : 1,
              height: `${localLightLevel !== undefined ? Math.max(localLightLevel, 20) : 0}%`,
            }}
          />
        )}
      </div>
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
