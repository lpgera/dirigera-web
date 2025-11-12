import React, { AnchorHTMLAttributes, HTMLAttributes } from "react";
import "./Typography.css";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text color variant */
  type?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export function Text({ type, className = "", children, ...props }: TextProps) {
  const classes = ["typography-text", type && `text-${type}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link content */
  children?: React.ReactNode;
}

export function Link({ className = "", children, ...props }: LinkProps) {
  return (
    <a className={`typography-link ${className}`} {...props}>
      {children}
    </a>
  );
}

export const Typography = {
  Text,
  Link,
};
