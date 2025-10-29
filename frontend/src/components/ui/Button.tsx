import React, { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default" | "text";
  shape?: "default" | "circle";
  block?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
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
