import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";
import "./ColorControl.css";

export interface ColorControlProps {
  colorHue?: number | undefined;
  colorSaturation?: number | undefined;
  colorTemperature?: number | undefined;
  isReachable: boolean;
  onColorHueSaturationChange?:
    | ((colorHue: number, colorSaturation: number) => void)
    | undefined;
  onColorTemperatureChange?: ((colorTemperature: number) => void) | undefined;
  loading?: boolean;
}

export function ColorControl({
  colorHue,
  colorSaturation,
  colorTemperature,
  isReachable,
  onColorHueSaturationChange,
  onColorTemperatureChange,
  loading = false,
}: ColorControlProps) {
  const hasColorControls =
    colorHue !== undefined && colorSaturation !== undefined;
  const hasTemperatureControl = colorTemperature !== undefined;

  // Default to Color tab if available, otherwise Temperature
  const [activeTab, setActiveTab] = useState<"color" | "temperature">(
    hasColorControls ? "color" : "temperature"
  );

  const [localHue, setLocalHue] = useState(colorHue ?? 0);
  const [localSaturation, setLocalSaturation] = useState(colorSaturation ?? 0);
  const [localTemperature, setLocalTemperature] = useState(
    colorTemperature ?? 2700
  );

  useEffect(() => {
    if (colorHue !== undefined) setLocalHue(colorHue);
  }, [colorHue]);

  useEffect(() => {
    if (colorSaturation !== undefined) setLocalSaturation(colorSaturation);
  }, [colorSaturation]);

  useEffect(() => {
    if (colorTemperature !== undefined) setLocalTemperature(colorTemperature);
  }, [colorTemperature]);

  // Convert HSV to RGB for color preview
  const hsvToRgb = (h: number, s: number): string => {
    const hNorm = h / 360;
    const sNorm = s;
    const v = 1;

    const c = v * sNorm;
    const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1));
    const m = v - c;

    let r = 0,
      g = 0,
      b = 0;
    if (hNorm < 1 / 6) {
      [r, g, b] = [c, x, 0];
    } else if (hNorm < 2 / 6) {
      [r, g, b] = [x, c, 0];
    } else if (hNorm < 3 / 6) {
      [r, g, b] = [0, c, x];
    } else if (hNorm < 4 / 6) {
      [r, g, b] = [0, x, c];
    } else if (hNorm < 5 / 6) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }

    const toHex = (n: number) =>
      Math.round((n + m) * 255)
        .toString(16)
        .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const currentColor = hsvToRgb(localHue, localSaturation);

  // Only show tabs if both controls are available
  const showTabs = hasColorControls && hasTemperatureControl;

  return (
    <div className="color-control">
      {showTabs && (
        <div className="color-control-tabs">
          <button
            className={`color-control-tab ${activeTab === "color" ? "active" : ""}`}
            onClick={() => setActiveTab("color")}
            disabled={!hasColorControls}
          >
            Color
          </button>
          <button
            className={`color-control-tab ${activeTab === "temperature" ? "active" : ""}`}
            onClick={() => setActiveTab("temperature")}
            disabled={!hasTemperatureControl}
          >
            Temperature
          </button>
        </div>
      )}

      {activeTab === "color" && hasColorControls && (
        <div className="color-control-content">
          {/* Hue Control with Color Preview */}
          <div className="color-control-row">
            <div className="color-control-label-row">
              <label className="color-control-label">Hue</label>
              <div
                className="color-control-preview"
                style={{ backgroundColor: currentColor }}
              />
            </div>
            <div className="color-control-slider-wrapper">
              <div
                className="color-control-slider-track"
                style={{
                  background:
                    "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                }}
              >
                <Slider
                  min={0}
                  max={359}
                  value={localHue}
                  disabled={!isReachable || loading}
                  onChange={setLocalHue}
                  onChangeComplete={(value) =>
                    onColorHueSaturationChange?.(value, localSaturation)
                  }
                  className="color-control-slider"
                />
              </div>
            </div>
          </div>

          {/* Saturation Control */}
          <div className="color-control-row">
            <div className="color-control-label-row">
              <label className="color-control-label">Saturation</label>
              <span className="color-control-value">
                {Math.round(localSaturation * 100)}%
              </span>
            </div>
            <div className="color-control-slider-wrapper">
              <div
                className="color-control-slider-track"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${localHue}, 0%, 50%), 
                    hsl(${localHue}, 100%, 50%))`,
                }}
              >
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={localSaturation}
                  disabled={!isReachable || loading}
                  onChange={setLocalSaturation}
                  onChangeComplete={(value) =>
                    onColorHueSaturationChange?.(localHue, value)
                  }
                  className="color-control-slider"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "temperature" && hasTemperatureControl && (
        <div className="color-control-content">
          <div className="color-control-row">
            <div className="color-control-label-row">
              <label className="color-control-label">Temperature</label>
            </div>
            <div className="color-control-slider-wrapper">
              <div
                className="color-control-slider-track"
                style={{
                  background:
                    "linear-gradient(to right, #ffa500, #ffffff, #87ceeb)",
                }}
              >
                <Slider
                  min={2202}
                  max={4000}
                  value={localTemperature}
                  disabled={!isReachable || loading}
                  onChange={setLocalTemperature}
                  onChangeComplete={onColorTemperatureChange}
                  className="color-control-slider"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
