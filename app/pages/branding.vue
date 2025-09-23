<script setup lang="ts">
useHead({
  title: `Branding`
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader title="Branding" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      <UPageBody>
        <UPageSection title="Logo" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
          <RLH3>Logomark</RLH3>
          <RLH1>Logomark</RLH1>
          <RLH3>Logotype</RLH3>
        </UPageSection>
        <UPageSection title="Colors" description="The color palette used across our branding.">
          <RLH3>Logo</RLH3>
          <UPageGrid>
            <ColorSwatch
              hex="#dc1414"
              rgb="rgb(220, 20, 20)"
              hsl="hsl(0, 83%, 47%)"
              cmyk="cmyk(0,91,91,14)"
              oklch="oklch(0.5674 0.2248 28.47)"
            />
            <QKColorSwatch
              hex="#ff740d"
              rgb="rgb(255, 116, 13)"
              hsl="hsl(26, 100%, 53%)"
              cmyk="cmyk(0,55,95,0)"
              oklch="oklch(0.7147 0.1927 47.59)"
            />
            <QKColorSwatch
              hex="#f7d10c"
              rgb="rgb(247, 209, 12)"
              hsl="hsl(50, 94%, 51%)"
              cmyk="cmyk(0,15,95,3)"
              oklch="oklch(0.8674 0.1769 95.55)"
            />
            <QKColorSwatch
              hex="#03991c"
              rgb="rgb(3, 153, 28)"
              hsl="hsl(130, 96%, 31%)"
              cmyk="cmyk(98,0,82,40)"
              oklch="oklch(0.593 0.1928 143.76)"
            />
            <QKColorSwatch
              hex="#2223a1"
              rgb="rgb(34, 35, 161)"
              hsl="hsl(240, 65%, 38%)"
              cmyk="cmyk(79,78,0,37)"
              oklch="oklch(0.3639 0.1934 271.16)"
            />
            <QKColorSwatch
              hex="#7f189b"
              rgb="rgb(127, 24, 155)"
              hsl="hsl(287, 73%, 35%)"
              cmyk="cmyk(18,85,0,39)"
              oklch="oklch(0.449 0.2 317.37)"
            />
          </UPageGrid>
          <RLH3>Primary</RLH3>
          <RLH3>Secondary</RLH3>
          <RLH3>Info</RLH3>
          <RLH3>Success</RLH3>
          <RLH3>Warning</RLH3>
          <RLH3>Error</RLH3>
          <RLH3>Neutral</RLH3>
        </UPageSection>
        <UPageSection title="Fonts" description="The fonts used across our branding.">
          <H3>Monospace</H3>
          <p>Any monospaced sections such as code blocks are rendered using the <a href="https://jetbrains.com/lp/mono" class="font-mono">JetBrains Mono</a> font.</p>
        </UPageSection>
      </UPagebody>
    </UPage>
  </UContainer>
</template>

<style scoped>

</style>
