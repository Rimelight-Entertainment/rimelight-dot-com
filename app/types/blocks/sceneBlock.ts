import type { BlockData } from "./block";

export type TimeOfDay =
  | "MORNING"
  | "NOON"
  | "AFTERNOON"
  | "EVENING"
  | "NIGHT"
  | "OTHER";
export type Setting = "INTERIOR" | "EXTERIOR" | "OTHER";
export type Transition = "CUT_TO_SCENE" | "CUT_BACK_TO_SCENE" | "FADE_TO_SCENE";

export interface SceneBlockAttrs {
  location: string;
  timeOfDay: TimeOfDay;
  setting: Setting;
  transition: Transition;
  description: string;
  [key: string]: unknown;
}

export interface SceneBlockData extends BlockData {
  type: "scene";
  attrs: SceneBlockAttrs;
  slots?: Record<string, BlockData[]>;
}