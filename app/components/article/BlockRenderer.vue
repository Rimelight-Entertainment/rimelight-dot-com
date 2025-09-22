<script setup lang="ts">
const text = ref(``)
</script>

<template>
  <RLLayoutBox
    direction="vertical"
    gap="md"
  >
    <RLCalloutBlock v-model="text" :variant="'note'" />
    <RLCalloutBlock v-model="text" :variant="'tip'" />
    <RLCalloutBlock v-model="text" :variant="'warning'" />
    <RLCalloutBlock v-model="text" :variant="'danger'" />
    <RLCalloutBlock v-model="text" :variant="'commentaryExternal'" />
    <RLCalloutBlock v-model="text" :variant="'commentaryInternal'" />
    <RLCalloutBlock v-model="text" :variant="'ideation'" />
    <RLCalloutBlock v-model="text" :variant="'creatorExternal'" />
    <RLCalloutBlock v-model="text" :variant="'creatorInternal'" />
  </RLLayoutBox>
</template>

<style scoped>

</style>
