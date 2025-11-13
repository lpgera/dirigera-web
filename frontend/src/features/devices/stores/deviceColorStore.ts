import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DeviceColorState {
  hue?: number | undefined;
  saturation?: number | undefined;
  temperature?: number | undefined;
}

interface DeviceColorStore {
  deviceColors: Record<string, DeviceColorState>;
  setDeviceHue: (deviceId: string, hue: number) => void;
  setDeviceSaturation: (deviceId: string, saturation: number) => void;
  setDeviceTemperature: (deviceId: string, temperature: number) => void;
  syncDeviceColor: (
    deviceId: string,
    hue?: number,
    saturation?: number,
    temperature?: number
  ) => void;
  getDeviceColor: (deviceId: string) => DeviceColorState;
}

const DEFAULT_COLOR_STATE: DeviceColorState = {
  hue: undefined,
  saturation: undefined,
  temperature: undefined,
};

export const useDeviceColorStore = create<DeviceColorStore>()(
  immer((set, get) => ({
    deviceColors: {},

    setDeviceHue: (deviceId, hue) =>
      set((state) => {
        if (!state.deviceColors[deviceId]) {
          state.deviceColors[deviceId] = { ...DEFAULT_COLOR_STATE };
        }
        state.deviceColors[deviceId].hue = hue;
      }),

    setDeviceSaturation: (deviceId, saturation) =>
      set((state) => {
        if (!state.deviceColors[deviceId]) {
          state.deviceColors[deviceId] = { ...DEFAULT_COLOR_STATE };
        }
        state.deviceColors[deviceId].saturation = saturation;
      }),

    setDeviceTemperature: (deviceId, temperature) =>
      set((state) => {
        if (!state.deviceColors[deviceId]) {
          state.deviceColors[deviceId] = { ...DEFAULT_COLOR_STATE };
        }
        state.deviceColors[deviceId].temperature = temperature;
      }),

    syncDeviceColor: (deviceId, hue, saturation, temperature) =>
      set((state) => {
        if (!state.deviceColors[deviceId]) {
          state.deviceColors[deviceId] = { ...DEFAULT_COLOR_STATE };
        }
        if (hue !== undefined) {
          state.deviceColors[deviceId].hue = hue;
        }
        if (saturation !== undefined) {
          state.deviceColors[deviceId].saturation = saturation;
        }
        if (temperature !== undefined) {
          state.deviceColors[deviceId].temperature = temperature;
        }
      }),

    getDeviceColor: (deviceId) => {
      return get().deviceColors[deviceId] || { ...DEFAULT_COLOR_STATE };
    },
  }))
);

// Selectors
export const useDeviceHue = (deviceId: string) =>
  useDeviceColorStore((state) => state.deviceColors[deviceId]?.hue);

export const useDeviceSaturation = (deviceId: string) =>
  useDeviceColorStore((state) => state.deviceColors[deviceId]?.saturation);

export const useDeviceTemperature = (deviceId: string) =>
  useDeviceColorStore((state) => state.deviceColors[deviceId]?.temperature);
