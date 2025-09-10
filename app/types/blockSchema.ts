import type { Component, VNode } from 'vue';

import type { BlockData } from '@/types/blocks';
import type { SectionBlockData } from '@/types/blocks/sectionBlock';
import type { ParagraphBlockData } from '@/types/blocks/paragraphBlock';
import type { CalloutBlockData } from '@/types/blocks/calloutBlock';
import type { ImageBlockData } from '@/types/blocks/imageBlock';
import type { ScriptBlockData } from '@/types/blocks/scriptBlock';
import type { SceneBlockData } from '@/types/blocks/sceneBlock';
import type { DialogueBlockData } from '@/types/blocks/dialogueBlock';

import { createSectionBlock } from '~/utils/blocks/createSectionBlock';
import { createParagraphBlock } from '~/utils/blocks/createParagraphBlock';
import { createCalloutBlock } from '~/utils/blocks/createCalloutBlock';
import { createImageBlock } from '~/utils/blocks/createImageBlock';
import { createScriptBlock } from '~/utils/blocks/createScriptBlock';
import { createSceneBlock } from '~/utils/blocks/createSceneBlock';
import { createDialogueBlock } from '~/utils/blocks/createDialogueBlock';

import SectionBlock from '@/components/entry/blocks/structure/SectionBlock.vue';
import ParagraphBlock from '@/components/entry/blocks/text/ParagraphBlock.vue';
import CalloutBlock from '@/components/entry/blocks/text/CalloutBlock.vue';
import ImageBlock from '@/components/entry/blocks/media/ImageBlock.vue';
import ScriptBlock from '@/components/entry/blocks/screenwriting/ScriptBlock.vue';
import SceneBlock from '@/components/entry/blocks/screenwriting/SceneBlock.vue';
import DialogueBlock from '@/components/entry/blocks/screenwriting/DialogueBlock.vue';

export interface EditorCallbacks {
  insertBlockAtPosition?: (
    newBlock: BlockData,
    position: {
      blockId: string;
      offset: number;
    },
    slotName?: string | null | undefined,
  ) => void;
  insertBlockIntoParent?: (
    newBlock: BlockData,
    parentId: string,
    slotName: string,
  ) => void;
  updateBlock?: (blockId: string, newData: Partial<BlockData>) => void;
  duplicateBlock?: (blockId: string) => void;
  deleteBlock?: (blockId: string) => void;
  replaceBlock?: (oldBlockId: string, newBlock: BlockData) => void;
  getParentBlockType?: (blockId: string) => string | undefined;
  getBlockElement?: (blockId: string) => HTMLElement | null;
  onDragStart?: (event: DragEvent, blockId: string) => void;
  onDragOver?: (event: DragEvent) => void;
  onDrop?: (
    event: DragEvent,
    targetBlockId: string | null,
    dropPosition: 'into' | 'before' | 'after' | null,
    targetSlotNameFromDropTarget?: string | null,
  ) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDragEnd: (event: DragEvent) => void;
  onEmptySlotClick?: (
    parentId: string,
    parentBlockType: string,
    position: {
      x: number;
      y: number;
    },
    targetSlotName?: string | null | undefined,
  ) => void;
  onInsertBlockAbove?: (blockId: string, slotName?: string) => void;
  onInsertBlockBelow?: (blockId: string, slotName?: string) => void;
  getAvailableCharactersForDialogue?: (dialogueBlockId: string) => string[];
  onCharacterRemovedFromScript?: (
    characterName: string,
    scriptBlockId: string,
  ) => void;
  showMessage?: (
    message: string,
    type: 'info' | 'warning' | 'error' | 'success',
  ) => void;
  isChildAllowedInParent: (
    childBlockType: string,
    parentBlockType: string,
  ) => boolean;
  onImageUpload?: (
    blockId: string,
    file: File,
    fileName: string,
  ) => Promise<{ url: string; fileName: string } | null>;
}

export interface GenericBlockComponentProps<T extends BlockData = BlockData> {
  block: T;
  isEditable: boolean;
  renderBlocks: (
    blocks: BlockData[] | undefined,
    isEditable: boolean,
    editorCallbacks?: EditorCallbacks,
    currentNestingLevel?: number,
    draggedBlockType?: string | null,
    isChildAllowedInParent?: (childType: string, parentType: string) => boolean,
  ) => VNode[];
  editorCallbacks?: EditorCallbacks;
  nestingLevel: number;
  draggedBlockType: string | null;
  isChildAllowedInParent?: (childType: string, parentType: string) => boolean;
  blockActions?: VNode | VNode[];
  draggable?: boolean;
  nestable?: boolean;
  isTemplated?: boolean;
  children?: VNode | VNode[];
}

interface BlockSchemaEntry<T extends BlockData = BlockData> {
  component: Component;
  icon: IconName;
  category: string;
  displayName: string;
  tooltip: string;
  allowedChildren?: string[];
  draggable: boolean;
  selectable: boolean;
  nestable: boolean;
  create: (initialData?: Record<string, unknown>) => T;
}

export type BlockSchemaType = {
  [K in BlockData['type']]: BlockSchemaEntry<Extract<BlockData, { type: K }>>;
};

const BlockSchema: BlockSchemaType = {
  section: {
    component: SectionBlock, // Reference the imported Vue component
    icon: 'blocks.structure.section',
    category: 'Structure',
    displayName: 'Section',
    tooltip: 'A container for grouping related content.',
    allowedChildren: ['section', 'paragraph', 'callout', 'image', 'script'],
    draggable: true,
    selectable: true,
    nestable: true,
    create: createSectionBlock as (
      initialData?: Partial<SectionBlockData>,
    ) => SectionBlockData,
  },
  paragraph: {
    component: ParagraphBlock, // Reference the imported Vue component
    icon: 'blocks.text.paragraph',
    category: 'Text',
    displayName: 'Paragraph',
    tooltip: 'A simple text block.',
    allowedChildren: [],
    draggable: true,
    selectable: true,
    nestable: false,
    create: createParagraphBlock as (
      initialData?: Partial<ParagraphBlockData>,
    ) => ParagraphBlockData,
  },
  callout: {
    component: CalloutBlock, // Reference the imported Vue component
    icon: 'blocks.text.callout',
    category: 'Text',
    displayName: 'Callout',
    tooltip: 'Highlight important content.',
    allowedChildren: [],
    draggable: true,
    selectable: true,
    nestable: false,
    create: createCalloutBlock as (
      initialData?: Partial<CalloutBlockData>,
    ) => CalloutBlockData,
  },
  image: {
    component: ImageBlock, // Reference the imported Vue component
    icon: 'blocks.media.image',
    category: 'Media',
    displayName: 'Image',
    tooltip: 'An image.',
    allowedChildren: [],
    draggable: true,
    selectable: true,
    nestable: false,
    create: createImageBlock as (
      initialData?: Partial<ImageBlockData>,
    ) => ImageBlockData,
  },
  script: {
    component: ScriptBlock, // Reference the imported Vue component
    icon: 'blocks.screenwriting.script',
    category: 'Screenwriting',
    displayName: 'Script',
    tooltip: 'A script for screenwriting.',
    allowedChildren: ['scene'],
    draggable: true,
    selectable: true,
    nestable: true,
    create: createScriptBlock as (
      initialData?: Partial<ScriptBlockData>,
    ) => ScriptBlockData,
  },
  scene: {
    component: SceneBlock, // Reference the imported Vue component
    icon: 'blocks.screenwriting.scene',
    category: 'Screenwriting',
    displayName: 'Scene',
    tooltip: 'A scene in a script.',
    allowedChildren: ['paragraph', 'callout', 'dialogue'],
    draggable: true,
    selectable: true,
    nestable: true,
    create: createSceneBlock as (
      initialData?: Partial<SceneBlockData>,
    ) => SceneBlockData,
  },
  dialogue: {
    component: DialogueBlock,
    icon: 'blocks.screenwriting.dialogue',
    category: 'Screenwriting',
    displayName: 'Dialogue',
    tooltip: 'A dialogue block with character and lines.',
    allowedChildren: [],
    draggable: true,
    selectable: true,
    nestable: false,
    create: createDialogueBlock as (
      initialData?: Partial<DialogueBlockData>,
    ) => DialogueBlockData,
  },
};

export const CategoryOrder: string[] = [
  'Text',
  'Structure',
  'Media',
  'Screenwriting',
];

export const topLevelAllowedBlocks: BlockData['type'][] = [
  'paragraph',
  'section',
  'callout',
  'image',
  'script',
];

export default BlockSchema;