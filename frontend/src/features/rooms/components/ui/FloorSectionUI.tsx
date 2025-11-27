import React from "react";
import { FloorIcon } from "@/components/ui/FloorIcon";

import "./FloorSectionUI.css";
import { Col, Row, useBreakpoint } from "@/components/ui";

interface FloorSectionUIProps {
  floorId: string;
  floorName: string;
  floorOrder: number;
  totalFloors: number;
  isActive?: boolean;
  iconSize?: number;
  onRefChange?: (element: HTMLDivElement | null) => void;
  scenes: React.ReactNode;
  floorPlan?: React.ReactNode;
  rooms: ((defaultCollapsed: boolean) => React.ReactNode)[];
}

/**
 * Pure presentational component for displaying a floor section.
 * Contains a header with floor icon and name, plus content area for rooms.
 */
export function FloorSectionUI({
  floorId,
  floorName,
  floorOrder,
  totalFloors,
  isActive = false,
  iconSize = 48,
  onRefChange,
  scenes,
  floorPlan,
  rooms,
}: FloorSectionUIProps) {
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint.xs || breakpoint.sm;
  const isTablet = breakpoint.md;
  const isDesktopLg = breakpoint.lg;
  const isDesktopXl = breakpoint.xl;
  const isDesktopXxl = breakpoint.xxl;

  const defaultCollapsedMobile = rooms.length > 3;
  const defaultCollapsedTablet = rooms.length > 4;

  return (
    <div
      ref={onRefChange}
      className={`floor-section ${isActive ? "floor-section-active" : ""}`}
      data-floor-id={floorId}
    >
      <h2 className="floor-section-title">
        <FloorIcon
          totalFloors={totalFloors}
          floorOrder={floorOrder}
          isActive={isActive}
          size={iconSize}
        />
        {floorName}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {scenes}
        <hr />
        {isMobile && (
          <>
            {floorPlan}
            <h3 className="floor-section-rooms-title">Rooms</h3>
            {rooms.map((room) => room(defaultCollapsedMobile))}
          </>
        )}
        {(isTablet || isDesktopLg) && (
          <>
            {(() => {
              // Calculate how many rooms go at the top:
              // 1-3: all at top, 4-6: 3 at top, 7-9: 6 at top, 10-12: 6 at top
              const roomsPerRow = isTablet ? 2 : 3;
              const topCount =
                rooms.length <= roomsPerRow
                  ? rooms.length
                  : rooms.length <= roomsPerRow * 2
                    ? roomsPerRow
                    : roomsPerRow * 2;
              const topRooms = rooms.slice(0, topCount);
              const bottomRooms = rooms.slice(topCount);

              return (
                <>
                  <Row gutter={16}>
                    {topRooms.map((room, index) => (
                      <Col span={24 / roomsPerRow} key={index}>
                        {room(defaultCollapsedTablet)}
                      </Col>
                    ))}
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>{floorPlan}</Col>
                  </Row>
                  {bottomRooms.length > 0 && (
                    <Row gutter={16}>
                      {bottomRooms.map((room, index) => (
                        <Col span={24 / roomsPerRow} key={topCount + index}>
                          {room(defaultCollapsedTablet)}
                        </Col>
                      ))}
                    </Row>
                  )}
                </>
              );
            })()}
          </>
        )}
        {isDesktopXl && (
          <>
            {(() => {
              // show floor plan in the middle and rooms left
              return (
                <Row gutter={16}>
                  <Col span={8}>
                    {rooms.map((room, index) => (
                      <div key={index} style={{ marginBottom: "16px" }}>
                        {room(false)}
                      </div>
                    ))}
                  </Col>
                  <Col span={16}>{floorPlan}</Col>
                </Row>
              );
            })()}
          </>
        )}
        {isDesktopXxl && (
          <>
            {(() => {
              // show floor plan in the middle and rooms left and right
              const roomsPerSide = Math.ceil(rooms.length / 2);
              const leftRooms = rooms.slice(0, roomsPerSide);
              const rightRooms = rooms.slice(roomsPerSide);
              return (
                <Row gutter={16}>
                  <Col span={8}>
                    {leftRooms.map((room, index) => (
                      <div key={index} style={{ marginBottom: "16px" }}>
                        {room(false)}
                      </div>
                    ))}
                  </Col>
                  <Col span={8}>{floorPlan}</Col>
                  <Col span={8}>
                    {rightRooms.map((room, index) => (
                      <div key={index} style={{ marginBottom: "16px" }}>
                        {room(false)}
                      </div>
                    ))}
                  </Col>
                </Row>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
}

// Export both names for backward compatibility during migration
export default FloorSectionUI;
