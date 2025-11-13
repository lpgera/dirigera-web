import React from "react";
import "./Switch.css";

export interface SwitchProps {
  /** Whether the switch is checked */
  checked?: boolean | undefined;
  /** Callback when switch state changes */
  onChange?: (checked: boolean) => void | undefined;
  /** Disable the switch */
  disabled?: boolean | undefined;
  /** Additional CSS class name */
  className?: string | undefined;
  /** Label text to display above the switch */
  label?: string | undefined;
}

export function Switch({
  checked = false,
  onChange,
  disabled = false,
  className = "",
  label,
}: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const classes = ["switch", disabled && "switch-disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="switch-container">
      {label && (
        <div className="switch-label-row">
          <label className="switch-label">{label}</label>
        </div>
      )}
      <label className={classes}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="switch-input"
        />
        <span className="switch-slider" />
      </label>
    </div>
  );
}
