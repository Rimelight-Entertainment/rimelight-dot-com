<script setup lang="ts">
import { z } from "zod"
import { UForm } from "#components"
import type { FormSubmitEvent } from "@nuxt/ui"

const {} = defineProps<{
  initialSlug: string
}>()

const open = ref(false)

const formRef = useTemplateRef(`formRef`)

const schema = z.object({
  slug: z
    .string()
    .min(1, `Slug is required.`)
    .regex(
      /^[a-z0-9-/]+$/,
      `Slug can only contain lowercase letters, numbers, and hyphens.`
    )
    .transform((value) => value.trim().toLowerCase())
})

type Schema = z.infer<typeof schema>

const state = reactive({
  slug: ``
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await useFetch(`/api/article/move`, {
      method: `PATCH`,
      body: {
        initialSlug: initialSlug,
        newSlug: event.data.slug
      }
    })

    toast.add({
      title: `Success`,
      description: `The article was moved successfully.`,
      color: `success`,
      icon: `lucide:circle-check`
    })
    await navigateTo(`/${state.slug}`)
  } catch (error) {
    console.error(`Failed to create article:`, error)
    toast.add({
      title: `Error`,
      description: `There was an issue creating the article. Please try again.`,
      color: `error`,
      icon: `lucide:circle-x`
    })
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Move Article"
    description="Move the article to a new address."
    :ui="{ footer: 'justify-between' }"
  >
    <template #body>
      <UForm ref="formRef" :schema="schema" :state="state" @submit="onSubmit">
        <RLLayoutBox direction="vertical" gap="md">
          <UFormField
            label="Slug"
            name="slug"
            description="The new location the article will be moved to."
            required
          >
            <UInput
              v-model="state.slug"
              placeholder="franchises/grand-tale/"
              class="w-48"
            />
          </UFormField>
        </RLLayoutBox>
      </UForm>
    </template>
    <template #footer="{ close }">
      <UButton color="error" label="Cancel" @click="close" />
      <UButton type="submit" @click="formRef?.submit() && close">
        Move Article
      </UButton>
    </template>
    <UButton
      variant="ghost"
      leading-icon="lucide:file-plus"
      label="Move Article"
    />
  </UModal>
</template>

<style scoped></style>
