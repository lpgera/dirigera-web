import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { hsvToRgb } from "@/utils/deviceColor";
import "./ColorControl.css";

export interface ColorControlProps {
  colorHue?: number | undefined;
  colorSaturation?: number | undefined;
  colorTemperature?: number | undefined;
  isReachable: boolean;
  onColorHueChange?: ((colorHue: number) => void) | undefined;
  onColorSaturationChange?: ((colorSaturation: number) => void) | undefined;
  onColorTemperatureChange?: ((colorTemperature: number) => void) | undefined;
  onColorHueSaturationChangeComplete?:
    | ((colorHue: number, colorSaturation: number) => void)
    | undefined;
  onColorTemperatureChangeComplete?:
    | ((colorTemperature: number) => void)
    | undefined;
  loading?: boolean;
}

export function ColorControl({
  colorHue,
  colorSaturation,
  colorTemperature,
  isReachable,
  onColorHueChange,
  onColorSaturationChange,
  onColorTemperatureChange,
  onColorHueSaturationChangeComplete,
  onColorTemperatureChangeComplete,
  loading = false,
}: ColorControlProps) {
  const hasColorControls =
    colorHue !== undefined && colorSaturation !== undefined;
  const hasTemperatureControl = colorTemperature !== undefined;
  console.log(colorHue, colorSaturation);
  // Default to Color tab if available, otherwise Temperature
  const [activeTab, setActiveTab] = useState<"color" | "temperature">(
    hasColorControls ? "color" : "temperature"
  );
  console.log(activeTab, hasColorControls);

  useEffect(() => {
    setActiveTab(hasColorControls ? "color" : "temperature");
  }, [hasColorControls]);

  const currentColor = hsvToRgb(colorHue || 0, colorSaturation || 0);

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
                  value={colorHue}
                  disabled={!isReachable || loading}
                  onChange={onColorHueChange}
                  onChangeComplete={(value) =>
                    onColorHueSaturationChangeComplete?.(value, colorSaturation)
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
                {Math.round(colorSaturation * 100)}%
              </span>
            </div>
            <div className="color-control-slider-wrapper">
              <div
                className="color-control-slider-track"
                style={{
                  background: `linear-gradient(to right, 
                    #fff, 
                    hsl(${colorHue}, 100%, 50%))`,
                }}
              >
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={colorSaturation}
                  disabled={!isReachable || loading}
                  onChange={onColorSaturationChange}
                  onChangeComplete={(value) =>
                    onColorHueSaturationChangeComplete?.(colorHue, value)
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
                  value={colorTemperature}
                  disabled={!isReachable || loading}
                  onChange={onColorTemperatureChange}
                  onChangeComplete={onColorTemperatureChangeComplete}
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
