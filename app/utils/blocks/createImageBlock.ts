import { createBaseBlock } from "./createBaseBlock";
import type { ImageBlockData } from "@/types/blocks";

/**
 * Creates a new Image Block data object.
 * @param initialData Optional initial data to pre-fill the block attributes.
 * @returns A new ImageBlockData object.
 */
export const createImageBlock = (
    initialData?: Partial<ImageBlockData>,
): ImageBlockData => {
    return createBaseBlock<ImageBlockData>("image", {
        attrs: {
            src: "",
            alt: "",
            fileName: "",
            ...initialData?.attrs,
        },
    });
};