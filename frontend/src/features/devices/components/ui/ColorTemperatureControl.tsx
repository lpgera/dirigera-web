import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";

export interface ColorTemperatureControlProps {
  colorTemperature: number;
  isReachable: boolean;
  onChange: (colorTemperature: number) => void;
  loading?: boolean;
}

export function ColorTemperatureControl({
  colorTemperature,
  isReachable,
  onChange,
  loading = false,
}: ColorTemperatureControlProps) {
  const [localValue, setLocalValue] = useState(colorTemperature);

  useEffect(() => {
    setLocalValue(colorTemperature);
  }, [colorTemperature]);

  return (
    <Slider
      min={2202}
      max={4000}
      value={localValue}
      disabled={!isReachable || loading}
      onChange={setLocalValue}
      onChangeComplete={onChange}
      tooltip={true}
    />
  );
}
