<script setup lang="ts">
import { useFetch } from '#imports'

const props = defineProps<{
  slug: string
}>()

const route = useRoute()

const placeBlockModalOpen = ref(false)
const moveArticleModalOpen = ref(false)
const convertArticleModalOpen = ref(false)
const editTagsModalOpen = ref(false)
const browseEntriesModalOpen = ref(false)
const newArticleModalOpen = ref(false)

defineShortcuts({
  t: () => placeBlockModalOpen.value = !placeBlockModalOpen.value,
  p: () => moveArticleModalOpen.value = !moveArticleModalOpen.value,
  q: () => convertArticleModalOpen.value = !convertArticleModalOpen.value,
  u: () => editTagsModalOpen.value = !editTagsModalOpen.value,
  r: () => browseEntriesModalOpen.value = !browseEntriesModalOpen.value,
  o: () => newArticleModalOpen.value = !newArticleModalOpen.value
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
      <PlaceBlockModal  v-model:open="placeBlockModalOpen"/>
      <MoveArticleModal  v-model:open="moveArticleModalOpen"/>
      <ConvertArticleModal  v-model:open="convertArticleModalOpen"/>
      <EditTagsModal  v-model:open="editTagsModalOpen"/>
      <USeparator class="py-2"/>
      <NewArticleModal  v-model:open="newArticleModalOpen"/>
      <BrowseArticlesModal  v-model:open="browseEntriesModalOpen"/>
    </template>
  </UPageList>
</template>

<style scoped>

</style>