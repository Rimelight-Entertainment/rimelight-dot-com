<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { DropdownMenuItem } from '@nuxt/ui'

const { loggedIn  } = useUserSession()

const route = useRoute()

const { data: apiUser, pending, error } = await useAsyncData(
  'api-user',
  () => $fetch('/api/user'),
  {
    lazy: true,
    server: false,
    immediate: loggedIn.value
  }
)

watch(loggedIn, (newVal) => {
  if (newVal) {
    refreshNuxtData('api-user')
  }
})

const items = computed<NavigationMenuItem[]>(() => {
  const baseItems: NavigationMenuItem[] = [
    {
      label: 'Franchises',
      active: route.path.startsWith('/franchises'),
      slot: 'franchises' as const,
      children: [
        {
          label: 'Overview',
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        },
        {
          label: 'Characters',
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        },
        {
          label: 'Tales',
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
        }
      ]
    },
    {
      label: 'Forums',
      to: '/forums',
      active: route.path.startsWith('/forums')
    },
    {
      label: 'Events',
      to: '/events',
      active: route.path.startsWith('/events')
    },
    {
      label: 'Store',
      to: '/store',
      active: route.path.startsWith('/store')
    },
    {
      label: 'Company',
      to: '/company',
      active: route.path.startsWith('/company'),
      children: [
        {
          label: 'History',
          icon: 'lucide:book',
          description: 'Learn about our beginnings and our mission.',
          to: '/company/history',
        },
        {
          label: 'Jobs',
          icon: 'lucide:briefcase',
          description: 'Check out our currently open positions and their requirements.!',
          to: '/company/jobs',
        },
        {
          label: 'Studios',
          icon: 'lucide:building-2',
          description: 'Take a tour of our facilities.',
          to: '/company/studios',
        },
        {
          label: 'Benefits',
          icon: 'lucide:hand-heart',
          description: 'Discover what benefits and compensations are available to our employees.',
          to: '/company/benefits',
        },
      ]
    }
  ]

  if (apiUser.value?.role === 'employee')  {
    baseItems.push({
      label: 'Internal',
      to: '/internal',
      active: route.path.startsWith('/internal')
    })
  }

  return baseItems
})
const accountMenuItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Benjamin',
      avatar: {
        src: 'https://github.com/benjamincanac.png'
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'Support',
      icon: 'lucide:headset',
      to: '/docs/components/dropdown-menu'
    }
  ],
  [
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
    {
      label: 'Logout',
      icon: 'lucide:log-out',
      kbds: ['shift', 'meta', 'q'],
      click: async () => {
        await $fetch('/api/logout', {
          method: 'POST',
        })
        await navigateTo('/')
      }
    }
  ]
])

defineShortcuts(extractShortcuts(accountMenuItems.value))
</script>

<template>
  <UHeader mode="slideover" toggle-side="left" to="/">
    <template #title>
      <UIcon name="first-party:logomark-white" color="primary" class="h-12 text-neutral fill-neutral" />
    </template>
    <UNavigationMenu :items="items" variant="link">
      <template #franchises-content="{ item }">
        <ul class="grid gap-2 p-4 lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
          <li class="row-span-3">
            <RLPlaceholder class="size-full min-h-48" />
          </li>

          <li v-for="child in item.children" :key="child.label">
            <ULink class="text-sm text-left rounded-md p-3 transition-colors hover:bg-elevated/50">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
              <p class="text-muted line-clamp-2">
                {{ child.description }}
              </p>
            </ULink>
          </li>
        </ul>
      </template>
    </UNavigationMenu>
    <template #body>
      <UNavigationMenu :items="items" variant="link" orientation="vertical" class="-mx-2.5" />
    </template>
    <template #right>
      <RLLayoutBox
        direction="horizontal"
        gap="sm"
      >
        <AuthState v-slot="{ loggedIn, clear }">
          <template v-if="loggedIn">
            <UDropdownMenu :items="accountMenuItems" :ui="{ content: 'w-48' }">
              <UButton variant="link" color="neutral" :label="apiUser?.username" />
            </UDropdownMenu>
          </template>

          <template v-else>
            <UButton variant="solid"   color="primary" label="Log In"    to="/auth/log-in" />
            <UButton variant="outline" color="primary" label="Sign Up"   to="/auth/sign-up" />
          </template>
        </AuthState>
      </RLLayoutBox>
    </template>
  </UHeader>
</template>

<style scoped>

</style>