<script setup lang="ts">
useHead({
  title: `Home`
})

const projectsFeatures = ref([
  {
    title: `Game Developer`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    icon: `lucide:gamepad-2`
  },
  {
    title: `Web Developer`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    icon: `lucide:code`
  },
  {
    title: `Narrative Writer`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    icon: `lucide:pen-tool`
  }
])

const projectsLinks = ref([
  {
    label: `View me on GitHub`,
    color: `secondary`,
    variant: `subtle`,
    trailingIcon: `mdi:github`,
    to: `https://github.com/idantitydotme`
  }
])

const musicFeatures = ref([
  {
    title: `DJ`,
    description: `I'm a DJ specializing in Hyperpop, Glitchcore, and Hyperflip.`,
    icon: `lucide:disc-3`
  },
  {
    title: `Guitarist`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    icon: `lucide:guitar`
  },
  {
    title: `Pianist`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    icon: `lucide:piano`
  }
])

const musicLinks = ref([
  {
    label: `View me on Spotify`,
    color: `secondary`,
    variant: `subtle`,
    trailingIcon: `mdi:spotify`,
    to: `https://open.spotify.com/user/v5m4qoc9j35ccc6nbzqcookvj?si=d795f9bc1cb34222`
  }
])
</script>

<template>
  <UPage>
    <UPageHero
      title="Rimelight Entertainment"
      description="Welcome to Rimelight Entertainment."
      headline="Tell your story."
      orientation="horizontal"
      reverse
    >
      <NuxtImg
        src="https://cdn.idantity.me/images/logos/logomark-white.webp"
        alt="idantity.me"
      />
    </UPageHero>
    <UPageSection
      variant="outline"
      title="me.projects"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      headline="Development"
      icon="lucide:squares-unite"
      :features="projectsFeatures"
      :links="projectsLinks"
      orientation="horizontal"
    >
      <RLPlaceholder class="h-full" />
    </UPageSection>
    <UPageSection
      variant="outline"
      title="me.music"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      headline="Music"
      icon="lucide:music"
      :features="musicFeatures"
      :links="musicLinks"
      orientation="horizontal"
      reverse
    >
      <RLPlaceholder class="h-full" />
    </UPageSection>
  </UPage>
</template>

<style scoped></style>
