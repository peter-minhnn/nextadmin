'use client'
import { useSearchParams } from "next/navigation";
import ProductItem from "./ProductItem"
import useProducts from "@/lib/hooks/use-products";

const Products = () => {
    const searchParams = useSearchParams();
    const [products] = useProducts({ 
        categoryCode: searchParams.get('categoryCode') as string
    });

    return (
        <div className="content-product-list product-list filter clearfix">
            {products.map((product, index) => (
                <ProductItem product={product} key={index} />
            ))}
        </div>
    )
}

export default Products