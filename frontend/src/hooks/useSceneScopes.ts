import { useEffect, useState, useCallback, useMemo } from "react";

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

  const getHouseScenes = useCallback((): string[] => {
    return config.house;
  }, [config.house]);

  const getFloorScenes = useCallback(
    (floorId: string): string[] => {
      return config.floors[floorId] || [];
    },
    [config.floors]
  );

  const getRoomScenes = useCallback(
    (roomId: string): string[] => {
      return config.rooms[roomId] || [];
    },
    [config.rooms]
  );

  const isScopeConfigured = useCallback(
    (scope: "house" | "floor" | "room", scopeId?: string): boolean => {
      if (scope === "house") {
        return config.house !== undefined && Array.isArray(config.house);
      } else if (scope === "floor" && scopeId) {
        return config.floors.hasOwnProperty(scopeId);
      } else if (scope === "room" && scopeId) {
        return config.rooms.hasOwnProperty(scopeId);
      }
      return false;
    },
    [config]
  );

  const filterScenes = useCallback(
    <T extends { id: string }>(scenes: T[], allowedSceneIds: string[]): T[] => {
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
    },
    []
  );

  const hasConfigValue = useMemo(() => {
    return (
      config.house !== undefined ||
      Object.keys(config.floors).length > 0 ||
      Object.keys(config.rooms).length > 0
    );
  }, [config]);

  // Get all scene IDs that are configured in any scope
  const getAllConfiguredSceneIds = useCallback((): Set<string> => {
    const configuredIds = new Set<string>();

    // Add house scenes
    config.house.forEach((id) => configuredIds.add(id));

    // Add floor scenes
    Object.values(config.floors).forEach((floorScenes) => {
      floorScenes.forEach((id) => configuredIds.add(id));
    });

    // Add room scenes
    Object.values(config.rooms).forEach((roomScenes) => {
      roomScenes.forEach((id) => configuredIds.add(id));
    });

    return configuredIds;
  }, [config]);

  // Get orphaned scenes (scenes not assigned to any scope)
  const getOrphanedScenes = useCallback(
    <T extends { id: string }>(allScenes: T[]): T[] => {
      if (!hasConfigValue) {
        // No configuration - no orphaned scenes (all scenes show everywhere)
        return [];
      }

      const configuredIds = getAllConfiguredSceneIds();
      return allScenes.filter((scene) => !configuredIds.has(scene.id));
    },
    [hasConfigValue, getAllConfiguredSceneIds]
  );

  return {
    config,
    isLoading,
    error,
    hasConfiguration: hasConfigValue,
    isScopeConfigured,
    getHouseScenes,
    getFloorScenes,
    getRoomScenes,
    filterScenes,
    getOrphanedScenes,
    getAllConfiguredSceneIds,
  };
}
