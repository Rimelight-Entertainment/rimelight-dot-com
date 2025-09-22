<script setup lang="ts">

</script>

<template>
  <UFormField
    name="email"
    label="Subscribe to the Rimelight Entertainment Newsletter"
    description="Stay updated on new blog posts and company updates. Unsubscribe at any time."
    class="max-w-96"
  >
    <UFieldGroup class="pt-2">
      <UInput type="email" placeholder="example@mail.com" />
      <UButton type="submit" size="xs" label="Subscribe" />
    </UFieldGroup>
  </UFormField>
</template>

<style scoped>

</style>
