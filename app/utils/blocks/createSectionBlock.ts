import { createBaseBlock } from "./createBaseBlock";
import type { SectionBlockData } from "@/types/blocks";

/**
 * Helper function to create a new Section Block with default data.
 * @param initialData Optional initial data to pre-fill the block attributes and slots.
 * @returns A new SectionBlockData object.
 */
export const createSectionBlock = (
    initialData?: Partial<SectionBlockData>,
): SectionBlockData => {
    return createBaseBlock<SectionBlockData>("section", {
        attrs: {
            title: initialData?.attrs?.title || "",
            ...initialData?.attrs,
        },
        slots: {
            default: initialData?.slots?.default || [],
            ...initialData?.slots,
        },
    });
};