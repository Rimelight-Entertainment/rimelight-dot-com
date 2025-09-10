<script setup lang="ts">
import Block from "~/components/entry/blocks/Block.vue";
import UploadImageModal from "~/components/entry/modals/UploadImageModal.vue";

const sectionBlock: SectionBlockData = {
  id: 'some-unique-id-123',
  name: 'Section Block',
  type: 'section',
  icon: 'lucide:layout-template',
  description: 'A block to organize content into sections.',
  category: 'Layout',
  attrs: {
    title: 'My First Section',
    mainArticleSlug: null,
  },
  isTemplated: false,
};
</script>

<template>
  <UContainer>
    <Block :block="sectionBlock" :isEditable="true"/>
    <UploadImageModal>
      <UButton label="Upload Image"/>
    </UploadImageModal>
  </UContainer>
</template>

<style scoped>

</style>