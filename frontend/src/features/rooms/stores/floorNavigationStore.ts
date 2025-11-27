import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FloorNavigationState {
  activeFloorId: string | null;
  isScrollingToFloor: boolean;
}

interface FloorNavigationActions {
  setActiveFloorId: (floorId: string | null) => void;
  setIsScrollingToFloor: (isScrolling: boolean) => void;
  scrollToFloor: (floorId: string) => void;
}

type FloorNavigationStore = FloorNavigationState & FloorNavigationActions;

export const useFloorNavigationStore = create<FloorNavigationStore>()(
  immer((set) => ({
    activeFloorId: null,
    isScrollingToFloor: false,

    setActiveFloorId: (floorId) =>
      set((state) => {
        state.activeFloorId = floorId;
      }),

    setIsScrollingToFloor: (isScrolling) =>
      set((state) => {
        state.isScrollingToFloor = isScrolling;
      }),

    scrollToFloor: (floorId) =>
      set((state) => {
        state.activeFloorId = floorId;
        state.isScrollingToFloor = true;
      }),
  }))
);

// Selectors
export const useActiveFloorId = () =>
  useFloorNavigationStore((state) => state.activeFloorId);

export const useIsScrollingToFloor = () =>
  useFloorNavigationStore((state) => state.isScrollingToFloor);
