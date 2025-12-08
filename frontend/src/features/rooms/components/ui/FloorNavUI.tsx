import { Button, useBreakpoint } from "@/components/ui";
import { FloorIcon } from "@/components/ui/FloorIcon";

import "./FloorNavUI.css";

export interface FloorNavItem {
  id: string;
  name: string;
  shortName: string;
  order: number;
}

interface FloorNavUIProps {
  floors: FloorNavItem[];
  activeFloorId: string | null;
  iconSize?: number;
  onFloorClick?: (floorId: string) => void;
  scenes?: React.ReactNode;
}

/**
 * Pure presentational component for floor navigation.
 * Renders a vertical list of floor navigation buttons.
 */
export function FloorNavUI({
  floors,
  activeFloorId,
  iconSize = 32,
  onFloorClick = () => {},
  scenes,
}: FloorNavUIProps) {
  const breakpoint = useBreakpoint();

  const isSmallMobile = breakpoint.xs;
  const isLargeMobile = breakpoint.sm;
  const isTablet = breakpoint.md;
  const isDesktopLg = breakpoint.lg;
  const isDesktopXl = breakpoint.xl;
  const isDesktopXxl = breakpoint.xxl;

  const currentBreakpoint = isDesktopXxl
    ? "xxl"
    : isDesktopXl
      ? "xl"
      : isDesktopLg
        ? "lg"
        : isTablet
          ? "md"
          : isLargeMobile
            ? "sm"
            : isSmallMobile
              ? "xs"
              : "unknown";

  const useAbbreviatedNames = isSmallMobile || isLargeMobile || isTablet;

  return (
    <nav className={"floor-nav " + "floor-nav-" + currentBreakpoint}>
      <div className="floor-nav-breakpoint">{currentBreakpoint}</div>
      {isSmallMobile ? null : scenes}
      {floors.map((floor) => (
        <Button
          key={floor.id}
          variant={floor.id === activeFloorId ? "default" : "text"}
          onClick={() => onFloorClick(floor.id)}
          block
          shape={isSmallMobile ? "square" : "default"}
          className="floor-nav-button"
          icon={isSmallMobile ? <>{floor.shortName}</> : undefined}
        >
          {isSmallMobile ? null : (
            <>
              <FloorIcon
                totalFloors={floors.length}
                floorOrder={floor.order}
                isActive={floor.id === activeFloorId}
                size={iconSize}
              />
              <span>{useAbbreviatedNames ? floor.shortName : floor.name}</span>
            </>
          )}
        </Button>
      ))}
    </nav>
  );
}

// Export both names for backward compatibility during migration
export { FloorNavUI as FloorNav };
