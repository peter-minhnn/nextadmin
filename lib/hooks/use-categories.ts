import { useEffect } from "react";
import { useAtom } from "jotai";
import { categoryCommonAtom, customCategoryAtom } from "@/lib/stores/categories";
import { getCategories } from "@/lib/actions/category.action";
import { CategoryItem } from "@/types/base-type";

export default function useCategories() {
    const [categoriesCommon, setCategoriesCommon] = useAtom(categoryCommonAtom);
    const [categories] = useAtom(customCategoryAtom);

    const onLoad = async () => {
        const response = await getCategories();
        if (response.code === 'error') return;
        if (response.code === 'success') {
            if (response.data.code === (-1)) return;
        }
        if (!response.data.data) return;
        if (!Array.isArray(response.data.data)) {
            const data = response.data.data as CategoryItem;
            setCategoriesCommon([data]);
            return;
        }
        const data = response.data.data as CategoryItem[];
        setCategoriesCommon(data);
    }

    useEffect(() => { !categories.length && onLoad() }, [categories])

    return [categories] as const;
}