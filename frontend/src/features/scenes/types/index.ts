import type { Scene } from "@/graphql.types";

export type { Scene };

export type SceneScope = "house" | "floor" | "room";

export interface ScenesScopeProps {
  scope?: SceneScope;
  scopeId?: string;
  title?: string;
}
