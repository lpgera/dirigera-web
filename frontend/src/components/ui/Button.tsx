import React, { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual style variant */
  variant?: "primary" | "default" | "text" | undefined;
  /** Button shape - use 'circle' for icon-only buttons */
  shape?: "default" | "circle" | undefined;
  /** Make button full width */
  block?: boolean | undefined;
  /** Icon to display in the button */
  icon?: React.ReactNode | undefined;
  /** Show loading spinner */
  loading?: boolean | undefined;
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
  ...props
}: ButtonProps) {
  const classes = [
    "button",
    `button-${variant}`,
    shape === "circle" && "button-circle",
    block && "button-block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? "..." : icon}
      {children && <span>{children}</span>}
    </button>
  );
}
