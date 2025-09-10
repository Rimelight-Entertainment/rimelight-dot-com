import type { BlockData } from "./block";

export interface ImageBlockAttrs {
  fileName: string;
  src: string;
  alt?: string;
  [key: string]: unknown;
}

export interface ImageBlockData extends BlockData {
  name: "Image Block";
  type: "image";
  attrs: ImageBlockAttrs;
}