import { createBaseBlock } from "./createBaseBlock";
import type { DialogueBlockData } from "@/types/blocks";

/**
 * Creates a new Dialogue Block data object.
 * @param initialData Optional initial data to pre-fill the block attributes.
 * @returns A new DialogueBlockData object.
 */
export const createDialogueBlock = (
    initialData?: Partial<DialogueBlockData>,
): DialogueBlockData => {
    return createBaseBlock<DialogueBlockData>("dialogue", {
        attrs: {
            character: initialData?.attrs?.character || "",
            parenthetical: initialData?.attrs?.parenthetical || "",
            line: initialData?.attrs?.line || "",
        },
    });
};