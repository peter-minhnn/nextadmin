export type BaseReponse = {
    code: number;
    data?: any;
    message: string;
}

export interface CommonColumns {
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    deletedFlag?: number;
}

export interface CategoryItem extends CommonColumns {
    id?: number;
    categoryCode: string;
    categoryName: string;
    products?: number;
}