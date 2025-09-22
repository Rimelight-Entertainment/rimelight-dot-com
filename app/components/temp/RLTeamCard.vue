<script setup lang="ts">
const {

} = defineProps<{
  src: string
  alt: string
  name: string
  role: string
  description: string
}>()
</script>

<template>
  <RLLayoutBox
    direction="vertical"
    padding="xl"
    gap="md"
    class="max-w-96 bg-primary-600"
  >
    <NuxtImg
      :src="props.src"
      :alt="props.alt"
    />
    <RLLayoutBox
      direction="vertical"
      gap="xs"
    >
      <h3 class="text-xl font-bold">
        {{ props.name }}
      </h3>
      <label class="text-sm">{{ props.role }}</label>
    </RLLayoutBox>
    <p class="text-md">
      {{ props.description }}
    </p>
    <RLLayoutBox
      direction="horizontal"
      gap="md"
    >
      <slot name="buttons" />
    </RLLayoutBox>
  </RLLayoutBox>
</template>

<style scoped>

</style>
