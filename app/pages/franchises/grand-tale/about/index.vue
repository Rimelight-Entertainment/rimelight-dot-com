<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui"

definePageMeta({
  layout: "grand-tale"
})

const frequentlyAskedQuestions = ref([
  {
    label: "Is Grand Tale free to play?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    label: "Can I use Nuxt UI with Vue without Nuxt?",
    content:
      "Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started."
  },
  {
    label: "Is Nuxt UI production-ready?",
    content:
      "Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance."
  }
])

const availableLanguages = ref([
  {
    label: "English (EN)"
  },
  {
    label: "English (EN)"
  },
  {
    label: "English (EN)"
  },
  {
    label: "English (EN)"
  },
  {
    label: "English (EN)"
  },
  {
    label: "English (EN)"
  },
  {
    label: "English (EN)"
  }
])

const systemRequirementsItems = [
  {
    label: "Windows",
    description:
      "Make changes to your account here. Click save when you're done.",
    icon: "mage:microsoft-windows",
    slot: "windows" as const
  },
  {
    label: "Android",
    description:
      "Change your password here. After saving, you'll be logged out.",
    icon: "material-symbols:android",
    slot: "android" as const
  }
] satisfies TabsItem[]

const windowsMinimumSpecifications = ref([
  {
    title: "Operating System",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Processor (CPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Graphics Card (GPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Memory (RAM)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Storage (HD/SSD)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Network",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Input",
    description: "Keyboard and Mouse"
  },
  {
    title: "Resolution",
    description: "Lorem ipsum dolor sit amet."
  }
])

const windowsRecommendedSpecifications = ref([
  {
    title: "Operating System",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Processor (CPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Graphics Card (GPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Memory (RAM)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Storage (HD/SSD)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Network",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Input",
    description: "Keyboard and Mouse"
  },
  {
    title: "Resolution",
    description: "Lorem ipsum dolor sit amet."
  }
])

const androidMinimumSpecifications = ref([
  {
    title: "Operating System",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Processor (CPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Graphics Card (GPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Memory (RAM)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Storage (HD/SSD)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Network",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Input",
    description: "Keyboard and Mouse"
  },
  {
    title: "Resolution",
    description: "Lorem ipsum dolor sit amet."
  }
])

const androidRecommendedSpecifications = ref([
  {
    title: "Operating System",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Processor (CPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Graphics Card (GPU)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Memory (RAM)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Storage (HD/SSD)",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Network",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    title: "Input",
    description: "Keyboard and Mouse"
  },
  {
    title: "Resolution",
    description: "Lorem ipsum dolor sit amet."
  }
])

const ctaLinks = ref([
  {
    label: "Download",
    to: "/"
  }
])
</script>

<template>
  <UPage>
    <UPageSection
      title="What is Grand Tale?"
      description="In the game, players control a character called “Ori”, with which they
must gather resources, upgrade their estate, learn about the world
around them, and optionally engage in various Tales, which are sub-games
hosted within Grand Tale's world and plug in to the various systems of
the base experience."
      :ui="{ description: 'max-w-192 mx-auto' }"
      class="bg-cover bg-center bg-[url('/placeholders/grand-tale-section-background3.webp')]"
    />
    <UPageSection
      title="The story so far..."
      description="On Aleph's birthday, the trio of Aleph, Leah, and Zev encounter a
powerful magical artifact called the 'Ohrn' whilst on a hike. Upon its
    discovery, the object manifested Ori, the Aspect of Tales, and unleashed
    a surge of lifeforce across the universe with yet unknown consequences.
    Together, the four form an organization known as the 'Grand Tale', and
    must now gather allies, resources, and knowledge to accomplish Aleph's
    grand aspirations of changing the world."
      :ui="{ description: 'max-w-192 mx-auto' }"
    />
  </UPage>
  <UPageSection
    title="Features"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
        merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
        quo modo."
    class="text-center"
    :ui="{ description: 'max-w-192 mx-auto' }"
  >
    <RLLayoutBox direction="vertical" gap="xl" class="lg:flex-row">
      <UPageCard
        variant="ghost"
        title="REFORGED VISUALS"
        description="Vivid recreations of every hero, unit, building, and environment."
        reverse
        class="text-center"
      >
        <img
          src="https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/blt0e088400931db9d2/68425495fd2736756b1753a1/WC3ScrnShot_042925_133733_000.png?"
          alt="Tailwind CSS"
          class="w-full"
        />
      </UPageCard>
      <UPageCard
        variant="ghost"
        title="LEGENDARY CAMPAIGNS"
        description="Command Azeroth’s greatest heroes and villains over 62 missions that span the continents."
        reverse
        class="text-center"
      >
        <img
          src="https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/blt0e088400931db9d2/68425495fd2736756b1753a1/WC3ScrnShot_042925_133733_000.png?"
          alt="Tailwind CSS"
          class="w-full"
        />
      </UPageCard>
      <UPageCard
        variant="ghost"
        title="EXHILIRATING GAMEPLAY"
        description="Play four diverse races, each with unique strategies, units, abilities, and champions."
        reverse
        class="text-center"
      >
        <img
          src="https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/blt0e088400931db9d2/68425495fd2736756b1753a1/WC3ScrnShot_042925_133733_000.png?"
          alt="Tailwind CSS"
          class="w-full"
        />
      </UPageCard>
      <UPageCard
        variant="ghost"
        title="LIMITLESS CUSTOM GAMES"
        description="Discover an endless universe of player-created games, including MOBAs, tower defense, and more."
        reverse
        class="text-center"
      >
        <img
          src="https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/blt0e088400931db9d2/68425495fd2736756b1753a1/WC3ScrnShot_042925_133733_000.png?"
          alt="Tailwind CSS"
          class="w-full"
        />
      </UPageCard>
    </RLLayoutBox>
  </UPageSection>
  <USeparator />
  <UPageSection title="Frequently Asked Questions">
    <template #description>
      Have a question that isn't covered in this FAQ? Please visit our
      <NuxtLink to="/support">support articles</NuxtLink>.
    </template>
    <UAccordion
      :items="frequentlyAskedQuestions"
      type="multiple"
      class="max-w-192 mx-auto"
    />
  </UPageSection>
  <USeparator />
  <UPageSection
    class="bg-cover bg-[url('/placeholders/grand-tale-section-background2.webp')]"
  >
    <UContainer class="flex flex-col gap-xl lg:flex-row">
      <RLH2 class="text-start w-96">Product Details</RLH2>
      <UPageColumns class="w-full">
        <RLLayoutBox direction="vertical" gap="md">
          <RLLayoutBox direction="vertical" gap="sm" class="text-start">
            <RLH4>Genre</RLH4>
            <ul class="list-disc list-inside">
              <li class="text-muted">Role Playing Game (RPG)</li>
            </ul>
          </RLLayoutBox>
          <RLLayoutBox direction="vertical" gap="sm" class="text-start">
            <RLH4>Platforms</RLH4>
            <ul class="list-disc list-inside">
              <li class="text-muted">Windows</li>
              <li class="text-muted">Android</li>
            </ul>
          </RLLayoutBox>
        </RLLayoutBox>
        <UPageList class="pb-4 gap-2">
          <RLH4 class="text-start">Available Languages</RLH4>
          <RLLayoutBox
            tag="ul"
            v-for="item in availableLanguages"
            :key="item.label"
            direction="vertical"
            gap="xs"
            class="text-start list-disc list-inside"
          >
            <li class="text-muted">{{ item.label }}</li>
          </RLLayoutBox>
        </UPageList>
        <RLLayoutBox direction="vertical" gap="md">
          <RLLayoutBox direction="vertical" gap="sm" class="text-start">
            <RLH4 class="text-start">Product Requirements</RLH4>
            <ul class="list-disc list-inside">
              <li class="text-muted">Rimelight Entertainment Account</li>
              <li class="text-muted">Internet Connection</li>
            </ul>
          </RLLayoutBox>
        </RLLayoutBox>
      </UPageColumns>
    </UContainer>
  </UPageSection>
  <USeparator />
  <UPageSection
    class="bg-cover bg-[url('/placeholders/grand-tale-section-background2.webp')]"
  >
    <UContainer class="flex flex-col gap-xl lg:flex-row">
      <RLH2 class="text-start w-96">System Requirements</RLH2>
      <UTabs :items="systemRequirementsItems" variant="link" class="w-full">
        <template #windows="{ item }">
          <UPageColumns>
            <UPageList class="py-4 gap-2">
              <RLH4 class="text-start">Minimum Specifications</RLH4>
              <RLLayoutBox
                v-for="item in windowsMinimumSpecifications"
                :key="item.title"
                direction="vertical"
                gap="xs"
                class="text-start"
              >
                <RLH6 class="text-muted">{{ item.title }}</RLH6>
                <p class="text-muted">{{ item.description }}</p>
              </RLLayoutBox>
            </UPageList>
            <UPageList class="py-4 gap-2">
              <RLH4 class="text-start">Recommended Specifications</RLH4>
              <RLLayoutBox
                v-for="item in windowsRecommendedSpecifications"
                :key="item.title"
                direction="vertical"
                gap="xs"
                class="text-start"
              >
                <RLH6 class="text-muted">{{ item.title }}</RLH6>
                <p class="text-muted">{{ item.description }}</p>
              </RLLayoutBox>
            </UPageList>
          </UPageColumns>
        </template>
        <template #android="{ item }">
          <UPageColumns>
            <UPageList class="py-4 gap-2">
              <RLH4 class="text-start">Minimum Specifications</RLH4>
              <RLLayoutBox
                v-for="item in androidMinimumSpecifications"
                :key="item.title"
                direction="vertical"
                gap="xs"
                class="text-start"
              >
                <RLH6 class="text-muted">{{ item.title }}</RLH6>
                <p class="text-muted">{{ item.description }}</p>
              </RLLayoutBox>
            </UPageList>
            <UPageList class="py-4 gap-2">
              <RLH4 class="text-start">Recommended Specifications</RLH4>
              <RLLayoutBox
                v-for="item in androidRecommendedSpecifications"
                :key="item.title"
                direction="vertical"
                gap="xs"
                class="text-start"
              >
                <RLH6 class="text-muted">{{ item.title }}</RLH6>
                <p class="text-muted">{{ item.description }}</p>
              </RLLayoutBox>
            </UPageList>
          </UPageColumns>
        </template>
      </UTabs>
    </UContainer>
  </UPageSection>
  <USeparator />
  <UPageCTA
    variant="naked"
    title="Let your grand tale begin!"
    :links="ctaLinks"
    class="bg-cover bg-center bg-[url('/placeholders/grand-tale-section-background3.webp')]"
  />
</template>

<style scoped></style>
