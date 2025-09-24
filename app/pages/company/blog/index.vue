<script setup lang="ts">
const route = useRoute()

const { data: posts } = await useAsyncData(route.path, () => queryCollection(`blog`).order(`datePosted`, `DESC`).
  all())

const formatDate = (date: string) => {
  return useDateFormat(date, `DD/MM/YYYY`).value
}

const {
  title = `Blog`,
  description = `Read the latest blog posts and company updates.`
} = defineProps<{
  title?: string
  description?: string
}>()

useHead({
  link: [
    {
      rel: `alternate`,
      type: `application/atom+xml`,
      title: `Rimelight Entertainment Blog RSS`,
      href: `https://rimelight.com/blog/rss.xml`
    }
  ]
})

const links = [
  {
    icon: `lucide:rss`,
    label: `RSS`,
    to: `/blog/rss.xml`,
    target: `_blank`
  }
]
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="title"
      :description="description"
      :links="links"
    >
      <template #description>
        <RLLayoutBox
          direction="vertical"
          gap="md"
        >
          {{ description }}
          <RLNewsletterSignup
            label="Subscribe to the Rimelight Entertainment Newsletter"
            description="Stay updated on new blog posts and company updates. Unsubscribe at any time."
          />
        </RLLayoutBox>
      </template>
    </UPageHeader>
    <UPageBody>
      <UBlogPosts class=" md:grid-cols-2 lg:grid-cols-3">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="post.path"
          :to="post.path"
          :image="{
            src: post.image?.src,
            alt: post.image?.alt,
            width: (index === 0 ? 672 : 437),
            height: (index === 0 ? 378 : 246),
          }"
          :badge="{ label: post.category, color: 'primary', variant: 'subtle' }"
          :date="formatDate(post.datePosted)"
          :title="post.title"
          :description="post.description"
          :authors="post.authors?.map(author => ({ ...author, avatar: { ...author.avatar, alt: `${author.name} Avatar` } }))"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="subtle"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
