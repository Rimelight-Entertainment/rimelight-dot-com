<script setup lang="ts">
import { reactive } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
const loading = ref(false)

// ------------------------------------------------------------
// Zod schema – includes optional first/last name and password‑match
// ------------------------------------------------------------
const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be between 2 and 24 characters.')
      .max(24, 'First name must be between 2 and 24 characters.')
      .optional(),
    lastName: z
      .string()
      .min(2, 'Last name must be between 2 and 24 characters.')
      .max(24, 'Last name must be between 2 and 24 characters.')
      .optional(),
    username: z
      .string()
      .min(2, 'Username must be between 2 and 24 characters.')
      .max(24, 'Username must be between 2 and 24 characters.'),
    email: z.string().email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be between 8 and 24 characters.')
      .max(24, 'Password must be between 8 and 24 characters.'),
    passwordConfirmation: z.string(),
  })
  // Cross‑field rule: passwords must match
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords must match.',
  })
  // Remove the confirmation field before sending to the server
  .transform(({ passwordConfirmation, ...rest }) => rest)

// ------------------------------------------------------------
// Reactive state – keys must line‑up with the schema above
// ------------------------------------------------------------
const state = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

// The type that `event.data` will have after validation
type SignUpPayload = z.output<typeof signUpSchema>

// ------------------------------------------------------------
// Submit handler – receives the **validated** payload
// ------------------------------------------------------------
async function onSignUp(event: FormSubmitEvent<SignUpPayload>) {
 try {
   loading.value = true
   const response = await $fetch('/api/auth/sign-up', {
     method: 'POST',
     body: {
       username: event.data.username,
       email: event.data.email,
       password: event.data.password
     }
   })
   if (!response.success) {
     throw new Error('Registration failed.')
   }
   await navigateTo('/')
 }
 catch {
   toast.add({
    color: 'error',
     title: 'Failed to create account',
     description: 'Please check your details and try again.',
    })
 } finally {
   loading.value = false
 }
}
</script>

<template>
  <UForm :schema="signUpSchema" :state="state" @submit="onSignUp">
    <!-- First name -->
    <UFormField name="firstName" label="First name">
      <UInput v-model="state.firstName" placeholder="John" />
    </UFormField>

    <!-- Last name -->
    <UFormField name="lastName" label="Last name">
      <UInput v-model="state.lastName" placeholder="Doe" />
    </UFormField>

    <!-- Username -->
    <UFormField name="username" label="Username">
      <UInput v-model="state.username" placeholder="johndoe" />
    </UFormField>

    <!-- Email -->
    <UFormField name="email" label="Email address">
      <UInput v-model="state.email" type="email" placeholder="john@example.com" />
    </UFormField>

    <!-- Password -->
    <UFormField name="password" label="Password">
      <UInput v-model="state.password" type="password" placeholder="••••••••" />
    </UFormField>

    <!-- Password confirmation -->
    <UFormField name="passwordConfirmation" label="Confirm password">
      <UInput v-model="state.passwordConfirmation" type="password" placeholder="••••••••" />
    </UFormField>

    <UButton :loading="loading" type="submit" label="Sign Up" class="mt-4" />
  </UForm>
</template>

<style scoped>
/* optional styling */
</style>