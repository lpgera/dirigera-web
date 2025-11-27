import { useEffect, useCallback } from "react";
import { useBreakpoint } from "@/components/ui";
import { FloorTabsUI } from "../ui/FloorTabsUI";
import { useFloors } from "@/hooks";
import type { Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";
import FloorSection, { floorRefRegistry } from "./FloorSection";
import { useFloorNavigationStore } from "../../stores/floorNavigationStore";

interface FloorTabsProps {
  rooms: Room[];
  columnSizes: ColumnSizes;
}

const HEADER_OFFSET = 146;

export function FloorTabs({ rooms, columnSizes }: FloorTabsProps) {
  const screens = useBreakpoint();
  const { floors } = useFloors();

  const activeFloorId = useFloorNavigationStore((s) => s.activeFloorId);
  const isScrollingToFloor = useFloorNavigationStore(
    (s) => s.isScrollingToFloor
  );
  const setActiveFloorId = useFloorNavigationStore((s) => s.setActiveFloorId);
  const setIsScrollingToFloor = useFloorNavigationStore(
    (s) => s.setIsScrollingToFloor
  );
  const scrollToFloor = useFloorNavigationStore((s) => s.scrollToFloor);

  const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

  // Initialize active floor when floors are loaded
  useEffect(() => {
    if (floors && floors.length > 0 && !activeFloorId) {
      setActiveFloorId(floors[0].id);
    }
  }, [floors, activeFloorId, setActiveFloorId]);

  // Track scroll position to update active floor
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingToFloor) return;

      const scrollPosition =
        window.scrollY + window.innerHeight / 3 + HEADER_OFFSET;

      for (const floor of floors) {
        const element = floorRefRegistry.get(floor.id);
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
  }, [floors, isScrollingToFloor, setActiveFloorId]);

  const handleFloorClick = useCallback(
    (floorId: string) => {
      const element = floorRefRegistry.get(floorId);
      if (element) {
        scrollToFloor(floorId);

        const rect = element.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const target = Math.max(0, absoluteTop - HEADER_OFFSET);
        window.scrollTo({ top: target, behavior: "smooth" });

        setTimeout(() => {
          setIsScrollingToFloor(false);
        }, 1000);
      }
    },
    [scrollToFloor, setIsScrollingToFloor]
  );

  return (
    <FloorTabsUI
      floors={floors}
      activeFloorId={activeFloorId}
      iconSize={isDesktop ? 48 : 40}
      onFloorClick={handleFloorClick}
    >
      {floors.map((floor, index) => (
        <FloorSection floorId={floor.id} floorIndex={index} key={floor.id} />
      ))}
    </FloorTabsUI>
  );
}
