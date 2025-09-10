<script setup lang="ts">
import type { FooterColumn } from "@nuxt/ui";
import { ar, en, es, fr, ja, ko, pt, ro, zh_cn } from '@nuxt/ui/locale'

const { locale, setLocale } = useI18n()

const columns: FooterColumn[] = [
  {
    label: 'Resources',
    children: [
      {
        label: 'Branding',
        to: '/branding/',
      },
      {
        label: 'API',
        to: '/api/'
      }
    ]
  },
  {
    label: 'Documents',
    children: [
      {
        label: 'Privacy Policy',
        to: '/documents/policies/privacy-policy/',
      },
      {
        label: 'Cookie Policy',
        to: '/documents/policies/cookie-policy/',
      },
      {
        label: 'Terms of Service',
        to: '/documents/policies/terms-of-service/',
      },
      {
        label: 'Code of Conduct',
        to: '/documents/policies/code-of-conduct/',
      },
      {
        label: 'Other Documents',
        to: '/documents/policies/other-documents/',
      }
    ]
  }
]
</script>

<template>
  <UFooter>
    <template #top>
      <UContainer>
        <RLLayoutBox
          direction="horizontal"
          gap="lg"
        >
          <NewsletterSignup />
          <UFooterColumns :columns="columns" />

        </RLLayoutBox>
      </UContainer>
    </template>
    <template #left>
      <RLLayoutBox direction="vertical" gap="sm">
        <NuxtLink to="/">
          <UIcon name="first-party:logotype-white" color="primary" class="h-12 text-neutral fill-neutral" />
        </NuxtLink>
        <p class="text-muted text-sm">
          © {{ new Date().getFullYear() }} Rimelight Entertainment
        </p>
      </RLLayoutBox>
    </template>
    <template #right>
      <RLLayoutBox
        direction="vertical"
        gap="md"
        align-items="end"
      >
        <RLLayoutBox
          direction="horizontal"
          gap="sm"
        >
          <UButton size="xl" variant="ghost" color="neutral" icon="mdi:instagram" to="https://www.instagram.com/idantity.me" />
          <UButton size="xl" variant="ghost" color="neutral" icon="ic:baseline-discord" to="https://discord.com/users/682049695173836979" />
          <UButton size="xl" variant="ghost" color="neutral" icon="mdi:spotify" to="https://open.spotify.com/user/v5m4qoc9j35ccc6nbzqcookvj?si=d795f9bc1cb34222" />
          <UButton size="xl" variant="ghost" color="neutral" icon="mdi:github" to="https://www.github.com/idantitydotme" />
          <UButton size="xl" variant="ghost" color="neutral" icon="mdi:linkedin" to="https://www.linkedin.com/daniel-marchi" />
        </RLLayoutBox>
        <RLLayoutBox
          direction="horizontal"
          gap="md"
        >
          <UColorModeSelect class="w-48"/>
          <ULocaleSelect v-model="locale" :locales="[ar, en, es, fr, ja, ko, pt, ro, zh_cn]" @update:model-value="setLocale($event)" color="secondary" class="w-48" />
        </RLLayoutBox>
      </RLLayoutBox>
    </template>
  </UFooter>
</template>

<style scoped>

</style>