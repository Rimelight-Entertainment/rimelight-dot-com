import type { BlockData } from "./block";

export interface ParagraphBlockAttrs {
  [key: string]: unknown;
}

export interface ParagraphBlockData extends BlockData {
  type: "paragraph";
  attrs: ParagraphBlockAttrs;
}