import { v7 as uuidv7 } from "uuid";
import type { BlockData } from "@/types/blocks";

export function createBaseBlock<T extends BlockData>(
    type: T["type"],
    initialData?: Partial<T>,
): T {
    const base = {
        id: uuidv7(),
        type: type,
    };
    const block: T = { ...base, ...initialData } as T;
    block.slots = block.slots || {};
    return block;
}