<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})
</script>

<template>
  <NuxtLayout>
    <UError
      :error="{
    statusCode: 404,
    statusMessage: 'Page not found',
    message: 'The page you are looking for does not exist.'
  }"
    />
  </NuxtLayout>
</template>

<style scoped>

</style>