import { CategoryItem } from "@/types/base-type";
import { atom } from "jotai";

export const categoryCommonAtom = atom<CategoryItem[]>([]);

export const customCategoryAtom = atom(
    (get) => get(categoryCommonAtom)
)