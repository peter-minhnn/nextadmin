import { useCallback, useEffect, useState } from "react";
import { ProductItemType, ProductSearch } from "@/types/product-type";
import { getProducts } from "@/lib/actions/product.action";
import { reduceProducts } from "../utils";
import { useAtom, useAtomValue } from "jotai";
import { customProductAtom, formSearchStoreAtom, productDataAtom } from "@/lib/stores/products";
import moment from "moment";

export default function useProducts({ ...initialFormData }: ProductSearch) {
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductItemType[]>([]);
    const [productAtom, setProductAtom] = useAtom(productDataAtom);
    const [getProductAtom] = useAtom(customProductAtom);
    const searchFormData = useAtomValue(formSearchStoreAtom);

    const onLoadProducts = async () => {
        const response = await getProducts({ categoryCode: initialFormData.categoryCode });
        if (response.code === 'error' || (response.code === 'success' && response.data.code === (-1))
            || (response.code === 'success' && !response.data.data)) {
            setLoading(false);
            return;
        }
        const data = !Array.isArray(response.data.data) ? [response.data.data] : [...response.data.data];
        setProductAtom(data);
    }

    const onSearchProducts = useCallback(async () => {
        console.log(searchFormData)
        if (!getProductAtom.length) return;
        
        let searchData: ProductItemType[] = [];
        let hashMapData: any[] = [];
        let _isSearched: boolean = false;

        if (initialFormData.categoryCode) {
            searchData = getProductAtom.filter(x => initialFormData.categoryCode === x.categoryCode);
            _isSearched = true;
        }

        if (Array.isArray(searchFormData.sizes) && searchFormData.sizes.length) {
            if (!searchData.length) searchData = [...getProductAtom];
            searchData = searchData.filter(el => {
                if (searchFormData.sizes?.includes(el.sizes)) return el;
            });
            _isSearched = true;
        }

        if (Array.isArray(searchFormData.colors) && searchFormData.colors.length) {
            if (!searchData.length) searchData = [...getProductAtom];
            searchData = searchData.filter(el => {
                if (!searchFormData.colors) return;
                for (let index = 0; index < searchFormData.colors.length; index++) {
                    const element = searchFormData.colors[index];
                    if (element.indexOf(el.colors) === (-1)) continue;
                    break;
                }
                return el;
            })
            _isSearched = true;
        }

        if (searchFormData.sortType) {
            if (!searchData.length && !_isSearched) searchData = [...getProductAtom];
            searchData.sort((a: any, b: any) => {
                if (searchFormData.sortType === 'price-descending') return (b.salePrice - a.salePrice);
                if (searchFormData.sortType === 'title-ascending') return (a.productName - b.productName);
                if (searchFormData.sortType === 'title-descending') return (b.productName - a.productName);
                if (searchFormData.sortType === 'created-ascending') return (moment(a.createdDate).toDate().getTime() - moment(b.createdDate).toDate().getTime());
                if (searchFormData.sortType === 'created-descending') return (moment(b.createdDate).toDate().getTime() - moment(a.createdDate).toDate().getTime());
                return (a.salePrice - b.salePrice);
            })
            _isSearched = true;
        }

        if (!searchData.length && !_isSearched) hashMapData = reduceProducts(getProductAtom);
        else hashMapData = reduceProducts(searchData);
        setProducts([...hashMapData]);
        setTimeout(() => {
            setLoading(false);
        }, 100)
    }, [getProductAtom, initialFormData.categoryCode, JSON.stringify(searchFormData)])

    useEffect(() => {
        !getProductAtom.length && onLoadProducts();
    }, [])

    useEffect(() => {
        console.log('onSearchProducts')
        getProductAtom.length && onSearchProducts();
    }, [getProductAtom, initialFormData.categoryCode, JSON.stringify(searchFormData)])

    return { products, loading } as const;
}