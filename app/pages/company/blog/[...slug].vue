<script lang="ts" setup>
import {
  mapContentNavigation
} from '@nuxt/ui/utils/content'
import {
  findPageBreadcrumb
} from '@nuxt/content/utils'
import type { PageLink } from "#ui/components/PageLinks.vue"

definePageMeta({
  layout: `blog`
})

const route = useRoute()

const {
  data: page
} = await useAsyncData(route.path, () => queryCollection(`blog`).path(route.path).
  first())
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found`,
    fatal: true
  })
}

const {
  data: surround
} = await useAsyncData(`${ route.path }-surround`, () => {
  return queryCollectionItemSurroundings(`blog`, route.path, {
    fields: [
      `description`
    ]
  })
})

const {
  data: navigation
} = await useAsyncData(`navigation`, () => queryCollectionNavigation(`blog`))

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value?.path, {
  indexAsChild: true
})).map(({
  icon, ...link
}) => link), {
  deep: 0
})

useSeoMeta({
  title: page.title,
  ogTitle: page.title,
  description: page.description,
  ogDescription: page.description
})

const share = () => {
  if (navigator.share) {
    navigator.share({
      title: page.title,
      text: page.description,
      url: `${ route.path }`
    })
  } else {

  }
}

const pageLinks = ref<PageLink[]>([
  {
    label: `Share Post`,
    icon: `lucide:send`,
    to: `https://github.com/nuxt/ui/blob/v4/docs/content/3.components/page-links.md`
  },
  {
    label: `Star on GitHub`,
    icon: `i-lucide-star`,
    to: `https://github.com/nuxt/ui`
  },
  {
    label: `Releases`,
    icon: `i-lucide-rocket`,
    to: `https://github.com/nuxt/ui/releases`
  }
])
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <template #left>
        <UPageAside>
          <template #top>
            <UContentSearchButton :collapsed="false" label="Search" />
          </template>
          <UContentNavigation :navigation="navigation" highlight />
        </UPageAside>
      </template>
      <UBreadcrumb :items="breadcrumb" class="mt-8" />
      <UPageHeader
        :title="page.title"
        :description="page.description"
        :headline="page.type"
        :links="page.links"
      />
      <UPageBody>
        <template v-if="page.tags">
          <UBadge
            v-for="tag in page.tags"
            :key="tag"
            variant="soft"
            :label="tag"
          />
        </template>
        <span class="text-muted">Date posted: <NuxtTime
          :datetime="page.datePosted"
          year="numeric"
          month="short"
          day="numeric"
          hour="numeric"
          minute="numeric"
          second="numeric"
          time-zone-name="short"
        /></span>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
        <USeparator v-if="surround?.length" />
        <UContentSurround :surround="surround" />
      </UPageBody>
      <template v-if="page?.body?.toc?.links?.length" #right>
        <UContentToc title="Table of Contents" :links="page.body.toc.links" highlight />
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped>

</style>
