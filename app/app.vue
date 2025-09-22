<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import {
  ULink
} from "#components"

import ConstructionBanner from "~/components/navigation/ConstructionBanner.vue"

const {
  locale
} = useI18n()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

const colorMode = useColorMode()

const color = computed(() => {
  return colorMode.value === `dark` ? `#020618` : `white`
})

const toast = useToast()

useHead({
  meta: [
    {
      charset: `utf-8`
    },
    {
      name: `viewport`,
      content: `width=device-width, initial-scale=1`
    },
    {
      key: `theme-color`,
      name: `theme-color`,
      content: color
    }
  ],
  link: [
    {
      rel: `icon`,
      href: `/favicon.svg`
    }
  ],
  htmlAttrs: {
    lang,
    dir
  }
})

useSeoMeta({
  titleTemplate: `%s - Rimelight Entertainment`,
  ogImage: `https://cdn.idantity.me/images/logos/logomark-white.webp`,
  twitterImage: `https://cdn.idantity.me/images/logos/logomark-white.webp`,
  twitterCard: `summary_large_image`
})

const descriptionComponent = h(`div`, [
  `This website uses `,
  h(ULink, {
    href: `https://en.wikipedia.org/wiki/HTTP_cookie`,
    class: `text-primary`,
    target: `_blank`
  }, `cookies`),
  ` to ensure to enhance your browsing experience. `,
  h(`br`),
  `By continuing to use our site, you agree to our `,
  h(ULink, {
    href: `/documents/policies/cookie-policy/`,
    class: `text-primary`
  }, `Cookie Policy`),
  `.`
])

const cookie = useCookie(`cookie-consent`, {
  maxAge: 60 * 60 * 24 * 90,
  secure: import.meta.env.PROD,
  sameSite: `lax`
})

onMounted(() => {
  if (cookie.value === `accepted`) {
    return
  }

  toast.add({
    duration: 0,
    color: `primary`,
    icon: `lucide:cookie`,
    title: `Cookie Consent`,
    description: () => descriptionComponent,
    actions: [
      {
        icon: `lucide:check`,
        label: `Accept All Cookies`,
        color: `success`,
        variant: `solid`,
        onClick: (e) => {
          e?.stopPropagation()
          cookie.value = `accepted`
          toast.clear()
        }
      },
      {
        icon: `lucide:x`,
        label: `Reject All Cookies`,
        color: `error`,
        variant: `solid`,
        onClick: (e) => {
          e?.stopPropagation()
          cookie.value = `rejected`
          toast.clear()
        }
      }
    ],
    close: false
  })
})
</script>

<template>
  <UApp :locale="locales[locale]" :tooltip="{ delayDuration: 0 }">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="primary" />
    <ConstructionBanner />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
