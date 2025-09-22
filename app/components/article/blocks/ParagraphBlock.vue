<script setup lang="ts">
const {
  isEditable = false,
  maxLength = 512
} = defineProps<{
  isEditable?: boolean
  maxLength?: number
}>()

const text = defineModel<string>(`text`, {
  required: false,
  default: ``
})
</script>

<template>
  <p v-if="!isEditable">
    {{ text }}
  </p>
  <RLBlock v-else :is-editable="isEditable">
    <UTextarea
      v-model.trim="text"
      autoresize
      :maxlength="maxLength"
      variant="ghost"
      placeholder="Enter text..."
      class="w-full"
      :ui="{ trailing: 'pointer-events-none', base: 'pr-16' }"
      @keydown.prevent.enter
    >
      <template #trailing>
        <span
          id="character-count"
          class="text-xs text-muted tabular-nums"
          aria-live="polite"
          role="status"
        >
          {{ text.length }}/{{ maxLength }}
        </span>
      </template>
    </UTextarea>
  </RLBlock>
</template>
