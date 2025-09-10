import { h, type VNode } from 'vue';
import BlockSchema from '~/types/blockSchema';
import type {
  EditorCallbacks,
  GenericBlockComponentProps,
} from '~/types/blockSchema';
import BlockSlot from '~/components/entry/blocks/BlockSlot.vue';
import type { BlockData } from '~/types/blocks';

/**
 * A composable to recursively render blocks based on their schema.
 * @param blocks - An array of BlockData objects to render.
 * @param isEditable - Whether the blocks are in an editable state.
 * @param editorCallbacks - Callbacks for editor actions.
 * @param currentNestingLevel - The current nesting level of the blocks.
 * @param draggedBlockType - The type of block currently being dragged, if any.
 * @param isChildAllowedInParent - A function to determine if a child block type is allowed in a parent block type.
 * @returns An array of Vue VNodes representing the rendered blocks.
 */
export const useRenderBlocks = (
  blocks: BlockData[] | undefined,
  isEditable: boolean,
  editorCallbacks?: EditorCallbacks,
  currentNestingLevel = 0,
  draggedBlockType: string | null = null,
  isChildAllowedInParent?: (childType: string, parentType: string) => boolean,
): VNode[] => {
  if (!blocks) {
    return [];
  }

  return blocks
    .filter((block) => block !== null && block !== undefined)
    .map((block) => {
      const blockSchemaEntry = BlockSchema[block.type];

      if (!blockSchemaEntry) {
        console.warn(`No schema entry found for block type: ${block.type}`);
        return null;
      }

      const BlockComponent = blockSchemaEntry.component;

      const specificBlockComponentProps: GenericBlockComponentProps =
        {
          block: block as BlockData,
          isEditable: isEditable,
          renderBlocks: (childBlocks, isEdit, callbacks, level) =>
            useRenderBlocks(
              childBlocks,
              isEdit,
              callbacks,
              level,
              draggedBlockType,
              isChildAllowedInParent,
            ),
          editorCallbacks: editorCallbacks,
          nestingLevel: currentNestingLevel,
          draggedBlockType: draggedBlockType,
          isChildAllowedInParent: isChildAllowedInParent,
          draggable: blockSchemaEntry.draggable ?? false,
          nestable: blockSchemaEntry.nestable ?? false,
          isTemplated: block.isTemplated ?? false,
        };

      const renderedSlots =
        blockSchemaEntry.nestable && 'slots' in block && block.slots
          ? Object.entries(block.slots).map(([slotName, slotBlocks]) =>
            h(BlockSlot, {
              key: `${block.id}-${slotName}`,
              blocks: slotBlocks,
              isEditable: isEditable,
              editorCallbacks: editorCallbacks,
              parentId: block.id,
              parentBlockType: block.type,
              renderBlocks: useRenderBlocks,
              parentNestingLevel: currentNestingLevel,
              draggedBlockType: draggedBlockType,
              isChildAllowedInParent: isChildAllowedInParent || (() => true),
              slotName: slotName,
            }),
          )
          : null;
      return h(
        BlockComponent,
        {
          key: block.id,
          ...specificBlockComponentProps,
        },
        renderedSlots ? { default: () => renderedSlots } : undefined,
      );
    })
    .filter(Boolean) as VNode[];
};