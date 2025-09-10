<script setup lang="ts">
import { type BlockData, type BlockTypes, blocksRegistry } from '~/types/blocks';

interface BlockSlotProps {
  blocks: BlockData[];
  isEditable?: boolean;
  allowedBlocks?: BlockTypes[];
  parentId: string;
  parentType: BlockTypes;
  parentNestingLevel?: number;
  draggedBlockType?: BlockTypes;
  slotName?: string;
}

const {
  blocks,
  isEditable = false,
  parentType,
  draggedBlockType,
} = defineProps<BlockSlotProps>();

const showPlaceholder = computed(() => isEditable && blocks);

const isChildAllowedInSlot = computed(() => {
  if (!draggedBlockType) {
    return false;
  }

  const parentBlockDefinition = blocksRegistry[parentType.type];

  // If `allowedChildren` is not defined on the parent block, all children are allowed.
  if (!parentBlockDefinition.allowedChildren) {
    return true;
  }

  // Otherwise, check if the dragged block's type is included in the allowed children array.
  return parentBlockDefinition.allowedChildren.some(
    (allowedBlock) => allowedBlock.type === draggedBlockType.type
  );
})
</script>

<template>
  <UButton v-if="showPlaceholder" variant="outline" color="success" label="Drag and drop blocks here or click to add a block" />
  <RLLayoutBox
    v-if="isEditable"
    direction="horizontal"
    gap="xs"
  >
    <slot name="actions"/>
  </RLLayoutBox>
  <component v-for="block in blocks" />
</template>

<style scoped>

</style>