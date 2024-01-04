'use client'
import useTrans from "@/lib/hooks/use-translation"
import ProductItem from "../products/ProductItem";
import useProducts from "@/lib/hooks/use-products";

export default function FilterCollection() {
    const trans = useTrans();
    const { products } = useProducts({ categoryCode: '' });

    return (
        <section id="section-collection-home" className="section section-collection">
            <div className="wrapper-heading-home text-center">
                <div className="container">
                    <div className="groupTitle-home">
                        <h2>
                            <a href="/collections/tat-ca">
                                {trans.collections.all}
                            </a>
                        </h2>
                        <p>{trans.collections.updateNewProduct}</p>
                    </div>
                </div>
            </div>
            <div className="wrapper-collection-1">
                <div className="container">
                    <div className="row">
                        <div className="content-product-list">
                            {products.map((product, index) => (
                                <ProductItem product={product} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}