<script setup lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

const boxVariants = tv({
	base: "flex",
	variants: {
		position: {
			static: "static",
			relative: "relative",
			absolute: "absolute",
			fixed: "fixed",
			sticky: "sticky",
		},
		direction: {
			vertical: "flex-col",
			horizontal: "flex-row",
		},
		padding: {
			xs: "p-1",
			sm: "p-2",
			md: "p-4",
			lg: "p-8",
			xl: "p-10",
		},
		gap: {
			xs: "gap-1",
			sm: "gap-2",
			md: "gap-4",
			lg: "gap-8",
			xl: "gap-12",
		},
		alignItems: {
			start: "items-start",
			end: "items-end",
			center: "items-center",
			baseline: "items-baseline",
			stretch: "items-stretch",
		},
		justifyContent: {
			start: "justify-start",
			end: "justify-end",
			center: "justify-center",
			between: "justify-between",
			around: "justify-around",
			evenly: "justify-evenly",
		},
	},
	defaultVariants: {
		position: "relative",
		direction: "vertical",
	},
});

type BoxVariantsProps = VariantProps<typeof boxVariants>;

interface Props {
	/**
	 * Sets the HTML tag to render the box as.
	 * @default 'div'
	 */
	tag?: string;
	/**
	 * Sets the positioning of the box.
	 * @default 'relative'
	 */
	position?: BoxVariantsProps["position"];
	/**
	 * Defines the flex direction of the box.
	 * @default 'vertical'
	 */
	direction?: BoxVariantsProps["direction"];
	/**
	 * Sets the padding around the content within the box.
	 */
	padding?: BoxVariantsProps["padding"];
	/**
	 * Sets the gap between child elements within the box.
	 */
	gap?: BoxVariantsProps["gap"];
	/**
	 * Aligns items along the cross-axis.
	 */
	alignItems?: BoxVariantsProps["alignItems"];
	/**
	 * Justifies content along the main axis.
	 */
	justifyContent?: BoxVariantsProps["justifyContent"];
}

const props = withDefaults(defineProps<Props>(), {
	tag: "div",
	position: "relative",
	direction: "vertical",
	padding: undefined,
	gap: undefined,
	alignItems: undefined,
	justifyContent: undefined,
});
</script>

<template>
  <component
    :is="props.tag"
    :class="boxVariants(props)"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style scoped>

</style>