import { ProductItemType, ProductSearch } from '@/types/product-type';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const initialFormData: ProductSearch = {
    categoryCode: '',
    status: '',
    sizes: [],
    colors: [],
};

export const formSearchStoreAtom = atomWithStorage<ProductSearch>('product_search', initialFormData);

export const productDataAtom = atom<ProductItemType[]>([]);

export const customProductAtom = atom(
    (get) => get(productDataAtom),
)