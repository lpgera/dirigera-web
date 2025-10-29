import { useEffect, useState } from "react";

export interface Floor {
  id: string;
  name: string;
  order: number;
  rooms: string[];
}

interface FloorConfig {
  floors: Floor[];
}

export function useFloors() {
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

  const getFloorForRoom = (roomId: string): Floor | undefined => {
    return floors.find((floor) => floor.rooms.includes(roomId));
  };

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
}
