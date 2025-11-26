import React, { ReactNode, useRef, useState, useEffect } from "react";
import { Row } from "@/components/ui";
import "./ScenesList.css";

interface ScenesListProps {
  title?: string | undefined;
  children: ReactNode;
  wrapScenes?: boolean | undefined;
}

export function ScenesList({
  title,
  children,
  wrapScenes = true,
}: ScenesListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!wrapScenes && scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
      };

      const handleMouseLeave = () => {
        setIsDragging(false);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [wrapScenes, isDragging, startX, scrollLeft]);

  if (!wrapScenes) {
    return (
      <>
        {title && <h3 className="scenes-list-title">{title}</h3>}
        <div
          ref={scrollContainerRef}
          className={`scenes-list-horizontal-container ${isDragging ? "dragging" : ""}`}
        >
          <Row className="scenes-list-horizontal">{children}</Row>
        </div>
      </>
    );
  }

  return (
    <>
      {title && <h3 className="scenes-list-title">{title}</h3>}
      <Row>{children}</Row>
    </>
  );
}
