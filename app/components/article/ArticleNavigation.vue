<script setup lang="ts">
import { useFetch } from '#imports'

const props = defineProps<{
  slug: string
  title: string
}>()

const route = useRoute()

const placeBlockModalOpen = ref(false)
const moveArticleModalOpen = ref(false)
const convertArticleModalOpen = ref(false)
const editTagsModalOpen = ref(false)
const browseEntriesModalOpen = ref(false)
const createArticleModalOpen = ref(false)
const deleteArticleModalOpen = ref(false)

defineShortcuts({
  o: () => placeBlockModalOpen.value = !placeBlockModalOpen.value,
  p: () => moveArticleModalOpen.value = !moveArticleModalOpen.value,
  q: () => convertArticleModalOpen.value = !convertArticleModalOpen.value,
  r: () => editTagsModalOpen.value = !editTagsModalOpen.value,
  s: () => browseEntriesModalOpen.value = !browseEntriesModalOpen.value,
  t: () => createArticleModalOpen.value = !createArticleModalOpen.value,
  u: () => deleteArticleModalOpen.value = !deleteArticleModalOpen.value
})

const { data: user, pending, error } = await useFetch('/api/user')
</script>

<template>
  <UPageList as="nav">
    <template v-if="!pending && user && user.role === 'employee' && route.query.mode !== 'editor'">
      <UButton variant="ghost" leading-icon="lucide:file-edit" label="Edit Article" :to="`/${props.slug}?mode=editor`"/>
    </template>
    <template v-if="!pending && user && user.role === 'employee' && route.query.mode === 'editor'">
      <UButton variant="ghost" leading-icon="lucide:glasses" label="View Article" :to="`/${props.slug}`"/>
      <PlaceBlockModal v-model:open="placeBlockModalOpen"/>
      <MoveArticleModal v-model:open="moveArticleModalOpen" :initial-slug="props.slug"/>
      <ConvertArticleModal v-model:open="convertArticleModalOpen"/>
      <EditTagsModal v-model:open="editTagsModalOpen"/>
      <USeparator class="py-2"/>
      <BrowseArticlesModal v-model:open="browseEntriesModalOpen"/>
      <CreateArticleModal v-model:open="createArticleModalOpen"/>
      <DeleteArticleModal v-model:open="deleteArticleModalOpen" :slug="props.slug" :title="props.title"/>
    </template>
  </UPageList>
</template>

<style scoped>

</style>