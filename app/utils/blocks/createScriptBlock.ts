import { createBaseBlock } from "./createBaseBlock";
import type { ScriptBlockAttrs, ScriptBlockData } from "@/types/blocks";

/**
 * Creates a new Script Block data object.
 * @param initialData Optional initial data to pre-fill the block attributes.
 * @returns A new ScriptBlockData object.
 */
export const createScriptBlock = (
    initialData?: Partial<ScriptBlockData>,
): ScriptBlockData => {
    const defaultAttrs: ScriptBlockAttrs = {
        characters: [],
        aPlot: [{ type: "text", text: "" }],
        bPlot: [{ type: "text", text: "" }],
        cPlot: [{ type: "text", text: "" }],
        stinger: [{ type: "text", text: "" }],
        title: [{ type: "text", text: "" }],
        synopsis: [{ type: "text", text: "" }],
    };

    const mergedAttrs: ScriptBlockAttrs = {
        ...defaultAttrs,
        ...initialData?.attrs,
    };

    const defaultSlots = {
        act1: [],
        act2: [],
        act3: [],
    };
    const mergedSlots = {
        ...defaultSlots,
        ...initialData?.slots,
    };

    return createBaseBlock<ScriptBlockData>("script", {
        attrs: mergedAttrs,
        slots: mergedSlots,
    });
};