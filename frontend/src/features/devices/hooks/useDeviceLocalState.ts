import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { hsvToRgb, calculateDeviceColor } from "@/utils/deviceColor";

export interface DeviceLocalState {
  isOn?: boolean;
  lightLevel?: number;
  volume?: number;
  colorHue?: number;
  colorSaturation?: number;
  colorTemperature?: number;
}

interface DeviceLocalStateStore {
  deviceStates: Record<string, DeviceLocalState>;
  setDeviceIsOn: (deviceId: string, isOn: boolean) => void;
  setDeviceLightLevel: (deviceId: string, lightLevel: number) => void;
  setDeviceVolume: (deviceId: string, volume: number) => void;
  setDeviceColorHue: (deviceId: string, hue: number) => void;
  setDeviceColorSaturation: (deviceId: string, saturation: number) => void;
  setDeviceColorTemperature: (deviceId: string, temperature: number) => void;
  syncDeviceState: (deviceId: string, state: Partial<DeviceLocalState>) => void;
  getDeviceState: (deviceId: string) => DeviceLocalState;
}

export const useDeviceLocalStateStore = create<DeviceLocalStateStore>()(
  immer((set, get) => ({
    deviceStates: {},

    setDeviceIsOn: (deviceId, isOn) =>
      set((state) => {
        if (!state.deviceStates[deviceId]) {
          state.deviceStates[deviceId] = {};
        }
        state.deviceStates[deviceId].isOn = isOn;
      }),

    setDeviceLightLevel: (deviceId, lightLevel) =>
      set((state) => {
        if (!state.deviceStates[deviceId]) {
          state.deviceStates[deviceId] = {};
        }
        state.deviceStates[deviceId].lightLevel = lightLevel;
      }),

    setDeviceVolume: (deviceId, volume) =>
      set((state) => {
        if (!state.deviceStates[deviceId]) {
          state.deviceStates[deviceId] = {};
        }
        state.deviceStates[deviceId].volume = volume;
      }),

    setDeviceColorHue: (deviceId, hue) =>
      set((state) => {
        if (!state.deviceStates[deviceId]) {
          state.deviceStates[deviceId] = {};
        }
        state.deviceStates[deviceId].colorHue = hue;
      }),

    setDeviceColorSaturation: (deviceId, saturation) =>
      set((state) => {
        if (!state.deviceStates[deviceId]) {
          state.deviceStates[deviceId] = {};
        }
        state.deviceStates[deviceId].colorSaturation = saturation;
      }),

    setDeviceColorTemperature: (deviceId, temperature) =>
      set((state) => {
        if (!state.deviceStates[deviceId]) {
          state.deviceStates[deviceId] = {};
        }
        state.deviceStates[deviceId].colorTemperature = temperature;
      }),

    syncDeviceState: (deviceId, state) =>
      set((storeState) => {
        if (!storeState.deviceStates[deviceId]) {
          storeState.deviceStates[deviceId] = {};
        }
        Object.assign(storeState.deviceStates[deviceId], state);
      }),

    getDeviceState: (deviceId) => {
      return get().deviceStates[deviceId] || {};
    },
  }))
);

// Selectors for individual properties
export const useLocalIsOn = (deviceId: string) =>
  useDeviceLocalStateStore((state) => state.deviceStates[deviceId]?.isOn);

export const useLocalLightLevel = (deviceId: string) =>
  useDeviceLocalStateStore((state) => state.deviceStates[deviceId]?.lightLevel);

export const useLocalVolume = (deviceId: string) =>
  useDeviceLocalStateStore((state) => state.deviceStates[deviceId]?.volume);

export const useLocalColorHue = (deviceId: string) =>
  useDeviceLocalStateStore((state) => state.deviceStates[deviceId]?.colorHue);

export const useLocalColorSaturation = (deviceId: string) =>
  useDeviceLocalStateStore(
    (state) => state.deviceStates[deviceId]?.colorSaturation
  );

export const useLocalColorTemperature = (deviceId: string) =>
  useDeviceLocalStateStore(
    (state) => state.deviceStates[deviceId]?.colorTemperature
  );

/**
 * Calculates and returns the computed device color based on local store values.
 * Prioritizes hue/saturation over temperature for RGB calculation.
 */
export const useDeviceColor = (deviceId: string) =>
  useDeviceLocalStateStore((state) => {
    const deviceState = state.deviceStates[deviceId];
    if (!deviceState) {
      return undefined;
    }

    const { colorHue, colorSaturation, colorTemperature } = deviceState;

    // If we have both hue and saturation, calculate RGB from HSV
    if (colorHue !== undefined && colorSaturation !== undefined) {
      return hsvToRgb(colorHue, colorSaturation);
    }

    // Otherwise, use the utility function to calculate from available values
    return calculateDeviceColor(colorHue, colorSaturation, colorTemperature);
  });
