import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Space } from "@/components/ui";
import { FloorIcon } from "@/components/ui/FloorIcon";
import Scenes from "@/components/Scenes";
import { RoomCard } from "../containers/RoomCard";
import type { Floor } from "@/hooks";
import type { Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";
import "./FloorTabsUI.css";

interface FloorTabsUIProps {
  groupedRooms: Map<string, { floor: Floor | null; rooms: Room[] }>;
  floors: Floor[];
  isDesktop: boolean;
  columnSizes: ColumnSizes;
}

export function FloorTabsUI({
  groupedRooms,
  floors,
  isDesktop,
  columnSizes,
}: FloorTabsUIProps) {
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
  const floorRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const isScrollingToFloor = useRef(false);
  const HEADER_OFFSET = 146;

  useEffect(() => {
    if (floors && floors.length > 0 && !activeFloorId) {
      setActiveFloorId(floors[0].id);
    }
  }, [floors, activeFloorId]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingToFloor.current) return;

      const scrollPosition =
        window.scrollY + window.innerHeight / 3 + HEADER_OFFSET;

      for (const floor of floors) {
        const element = floorRefs.current.get(floor.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY - HEADER_OFFSET;

          if (
            absoluteTop <= scrollPosition &&
            absoluteTop + rect.height > scrollPosition
          ) {
            setActiveFloorId(floor.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [floors]);

  const scrollToFloor = (floorId: string) => {
    const element = floorRefs.current.get(floorId);
    if (element) {
      isScrollingToFloor.current = true;
      setActiveFloorId(floorId);

      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const target = Math.max(0, absoluteTop - HEADER_OFFSET);
      window.scrollTo({ top: target, behavior: "smooth" });

      setTimeout(() => {
        isScrollingToFloor.current = false;
      }, 1000);
    }
  };

  return (
    <div className="floor-tabs">
      <div className="floor-tabs-nav">
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          {floors.map((floor) => (
            <Button
              key={floor.id}
              variant={floor.id === activeFloorId ? "default" : "text"}
              onClick={() => scrollToFloor(floor.id)}
              block
              className="floor-tabs-nav-button"
            >
              <FloorIcon
                totalFloors={floors.length}
                floorOrder={floor.order}
                isActive={floor.id === activeFloorId}
                size={32}
              />
              <span>{floor.name}</span>
            </Button>
          ))}
        </Space>
      </div>

      <div className="floor-tabs-content">
        {floors.map((floor) => {
          const floorData = groupedRooms.get(floor.id);
          const floorRooms = floorData?.rooms || [];

          return (
            <div
              key={floor.id}
              ref={(el) => {
                if (el) {
                  floorRefs.current.set(floor.id, el);
                } else {
                  floorRefs.current.delete(floor.id);
                }
              }}
              className={`floor-section ${floor.id === activeFloorId ? "floor-section-active" : ""}`}
            >
              <h2 className="floor-section-title">
                <FloorIcon
                  totalFloors={floors.length}
                  floorOrder={floor.order}
                  isActive={floor.id === activeFloorId}
                  size={isDesktop ? 48 : 40}
                />
                {floor.name}
              </h2>

              <Scenes scope="floor" scopeId={floor.id} />

              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                {floorRooms.map((room) => (
                  <Col key={room.id} {...columnSizes}>
                    <RoomCard room={room} />
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </div>
    </div>
  );
}
