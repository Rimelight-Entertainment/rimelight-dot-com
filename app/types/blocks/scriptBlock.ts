import type { BlockData } from "./block";

export interface ScriptBlockAttrs {
  characters: string[];
  [key: string]: unknown;
}

export interface ScriptBlockData extends BlockData {
  type: "script";
  attrs: ScriptBlockAttrs;
  slots?: Record<string, BlockData[]>;
}