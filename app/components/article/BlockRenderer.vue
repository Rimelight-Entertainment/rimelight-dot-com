<script setup lang="ts">
import { type CalloutVariant } from "~/types/blocks"

interface BlockRendererProps {
  isEditable: boolean
}

const {
  isEditable = true,
} = defineProps<BlockRendererProps>();
</script>

<template>
  <RLLayoutBox
    direction="vertical"
    gap="md"
  >
    <Block id="some-unique-id-123" name="Block" type="section" icon="lucide:x" description="A block to organize content into sections." category="layout" :is-editable="isEditable" />
    <ParagraphBlock id="some-unique-id-123" text="asdasd" name="Block" type="section" icon="lucide:x" description="A block to organize content into sections." category="layout" :is-editable="isEditable" />
    <CalloutBlock :is-editable="isEditable" :variant="'note'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'tip'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'warning'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'danger'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'commentaryExternal'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'commentaryInternal'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'ideation'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'creatorExternal'" text="Lorem ipsum dolor sit amet." />
    <CalloutBlock :is-editable="isEditable" :variant="'creatorInternal'" text="Lorem ipsum dolor sit amet." />
  </RLLayoutBox>
</template>

<style scoped>

</style>