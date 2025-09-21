<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()

const fields = [{
  name: `email`,
  type: `text` as const,
  label: `Email`,
  placeholder: `Enter your email`,
  required: true
}, {
  name: `password`,
  label: `Password`,
  type: `password` as const,
  placeholder: `Enter your password`
}, {
  name: `remember`,
  label: `Remember me`,
  type: `checkbox` as const
}]

const schema = z.object({
  email: z.string().email(`Invalid email address.`),
  password: z.string().min(8, `Password must be at least 8 characters long.`)
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch(`/api/auth/log-in`, {
      method: `POST`,
      body: {
        email: payload.data.email,
        password: payload.data.password
      }
    })
    if (!response.success) {
      throw new Error(`Login failed.`)
    }
    const userSession = useUserSession()
    await userSession.fetch()
    await navigateTo(`/`)
  } catch {
    toast.add({
      color: `error`,
      title: `Failed to log in`,
      description: `Please check your details and try again.`
    })
  }
}
</script>

<template>
  <UContainer>
    <RLLayoutBox
      direction="vertical"
      padding="md"
      gap="md"
      align-items="center"
      justify-content="center"
      class="min-h-screen"
    >
      <UPageCard class="w-full max-w-md">
        <UAuthForm
          :schema="schema"
          title="Log In"
          description="Enter your credentials to access your account."
          icon="lucide:user"
          :fields="fields"
          :submit="{
            label: 'Log In'
          }"
          @submit="onSubmit"
        >
          <template #description>
            Don't have an account? <ULink to="/auth/sign-up" class="text-primary font-medium">Sign up</ULink>.
          </template>
          <template #email-hint>
            <ULink to="#" class="text-primary font-medium" tabindex="-1">Forgot email?</ULink>
          </template>
          <template #password-hint>
            <ULink to="#" class="text-primary font-medium" tabindex="-1">Forgot password?</ULink>
          </template>
          <template #footer>
            By logging in, you agree to our <ULink to="/documents/terms-of-service" class="text-primary font-medium">Terms of Service</ULink>.
          </template>
        </UAuthForm>
      </UPageCard>
    </RLLayoutBox>
  </UContainer>
</template>
