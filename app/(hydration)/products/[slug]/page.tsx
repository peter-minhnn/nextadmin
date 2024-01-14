'use client'
import { useWrapperContext } from "@/lib/context/WrapperContext";
import useTrans from "@/lib/hooks/use-translation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ImageGallery from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { getProductItem } from "@/lib/actions/product.action";
import { Colors, ProductItemType, ProductStatus, ProductStatusClass } from "@/types/product-type";
import { arrayBufferToBase64 } from "@/lib/utils";
import { routes } from "@/routes";
import ProductDetailPlaceHolder from "@/components/products/ProductDetailPlaceHolder";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useWindowResize from "@/lib/hooks/use-window-resize";
import { useWindowSize } from "@uidotdev/usehooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import useProducts from "@/lib/hooks/use-products";
import ProductItem from "@/components/products/ProductItem";

class Inputs {
    size: string = 'M';
    color: string = 'den';
}

type ProductDetailType = {
    params: { slug: string }
}

const ProductDetail = ({ params }: ProductDetailType) => {
    const context = useWrapperContext()
    const trans = useTrans()
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Inputs>()

    const [tabActive, setTabActive] = useState<string>('tab1')
    const [selectedColor, setSelectedColor] = useState<string>(trans.colors.den)
    const [selectedSize, setSelectedSize] = useState<string>('')
    const [colors, setColors] = useState<string[]>([]);
    const [productDetail, setProductDetail] = useState<ProductItemType[]>([]);
    const [product, setProduct] = useState<ProductItemType | null>(null);
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { width } = useWindowResize();
    const { width: windowWidth } = useWindowSize();
    const [selectedPosition, setSelectedPosition] = useState<any>('left')
    const { products } = useProducts({
        categoryCode: product?.categoryCode
    });
    const [recents, setRecents] = useState<ProductItemType[]>([]);

    const handleSelectedColor = useCallback(() => {
        watch('color') === 'den' && setSelectedColor(trans.colors.den)
        watch('color') === 'trang' && setSelectedColor(trans.colors.trang)
        watch('color') === 'xam' && setSelectedColor(trans.colors.xam)
    }, [watch('color'), selectedColor])

    const getDetail = async () => {
        context.setLoading(true);
        const response = await getProductItem({ slug: params.slug });
        if (response.code === 'error' || (response.code === 'success' && response.data.code === (-1))
            || (response.code === 'success' && !response.data.data)) {
            setLoading(false);
            return;
        }
        const data = !Array.isArray(response.data.data) ? [response.data.data] : [...response.data.data];
        setProductDetail(data);
        setProduct(handleGenerateProductItem(data) as ProductItemType)
    }

    const handleGenerateProductItem = (data: ProductItemType[] = []) => {
        if (!data.length) return;
        let sizes: string[] = [];
        data.filter(el => sizes.push(el.sizes));
        sizes.sort((a, b) => (a > b ? -1 : 1));
        setSelectedSize(sizes[0]);
        setImages([
            {
                original: arrayBufferToBase64(data[0].frontImage.data, data[0].frontImageMimeType),
                thumbnail: arrayBufferToBase64(data[0].frontImage.data, data[0].frontImageMimeType),
            },

            {
                original: arrayBufferToBase64(data[0].backImage.data, data[0].backImageMimeType),
                thumbnail: arrayBufferToBase64(data[0].backImage.data, data[0].backImageMimeType),
            }
        ])
        context.contextValue({ pageTitle: data[0].productName })
        context.updateBreadcrumbContext([
            { title: trans.breadcrumbs.products.category, path: routes.ecommerce.collections },
            { title: trans.breadcrumbs.products.product, path: routes.ecommerce.collections },
            { title: data[0].productName, path: '' },
        ])
        return {
            ...data[0],
            sizeArr: sizes
        } as ProductItemType
    }

    const getColors = useCallback(() => {
        const data = productDetail.find(x => x.sizes === selectedSize)?.colors.split(',');
        if (data?.length) {
            setColors(data);
            setValue('color', data[0]);
        }
    }, [selectedSize])

    const generateSlideItem = useMemo(() => {
        return recents.map((el, index) => (
            <SwiperSlide key={index} data-hash={index}>
                <ProductItem product={el} key={index} screenType="recent" />
            </SwiperSlide>
        ))
    }, [recents])

    useEffect(() => {
        handleSelectedColor();
    }, [watch('color')])

    useEffect(() => {
        params.slug && getDetail();
    }, [params])

    useEffect(() => {
        getColors();
    }, [selectedSize])

    useEffect(() => {
        if (width <= 500) setSelectedPosition('bottom');
        else setSelectedPosition('left');
    }, [width])

    useEffect(() => {
        if (!windowWidth) setSelectedPosition('left');
        if (windowWidth && windowWidth <= 500) setSelectedPosition('bottom');
        else setSelectedPosition('left');
    }, [windowWidth])

    useEffect(() => {
        if (!loading && !product) {
            toast.error(trans.errors.emptyProductDetail)
            router.push(routes.ecommerce.collections);
            context.setLoading(false);
        }
        if (product && Object.keys(product).length) {
            const filterRecentData = products.filter(el => el.productCode !== product.productCode);
            setRecents(filterRecentData);
            setTimeout(() => {
                setLoading(false);
                context.setLoading(false);
            }, 6000)
        }
    }, [product, loading])

    if (loading) return <ProductDetailPlaceHolder />;
    if (!product) return <ProductDetailPlaceHolder />;

    return (
        <div id='product' className="productDetail-page">
            <div className="container">
                <div className="row product-detail-wrapper">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="row product-detail-main pr_style_03">
                            <div className="col-md-6 col-sm-12 col-xs-12 product-content-img n_padding">
                                <ImageGallery items={images} showFullscreenButton thumbnailPosition={selectedPosition} lazyLoad showPlayButton={false} />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 product-content-desc">
                                <div className="product-title">
                                    <h1>{product.productName}</h1>
                                    <span className="pro-soldold hidden"></span>
                                </div>
                                <div className="product-price" id="price-preview">
                                    <span className={`pro-sale`} style={{ display: `${(product.discountPercentage === 0 || product.status === '1') ? 'none' : 'inline-block'}` }}>-{product.discountPercentage}%</span>
                                    <div className={`pro-sale product-sale-status ${!product.status && 'hidden'} ${ProductStatusClass[Number(product.status)]}`}>
                                        <span>{ProductStatus[Number(product.status)]}</span>
                                    </div>
                                    <span className="pro-price">{product.salePrice.toLocaleString('en-US')}₫</span>
                                    <del className={`${(product.costPrice === 0 || !product.costPrice) && 'hidden'}`}>{product.costPrice.toLocaleString('en-US')}₫</del>
                                </div>
                                <form id="add-item-form" className="variants clearfix">
                                    <div className="select clearfix">
                                        <div className="selector-wrapper">
                                            <label htmlFor="product-select-option-0">{trans.collections.size}</label>
                                            <span className="custom-dropdown custom-dropdown--white">
                                                <select
                                                    className="single-option-selector custom-dropdown__select custom-dropdown__select--white"
                                                    id="product-select-option-0"
                                                    onChange={(e) => setSelectedSize(e.currentTarget.value)}
                                                >
                                                    {product.sizeArr.map((size, index) => (
                                                        <option value={size} key={index}>{size}</option>
                                                    ))}
                                                </select>
                                            </span>
                                        </div>
                                        <div className="selector-wrapper">
                                            <label htmlFor="product-select-option-1">{trans.collections.color}</label>
                                            <span className="custom-dropdown custom-dropdown--white">
                                                <select className="single-option-selector custom-dropdown__select custom-dropdown__select--white" id="product-select-option-1">
                                                    {productDetail.filter(el => el.sizes === selectedSize).map((item, idx) => {
                                                        return item.colors.split(',').map((color, colorIdx) => (
                                                            <option value={color} key={colorIdx}>ĐEN</option>
                                                        ))
                                                    })}
                                                </select>
                                            </span>
                                        </div>
                                        {/* <select id="product-select" name="id" style={{ display: 'none' }}>
                                            <option value="1105376883">M / ĐEN - 850,000₫</option>
                                            <option value="1105376884">L / ĐEN - 850,000₫</option>
                                            <option value="1105376885">XL / ĐEN - 850,000₫</option>
                                        </select> */}
                                    </div>
                                    <div className="select-swatch clearfix ">
                                        <div id="variant-swatch-0" className="swatch clearfix" data-option="option1" data-option-index="0">
                                            <div className="header-swatch">{trans.collections.size}:
                                            </div>
                                            <div className="select-swap clearfix">
                                                {product.sizeArr.map((size, index) => (
                                                    <div className="n-sd swatch-element m" key={index}>
                                                        <input className="variant-0" id={size} type="radio"
                                                            value={size}
                                                            checked={selectedSize === size}
                                                            onChange={(e) => {
                                                                getColors();
                                                                setSelectedSize(e.currentTarget.value)
                                                            }}
                                                            defaultValue={undefined}
                                                        />
                                                        <label htmlFor={size}>
                                                            <FontAwesomeIcon icon={selectedSize === size ? faCheckCircle : faCircle} className={`${selectedSize !== size && 'unchecked'}`} width={17} height={17} size='lg' />
                                                            <span style={{ marginLeft: 5 }}>{size}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div id="variant-swatch-1" className="swatch clearfix" data-option="option2" data-option-index="1">
                                            <div className="header-swatch">{trans.collections.color}:
                                                <span className="">{selectedColor}</span>
                                            </div>
                                            <div className="select-swap clearfix">
                                                {colors.map((color, idx) => (
                                                    <div className={`n-sd swatch-element color ${color}`} key={idx}>
                                                        <div className="tooltip">{Colors[color]}</div>
                                                        <input
                                                            className="variant-1"
                                                            id={`swatch-1-${color}`}
                                                            type="radio"
                                                            value={color}
                                                            checked={watch('color') === color}
                                                            {...register('color')}
                                                            defaultValue={undefined}
                                                        />
                                                        <label className={`${color} ${watch('color') === color && 'sd'}`} htmlFor={`swatch-1-${color}`}>
                                                            <FontAwesomeIcon icon={faCircle} width={30} height={30} style={{ fontSize: '2.3em' }} className="den" />
                                                            <span>{Colors[color]}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="selector-actions">
                                        <div className="quantity-area">
                                            <input type="button" value="-" className="qty-btn btn-left-quantity" />
                                            <input type="text" id="quantity" name="quantity" value="1" min="1" className="quantity-selector" />
                                            <input type="button" value="+" className="qty-btn btn-right-quantity" />
                                        </div>
                                        <div className="wrap-addcart">
                                            <button type="button" id="add-to-cart" className="add-to-cartProduct button drakpay btn-addtocart" name="add">Thêm vào giỏ</button>
                                        </div>
                                    </div>
                                    <div className="product-action-bottom d-none">
                                        <div className="input-bottom">
                                            <input id="quan-input" name="quantiti_mb" type="number" value="1" min="1" />
                                        </div>
                                        <button type="button" id="add-to-cartbottom" className="add-to-cartProduct add-cart-bottom button drakpay" name="add">Thêm vào giỏ</button>
                                    </div> */}
                                </form>
                                <div className="product-description">
                                    <section className="proDetailInfo">
                                        <ul className="nav velaProductNavTabs nav-tabs" style={{ height: '29px' }}>
                                            <li
                                                className={`${tabActive === 'tab1' ? 'active' : ''}`}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    setTabActive('tab1')
                                                }}>
                                                <span id="proTabs1">{trans.collections.description}</span>
                                            </li>
                                            <li
                                                className={`${tabActive === 'tab2' ? 'active' : ''}`}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    setTabActive('tab2')
                                                }}>
                                                <span id="proTabs3">{trans.footer.returnPolicy}</span>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className={`tab-pane ${tabActive === 'tab1' ? 'active' : ''}`} id="proTabs1">
                                                <div className="description-productdetail">
                                                    <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                                                    <h2>{trans.collections.sizeChart}:</h2>
                                                    <p className="text-center">
                                                        <img src="//file.hstatic.net/200000518745/file/screen_shot_2022-05-27_at_01.42.35_bed92801869c4550aad16307fc44fe73_grande.png" />
                                                    </p>
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                            <div className={`tab-pane ${tabActive === 'tab2' ? 'active' : ''}`} id="proTabs2">
                                                <p>
                                                    <strong>1. Điều kiện đổi trả</strong>
                                                </p>
                                                <p>Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng&nbsp;ngay tại thời điểm giao/nhận hàng&nbsp;trong những trường hợp sau:</p>
                                                <ul>
                                                    <li>Hàng không đúng sản phẩm, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.</li>
                                                    <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li><li>Tình trạng bên trong bị&nbsp;lỗi do nhà sản xuất.</li>
                                                </ul>
                                                <p>&nbsp;Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn thành việc&nbsp;hoàn trả/đổi trả hàng hóa.&nbsp;</p><p>&nbsp;</p><p><strong>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</strong></p>
                                                <ul>
                                                    <li><strong>Thời gian thông báo đổi trả</strong>:&nbsp;trong vòng 24h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm bị lỗi do nhà sản xuất</li>
                                                    <li><strong>Thời gian gửi chuyển trả sản phẩm</strong>: trong vòng 7&nbsp;ngày kể từ khi nhận sản phẩm.</li>
                                                    <li><strong>Địa điểm đổi trả sản phẩm</strong>: Khách hàng có thể mang hàng trực tiếp đến cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.</li>
                                                </ul>
                                                <p>Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng&nbsp;của chúng tôi.</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className={`list-productRelated clearfix ${!recents.length && 'hidden'}`}>
                            <div className="heading-title text-center">
                                <h2>{trans.collections.related}</h2>
                            </div>
                            <div id="owlProductRelated">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        '@1.50': {
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {generateSlideItem}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;