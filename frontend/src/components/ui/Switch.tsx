import React from "react";
import "./Switch.css";

export interface SwitchProps {
  checked?: boolean | undefined;
  onChange?: (checked: boolean) => void | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}

export function Switch({
  checked = false,
  onChange,
  disabled = false,
  className = "",
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
  );
}
