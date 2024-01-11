'use client'
import { useSearchParams } from "next/navigation";
import ProductItem from "./ProductItem"
import useProducts from "@/lib/hooks/use-products";
import ProductPlaceHolder from "./ProductPlaceHolder";
import Image from "next/legacy/image";
import NoData from '@/public/assets/images/nodata.jpg';
import { useMemo } from "react";

const Products = () => {
    const searchParams = useSearchParams();
    const { products, loading } = useProducts({
        categoryCode: searchParams.get('categoryCode') as string
    });

    const createNoDataElement = useMemo(() => {
        return (
            <div className={`${products.length ? 'hidden' : ''}`}>
                <div className={`d-flex justify-content-center`} style={{ width: '100%', display: `${products.length ? 'none !important' : ''}` }}>
                    <Image src={NoData} width={500} height={500} alt="no-data" />
                </div>
            </div>
        )
    }, [products])

    if (!products.length && loading) {
        return (
            <div className="content-product-list product-list filter clearfix">
                <ProductPlaceHolder key={1} />
                <ProductPlaceHolder key={2} />
                <ProductPlaceHolder key={3} />
                <ProductPlaceHolder key={4} />
                <ProductPlaceHolder key={5} />
                <ProductPlaceHolder key={6} />
                <ProductPlaceHolder key={7} />
                <ProductPlaceHolder key={8} />
            </div>
        )
    }

    return (
        <>
            {createNoDataElement}
            <div className={`content-product-list product-list filter clearfix ${!products.length && 'hidden'}`}>
                {products.map((product, index) => {
                    return index <= 8 && (
                        <ProductItem product={product} key={index} />
                    )
                })}
            </div>
        </>
    )
}

export default Products