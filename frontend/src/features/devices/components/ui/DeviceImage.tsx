import { BulbOutlined } from "@ant-design/icons";
import "./DeviceImage.css";

export interface DeviceImageProps {
  imagePath?: string | undefined;
  name: string;
  isReachable?: boolean;
}

export function DeviceImage({
  imagePath,
  name,
  isReachable = true,
}: DeviceImageProps) {
  return (
    <div className="device-image-wrapper">
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
  );
}
