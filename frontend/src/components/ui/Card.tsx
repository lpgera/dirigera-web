import React, { HTMLAttributes, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import "./Card.css";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Card title */
  title?: React.ReactNode;
  /** Extra content (e.g., actions) displayed in the card header */
  extra?: React.ReactNode;
  /** Whether the card is collapsible */
  collapsible?: boolean;
  /** Initial collapsed state (only used when collapsible is true) */
  defaultCollapsed?: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export function Card({
  title,
  extra,
  children,
  className = "",
  collapsible = false,
  defaultCollapsed = false,
  onCollapseChange,
  ...props
}: CardProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleHeaderClick = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
      onCollapseChange?.(!isCollapsed);
    }
  };

  return (
    <div className={`card ${className}`} {...props}>
      {(title || extra) && (
        <div
          className={`card-header ${collapsible ? "card-header-collapsible" : ""}`}
          onClick={handleHeaderClick}
          role={collapsible ? "button" : undefined}
          aria-expanded={collapsible ? !isCollapsed : undefined}
          tabIndex={collapsible ? 0 : undefined}
          onKeyDown={
            collapsible
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleHeaderClick();
                  }
                }
              : undefined
          }
        >
          {title && <h3 className="card-title">{title}</h3>}
          <div className="card-header-right">
            {extra && <div className="card-extra">{extra}</div>}
            {collapsible && (
              <MdExpandMore
                className={`card-chevron ${isCollapsed ? "card-chevron-collapsed" : ""}`}
                size={20}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      )}
      {!isCollapsed && <div className="card-body">{children}</div>}
    </div>
  );
}
