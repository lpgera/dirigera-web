import { useEffect, useState } from "react";

type DeviceImageConfig = Record<string, string>;

export function useDeviceImages() {
  const [config, setConfig] = useState<DeviceImageConfig>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/device-images.config.json");

        if (!response.ok) {
          throw new Error(
            `Failed to load device images config: ${response.statusText}`
          );
        }

        const data = await response.json();

        // Filter out comment fields (keys starting with underscore)
        const cleanedConfig: DeviceImageConfig = {};
        Object.keys(data).forEach((key) => {
          if (!key.startsWith("_")) {
            cleanedConfig[key] = data[key];
          }
        });

        setConfig(cleanedConfig);
        setError(null);
      } catch (err) {
        console.warn("Could not load device images config:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setConfig({}); // Use empty config as fallback
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getDeviceImage = (deviceId: string): string | undefined => {
    const filename = config[deviceId];
    if (!filename) return undefined;

    return `/devices/${filename}`;
  };

  return {
    getDeviceImage,
    isLoading,
    error,
    hasConfig: Object.keys(config).length > 0,
  };
}
