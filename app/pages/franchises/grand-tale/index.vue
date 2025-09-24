<script setup lang="ts">
definePageMeta({
  layout: "grand-tale"
})

const heroLinks = ref([
  {
    label: "Play Now",
    to: ""
  },
  {
    variant: "outline",
    color: "neutral",
    icon: "lucide:square-play",
    label: "Watch Trailer",
    to: "/franchises/grand-tale/about"
  }
])
</script>

<template>
  <UPage>
    <UPageHero
      title="May the story never end!"
      :links="heroLinks"
      reverse
      class="bg-cover bg-[url('/placeholders/grand-tale-hero-background2.webp')]"
    >
      <div class="flex justify-center">
        <img src="/placeholders/grand-tale-logo.webp" />
      </div>
    </UPageHero>
    <UPageSection
      title="What is Grand Tale?"
      description="In the game, players control a character called “Ori”, with which they
must gather resources, upgrade their estate, learn about the world
around them, and optionally engage in various Tales, which are sub-games
hosted within Grand Tale's world and plug in to the various systems of
the base experience."
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
    />
  </UPage>
</template>

<style scoped></style>
