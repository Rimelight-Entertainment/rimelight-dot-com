<script setup lang="ts">
const actions = ref([
  {
    color: 'neutral',
    label: 'View on GitHub',
    trailingIcon: 'mdi:github',
    to: 'https://github.com/Rimelight-Entertainment/rimelight.com',
  }
])
</script>

<template>
  <UBanner color="info" icon="material-symbols:construction" title="This website is currently under construction. Feel free to report any issues!" :actions="actions" close close-icon="material-symbols:close"/>
</template>

<style scoped>

</style>