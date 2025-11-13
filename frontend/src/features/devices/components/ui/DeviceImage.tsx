import { BulbOutlined } from "@ant-design/icons";
import "./DeviceImage.css";

export interface DeviceImageProps {
  imagePath?: string | undefined;
  name: string;
  isReachable?: boolean;
  lightLevel?: number;
  lightColor?: string;
}

export function DeviceImage({
  imagePath,
  name,
  isReachable = true,
  lightLevel,
  lightColor,
}: DeviceImageProps) {
  return (
    <div className="device-image-wrapper">
      <div className="device-image-border">
        <div
          className="device-image-border-inner"
          style={{
            backgroundColor: lightColor,
            opacity: lightLevel !== undefined ? lightLevel / 100 : 1,
            height: `${lightLevel !== undefined ? lightLevel : 0}%`,
          }}
        />
      </div>
      <div className="device-image-container">
        {imagePath ? (
          <img
            src={imagePath}
            alt={name}
            className={`device-image ${!isReachable ? "device-image-unreachable" : ""}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className={`device-icon ${!isReachable ? "device-icon-unreachable" : ""}`}
            style={{ color: lightColor }}
          >
            <BulbOutlined style={{ fontSize: 24 }} />
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
