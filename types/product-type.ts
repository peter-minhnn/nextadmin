import { CommonColumns } from "./base-type";

export type ProductSearch = {
    categoryCode?: string;
    status?: string;
    colors?: string[];
    sizes?: string[];
    sortType?: string;
}

export interface ProductItemType extends CommonColumns {
    id: number;
    productName: string;
    productCode: string;
    categoryCode: string;
    categoryName: string;
    description: string;
    colors: string;
    colorArr: string[];
    sizeArr: string[];
    sizes: string;
    productDetailId: number;
    costPrice: number;
    salePrice: number;
    discountPercentage: number;
    totalQuantity: number;
    currentItemStock: number;
    frontImage: any;
    frontImageMimeType: string;
    backImage: any;
    backImageMimeType: string;
    status: string;
    rowNumber?: number;
}

export interface ProductDetailItem extends CommonColumns {
    productDetailId: number;
    productCode: string;
    colors: string;
    colorNames: string;
    sizes: string;
    currentStock: number;
}

export const ProductStatus = ['Sắp về hàng', 'Hết hàng', 'Còn hàng', 'Bán chạy'];
export const ProductStatusClass = ['comming-soon', 'sold-out', 'available', 'hot-sale'];
export const Colors: Record<string, any> = {
    'den': 'ĐEN',
    'trang': 'TRẮNG',
    'xam': 'XÁM'
};