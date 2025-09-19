<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

interface UploadImageModalProps {
  initialFile?: File | null;
}

const {
  initialFile = null,
} = defineProps<UploadImageModalProps>();

const emit = defineEmits<{
  upload: [id: string]
}>()

const fileToUpload = ref<File | null>(null)
const isReplacingImage = !!initialFile

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MIN_DIMENSIONS = { width: 200, height: 200 }
const MAX_DIMENSIONS = { width: 4096, height: 4096 }
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  image: z
    .instanceof(File, {
      message: 'Please select an image file.'
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please upload a valid image file (WEBP, PNG, JPG, JPEG, or GIF).'
    })
    .refine(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const meetsDimensions =
                img.width >= MIN_DIMENSIONS.width &&
                img.height >= MIN_DIMENSIONS.height &&
                img.width <= MAX_DIMENSIONS.width &&
                img.height <= MAX_DIMENSIONS.height
              resolve(meetsDimensions)
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }),
      {
        message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
      }
    )
})

type schema = z.output<typeof schema>

const state = reactive<Partial<schema>>({
  image: undefined
})

async function onSubmit(event: FormSubmitEvent<schema>) {
  console.log(event.data)
}
</script>

<template>
  <UModal
    :title="isReplacingImage ? 'Replace Image' : 'Upload Image'"
    :description="isReplacingImage ? 'Choose a new image file to replace the existing one.' : 'Select an image file to upload.'"
    >
    <slot/>
    <template #body>
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormField name="image" label="Image" :description="isReplacingImage ? 'Choose a new image file to replace the existing one.' : 'Select an image file to upload.'">
          <UFileUpload
            accept="image/*"
            icon="lucide:image-up"
            label="Drag and drop or click to select image file"
            description="Allowed formats: WEBP, PNG, JPG, JPEG, GIF (max. 10MB)"
            position="inside"
            class="w-96"
          />
        </UFormField>
        <UFormField name="name" label="File Name" description="Optional: Customize the file name on the server." hint="Lorem">
          <UInput type="url" :placeholder="fileToUpload?.name.split('.')[0]" error="Please enter a valid URL."/>
        </UFormField>
        <UButton type="submit" :label="isReplacingImage ? 'Replace' : 'Upload'" @click="onUpload" />
      </UForm>
    </template>
  </UModal>
</template>

<style scoped>

</style>