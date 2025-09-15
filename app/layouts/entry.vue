<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('entry').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('entry', route.path, {
    fields: ['description']
  })
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const newEntryModalOpen = ref(false)
const moveEntryModalOpen = ref(false)
const convertEntryModalOpen = ref(false)
const browseEntriesModalOpen = ref(false)
const editCategoriesModalOpen = ref(false)
const placeBlockModalOpen = ref(false)

defineShortcuts({
  o: () => newEntryModalOpen.value = !newEntryModalOpen.value,
  p: () => moveEntryModalOpen.value = !moveEntryModalOpen.value,
  q: () => convertEntryModalOpen.value = !convertEntryModalOpen.value,
  r: () => browseEntriesModalOpen.value = !browseEntriesModalOpen.value,
  s: () => editCategoriesModalOpen.value = !editCategoriesModalOpen.value,
  t: () => placeBlockModalOpen.value = !placeBlockModalOpen.value
})

const lastModified = useDateFormat(page.lastModified, 'DD/MM/YYYY')
</script>

<template>
  <div>
    <AppHeader/>
    <UMain>
      <UPage v-if="page">
        <UFieldGroup>
          <UButton label="View Entry" />
          <UModal
            title="Browse Entries"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <UButton label="Browse Entries" />
            <template #body>
              <RLPlaceholder class="h-48 m-4" />
            </template>
            <template #footer="{ close }">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
              <UButton label="Submit" color="neutral" />
            </template>
          </UModal>

          <UModal
            title="Move Entry"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <UButton label="Move Entry" />
            <template #body>
              <RLPlaceholder class="h-48 m-4" />
            </template>
            <template #footer="{ close }">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
              <UButton label="Submit" color="neutral" />
            </template>
          </UModal>

          <UModal
            title="Convert Entry"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <UButton label="Convert Entry" />
            <template #body>
              <RLPlaceholder class="h-48 m-4" />
            </template>
            <template #footer="{ close }">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
              <UButton label="Submit" color="neutral" />
            </template>
          </UModal>

          <UModal
            title="New Entry"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <UButton label="New Entry" />
            <template #body>
              <RLPlaceholder class="h-48 m-4" />
            </template>
            <template #footer="{ close }">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
              <UButton label="Submit" color="neutral" />
            </template>
          </UModal>

          <UModal
            title="Edit Categories"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <UButton label="Edit Categories" />
            <template #body>
              <RLPlaceholder class="h-48 m-4" />
            </template>
            <template #footer="{ close }">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
              <UButton label="Submit" color="neutral" />
            </template>
          </UModal>

          <UModal
            title="Place Block"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <UButton label="Place Block" />
            <template #body>
              <RLPlaceholder class="h-48 m-4" />
            </template>
            <template #footer="{ close }">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
              <UButton label="Submit" color="neutral" />
            </template>
          </UModal>
        </UFieldGroup>
        <UFieldGroup>

        </UFieldGroup>

        <template #left>

        </template>
        <UBreadcrumb :items="items">
          <template #separator>
            <span class="mx-2 text-muted">/</span>
          </template>
        </UBreadcrumb>
        <UPageBody>
          <RLLayoutBox
            direction="vertical"
            gap="md"
          >
            <UPageHeader
              :title="page.title"
              :description="page.description"
              :headline="page.type"
              :links="page.links"
            />
            <RLLayoutBox
              direction="horizontal"
              gap="sm"
            >
              <UBadge v-for="tag in page.tags" :key="tag" variant="soft" :label="tag" />
              <UModal
                title="Edit Tags"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              >
                <UButton variant="ghost" icon="lucide:plus" />
                <template #body>
                  <RLPlaceholder class="h-48 m-4" />
                </template>
                <template #footer="{ close }">
                  <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
                  <UButton label="Submit" color="neutral" />
                </template>
              </UModal>
            </RLLayoutBox>

            <span>Last modified: {{ page.lastModified }}</span>
          </RLLayoutBox>
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
    </UMain>
    <AppFooter />
  </div>
</template>

<style scoped>

</style>