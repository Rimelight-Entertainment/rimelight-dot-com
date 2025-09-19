<script setup lang="ts">
import { ref } from 'vue';
import { type CalloutVariant } from "~/types/blocks"

interface CalloutBlockProps {
  isEditable?: boolean
  to?: string
  text: string
  variant?: CalloutVariant
}

const props = withDefaults(defineProps<CalloutBlockProps>(), {
  isEditable: false,
  variant: 'note',
});

const localText = ref(props.text);

const maxLength = 512;
</script>

<template>
  <ProseCallout v-if="!isEditable" :is-editable="isEditable" :variant="variant" :adjust-margin="false">
    <p>{{ localText }}</p>
  </ProseCallout>
  <Block v-else :is-editable="isEditable">
    <ProseCallout v-if="isEditable" :is-editable="isEditable" :variant="variant" :adjust-margin="false">
      <UTextarea
        v-model.trim="localText"
        autoresize
        :maxlength="maxLength"
        variant="ghost"
        placeholder="Enter text..."
        class="w-full"
        :ui="{ trailing: 'pointer-events-none', base: 'pr-16'}"
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
    </ProseCallout>
  </Block>
</template>