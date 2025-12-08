import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface FloorNavigationState {
  activeFloorId: string | null;
  isScrollingToFloor: boolean;
  _hasHydrated: boolean;
}

interface FloorNavigationActions {
  setActiveFloorId: (floorId: string | null) => void;
  setIsScrollingToFloor: (isScrolling: boolean) => void;
  scrollToFloor: (floorId: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

type FloorNavigationStore = FloorNavigationState & FloorNavigationActions;

export const useFloorNavigationStore = create<FloorNavigationStore>()(
  persist(
    immer((set) => ({
      activeFloorId: null,
      isScrollingToFloor: false,
      _hasHydrated: false,

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

      setHasHydrated: (hasHydrated) =>
        set((state) => {
          state._hasHydrated = hasHydrated;
        }),
    })),
    {
      name: "floor-navigation",
      partialize: (state) => ({ activeFloorId: state.activeFloorId }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Selectors
export const useActiveFloorId = () =>
  useFloorNavigationStore((state) => state.activeFloorId);

export const useIsScrollingToFloor = () =>
  useFloorNavigationStore((state) => state.isScrollingToFloor);
