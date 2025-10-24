export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type ControlType = "DEVICE" | "DEVICE_SET";

export type Device = {
  __typename?: "Device";
  batteryPercentage?: Maybe<Scalars["Int"]["output"]>;
  colorHue?: Maybe<Scalars["Float"]["output"]>;
  colorSaturation?: Maybe<Scalars["Float"]["output"]>;
  colorTemperature?: Maybe<Scalars["Int"]["output"]>;
  humidity?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["String"]["output"];
  isOn?: Maybe<Scalars["Boolean"]["output"]>;
  isOpen?: Maybe<Scalars["Boolean"]["output"]>;
  isReachable: Scalars["Boolean"]["output"];
  lightLevel?: Maybe<Scalars["Int"]["output"]>;
  name: Scalars["String"]["output"];
  nextPlayItem?: Maybe<Scalars["String"]["output"]>;
  playItem?: Maybe<Scalars["String"]["output"]>;
  playback?: Maybe<Playback>;
  playbackNextAvailable?: Maybe<Scalars["Boolean"]["output"]>;
  playbackPauseAvailable?: Maybe<Scalars["Boolean"]["output"]>;
  playbackPreviousAvailable?: Maybe<Scalars["Boolean"]["output"]>;
  pm25?: Maybe<Scalars["Int"]["output"]>;
  temperature?: Maybe<Scalars["Int"]["output"]>;
  type: ControlType;
  vocIndex?: Maybe<Scalars["Int"]["output"]>;
  volume?: Maybe<Scalars["Int"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["String"]["output"]>;
  activateScene?: Maybe<Scalars["String"]["output"]>;
  login?: Maybe<Scalars["String"]["output"]>;
  quickControl?: Maybe<Scalars["Boolean"]["output"]>;
  setColorHueAndSaturation?: Maybe<Scalars["Boolean"]["output"]>;
  setColorTemperature?: Maybe<Scalars["Boolean"]["output"]>;
  setIsOn?: Maybe<Scalars["Boolean"]["output"]>;
  setLightLevel?: Maybe<Scalars["Boolean"]["output"]>;
  setPlayback?: Maybe<Scalars["Boolean"]["output"]>;
  setVolume?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MutationActivateSceneArgs = {
  id: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
};

export type MutationQuickControlArgs = {
  id: Scalars["String"]["input"];
  isOn?: InputMaybe<Scalars["Boolean"]["input"]>;
  playback?: InputMaybe<Playback>;
  type: ControlType;
};

export type MutationSetColorHueAndSaturationArgs = {
  colorHue: Scalars["Float"]["input"];
  colorSaturation: Scalars["Float"]["input"];
  id: Scalars["String"]["input"];
  type: ControlType;
};

export type MutationSetColorTemperatureArgs = {
  colorTemperature: Scalars["Int"]["input"];
  id: Scalars["String"]["input"];
  type: ControlType;
};

export type MutationSetIsOnArgs = {
  id: Scalars["String"]["input"];
  isOn: Scalars["Boolean"]["input"];
  type: ControlType;
};

export type MutationSetLightLevelArgs = {
  id: Scalars["String"]["input"];
  lightLevel: Scalars["Int"]["input"];
  type: ControlType;
};

export type MutationSetPlaybackArgs = {
  id: Scalars["String"]["input"];
  playback: Playback;
  type: ControlType;
};

export type MutationSetVolumeArgs = {
  id: Scalars["String"]["input"];
  type: ControlType;
  volume: Scalars["Int"]["input"];
};

export type Playback =
  | "playbackBuffering"
  | "playbackIdle"
  | "playbackNext"
  | "playbackPaused"
  | "playbackPlaying"
  | "playbackPrevious";

export type Query = {
  __typename?: "Query";
  _?: Maybe<Scalars["String"]["output"]>;
  devicePlayItemImageURL?: Maybe<Scalars["String"]["output"]>;
  room?: Maybe<Room>;
  rooms: Array<Room>;
  scenes: Array<Scene>;
};

export type QueryDevicePlayItemImageUrlArgs = {
  id: Scalars["String"]["input"];
};

export type QueryRoomArgs = {
  id: Scalars["String"]["input"];
};

export type QuickControl = {
  __typename?: "QuickControl";
  id: Scalars["String"]["output"];
  isOn?: Maybe<Scalars["Boolean"]["output"]>;
  isReachable: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  playback?: Maybe<Scalars["String"]["output"]>;
  type: ControlType;
};

export type Room = {
  __typename?: "Room";
  devices: Array<Device>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  quickControls: Array<QuickControl>;
};

export type Scene = {
  __typename?: "Scene";
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};
