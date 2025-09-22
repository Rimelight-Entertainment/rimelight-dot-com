<script setup lang="ts">
import type { CalloutVariant } from "~/types/blocks"

const {
  isEditable = false,
  variant = `note`,
  to = undefined,
  maxLength = 512
} = defineProps<{
  isEditable?: boolean
  variant?: CalloutVariant
  to?: string
  maxLength?: number
}>()

const text = defineModel<string>(`text`, { required: false, default: `` })
</script>

<template>
  <ProseCallout
    v-if="!isEditable"
    :is-editable="isEditable"
    :variant="variant"
    :to="to"
    :adjust-margin="false"
  >
    <p class="wrap-anywhere">
      {{ text }}
    </p>
  </ProseCallout>
  <Block v-else :is-editable="isEditable">
    <ProseCallout
      :is-editable="isEditable"
      :variant="variant"
      :to="to"
      :adjust-margin="false"
    >
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
    </ProseCallout>
  </Block>
</template>
