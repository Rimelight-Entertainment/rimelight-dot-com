import type { BlockData } from "./block";

export interface DialogueBlockAttrs {
  character: string;
  parenthetical?: string;
  line: string;
  [key: string]: unknown;
}

export interface DialogueBlockData extends BlockData {
  type: "dialogue";
  attrs: DialogueBlockAttrs;
}