<script setup lang="ts">
import { computed, ref } from 'vue';
import { type CalloutVariant } from "~/types/blocks/calloutBlock"
import { tv } from "tailwind-variants";

interface CalloutBlockProps {
  isEditable?: boolean
  to?: string
  variant?: CalloutVariant
}

const props = withDefaults(defineProps<CalloutBlockProps>(), {
  isEditable: false,
  variant: 'note',
});

const emit = defineEmits(['update:variant']);

// New internal state to manage the variant
const internalVariant = ref(props.variant);

const items = computed(() => {
  return (Object.keys(headingMap) as CalloutVariant[])
    .filter(key => key !== internalVariant.value)
    .map(key => ({
      variant: key,
      label: headingMap[key],
      icon: iconMap[key],
      description: tooltipMap[key]
    }))
})

const open = ref(false)

const handleSelect = (selectedItem: any) => {
  // Update the internal state first
  internalVariant.value = selectedItem.variant
  // Then, notify the parent of the change
  emit('update:variant', selectedItem.variant)
  open.value = false
}

const callout = tv({
  base: "rounded-md border w-full my-4",
  variants: {
    variant: {
      note: "bg-info-500/10 border-info-500/30",
      tip: "bg-success-500/10 border-success-500/30",
      warning: "bg-warning-500/10 border-warning-500/30",
      danger: "bg-error-500/10 border-error-500/30",
      commentaryInternal: "bg-commentary-500/10 border-commentary-500/30",
      commentaryExternal: "bg-commentary-500/10 border-commentary-500/30",
      ideation: "bg-ideation-500/10 border-ideation-500/30",
      creatorInternal: "bg-creator-500/10 border-creator-500/30",
      creatorExternal: "bg-creator-500/10 border-creator-500/30",
    },
  },
});

const icon = tv({
  variants: {
    variant: {
      note: "text-info-500",
      tip: "text-success-500",
      warning: "text-warning-500",
      danger: "text-error-500",
      commentaryInternal: "text-commentary-500",
      commentaryExternal: "text-commentary-500",
      ideation: "text-ideation-500",
      creatorInternal: "text-creator-500",
      creatorExternal: "text-creator-500",
    },
  },
});

const heading = tv({
  variants: {
    variant: {
      note: "text-info-600 dark:text-info-400",
      tip: "text-success-600 dark:text-success-400",
      warning: "text-warning-600 dark:text-warning-400",
      danger: "text-error-600 dark:text-error-400",
      commentaryInternal: "text-commentary-600 dark:text-commentary-400",
      commentaryExternal: "text-commentary-600 dark:text-commentary-400",
      ideation: "text-ideation-600 dark:text-ideation-400",
      creatorInternal: "text-creator-600 dark:text-creator-400",
      creatorExternal: "text-creator-600 dark:text-creator-400",
    },
  },
})

const iconMap = {
  note: "lucide:circle-alert",
  tip: "material-symbols:release-alert-outline-rounded",
  warning: "lucide:triangle-alert",
  danger: "lucide:octagon-alert",
  commentaryInternal: "tabler:alert-hexagon",
  commentaryExternal: "tabler:alert-hexagon",
  ideation: "lucide:badge-alert",
  creatorInternal: "lucide:shield-alert",
  creatorExternal: "lucide:shield-alert",
}

const headingMap = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  danger: "Danger",
  commentaryInternal: "Commentary (Internal)",
  commentaryExternal: "Commentary",
  ideation: "Ideation (Internal)",
  creatorInternal: "Creator's Remarks (Internal)",
  creatorExternal: "Creator's Remarks",
}

const tooltipMap = {
  note: "This callout is used for general notes.",
  tip: "This callout is for sharing tips and tricks.",
  warning: "This callout highlights potential issues or warnings.",
  danger: "This callout indicates critical information or danger.",
  commentaryInternal: "This callout is for internal commentary or notes not meant for external consumption.",
  commentaryExternal: "This callout is used for direct developer commentary.",
  ideation: "This callout is used for writing down ideas on a topic and brainstorming. Proper formatting within this block isn't strictly necessary.",
  creatorInternal: "This callout is used for direct commentary by Rimelight Entertainment's creator. This block is not visible to users.",
  creatorExternal: "This callout is used for direct commentary by Rimelight Entertainment's creator.",
}
</script>

<template>
  <RLLayoutBox
    direction="horizontal"
    padding="md"
    gap="md"
    :class="callout({ variant: internalVariant })"
  >
    <UTooltip :text="tooltipMap[internalVariant]" arrow>
      <UIcon v-if="!isEditable" :name="iconMap[internalVariant]" :class="icon({ variant: internalVariant })"/>
      <UPopover v-else v-model:open="open" arrow>
        <UButton variant="soft" size="xl" :leading-icon="iconMap[internalVariant]" :class="['w-fit h-fit', icon({ variant: internalVariant })]" />
        <template #content>
          <RLLayoutBox
            tag="ul"
            direction="vertical"
            class="w-96 max-h-96 overflow-y-auto"
          >
            <li v-for="item in items">
              <UButton
                :key="item.variant"
                variant="ghost"
                color="neutral"
                class="rounded-none w-full"
                @click="handleSelect(item)"
              >
                <RLLayoutBox
                  direction="horizontal"
                  padding="xs"
                  gap="sm"
                >
                  <UIcon :name="item.icon" :class="[icon({ variant: item.variant }), 'h-4 w-4  flex-shrink-0']" />
                  <RLLayoutBox
                    direction="vertical"
                    gap="xs"
                  >
                    <h6 class="font-bold text-sm text-start">{{ item.label }}</h6>
                    <p class="text-xs text-start">{{ item.description }}</p>
                  </RLLayoutBox>
                </RLLayoutBox>
              </UButton>
            </li>
          </RLLayoutBox>
        </template>
      </UPopover>
    </UTooltip>
    <RLLayoutBox direction="vertical" class="w-full">
      <H6 :class="heading({ variant: internalVariant })">{{ headingMap[internalVariant] }}</H6>
      <slot />
    </RLLayoutBox>
  </RLLayoutBox>
</template>

<style scoped>

</style>