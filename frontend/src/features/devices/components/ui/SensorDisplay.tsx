import "./SensorDisplay.css";

export interface SensorDisplayProps {
  temperature?: number | null | undefined;
  humidity?: number | null | undefined;
  pm25?: number | null | undefined;
  vocIndex?: number | null | undefined;
}

export function SensorDisplay({
  temperature,
  humidity,
  pm25,
  vocIndex,
}: SensorDisplayProps) {
  const hasSensors =
    temperature != null || humidity != null || pm25 != null || vocIndex != null;

  if (!hasSensors) {
    return null;
  }

  return (
    <div className="sensor-display">
      {temperature != null && (
        <div className="sensor-display-item">
          <span className="sensor-display-label">Temperature</span>
          <span className="sensor-display-value">{temperature}°C</span>
        </div>
      )}
      {humidity != null && (
        <div className="sensor-display-item">
          <span className="sensor-display-label">Humidity</span>
          <span className="sensor-display-value">{humidity}%</span>
        </div>
      )}
      {pm25 != null && (
        <div className="sensor-display-item">
          <span className="sensor-display-label">PM2.5</span>
          <span className="sensor-display-value">{pm25} μg/m³</span>
        </div>
      )}
      {vocIndex != null && (
        <div className="sensor-display-item">
          <span className="sensor-display-label">tVOC Index</span>
          <span className="sensor-display-value">{vocIndex}</span>
        </div>
      )}
    </div>
  );
}
