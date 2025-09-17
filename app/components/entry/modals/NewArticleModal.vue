<script setup lang="ts">
import { z } from 'zod';
import { articleTypeEnum } from '~~/server/database/schema';
import { UForm } from '#components';

const articleTypes = articleTypeEnum.enumValues;

const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  slug: z
    .string()
    .min(1, 'Slug is required.')
    .regex(/^[a-z0-9-/]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.')
    .transform(value => value.trim().toLowerCase()),
  type: z.enum(articleTypes as [string, ...string[]]).default('Default'),
  tags: z
    .string()
    .array()
});

const emit = defineEmits(['created']);
const isOpen = ref(false);
const formRef = ref<InstanceType<typeof UForm>>();

const state = reactive<createArticleSchema>({
  title: '',
  slug: '',
  type: 'Default',
  tags: [],
});

const form = ref({
  state,
  schema: createArticleSchema,
});

async function onSubmit() {
  formRef.value?.validate();

  if (formRef.value?.errors && formRef.value?.errors.length > 0) {
    return;
  }

  const result = await useFetch('/api/article', {
    method: 'POST',
    body: state,
  });

  if (result.success) {
    isOpen.value = false;
    emit('created', result.article);
    // Reset form state for next use
    Object.assign(state, {
      title: '',
      slug: '',
      type: 'Default',
      tags: [],
    });
  } else {
    console.error('Failed to create article:', result.error);
  }
}
</script>

<template>
  <UModal
    title="New Article"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <template #body>
      <UForm ref="formRef" :schema="form.schema" :state="form.state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Title" name="title" required>
          <UInput v-model="form.state.title" />
        </UFormField>
        <UFormField label="Slug" name="slug" required>
          <UInput v-model="form.state.slug" />
        </UFormField>
        <UFormField label="Type" name="type" required>
          <USelect
            v-model="form.state.type"
            :items="articleTypeEnum.enumValues"
            placeholder="Select a type"
            class="w-48"
          />
        </UFormField>

        <UFormField label="Tags" name="tags" required>
          <UInputTags v-model="form.state.tags" />
        </UFormField>

        <UButton type="submit" block>Create Article</UButton>
      </UForm>
    </template>
    <UButton variant="ghost" leading-icon="lucide:file-plus" label="New Article"/>
  </UModal>
</template>

<style scoped>

</style>