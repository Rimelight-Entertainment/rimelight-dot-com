<script setup lang="ts">
import {
  type BlockData,
  type BlockTypes,
  blocksRegistry
} from '~/types/blocks'

const {
  parentType,
  parentNestingLevel = 0,
  allowedBlocks = [
  ],
  draggedBlockType = undefined,
  slotName = undefined,
  blocks = [
  ]
} = defineProps<{
  parentId: string
  parentType: BlockTypes
  parentNestingLevel?: number
  allowedBlocks?: BlockTypes[]
  draggedBlockType?: BlockTypes
  slotName?: string
  blocks?: BlockData[]
}>()

const isEditable = inject(`isEditable`, false)

const showPlaceholder = computed(() => isEditable && blocks)

const isChildAllowedInSlot = computed(() => {
  if (!draggedBlockType) {
    return false
  }

  const parentBlockDefinition = blocksRegistry[parentType.type]

  // If `allowedChildren` is not defined on the parent block, all children are allowed.
  if (!parentBlockDefinition.allowedChildren) {
    return true
  }

  // Otherwise, check if the dragged block's type is included in the allowed children array.
  return parentBlockDefinition.allowedChildren.some((allowedBlock) => allowedBlock.type === draggedBlockType.type)
})
</script>

<template>
  <UButton
    v-if="showPlaceholder"
    variant="outline"
    color="success"
    label="Drag and drop blocks here or click to add a block"
  />
  <RLLayoutBox
    v-if="isEditable"
    direction="horizontal"
    gap="xs"
  >
    <slot name="actions" />
  </RLLayoutBox>
  <component v-for="block in blocks" :key="block" />
</template>

<style scoped>

</style>
