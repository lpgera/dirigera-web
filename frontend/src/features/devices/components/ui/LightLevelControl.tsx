import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";

export interface LightLevelControlProps {
  lightLevel: number;
  isReachable: boolean;
  onChange: (lightLevel: number) => void;
  loading?: boolean | undefined;
}

export function LightLevelControl({
  lightLevel,
  isReachable,
  onChange,
  loading = false,
}: LightLevelControlProps) {
  const [localValue, setLocalValue] = useState(lightLevel);

  useEffect(() => {
    setLocalValue(lightLevel);
  }, [lightLevel]);

  return (
    <Slider
      min={1}
      max={100}
      value={localValue}
      disabled={!isReachable || loading}
      onChange={setLocalValue}
      onChangeComplete={onChange}
      tooltip={true}
    />
  );
}
