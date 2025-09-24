<script setup lang="ts">
import type { BlockTypes } from "~/types/blocks"
import type { DropdownMenuItem } from "@nuxt/ui"

const {
  isTemplated = false,
  isDraggable = true,
  isNestable = true
} = defineProps<{
  id?: string
  type: BlockTypes
  icon: string
  name: string
  description: string
  category: string
  attrs: Record<string, unknown>
  slots: Record<string, unknown>
  allowedChildren: BlockTypes[]
  isTemplated?: boolean
  isDraggable?: boolean
  isNestable?: boolean
}>()

const emit = defineEmits<{
  insertBlockAbove: [id: string]
  insertBlockBelow: [id: string]
  duplicate: [id: string]
  delete: [id: string]
}>()

const isEditable = inject(`isEditable`, false)

const allowDragging = computed(() => !isTemplated && isEditable && isDraggable)

const menuItems = computed<DropdownMenuItem[][]>(() => {
  const items: DropdownMenuItem[][] = [
    [
      {
        icon: icon,
        label: name,
        type: `label`
      }
    ],
    [
      {
        label: `Insert Block Above`,
        kbds: [`PageUp`],
        onSelect: () => emit(`insertBlockAbove`, id)
      },
      {
        label: `Insert Block Below`,
        kbds: [`PageDown`],
        onSelect: () => emit(`insertBlockBelow`, id)
      }
    ]
  ]

  const editItems: DropdownMenuItem[] = !isTemplated
    ? [
        {
          label: `Duplicate Block`,
          kbds: [`Insert`],
          onSelect: () => emit(`duplicate`, id)
        },
        {
          color: `error`,
          label: `Delete Block`,
          kbds: [`Delete`],
          onSelect: () => emit(`delete`, id)
        }
      ]
    : []

  if (editItems.length) {
    items.push(editItems)
  }

  return items
})

defineShortcuts(extractShortcuts(menuItems.value))
</script>

<template>
  <RLLayoutBox direction="vertical" gap="md">
    <slot v-if="isEditable" name="actions" />
    <RLLayoutBox direction="horizontal" gap="xs" align-items="start">
      <UDropdownMenu :items="menuItems">
        <UTooltip :text="name">
          <UButton
            v-if="isEditable"
            variant="ghost"
            color="neutral"
            trailing-icon="lucide:grip-vertical"
            size="sm"
          />
        </UTooltip>
      </UDropdownMenu>
      <slot />
    </RLLayoutBox>
  </RLLayoutBox>
</template>

<style scoped></style>
