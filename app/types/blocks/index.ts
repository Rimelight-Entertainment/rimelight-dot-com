import type { SectionBlockData } from "./sectionBlock";
import type { ParagraphBlockData } from "./paragraphBlock";
import type { CalloutBlockData } from "./calloutBlock";
import type { ImageBlockData } from "./imageBlock";
import type { ScriptBlockData } from "./scriptBlock";
import type { SceneBlockData } from "./sceneBlock";
import type { DialogueBlockData } from "./dialogueBlock";

export * from "./block";
export * from "./paragraphBlock";
export * from "./sectionBlock";
export * from "./calloutBlock";
export * from "./imageBlock";
export * from "./scriptBlock";
export * from "./sceneBlock";
export * from "./dialogueBlock";

export type BlockTypes =
  | SectionBlockData
  | ParagraphBlockData
  | CalloutBlockData
  | ImageBlockData
  | ScriptBlockData
  | SceneBlockData
  | DialogueBlockData;

export const blocksRegistry = {
  section: {} as SectionBlockData,
  paragraph: {} as ParagraphBlockData,
  callout: {} as CalloutBlockData,
  image: {} as ImageBlockData,
  script: {} as ScriptBlockData,
  scene: {} as SceneBlockData,
  dialogue: {} as DialogueBlockData,
};