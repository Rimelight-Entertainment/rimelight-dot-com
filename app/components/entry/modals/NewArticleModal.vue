<script setup lang="ts">
import { z } from 'zod';
import { articleTypeEnum } from '~~/server/database/schema';
import { UForm } from '#components';
import type { FormSubmitEvent } from '@nuxt/ui';

type TagItem = {
  label: string;
  value: string;
  icon: string;
};

const articleTypes = articleTypeEnum.enumValues;
type ArticleType = typeof articleTypes[number];

const {
  data: availableTags,
  pending: pendingTags,
  error: errorTags,
} = await useFetch('/api/article/tags', { method: 'GET' });

const formattedTags = computed(() => {
  if (!availableTags.value?.tags) {
    return [];
  }
  return availableTags.value.tags.map((tag) => ({
    label: tag.name,
    value: tag.name,
    icon: 'lucide:tag',
  }));
});

const schema = z.object({
  title: z.string().min(1, 'Title is required.'),
  slug: z
    .string()
    .min(1, 'Slug is required.')
    .regex(/^[a-z0-9-/]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.')
    .transform(value => value.trim().toLowerCase()),
  type: z.enum(articleTypes as [string, ...string[]]).default('Default'),
  tags: z.array(z.object({
    label: z.string(),
    value: z.string(),
    icon: z.string(),
  })),
});

type Schema = z.infer<typeof schema>

const state = reactive<{
  title: string;
  slug: string;
  type: ArticleType;
  tags: TagItem[];
}>({
  title: '',
  slug: '',
  type: 'Default',
  tags: [],
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const payload = {
      ...event.data,
      tags: event.data.tags.map(tag => tag.value),
    };

    await useFetch('/api/article/create', {
      method: 'POST',
      body: payload,
    });

    toast.add({
      title: 'Success 🎉',
      description: 'The article was created successfully.',
      color: 'success',
      icon: 'lucide:circle-check',
    });
  } catch (error) {
    console.error('Failed to create article:', error);
    toast.add({
      title: 'Error',
      description: 'There was an issue creating the article. Please try again.',
      color: 'error',
      icon: 'lucide:circle-x',
    });
  }
}

function onCreateTag(tag: string) {
  state.tags.push({
    label: tag,
    value: tag,
    icon: 'lucide:tag',
  });
}

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal
    title="New Article"
    description="Create a new article with a title, slug, type, and tags."
  >
    <template #body>
      <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Title" name="title" required>
          <UInput v-model="state.title" placeholder="New Page"/>
        </UFormField>
        <UFormField label="Slug" name="slug" required>
          <UInput v-model="state.slug" placeholder="franchises/grand-tale/"/>
        </UFormField>
        <UFormField label="Type" name="type" required>
          <USelect
            v-model="state.type"
            :items="articleTypeEnum.enumValues"
            placeholder="Select a type"
            class="w-48"
          />
        </UFormField>
        <UFormField label="Tags" name="tags" required>
          <UInputMenu
            v-model="state.tags"
            :loading="pendingTags"
            :items="formattedTags"
            multiple
            create-item
            placeholder="Select tags"
            @create="onCreateTag"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <RLLayoutBox
        direction="horizontal"
        justify-content="between"
      >
        <UButton color="error" label="Cancel" @click="emit('close', true)" />
        <RLLayoutBox>
          <UButton type="submit" block>Create Article</UButton>
        </RLLayoutBox>
      </RLLayoutBox>
    </template>
    <UButton variant="ghost" leading-icon="lucide:file-plus" label="New Article"/>
  </UModal>
</template>

<style scoped>

</style>