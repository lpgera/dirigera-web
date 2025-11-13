import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";
import "./LightLevelControl.css";

export interface LightLevelControlProps {
  lightLevel: number;
  isReachable: boolean;
  onChange: (lightLevel: number) => void;
  loading?: boolean | undefined;
}

export function LightLevelControl({
  lightLevel,
  isReachable,
  onChange,
  loading = false,
}: LightLevelControlProps) {
  const [localValue, setLocalValue] = useState(lightLevel);

  useEffect(() => {
    setLocalValue(lightLevel);
  }, [lightLevel]);

  return (
    <div className="light-level-control">
      <div className="light-level-control-header">
        <label className="light-level-control-label">Light Level</label>
        <span className="light-level-control-value">{localValue}%</span>
      </div>
      <div className="light-level-control-slider-wrapper">
        <div
          className="light-level-control-slider-track"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1))",
          }}
        >
          <Slider
            min={1}
            max={100}
            value={localValue}
            disabled={!isReachable || loading}
            onChange={setLocalValue}
            onChangeComplete={onChange}
            className="light-level-control-slider"
            tooltip={false}
          />
        </div>
      </div>
    </div>
  );
}
