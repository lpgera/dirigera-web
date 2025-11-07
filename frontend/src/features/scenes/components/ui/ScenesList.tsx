import React, { ReactNode } from "react";
import { Row } from "@/components/ui";
import "./ScenesList.css";

interface ScenesListProps {
  title?: string | undefined;
  children: ReactNode;
}

export function ScenesList({ title, children }: ScenesListProps) {
  return (
    <>
      {title && <h3 className="scenes-list-title">{title}</h3>}
      <Row gutter={[8, 8]} className="scenes-list">
        {children}
      </Row>
    </>
  );
}
