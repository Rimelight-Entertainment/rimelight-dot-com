<script setup lang="ts">
import type {
  NuxtError
} from "#app"

useSeoMeta({
  title: `Page not found`,
  description: `We are sorry but this page could not be found.`
})

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UError :error="error" />
    </NuxtLayout>
  </UApp>
</template>

<style scoped>

</style>
