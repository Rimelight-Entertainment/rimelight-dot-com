<script setup lang="ts">
import type { BlockData } from '~/types/blocks';
import type { DropdownMenuItem } from '@nuxt/ui'

interface BlockProps {
  block: BlockData;
  isEditable?: boolean;
}

const {
  block,
  isEditable = false,
} = defineProps<BlockProps>();

const emit = defineEmits<{
  insertBlockAbove: [id: string]
  insertBlockBelow: [id: string]
  duplicate: [id: string]
  delete: [id: string]
}>()

const allowDragging = computed(() => !block.isTemplated && isEditable && block.isDraggable)

const menuItems = computed<DropdownMenuItem[][]>(() => {
  const items: DropdownMenuItem[][] = [
    [
      {
        icon: block.icon,
        label: block.name,
        type: 'label'
      }
    ],
    [
      {
        label: 'Insert Block Above',
        kbds: ['PageUp'],
        onSelect: () => emit('insertBlockAbove', block.id),
      },
      {
        label: 'Insert Block Below',
        kbds: ['PageDown'],
        onSelect: () => emit('insertBlockBelow', block.id),
      }
    ]
  ];

  const editItems: DropdownMenuItem[] = !block.isTemplated ? [
    {
      label: 'Duplicate Block',
      kbds: ['Insert'],
      onSelect: () => emit('duplicate', block.id),
    },
    {
      color: 'error',
      label: 'Delete Block',
      kbds: ['Delete'],
      onSelect: () => emit('delete', block.id),
    },
  ] : [];

  if (editItems.length) {
    items.push(editItems);
  }

  return items;
});

defineShortcuts(extractShortcuts(menuItems.value))
</script>

<template>
  <UDropdownMenu :items="menuItems" :content="{ align: 'middle' }">
    <UTooltip :text="block.name">
      <UButton variant="ghost" color="neutral" trailingIcon="lucide:grip-vertical" size="sm" />
    </UTooltip>
  </UDropdownMenu>
  <RLLayoutBox
    v-if="isEditable"
    direction="horizontal"
    gap="xs"
  >
    <slot name="actions"/>
  </RLLayoutBox>
  <slot />
</template>

<style scoped>

</style>