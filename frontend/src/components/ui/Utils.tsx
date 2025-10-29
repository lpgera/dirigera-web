import React, { HTMLAttributes } from "react";
import "./Utils.css";

export function Divider({
  className = "",
  style,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return <hr className={`divider ${className}`} style={style} {...props} />;
}

interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  size?: "small" | "middle" | "large";
}

export function Space({
  direction = "horizontal",
  size = "middle",
  children,
  className = "",
  style = {},
  ...props
}: SpaceProps) {
  const classes = [
    "space",
    `space-${direction}`,
    size !== "middle" && `space-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const spaceStyle =
    typeof style === "object" && "width" in style ? style : { ...style };

  return (
    <div className={classes} style={spaceStyle} {...props}>
      {children}
    </div>
  );
}

interface SkeletonProps {
  active?: boolean;
  paragraph?: { rows?: number };
}

export function Skeleton({
  active = false,
  paragraph = { rows: 3 },
}: SkeletonProps) {
  const rows = paragraph.rows || 3;

  return (
    <div className={active ? "skeleton-paragraph" : ""}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton skeleton-line" />
      ))}
    </div>
  );
}

interface ResultProps {
  status: "error" | "success" | "warning" | "info" | "403" | "404" | "500";
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}

export function Result({ status, title, subTitle, extra }: ResultProps) {
  const getIcon = () => {
    const iconMap: Record<string, string> = {
      error: "⚠️",
      success: "✓",
      warning: "⚠",
      info: "ℹ",
      "403": "🔒",
      "404": "❌",
      "500": "💥",
    };
    return iconMap[status] || "ℹ";
  };

  const statusClass =
    status === "403" || status === "404" || status === "500" ? "error" : status;

  return (
    <div className="result">
      <div className={`result-icon result-icon-${statusClass}`}>
        {getIcon()}
      </div>
      {title && <div className="result-title">{title}</div>}
      {subTitle && <div className="result-subtitle">{subTitle}</div>}
      {extra && <div className="result-extra">{extra}</div>}
    </div>
  );
}
