import { Switch } from "@/components/ui/Switch";

export interface DeviceToggleProps {
  isOn: boolean;
  isReachable: boolean;
  onChange: (isOn: boolean) => void;
  loading?: boolean | undefined;
}

export function DeviceToggle({
  isOn,
  isReachable,
  onChange,
  loading = false,
}: DeviceToggleProps) {
  return (
    <Switch
      checked={isOn}
      disabled={!isReachable || loading}
      onChange={onChange}
      label={isOn ? "On" : "Off"}
    />
  );
}
