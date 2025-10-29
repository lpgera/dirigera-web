import { useEffect, useState } from "react";

export interface SceneScope {
  house: string[];
  floors: Record<string, string[]>;
  rooms: Record<string, string[]>;
}

export function useSceneScopes() {
  const [config, setConfig] = useState<SceneScope>({
    house: [],
    floors: {},
    rooms: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/scenes.config.json");

        if (!response.ok) {
          // If config doesn't exist, use empty config (all scenes everywhere)
          console.info(
            "No scenes config found, all scenes will show everywhere"
          );
          setConfig({
            house: [],
            floors: {},
            rooms: {},
          });
          setError(null);
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        // Filter out comment fields (keys starting with underscore)
        const cleanedConfig: SceneScope = {
          house: data.house || [],
          floors: {},
          rooms: {},
        };

        // Clean floors
        if (data.floors && typeof data.floors === "object") {
          Object.keys(data.floors).forEach((key) => {
            if (!key.startsWith("_")) {
              cleanedConfig.floors[key] = data.floors[key];
            }
          });
        }

        // Clean rooms
        if (data.rooms && typeof data.rooms === "object") {
          Object.keys(data.rooms).forEach((key) => {
            if (!key.startsWith("_")) {
              cleanedConfig.rooms[key] = data.rooms[key];
            }
          });
        }

        setConfig(cleanedConfig);
        setError(null);
      } catch (err) {
        console.warn("Could not load scenes config:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setConfig({
          house: [],
          floors: {},
          rooms: {},
        }); // Use empty config as fallback
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getHouseScenes = (): string[] => {
    return config.house;
  };

  const getFloorScenes = (floorId: string): string[] => {
    return config.floors[floorId] || [];
  };

  const getRoomScenes = (roomId: string): string[] => {
    return config.rooms[roomId] || [];
  };

  const hasConfiguration = (): boolean => {
    // If we have any configuration (even if empty), it means the file was loaded
    return (
      config.house !== undefined ||
      Object.keys(config.floors).length > 0 ||
      Object.keys(config.rooms).length > 0
    );
  };

  const isScopeConfigured = (
    scope: "house" | "floor" | "room",
    scopeId?: string
  ): boolean => {
    if (scope === "house") {
      return config.house !== undefined && Array.isArray(config.house);
    } else if (scope === "floor" && scopeId) {
      return config.floors.hasOwnProperty(scopeId);
    } else if (scope === "room" && scopeId) {
      return config.rooms.hasOwnProperty(scopeId);
    }
    return false;
  };

  const filterScenes = <T extends { id: string }>(
    scenes: T[],
    allowedSceneIds: string[]
  ): T[] => {
    // Create a map for quick lookup
    const sceneMap = new Map<string, T>();
    scenes.forEach((scene) => sceneMap.set(scene.id, scene));

    // Return scenes in the order specified by allowedSceneIds
    const orderedScenes: T[] = [];
    allowedSceneIds.forEach((id) => {
      const scene = sceneMap.get(id);
      if (scene) {
        orderedScenes.push(scene);
      }
    });

    return orderedScenes;
  };

  return {
    config,
    isLoading,
    error,
    hasConfiguration: hasConfiguration(),
    isScopeConfigured,
    getHouseScenes,
    getFloorScenes,
    getRoomScenes,
    filterScenes,
  };
}
