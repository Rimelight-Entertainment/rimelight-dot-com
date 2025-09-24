<script setup lang="ts"></script>

<template>
  <div>
    <RLAppHeader />
    <UMain class="bg-[url('/placeholders/grand-tale-background.webp')]">
      <slot />
    </UMain>
    <RLAppFooter />
  </div>
</template>

<style scoped></style>
