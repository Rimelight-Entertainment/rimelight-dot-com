<script setup lang="ts">
const {
  isEditable = false
} = defineProps<{
  isEditable?: boolean
}>()

const text = ref(``)
</script>

<template>
  <RLLayoutBox
    direction="vertical"
    gap="md"
  >
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'note'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'tip'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'warning'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'danger'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'commentaryExternal'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'commentaryInternal'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'ideation'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'creatorExternal'" />
    <CalloutBlock v-model="text" :is-editable="isEditable" :variant="'creatorInternal'" />
  </RLLayoutBox>
</template>

<style scoped>

</style>
