import type { Device, Room, QuickControl, ControlType } from "@/graphql.types";

export type { Device, Room, QuickControl, ControlType };

export interface RoomWithDevices extends Room {
  devices: Device[];
  quickControls: QuickControl[];
}

export interface ColumnSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}
