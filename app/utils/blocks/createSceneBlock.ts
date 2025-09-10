import { createBaseBlock } from "./createBaseBlock";
import type { SceneBlockData } from "@/types/blocks";

/**
 * Creates a new Scene Block data object.
 * @param initialData Optional initial data to pre-fill the block attributes.
 * @returns A new SceneBlockData object.
 */
export const createSceneBlock = (
    initialData?: Partial<SceneBlockData>,
): SceneBlockData => {
    return createBaseBlock<SceneBlockData>("scene", {
        attrs: {
            location: initialData?.attrs?.location || "",
            timeOfDay: initialData?.attrs?.timeOfDay || "MORNING",
            setting: initialData?.attrs?.setting || "INTERIOR",
            transition: initialData?.attrs?.transition || "CUT_TO_SCENE",
            description: initialData?.attrs?.description || "",
            ...initialData?.attrs,
        },
        slots: {
            default: initialData?.slots?.default || [],
            ...initialData?.slots,
        },
    });
};