import type { BlockData } from "./block";

export interface SectionBlockAttrs {
  title: string;
  mainArticleSlug?: string | null;
  [key: string]: unknown;
}

export interface SectionBlockData extends BlockData {
  name: "Section Block"
  type: "section";
  attrs: SectionBlockAttrs;
  slots?: Record<string, BlockData[]>;
}