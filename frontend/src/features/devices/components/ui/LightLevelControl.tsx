import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";
import "./LightLevelControl.css";

export interface LightLevelControlProps {
  lightLevel: number;
  isReachable: boolean;
  disabled?: boolean | undefined;
  onChange: (lightLevel: number) => void;
  loading?: boolean | undefined;
}

export function LightLevelControl({
  lightLevel,
  isReachable,
  disabled = false,
  onChange,
  loading = false,
}: LightLevelControlProps) {
  return (
    <div className="light-level-control">
      <div className="light-level-control-header">
        <label className="light-level-control-label">Light Level</label>
        <span className="light-level-control-value">{lightLevel}%</span>
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
            value={lightLevel}
            disabled={!isReachable || loading || disabled}
            onChange={onChange}
            onChangeComplete={onChange}
            className="light-level-control-slider"
            tooltip={false}
          />
        </div>
      </div>
    </div>
  );
}
