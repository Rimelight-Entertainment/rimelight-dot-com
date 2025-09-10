import type { BlockData } from "./block";

export type CalloutVariant =
  | "note"
  | "tip"
  | "warning"
  | "danger"
  | "commentaryInternal"
  | "commentaryExternal"
  | "ideation"
  | "creatorInternal"
  | "creatorExternal";

export interface CalloutBlockAttrs {
  variant: CalloutVariant;
  text: string;
  [key: string]: unknown;
}

export interface CalloutBlockData extends BlockData {
  type: "callout";
  attrs: CalloutBlockAttrs;
}