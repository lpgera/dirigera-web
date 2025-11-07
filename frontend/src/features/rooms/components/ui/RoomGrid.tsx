import React from "react";
import { Row, Col } from "@/components/ui";
import type { ColumnSizes } from "../../types";

interface RoomGridProps {
  children: React.ReactNode;
  columnSizes: ColumnSizes;
}

export function RoomGrid({ children, columnSizes }: RoomGridProps) {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      {React.Children.map(children, (child) => (
        <Col {...columnSizes}>{child}</Col>
      ))}
    </Row>
  );
}
