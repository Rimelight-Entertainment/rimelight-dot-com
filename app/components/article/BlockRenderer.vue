<script setup lang="ts">
const text = ref(``)
</script>

<template>
  <RLLayoutBox
    direction="vertical"
    gap="md"
  >
    <CalloutBlock v-model="text" :variant="'note'" />
    <CalloutBlock v-model="text" :variant="'tip'" />
    <CalloutBlock v-model="text" :variant="'warning'" />
    <CalloutBlock v-model="text" :variant="'danger'" />
    <CalloutBlock v-model="text" :variant="'commentaryExternal'" />
    <CalloutBlock v-model="text" :variant="'commentaryInternal'" />
    <CalloutBlock v-model="text" :variant="'ideation'" />
    <CalloutBlock v-model="text" :variant="'creatorExternal'" />
    <CalloutBlock v-model="text" :variant="'creatorInternal'" />
  </RLLayoutBox>
</template>

<style scoped>

</style>
