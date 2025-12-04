import { BatteryIndicator } from "../ui/BatteryIndicator";

export interface BatteryIndicatorContainerProps {
  /** Battery percentage (0-100), null if device doesn't have a battery */
  batteryPercentage: number | null | undefined;
  /** Device name for accessibility */
  name?: string;
}

export function BatteryIndicatorContainer({
  batteryPercentage,
  name,
}: BatteryIndicatorContainerProps) {
  // If device doesn't have a battery, don't render
  if (batteryPercentage === null || batteryPercentage === undefined) {
    return null;
  }

  return <BatteryIndicator batteryPercentage={batteryPercentage} name={name} />;
}
