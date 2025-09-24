<script setup lang="ts">
const {} = defineProps<{
  label: string
  description: string
}>()
</script>

<template>
  <UFormField
    name="email"
    :label="label"
    :description="description"
    class="max-w-96"
  >
    <UFieldGroup class="pt-2">
      <UInput type="email" placeholder="email@domain.com" />
      <UButton type="submit" label="Subscribe" />
    </UFieldGroup>
  </UFormField>
</template>

<style scoped></style>
