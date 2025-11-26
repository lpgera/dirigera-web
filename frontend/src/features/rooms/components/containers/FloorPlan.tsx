import { useFloors } from "@/hooks";
import { FloorPlanUI } from "../ui/FloorPlanUI";
import floorsConfig from "@jesperkihlberg/floor-plan/floors-config.json";
import type { FloorPlanConfig } from "@jesperkihlberg/floor-plan";

export interface FloorPlanProps {
  floorId: string;
  scale?: number;
  className?: string;
}

/**
 * FloorPlan is a container component that handles the business logic for displaying a floor plan.
 * It fetches the floor configuration based on the floorId and passes it to the FloorPlanUI component.
 *
 * @param floorId - The ID of the floor to display
 * @param scale - Optional scale factor for the floor plan (default: 0.8)
 * @param className - Optional CSS class name for styling
 */
export function FloorPlan({ floorId, scale = 0.8, className }: FloorPlanProps) {
  const { getFloorById, totalFloorCount } = useFloors();

  const floor = getFloorById(floorId);

  if (!floor) {
    return null;
  }

  // Get the floor index to look up the correct config
  // The config is stored in reverse order (top floor first in array)
  const floorIndex = floor.order;
  const configIndex = totalFloorCount - 1 - floorIndex;

  const config = floorsConfig.floors[configIndex] as FloorPlanConfig;

  if (!config) {
    return null;
  }

  return (
    <FloorPlanUI
      config={config}
      scale={scale}
      {...(className && { className })}
    />
  );
}
