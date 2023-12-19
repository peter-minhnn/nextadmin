'use client'
import { useWrapperContext } from "@/lib/context/WrapperContext";
import useTrans from "@/lib/hooks/useTrans";
import { useEffect } from "react";
import ImageGallery from "react-image-gallery";

const images: any[] = [
    {
        original: "https://product.hstatic.net/200000518745/product/z4458353941168_c3cd13891952b8dea1da9179a9bed9ce_a663b71b4f7846d698bd90bdbfa8895d_master.jpg",
        thumbnail: "https://product.hstatic.net/200000518745/product/z4458353941168_c3cd13891952b8dea1da9179a9bed9ce_a663b71b4f7846d698bd90bdbfa8895d_master.jpg",
    },
    {
        original: "https://product.hstatic.net/200000518745/product/z4458353944163_575e504f13da4eb9d12f4bea7cac55cb_f22c70069a84479e8845bae333ec3ecd_master.jpg",
        thumbnail: "https://product.hstatic.net/200000518745/product/z4458353944163_575e504f13da4eb9d12f4bea7cac55cb_f22c70069a84479e8845bae333ec3ecd_master.jpg",
    }
];

const ProductDetail = () => {
    const context = useWrapperContext();
    const trans = useTrans();

    useEffect(() => {
        context.contextValue({ pageTitle: 'Product Detail' })
        context.updateBreadcrumbContext([
            trans.breadcrumbs.products.category,
            trans.breadcrumbs.products.product,
            ''
        ])
    }, [])

    return (
        <div id='product' className="productDetail-page">
            <div className="container">
                <div className="row product-detail-wrapper">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="row product-detail-main pr_style_03">
                            <div className="col-md-6 col-sm-12 col-xs-12 product-content-img n_padding">
                                <ImageGallery items={images} showFullscreenButton thumbnailPosition={'left'} lazyLoad showPlayButton={false} />;
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;