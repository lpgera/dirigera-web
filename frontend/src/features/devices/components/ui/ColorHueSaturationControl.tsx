import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";
import "./ColorHueSaturationControl.css";

export interface ColorHueSaturationControlProps {
  colorHue: number;
  colorSaturation: number;
  isReachable: boolean;
  onChange: (colorHue: number, colorSaturation: number) => void;
  loading?: boolean;
}

export function ColorHueSaturationControl({
  colorHue,
  colorSaturation,
  isReachable,
  onChange,
  loading = false,
}: ColorHueSaturationControlProps) {
  const [localHue, setLocalHue] = useState(colorHue);
  const [localSaturation, setLocalSaturation] = useState(colorSaturation);

  useEffect(() => {
    setLocalHue(colorHue);
  }, [colorHue]);

  useEffect(() => {
    setLocalSaturation(colorSaturation);
  }, [colorSaturation]);

  return (
    <div className="color-hue-saturation-control">
      <div className="color-hue-saturation-control-section">
        <label className="color-hue-saturation-control-label">Hue</label>
        <Slider
          min={0}
          max={359}
          value={localHue}
          disabled={!isReachable || loading}
          onChange={setLocalHue}
          onChangeComplete={(value) => onChange(value, localSaturation)}
          tooltip={true}
        />
      </div>
      <div className="color-hue-saturation-control-section">
        <label className="color-hue-saturation-control-label">Saturation</label>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={localSaturation}
          disabled={!isReachable || loading}
          onChange={setLocalSaturation}
          onChangeComplete={(value) => onChange(localHue, value)}
          tooltip={true}
        />
      </div>
    </div>
  );
}
