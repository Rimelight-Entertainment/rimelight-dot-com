import { createBaseBlock } from "./createBaseBlock";
import type { ParagraphBlockData, TextNode } from "@/types/blocks";

/**
 * Creates a new Paragraph Block data object.
 * @param initialData Optional initial data to pre-fill the block attributes.
 * @returns A new ParagraphBlockData object.
 */
export const createParagraphBlock = (
    initialData?: Partial<ParagraphBlockData>,
): ParagraphBlockData => {
    const mergedAttrs = {
        text: initialData?.attrs?.text || ([{ type: "text", text: "" }] as TextNode[]),
        ...initialData?.attrs,
    };

    return createBaseBlock<ParagraphBlockData>("paragraph", {
        attrs: mergedAttrs,
    });
};