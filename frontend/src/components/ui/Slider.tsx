import React, { useState } from "react";
import "./Slider.css";

export interface SliderProps {
  value?: number | undefined;
  defaultValue?: number | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  disabled?: boolean | undefined;
  onChange?: ((value: number) => void) | undefined;
  onChangeComplete?: ((value: number) => void) | undefined;
  className?: string | undefined;
  marks?: Record<number, string | React.ReactNode> | undefined;
  tooltip?: boolean | undefined;
}

export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  onChangeComplete,
  className = "",
  marks,
  tooltip = false,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [showTooltip, setShowTooltip] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (value === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleMouseUp = () => {
    setShowTooltip(false);
    if (onChangeComplete) {
      onChangeComplete(currentValue);
    }
  };

  const handleMouseDown = () => {
    if (tooltip) {
      setShowTooltip(true);
    }
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const classes = ["slider-container", disabled && "slider-disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="slider-wrapper">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchStart={handleMouseDown}
          disabled={disabled}
          className="slider-input"
          style={{
            background: `linear-gradient(to right, var(--color-primary, #1677ff) 0%, var(--color-primary, #1677ff) ${percentage}%, var(--color-border, #f0f0f0) ${percentage}%, var(--color-border, #f0f0f0) 100%)`,
          }}
        />
        {tooltip && showTooltip && (
          <div
            className="slider-tooltip"
            style={{ left: `${percentage}%` }}
          >
            {currentValue}
          </div>
        )}
      </div>
      {marks && (
        <div className="slider-marks">
          {Object.entries(marks).map(([markValue, label]) => {
            const markPercentage =
              ((Number(markValue) - min) / (max - min)) * 100;
            return (
              <div
                key={markValue}
                className="slider-mark"
                style={{ left: `${markPercentage}%` }}
              >
                <span className="slider-mark-text">{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
