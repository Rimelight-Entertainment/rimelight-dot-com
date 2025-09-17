<script lang="ts" setup>
import { mapContentNavigation } from '@nuxt/ui/utils/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'
import ArticleNavigation from "~/components/entry/ArticleNavigation.vue";

definePageMeta({
  layout: 'article'
})

const route = useRoute()
const slug = route.path.substring(1)

const { data: article, error } = await useAsyncData(
  `article-${slug}`,
  () => $fetch(`/api/article/${slug}`),
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true
  })
}

const title = article.title
const description = article.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const normalizePathPart = (str: string): string => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const breadcrumb = computed(() => {
  if (!slug) {
    return [];
  }
  const pathSegments = slug.split('/')
  return pathSegments.map((segment, index) => {
    return {
      label: normalizePathPart(segment),
      to: '/' + pathSegments.slice(0, index + 1).join('/'),
    }
  })
})

const lastModified = useDateFormat(article.updated_at, 'DD/MM/YYYY')
</script>

<template>
  <UContainer>
    <UPage v-if="article">
      <template #left>
        <UPageAside></UPageAside>
      </template>
      <UBreadcrumb :items="breadcrumb"class="mt-8" />
      <UPageBody>
        <UPageHeader
          :title="article.title"
          :description="article.description"
          :headline="article.type"
          :links="article.links"
        />
      </UPageBody>
      <template #right>
        <UContentToc title="Table of Contents" highlight>
          <template #top>
            <ArticleNavigation :slug="article.slug"/>
          </template>
          <template #bottom>
            <USeparator />
            <span class="text-muted text-sm">Last Modified: <time :datetime="article.lastModified">{{ lastModified }}</time></span>
          </template>
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped>

</style>