import { useEffect, useState } from "react";

// Type for floor configuration
export interface Floor {
  id: string;
  name: string;
  order: number;
  rooms: string[]; // Array of room IDs
}

interface FloorConfig {
  floors: Floor[];
}

/**
 * Custom hook to load and manage floor configuration
 * Fetches the config from /floors.config.json at runtime
 * Returns floors and a function to group rooms by floor
 */
export const useFloors = () => {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/floors.config.json");

        if (!response.ok) {
          // If config doesn't exist, just use empty floors (no grouping)
          console.info("No floors config found, rooms will not be grouped");
          setFloors([]);
          setError(null);
          setIsLoading(false);
          return;
        }

        const data: FloorConfig = await response.json();

        // Sort floors by order
        const sortedFloors = [...data.floors].sort((a, b) => b.order - a.order);

        setFloors(sortedFloors);
        setError(null);
      } catch (err) {
        console.warn("Could not load floors config:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setFloors([]); // Use empty floors as fallback
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  /**
   * Get the floor for a given room ID
   * Returns undefined if room is not assigned to any floor
   */
  const getFloorForRoom = (roomId: string): Floor | undefined => {
    return floors.find((floor) => floor.rooms.includes(roomId));
  };

  /**
   * Group rooms by floor
   * Returns an object with floor IDs as keys and arrays of room IDs as values
   * Includes an 'unassigned' key for rooms not in any floor
   */
  const groupRoomsByFloor = <T extends { id: string }>(
    rooms: T[]
  ): Map<string, { floor: Floor | null; rooms: T[] }> => {
    const grouped = new Map<string, { floor: Floor | null; rooms: T[] }>();

    // Initialize groups for each floor
    floors.forEach((floor) => {
      grouped.set(floor.id, { floor, rooms: [] });
    });

    // Add unassigned group
    grouped.set("unassigned", { floor: null, rooms: [] });

    // Assign rooms to floors
    rooms.forEach((room) => {
      const floor = getFloorForRoom(room.id);
      if (floor) {
        grouped.get(floor.id)?.rooms.push(room);
      } else {
        grouped.get("unassigned")?.rooms.push(room);
      }
    });

    // Remove empty groups
    Array.from(grouped.keys()).forEach((key) => {
      if (grouped.get(key)?.rooms.length === 0) {
        grouped.delete(key);
      }
    });

    return grouped;
  };

  return {
    floors,
    isLoading,
    error,
    hasFloors: floors.length > 0,
    getFloorForRoom,
    groupRoomsByFloor,
  };
};
