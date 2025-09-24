<script setup lang="ts">
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"

const toast = useToast()

const schema = z
  .object({
    first_name: z
      .string()
      .min(2, `First name must be between 2 and 24 characters long.`)
      .max(24, `First name must be between 2 and 24 characters long.`),
    last_name: z
      .string()
      .min(2, `Last name must be between 2 and 24 characters long.`)
      .max(24, `Last name must be between 2 and 24 characters long.`),
    username: z
      .string()
      .min(2, `Username must be between 2 and 24 characters long.`)
      .max(24, `Username must be between 2 and 24 characters long.`)
      .transform((val) => val.trim())
      .refine((val) => !/\s/.test(val), {
        message: `Username cannot contain spaces.`
      }),
    email: z.string().email(`Invalid email address.`),
    password: z
      .string()
      .min(8, `Password must between 8 and 24 characters long.`)
      .max(24, `Password must between 8 and 24 characters long.`),
    password_confirmation: z.string(),
    terms: z.boolean().refine((val) => val, {
      message: `You must agree to the terms of service.`
    }),
    newsletter: z.boolean().optional()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [`password_confirmation`],
        message: `Passwords do not match.`
      })
    }

    if (data.username && data.password.includes(data.username)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [`password`],
        message: `Password should not contain the username.`
      })
    }
  })

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  first_name: ``,
  last_name: ``,
  username: ``,
  email: ``,
  password: ``,
  password_confirmation: ``,
  terms: false,
  newsletter: false
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch(`/api/auth/sign-up`, {
      method: `POST`,
      body: {
        first_name: event.data.first_name,
        last_name: event.data.last_name,
        username: event.data.username,
        email: event.data.email,
        password: event.data.password,
        password_confirmation: event.data.password_confirmation
      }
    })
    if (!response.success) {
      throw new Error(`Signup failed.`)
    }
    const userSession = useUserSession()
    await userSession.fetch()
    toast.add({
      title: `Success`,
      description: `The form has been submitted.`,
      color: `success`
    })
    await navigateTo(`/`)
  } catch (error) {
    console.error(`Signup error:`, error)
    toast.add({
      color: `error`,
      title: `Failed to sign up.`,
      description: `Please check your details and try again.`
    })
  }
}

function checkStrength(str: string) {
  const requirements = [
    {
      regex: /.{8,}/,
      text: `At least 8 characters`
    },
    {
      regex: /\d/,
      text: `At least 1 number`
    },
    {
      regex: /[a-z]/,
      text: `At least 1 lowercase letter`
    },
    {
      regex: /[A-Z]/,
      text: `At least 1 uppercase letter`
    }
  ]

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text
  }))
}

const strength = computed(() => {
  const pwd = state.password ?? ``
  return checkStrength(pwd)
})
const score = computed(() => strength.value.filter((req) => req.met).length)

const color = computed(() => {
  if (score.value === 0) return `neutral`
  if (score.value <= 1) return `error`
  if (score.value <= 2) return `warning`
  if (score.value === 3) return `warning`
  return `success`
})

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
</script>

<template>
  <UPage>
    <UContainer>
      <RLLayoutBox
        direction="vertical"
        padding="md"
        gap="md"
        align-items="center"
        justify-content="center"
      >
        <UPageCard class="w-full max-w-md">
          <UForm
            title="Sign Up"
            :schema="schema"
            :state="state"
            @submit="onSubmit"
          >
            <RLLayoutBox direction="vertical" gap="lg">
              <RLLayoutBox direction="vertical" gap="sm" align-items="center">
                <UIcon name="lucide:user" class="h-12 w-12" />
                <h1 class="text-xl">Sign Up</h1>
                <span
                  >Already have an account?
                  <ULink to="/auth/log-in" class="text-primary font-medium"
                    >Log In</ULink
                  >.</span
                >
              </RLLayoutBox>
              <RLLayoutBox direction="vertical" gap="md">
                <RLLayoutBox direction="horizontal" gap="md">
                  <UFormField
                    label="First Name"
                    name="first_name"
                    description="Enter your first name."
                    required
                  >
                    <UInput v-model="state.first_name" placeholder="John">
                      <template v-if="state.first_name?.length" #trailing>
                        <UButton
                          color="neutral"
                          variant="link"
                          size="sm"
                          icon="lucide:circle-x"
                          aria-label="Clear input"
                          @click="state.first_name = ''"
                        />
                      </template>
                    </UInput>
                  </UFormField>
                  <UFormField
                    label="Last Name"
                    name="last_name"
                    description="Enter your last name."
                    required
                  >
                    <UInput v-model="state.last_name" placeholder="Doe">
                      <template v-if="state.last_name?.length" #trailing>
                        <UButton
                          color="neutral"
                          variant="link"
                          size="sm"
                          icon="lucide:circle-x"
                          aria-label="Clear input"
                          @click="state.last_name = ''"
                        />
                      </template>
                    </UInput>
                  </UFormField>
                </RLLayoutBox>
                <UFormField
                  label="Username"
                  name="username"
                  description="Enter a username."
                  required
                >
                  <UInput
                    v-model="state.username"
                    placeholder="Johndoe123"
                    class="w-full"
                  >
                    <template v-if="state.username?.length" #trailing>
                      <UButton
                        color="neutral"
                        variant="link"
                        size="sm"
                        icon="lucide:circle-x"
                        aria-label="Clear input"
                        @click="state.username = ''"
                      />
                    </template>
                  </UInput>
                </UFormField>
                <UFormField
                  label="Email"
                  name="email"
                  description="Enter an email address."
                  required
                >
                  <UInput
                    v-model="state.email"
                    type="email"
                    placeholder="johndoe@mail.com"
                    class="w-full"
                  >
                    <template v-if="state.email?.length" #trailing>
                      <UButton
                        color="neutral"
                        variant="link"
                        size="sm"
                        icon="lucide:circle-x"
                        aria-label="Clear input"
                        @click="state.email = ''"
                      />
                    </template>
                  </UInput>
                </UFormField>
                <UFormField
                  label="Password"
                  name="password"
                  description="Enter a password."
                  required
                >
                  <RLLayoutBox direction="vertical" gap="sm">
                    <UInput
                      v-model="state.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••••••••••"
                      class="w-full"
                    >
                      <template #trailing>
                        <UButton
                          color="neutral"
                          variant="link"
                          size="sm"
                          :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                          :aria-label="
                            showPassword ? 'Hide password' : 'Show password'
                          "
                          :aria-pressed="showPassword"
                          aria-controls="password"
                          @click="showPassword = !showPassword"
                        />
                      </template>
                    </UInput>
                    <UProgress
                      :color="color"
                      :model-value="score"
                      :max="4"
                      size="sm"
                    />

                    <p id="password-strength" class="text-xs">
                      The password must contain:
                    </p>

                    <ul class="space-y-1" aria-label="Password requirements">
                      <li
                        v-for="(req, index) in strength"
                        :key="index"
                        class="flex items-center gap-0.5"
                        :class="req.met ? 'text-success' : 'text-muted'"
                      >
                        <UIcon
                          :name="
                            req.met ? 'lucide:circle-check' : 'lucide:circle-x'
                          "
                          class="size-4 shrink-0"
                        />

                        <span class="text-xs font-light">
                          {{ req.text }}
                          <span class="sr-only">
                            {{
                              req.met
                                ? " - Requirement met"
                                : " - Requirement not met"
                            }}
                          </span>
                        </span>
                      </li>
                    </ul>
                  </RLLayoutBox>
                </UFormField>
                <UFormField
                  label="Password Confirmation"
                  name="password_confirmation"
                  description="Please repeat your password."
                  required
                >
                  <UInput
                    v-model="state.password_confirmation"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    placeholder="••••••••••••••••"
                    class="w-full"
                  >
                    <template #trailing>
                      <UButton
                        color="neutral"
                        variant="link"
                        size="sm"
                        :icon="
                          showPasswordConfirmation
                            ? 'lucide:eye-off'
                            : 'lucide:eye'
                        "
                        :aria-label="
                          showPasswordConfirmation
                            ? 'Hide password'
                            : 'Show password'
                        "
                        :aria-pressed="showPasswordConfirmation"
                        aria-controls="passwordConfirmation"
                        @click="
                          showPasswordConfirmation = !showPasswordConfirmation
                        "
                      />
                    </template>
                  </UInput>
                </UFormField>
                <UCheckbox v-model="state.terms" name="terms" required>
                  <template #label>
                    I have read and agree to the
                    <ULink
                      to="/documents/terms-of-service"
                      class="text-primary font-medium"
                      >Terms of Service</ULink
                    >.
                  </template>
                </UCheckbox>
                <UCheckbox
                  v-model="state.newsletter"
                  name="newsletter"
                  label="Subscribe to the Rimelight Entertainment Newsletter."
                  description="Unsubscribe at any time."
                />
                <UButton type="submit" label="Sign Up" color="primary" block />
                <span class="text-sm text-center"
                  >All these details may be changed later in your account
                  settings.</span
                >
              </RLLayoutBox>
            </RLLayoutBox>
          </UForm>
        </UPageCard>
      </RLLayoutBox>
    </UContainer>
  </UPage>
</template>

<style scoped></style>
