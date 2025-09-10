import { createBaseBlock } from "./createBaseBlock";
import type { CalloutBlockData, TextNode } from "@/types/blocks";

/**
 * Creates a new Callout Block data object.
 * @param initialData Optional initial data to pre-fill the block attributes.
 * @returns A new CalloutBlockData object.
 */
export const createCalloutBlock = (
    initialData?: Partial<CalloutBlockData>,
): CalloutBlockData => {
    return createBaseBlock<CalloutBlockData>("callout", {
        attrs: {
            variant: initialData?.attrs?.variant || "note",
            text: Array.isArray(initialData?.attrs?.text)
                ? initialData?.attrs?.text
                : ([{ type: "text", text: String(initialData?.attrs?.text || "") }] as TextNode[]),
        },
    });
};