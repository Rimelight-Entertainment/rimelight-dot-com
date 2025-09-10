import type { BlockTypes } from "./index";
import { blocksRegistry } from './index';

export interface BlockData {
  id: string;
  type: BlockTypes['type'];
  icon: string;
  name: string;
  description: string;
  category: string;
  attrs?: Record<string, unknown>;
  slots?: Record<string, BlockData[]>;
  allowedChildren?: BlockTypes[];
  isTemplated?: boolean;
  isNestable?: boolean;
  isDraggable?: boolean;
}

export interface GroupedBlocks {
  [category: string]: BlockData[];
}