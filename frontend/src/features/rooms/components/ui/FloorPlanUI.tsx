import { Card } from "@/components/ui";
import { FloorPlanRenderer } from "@jesperkihlberg/floor-plan";
import type { FloorPlanConfig } from "@jesperkihlberg/floor-plan";

import "./FloorPlanUI.css";

export interface FloorPlanUIProps {
  config: FloorPlanConfig;
  scale?: number | undefined;
  className?: string | undefined;
  defaultCollapsed?: boolean;
}

/**
 * FloorPlanUI is a pure presentational component that wraps the FloorPlanRenderer.
 * It displays a floor plan based on the provided configuration and scale.
 *
 * @param config - The floor plan configuration object
 * @param scale - Optional scale factor for the floor plan (default: 1)
 * @param className - Optional CSS class name for styling
 */
export function FloorPlanUI({
  config,
  scale = 1,
  className,
  defaultCollapsed = false,
}: FloorPlanUIProps) {
  const isMobile = window.innerWidth <= 768;

  return (
    <Card
      className={className}
      title="Floor Plan"
      collapsible
      defaultCollapsed={defaultCollapsed || isMobile}
    >
      <FloorPlanRenderer
        config={config}
        scale={scale}
        className="floor-plan-renderer-svg"
      />
    </Card>
  );
}
