import { useCallback, useEffect, useState } from "react";
import { ProductItemType, ProductSearch } from "@/types/product-type";
import { getProducts } from "@/lib/actions/product.action";
import { reduceProducts } from "../utils";
import { useAtom, useAtomValue } from "jotai";
import { customProductAtom, formSearchStoreAtom, productDataAtom } from "@/lib/stores/products";

export default function useProducts({ ...initialFormData }: ProductSearch) {
    const [products, setProducts] = useState<ProductItemType[]>([]);
    const [productAtom, setProductAtom] = useAtom(productDataAtom);
    const [getProductAtom] = useAtom(customProductAtom);
    const searchFormData = useAtomValue(formSearchStoreAtom);

    const onLoadProducts = async () => {
        const response = await getProducts({ categoryCode: initialFormData.categoryCode });
        if (response.code === 'error' || (response.code === 'success' && response.data.code === (-1))
            || (response.code === 'success' && !response.data.data)) {
            return;
        }
        const data = !Array.isArray(response.data.data) ? [response.data.data] : [...response.data.data];
        setProductAtom(data);
    }

    const onSearchProducts = useCallback(async () => {
        if (!getProductAtom.length) return;
        console.log(searchFormData)
        console.log('getProductAtom ', getProductAtom)
        let searchData: ProductItemType[] = [];
        let hashMapData: any[] = [];

        if (initialFormData.categoryCode) {
            searchData = getProductAtom.filter(x => initialFormData.categoryCode === x.categoryCode);
        }
        if (Array.isArray(searchFormData.sizes) && searchFormData.sizes.length) {
            if(!searchData.length) searchData = [...getProductAtom];
            searchData = searchData.filter(el => {
                if (searchFormData.sizes?.includes(el.sizes)) return el;
            });
        }
        if (Array.isArray(searchFormData.colors) && searchFormData.colors.length) {
            if(!searchData.length) searchData = [...getProductAtom];
            searchData = searchData.filter(el => {
                if (searchFormData.colors?.every(color => color.indexOf(el.colors) !== (-1))) return el;
            })
        }
        console.log(searchData)
        if (!searchData.length) hashMapData = reduceProducts(getProductAtom);
        else hashMapData = reduceProducts(searchData);
        setProducts([...hashMapData]);
    }, [getProductAtom, initialFormData.categoryCode, JSON.stringify(searchFormData)])

    useEffect(() => {
        onLoadProducts();
    }, [])

    useEffect(() => {
        getProductAtom.length && onSearchProducts();
    }, [getProductAtom, initialFormData.categoryCode, JSON.stringify(searchFormData)])

    return [products] as const;
}