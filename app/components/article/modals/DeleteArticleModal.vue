<script setup lang="ts">
import { z } from 'zod'
import { UForm } from '#components'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = ref(false)

const props = defineProps<{
  title: string
  slug: string
}>()

const formRef = useTemplateRef(`formRef`)

const schema = z.object({
  title: z.string().refine((val) => val === props.title, {
    message: `The title does not match.`
  }),
  slug: z.string()
})

type Schema = z.infer<typeof schema>

const state = reactive({
  title: ``,
  slug: props.slug
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await useFetch(`/api/article/delete`, {
      method: `POST`,
      body: { slug: event.data.slug }
    })

    toast.add({
      title: `Success`,
      description: `The article was deleted successfully.`,
      color: `success`,
      icon: `lucide:circle-check`
    })
    await navigateTo(`/`)
  } catch (error) {
    console.error(`Failed to delete article:`, error)
    toast.add({
      title: `Error`,
      description: `There was an issue deleting the article. Please try again.`,
      color: `error`,
      icon: `lucide:circle-x`
    })
  }
}

onBeforeRouteLeave(() => {
  const confirm = window.confirm(`Are you sure you want to leave?`)
  if (!confirm) {
    return false
  }
  return true
})
</script>

<template>
  <UModal
    v-model:open="open"
    title="Delete Article"
    description="This action will delete the current article."
    :ui="{ footer: 'justify-between' }"
  >
    <template #body>
      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField
          name="title"
          label="Are you sure?"
          :description="`Please enter the article's title, '${props.title}', to continue.`"
          required
        >
          <UInput v-model="state.title" :placeholder="props.title" class="w-48" />
        </UFormField>
      </UForm>
    </template>
    <template #footer="{ close }">
      <UButton color="error" label="Cancel" @click="close" />
      <UButton
        type="submit"
        color="error"
        variant="outline"
        @click="formRef?.submit() && close"
      >
        Delete Article
      </UButton>
    </template>
    <UButton
      variant="ghost"
      color="error"
      leading-icon="lucide:file-x"
      label="Delete Article"
    />
  </UModal>
</template>

<style scoped>

</style>
