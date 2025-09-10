<script setup lang="ts">
import { ref } from 'vue';
import { useCookie, useRuntimeConfig, navigateTo } from '#imports';

definePageMeta({
  layout: 'construction'
});

const password = ref('');
const error = ref<string | null>(null);
const config = useRuntimeConfig();

const handleLogin = async () => {
  const constructionPassword = config.public.constructionPassword;

  if (password.value === constructionPassword) {
    const isUnlocked = useCookie<boolean>('is-unlocked');
    isUnlocked.value = true; // Set as boolean true instead of string 'true'

    const intendedPath = useCookie('intended-path');
    const path = intendedPath.value || '/';
    intendedPath.value = null;

    navigateTo(path, { replace: true });
  } else {
    error.value = 'Incorrect password. Please try again.';
    password.value = '';
  }
};
</script>

<template>
  <UContainer>
    <RLLayoutBox
      direction="vertical"
      padding="md"
      gap="md"
      alignItems="center"
      justifyContent="center"
      class="min-h-screen"
    >
      <UCard class="w-full max-w-sm">
        <template #header>
          <RLLayoutBox
            direction="vertical"
            gap="md"
            alignItems="center"
          >
            <UIcon name="material-symbols:construction" class="text-6xl text-primary" />
            <h1 class="text-2xl font-bold">Under Construction</h1>
          </RLLayoutBox>
        </template>
        <RLLayoutBox
          direction="vertical"
          gap="md"
          alignItems="center"
        >
          <p class="text-center text-muted">
            This website is currently under construction. Please enter the password to view.
          </p>
          <UFormField label="Password" :error="error ? 'Incorrect password' : false" class="w-full">
            <UInput
              v-model="password"
              type="password"
              placeholder="Enter password"
              class="w-full"
              @keyup.enter="handleLogin"
            />
          </UFormField>
          <UButton
            block
            color="primary"
            label="Unlock Site"
            @click="handleLogin"
          />
        </RLLayoutBox>
      </UCard>
    </RLLayoutBox>
  </UContainer>
</template>