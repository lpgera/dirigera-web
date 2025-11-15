import { useState, useEffect, useRef, useCallback } from "react";
import { Row, Col, useBreakpoint } from "@/components/ui";
import { FloorTabsUI } from "../ui/FloorTabsUI";
import { useFloors } from "@/hooks";
import { Scenes } from "@/features/scenes";
import { CompactRoomCard } from "./CompactRoomCard";
import type { Device, Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";
import { FloorPlanRenderer } from "@jesperkihlberg/floor-plan";

// Import types
import type { FloorPlanConfig } from "@jesperkihlberg/floor-plan";

// Import config
import floorsConfig from "@jesperkihlberg/floor-plan/floors-config.json";

interface FloorTabsProps {
  rooms: Room[];
  columnSizes: ColumnSizes;
}

const HEADER_OFFSET = 146;

export function FloorTabs({ rooms, columnSizes }: FloorTabsProps) {
  const screens = useBreakpoint();
  const { groupRoomsByFloor, floors } = useFloors();
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
  const floorRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const isScrollingToFloor = useRef(false);

  const groupedRooms = groupRoomsByFloor(rooms);
  const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

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

  const handleFloorClick = (floorId: string) => {
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

  const handleFloorRefChange = (floorId: string, el: HTMLDivElement | null) => {
    if (el) {
      floorRefs.current.set(floorId, el);
    } else {
      floorRefs.current.delete(floorId);
    }
  };

  const handleDeviceClick = useCallback((device: Device) => {
    console.log("Device clicked:", device.name);
  }, []);

  return (
    <FloorTabsUI
      floors={floors}
      activeFloorId={activeFloorId}
      iconSize={isDesktop ? 48 : 40}
      onFloorClick={handleFloorClick}
      onFloorRefChange={handleFloorRefChange}
    >
      {(floor) => {
        const floorData = groupedRooms.get(floor.id);
        const floorRooms = floorData?.rooms || [];

        return (
          <>
            <Scenes scope="floor" scopeId={floor.id} />
            <FloorPlanRenderer
              config={floorsConfig.floors[0] as FloorPlanConfig}
              scale={0.8}
            />

            <Row gutter={[16, 16]}>
              {floorRooms.map((room) => (
                <Col key={room.id} {...columnSizes}>
                  <CompactRoomCard
                    room={room}
                    onDeviceClick={handleDeviceClick}
                    scenes={<Scenes scope="room" scopeId={room.id} />}
                  />
                </Col>
              ))}
            </Row>
          </>
        );
      }}
    </FloorTabsUI>
  );
}
