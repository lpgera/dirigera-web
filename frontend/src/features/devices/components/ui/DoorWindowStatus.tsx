import { UnlockOutlined, LockOutlined } from "@ant-design/icons";
import "./DoorWindowStatus.css";

export interface DoorWindowStatusProps {
  isOpen: boolean;
  label?: string;
}

export function DoorWindowStatus({
  isOpen,
  label = "Status",
}: DoorWindowStatusProps) {
  return (
    <div className="door-window-status">
      <span className="door-window-status-label">{label}</span>
      <div
        className={`door-window-status-indicator ${isOpen ? "door-window-status-indicator-open" : "door-window-status-indicator-closed"}`}
      >
        {isOpen ? <UnlockOutlined /> : <LockOutlined />}
        <span className="door-window-status-text">
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>
    </div>
  );
}
