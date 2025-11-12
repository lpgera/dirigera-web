import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import "./Modal.css";

export interface ModalProps {
  /** Whether the modal is visible */
  open?: boolean | undefined;
  /** Callback when cancel button or close action is triggered */
  onCancel?: (() => void) | undefined;
  /** Callback when OK button is clicked */
  onOk?: (() => void) | undefined;
  /** Modal title */
  title?: React.ReactNode | undefined;
  /** Footer content - pass null to hide footer */
  footer?: React.ReactNode | null | undefined;
  /** Modal body content */
  children?: React.ReactNode | undefined;
  /** Modal width in pixels or CSS string */
  width?: number | string | undefined;
  /** Additional CSS class name */
  className?: string | undefined;
}

export function Modal({
  open = false,
  onCancel,
  onOk,
  title,
  footer,
  children,
  width = 520,
  className = "",
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && onCancel) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onCancel]);

  if (!open) {
    return null;
  }

  const modalContent = (
    <div className="modal-root">
      <div className="modal-overlay" onClick={onCancel} />
      <div className="modal-wrap">
        <div
          className={`modal ${className}`}
          style={{ width: typeof width === "number" ? `${width}px` : width }}
        >
          {title && (
            <div className="modal-header">
              <div className="modal-title">{title}</div>
              <button
                className="modal-close"
                onClick={onCancel}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          )}
          <div className="modal-body">{children}</div>
          {footer !== null && (
            <div className="modal-footer">
              {footer !== undefined ? (
                footer
              ) : (
                <>
                  <Button onClick={onCancel}>Cancel</Button>
                  <Button variant="primary" onClick={onOk}>
                    OK
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
