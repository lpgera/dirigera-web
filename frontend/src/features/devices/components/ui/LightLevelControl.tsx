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
      <Slider
        min={1}
        max={100}
        value={localValue}
        disabled={!isReachable || loading}
        onChange={setLocalValue}
        onChangeComplete={onChange}
        tooltip={false}
      />
    </div>
  );
}
