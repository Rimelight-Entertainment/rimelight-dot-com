<script setup lang="ts">
import type {
  NavigationMenuItem
} from '@nuxt/ui'

const route = useRoute()

const open = ref(false)

const links = [
  [
    {
      label: `Home`,
      icon: `i-lucide-house`,
      to: `/internal`,
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: `Inbox`,
      icon: `i-lucide-inbox`,
      to: `/internal/inbox`,
      badge: `4`,
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: `Customers`,
      icon: `i-lucide-users`,
      to: `/internal/customers`,
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: `Settings`,
      to: `internal//settings`,
      icon: `i-lucide-settings`,
      defaultOpen: true,
      type: `trigger`,
      children: [
        {
          label: `General`,
          to: `/internal/settings`,
          exact: true,
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: `Members`,
          to: `/internal/settings/members`,
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: `Notifications`,
          to: `/internal/settings/notifications`,
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: `Security`,
          to: `/internal/settings/security`,
          onSelect: () => {
            open.value = false
          }
        }
      ]
    }
  ],
  [
    {
      label: `Feedback`,
      icon: `i-lucide-message-circle`,
      to: `https://github.com/nuxt-ui-templates/dashboard`,
      target: `_blank`
    },
    {
      label: `Help & Support`,
      icon: `i-lucide-info`,
      to: `https://github.com/nuxt-ui-templates/dashboard`,
      target: `_blank`
    }
  ]
] satisfies NavigationMenuItem[][]

const groups = computed(() => [
  {
    id: `links`,
    label: `Go to`,
    items: links.flat()
  },
  {
    id: `code`,
    label: `Code`,
    items: [
      {
        id: `source`,
        label: `View page source`,
        icon: `i-simple-icons-github`,
        to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${ route.path === `/` ? `/index` : route.path }.vue`,
        target: `_blank`
      }
    ]
  }
])
</script>

<template>
  <UMain>
    <UDashboardGroup>
      <UDashboardSidebar id="default" v-model:open="open">
        <template #header="{ collapsed }">
          <TeamsMenu :collapsed="collapsed" />
        </template>

        <template #default="{ collapsed }">
          <UDashboardSearchButton :collapsed="collapsed" class="w-full" />
          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[0]"
            orientation="vertical"
            tooltip
            popover
          />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[1]"
            orientation="vertical"
            tooltip
            class="mt-auto"
          />
        </template>

        <template #footer="{ collapsed }">
          <UserMenu :collapsed="collapsed" />
        </template>
      </UDashboardSidebar>
      <UDashboardSearch :groups="groups" />
      <slot />
      <NotificationsSlideover />
    </UDashboardGroup>
  </UMain>
</template>

<style scoped>

</style>
