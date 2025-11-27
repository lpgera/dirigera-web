import React, { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual style variant */
  variant?: "primary" | "default" | "text" | undefined;
  /** Button shape - use 'circle' for icon-only buttons */
  shape?: "default" | "circle" | "square" | undefined;
  /** Make button full width */
  block?: boolean | undefined;
  /** Icon to display in the button */
  icon?: React.ReactNode | undefined;
  /** Show loading spinner */
  loading?: boolean | undefined;
  style?: React.CSSProperties | undefined;
}

export function Button({
  variant = "default",
  shape = "default",
  block = false,
  icon,
  loading = false,
  children,
  className = "",
  disabled,
  style,
  ...props
}: ButtonProps) {
  const classes = [
    "button",
    `button-${variant}`,
    shape === "circle" && "button-circle",
    shape === "square" && "button-square",
    block && "button-block",
    loading && "button-loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      style={style}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="button-loading-overlay">
          <span className="button-loading-spinner" />
        </span>
      )}
      <span className="button-content" style={{ opacity: loading ? 0.5 : 1 }}>
        {icon}
        {children && <span>{children}</span>}
      </span>
    </button>
  );
}
