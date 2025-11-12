import React, { FormHTMLAttributes } from "react";
import "./Form.css";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Form layout direction */
  layout?: "vertical" | "horizontal" | "inline";
}

export function Form({
  layout = "vertical",
  className = "",
  children,
  ...props
}: FormProps) {
  const classes = ["form", `form-${layout}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <form className={classes} {...props}>
      {children}
    </form>
  );
}

interface FormItemProps {
  /** Label text for the form item */
  label?: React.ReactNode;
  /** Error message to display */
  error?: string;
  /** Form control element */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

export function FormItem({
  label,
  error,
  children,
  className = "",
}: FormItemProps) {
  return (
    <div className={`form-item ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="form-control">{children}</div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
