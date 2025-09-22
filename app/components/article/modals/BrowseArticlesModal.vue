<script setup lang="ts">
import type {
  TreeItem
} from '@nuxt/ui'

export interface ArticleTreeItem extends TreeItem {
  slug?: string
}

const {
  data: articleTree, pending, error: treeError
} = await useFetch<ArticleTreeItem[]>(`/api/article/tree`)

if (treeError.value) {
  console.error(`Error fetching article tree:`, treeError.value)
}
</script>

<template>
  <UModal
    title="Browse Articles"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <template #body>
      <p v-if="pending">
        Loading articles...
      </p>
      <p v-else-if="treeError">
        Failed to load article tree.
      </p>
      <UTree
        v-else
        color="primary"
        expanded-icon="lucide:folder-open"
        collapsed-icon="lucide:folder"
        :items="articleTree"
      >
        <template #item-wrapper="{ item }">
          <span v-if="item.slug">
            <UButton
              variant="ghost"
              color="neutral"
              :leading-icon="item.icon"
              :label="item.label"
              :to="item.slug"
              class="w-full"
            />
          </span>
        </template>
      </UTree>
    </template>
    <UButton variant="ghost" leading-icon="lucide:folder-tree" label="Browse Articles" />
    <template #footer="{ close }">
      <UButton
        label="Cancel"
        color="error"
        variant="outline"
        @click="close"
      />
    </template>
  </UModal>
</template>

<style scoped>

</style>
