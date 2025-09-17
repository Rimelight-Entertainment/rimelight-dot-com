<script lang="ts" setup>
import { mapContentNavigation } from '@nuxt/ui/utils/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'

definePageMeta({
  layout: 'documents'
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('documents').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('documents', route.path, {
    fields: ['description']
  })
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('documents'))

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(navigation?.value, page.value?.path, {
      indexAsChild: true,
    }),
  ).map(({ icon, ...link }) => link),
)

const pageLinks = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home'
  },
  {
    label: 'Documents',
    to: '/documents',
    icon: 'i-heroicons-document'
  },
  {
    label: 'API',
    to: '/api',
    icon: 'i-heroicons-code-bracket'
  }
];

const lastModified = useDateFormat(page.value.lastModified, 'DD/MM/YYYY')
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
        <UBadge v-if="page.tags" v-for="tag in page.tags" :key="tag" variant="soft" :label="tag" />
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
        <USeparator v-if="surround?.length" />
        <UContentSurround :surround="surround" />
      </UPageBody>
      <template v-if="page?.body?.toc?.links?.length" #right>
        <UContentToc title="Table of Contents" :links="page.body.toc.links" highlight>
          <template #bottom>
            <USeparator />
            <UPageLinks title="Links" :links="pageLinks"/>
            <span class="text-muted text-sm">Last Modified: <time :datetime="page.lastModified">{{ lastModified }}</time></span>
          </template>
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped>

</style>