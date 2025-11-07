import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";

export interface VolumeControlProps {
  volume: number;
  isReachable: boolean;
  onChange: (volume: number) => void;
  loading?: boolean | undefined;
}

export function VolumeControl({
  volume,
  isReachable,
  onChange,
  loading = false,
}: VolumeControlProps) {
  const [localValue, setLocalValue] = useState(volume);

  useEffect(() => {
    setLocalValue(volume);
  }, [volume]);

  return (
    <Slider
      min={0}
      max={100}
      value={localValue}
      disabled={!isReachable || loading}
      onChange={setLocalValue}
      onChangeComplete={onChange}
      tooltip={true}
    />
  );
}
