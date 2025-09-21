<script setup lang="ts">
import { ref } from 'vue'

interface ParagraphBlockProps {
  isEditable?: boolean
  text: string
}

const props = withDefaults(defineProps<ParagraphBlockProps>(), {
  isEditable: false
})

const localText = ref(props.text)

const maxLength = 512
</script>

<template>
  <p v-if="!isEditable">
    {{ localText }}
  </p>
  <Block v-else :is-editable="isEditable">
    <UTextarea
      v-model.trim="localText"
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
          {{ localText.length }}/{{ maxLength }}
        </span>
      </template>
    </UTextarea>
  </Block>
</template>
