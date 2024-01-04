import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons"
import { ProductItemType, ProductStatus, ProductStatusClass } from "@/types/product-type"
import Link from "next/link";
import { arrayBufferToBase64 } from "@/lib/utils";
import { routes } from "@/routes";

type ProductItemProps = {
    product: ProductItemType;
}

const ProductItem = ({ product }: ProductItemProps) => {

    return (
        <div className="col-md-3 col-sm-6 col-xs-6 pro-loop animated zoomIn" key={`${product.id}${product.rowNumber}`}>
            <div className="product-block product-resize site-animation fixheight" style={{ height: '355px' }}>
                <div className="product-img">
                    <div className={`product-sale ${(product.discountPercentage === 0 || product.status === '1') && 'hidden'}`}>
                        <span>-{product.discountPercentage}%</span>
                    </div>
                    <div className={`product-sale-status ${!product.status && 'hidden'} ${ProductStatusClass[Number(product.status)]}`}>
                        <span>{ProductStatus[Number(product.status)]}</span>
                    </div>
                    <Link href={routes.ecommerce.productDetail(product.productCode)} title={product.productName} className="image-resize fade-box" style={{ height: '268px' }}>
                        <picture>
                            <source
                                media="(max-width: 480px)"
                                src={arrayBufferToBase64(product.frontImage.data, product.frontImageMimeType)}
                            />
                            <source
                                media="(min-width: 481px) and (max-width: 767px)"
                                src={arrayBufferToBase64(product.frontImage.data, product.frontImageMimeType)}
                            />
                            <source
                                media="(min-width: 768px)"
                                src={arrayBufferToBase64(product.frontImage, product.frontImageMimeType)}
                            />
                            <img
                                className="img-loop ls-is-cached lazyloaded"
                                alt={product.productName}
                                src={arrayBufferToBase64(product.frontImage.data, product.frontImageMimeType)}
                            />
                        </picture>
                        <picture>
                            <source
                                media="(max-width: 480px)"
                                src={arrayBufferToBase64(product.backImage.data, product.backImageMimeType)}
                            />
                            <source
                                media="(min-width: 481px) and (max-width: 767px)"
                                src={arrayBufferToBase64(product.backImage.data, product.backImageMimeType)}
                            />
                            <source
                                media="(min-width: 768px)"
                                src={arrayBufferToBase64(product.backImage.data, product.backImageMimeType)}
                            />
                            <img
                                className="img-loop img-hover ls-is-cached lazyloaded"
                                alt={product.productName}
                                src={arrayBufferToBase64(product.backImage.data, product.backImageMimeType)}
                            />
                        </picture>
                    </Link>
                    <div className="productQuickView">
                        <Link className="btnProductQuickview" href={routes.ecommerce.productDetail(product.productCode)} title={product.productName}>
                            <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faSearchPlus}></FontAwesomeIcon>
                        </Link>
                    </div>
                    <div className="pro-price-mb">
                        <span className="pro-price">{product.salePrice.toLocaleString("en-US")}₫</span>
                        <span className="pro-price-del">
                            <del className={`compare-price ${(!product.costPrice || product.costPrice === 0) && 'hidden'}`}>
                                {product.costPrice.toLocaleString("en-US")}₫
                            </del>
                        </span>
                    </div>
                </div>
                <div className="product-detail clearfix">
                    <div className="box-pro-detail">
                        <h3 className="pro-name">
                            <Link href="/products/8ball-corp-tee-1" title={product.productName}>
                                {product.productName}
                            </Link>
                        </h3>
                        <div className="box-pro-prices">
                            <p className="pro-price highlight">
                                <span>{product.salePrice.toLocaleString("en-US")}₫</span>
                                <span className="pro-price-del">
                                    <del className={`compare-price ${(!product.costPrice || product.costPrice === 0) && 'hidden'}`}>
                                        {product.costPrice.toLocaleString("en-US")}₫
                                    </del>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="variantColor">
                        <ul>
                            {product.colors.split(',').map((color: string, colorIdx: number) => (
                                <li key={colorIdx} data-src="//hstatic.net/0/0/global/noDefaultImage6_large.gif" className="not-hover fade-box">
                                    <span className={`${color}`}></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem