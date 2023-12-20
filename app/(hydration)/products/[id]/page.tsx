'use client'
import { useWrapperContext } from "@/lib/context/WrapperContext";
import useTrans from "@/lib/hooks/useTrans";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageGallery from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";

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

class Inputs {
    size: string = 'M';
    color: string = 'den';

}

const ProductDetail = () => {
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

    const handleSelectedColor = useCallback(() => {
        watch('color') === 'den' && setSelectedColor(trans.colors.den)
        watch('color') === 'trang' && setSelectedColor(trans.colors.trang)
        watch('color') === 'xam' && setSelectedColor(trans.colors.xam)
    }, [watch('color'), selectedColor])

    useEffect(() => {
        context.contextValue({ pageTitle: 'Product Detail' })
        context.updateBreadcrumbContext([
            trans.breadcrumbs.products.category,
            trans.breadcrumbs.products.product,
            ''
        ])
        setValue('color', 'den')
        setValue('size', 'M')
    }, [])

    useEffect(() => {
        handleSelectedColor();
    }, [watch('color')])

    return (
        <div id='product' className="productDetail-page">
            <div className="container">
                <div className="row product-detail-wrapper">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="row product-detail-main pr_style_03">
                            <div className="col-md-6 col-sm-12 col-xs-12 product-content-img n_padding">
                                <ImageGallery items={images} showFullscreenButton thumbnailPosition={'left'} lazyLoad showPlayButton={false} />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 product-content-desc">
                                <div className="product-title">
                                    <h1>8BALL CORP TEE</h1>
                                    <span className="pro-soldold hidden"></span>
                                </div>
                                <div className="product-price" id="price-preview">
                                    <span className="pro-sale">-32%</span>
                                    <span className="pro-price">850,000₫</span>
                                    <del>1,250,000₫</del>
                                </div>
                                <form id="add-item-form" action="/cart/add" method="post" className="variants clearfix">
                                    <div className="select clearfix">
                                        <div className="selector-wrapper">
                                            <label htmlFor="product-select-option-0">{trans.collections.size}</label>
                                            <span className="custom-dropdown custom-dropdown--white">
                                                <select className="single-option-selector custom-dropdown__select custom-dropdown__select--white" data-option="option1" id="product-select-option-0">
                                                    <option value="M">M</option><option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                </select></span>
                                        </div>
                                        <div className="selector-wrapper">
                                            <label htmlFor="product-select-option-1">{trans.collections.color}</label>
                                            <span className="custom-dropdown custom-dropdown--white">
                                                <select className="single-option-selector custom-dropdown__select custom-dropdown__select--white" data-option="option2" id="product-select-option-1">
                                                    <option value="ĐEN">ĐEN</option>
                                                </select>
                                            </span>
                                        </div>
                                        <select id="product-select" name="id" style={{ display: 'none' }}>
                                            <option value="1105376883">M / ĐEN - 850,000₫</option>
                                            <option value="1105376884">L / ĐEN - 850,000₫</option>
                                            <option value="1105376885">XL / ĐEN - 850,000₫</option>
                                        </select>
                                    </div>
                                    <div className="select-swatch clearfix ">
                                        <div id="variant-swatch-0" className="swatch clearfix" data-option="option1" data-option-index="0">
                                            <div className="header-swatch">{trans.collections.size}:
                                            </div>
                                            <div className="select-swap clearfix">
                                                <div className="n-sd swatch-element m">
                                                    <input className="variant-0" id="swatch-0-m" type="radio" value='M' {...register('size')} defaultValue={undefined} />
                                                    <label htmlFor="swatch-0-m">
                                                        <FontAwesomeIcon icon={faCheckCircle} width={17} height={17} size='lg' />
                                                        <span style={{ marginLeft: 2 }}>M</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="variant-swatch-1" className="swatch clearfix" data-option="option2" data-option-index="1">
                                            <div className="header-swatch">{trans.collections.color}:
                                                <span className="">{selectedColor}</span>
                                            </div>
                                            <div className="select-swap clearfix">
                                                <div className="n-sd swatch-element color den">
                                                    <div className="tooltip">ĐEN</div>
                                                    <input className="variant-1" id="swatch-1-den" type="radio" value="den" {...register('color')} defaultValue={undefined} />
                                                    <label className={`den ${watch('color') === 'den' && 'sd'}`} htmlFor="swatch-1-den">
                                                        <FontAwesomeIcon icon={faCircle} width={30} height={30} style={{ fontSize: '2.3em' }} className="den" />
                                                        <span>ĐEN</span>
                                                    </label>
                                                </div>
                                                <div className="n-sd swatch-element color trang">
                                                    <div className="tooltip">TRẮNG</div>
                                                    <input className="variant-1" id="swatch-1-trang" type="radio" value="trang" {...register('color')} defaultValue={undefined} />
                                                    <label className={`trang ${watch('color') === 'trang' && 'sd'}`}  htmlFor="swatch-1-trang">
                                                        <FontAwesomeIcon icon={faCircle} width={30} height={30} style={{ fontSize: '2.3em' }} />
                                                        <span>TRẮNG</span>
                                                    </label>
                                                </div>
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
                                                <a id="proTabs1" href="#">Mô tả</a>
                                            </li>
                                            <li
                                                className={`${tabActive === 'tab2' ? 'active' : ''}`}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    setTabActive('tab2')
                                                }}>
                                                <a id="proTabs3" href="#">Chính sách đổi trả</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className={`tab-pane ${tabActive === 'tab1' ? 'active' : ''}`} id="proTabs1">
                                                <div className="description-productdetail">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;