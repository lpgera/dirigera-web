import { useState, useEffect, useRef } from "react";
import { Row, Col } from "@/components/ui";
import { useBreakpoint } from "@/components/ui";
import { FloorTabsUI } from "../ui/FloorTabsUI";
import { useFloors } from "@/hooks";
import Scenes from "@/components/Scenes";
import { RoomCard } from "./RoomCard";
import type { Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";
import type { Floor } from "@/hooks";

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

  const renderFloorContent = (floor: Floor) => {
    const floorData = groupedRooms.get(floor.id);
    const floorRooms = floorData?.rooms || [];

    return (
      <>
        <Scenes scope="floor" scopeId={floor.id} />

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {floorRooms.map((room) => (
            <Col key={room.id} {...columnSizes}>
              <RoomCard room={room} />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  return (
    <FloorTabsUI
      floors={floors}
      isDesktop={!!isDesktop}
      activeFloorId={activeFloorId}
      onFloorClick={handleFloorClick}
      onFloorRefChange={handleFloorRefChange}
      renderFloorContent={renderFloorContent}
    />
  );
}
