'use client'
import { useWrapperContext } from '@/lib/context/WrapperContext'
import useLanguage from '@/lib/hooks/useLanguages'
import useTrans from '@/lib/hooks/useTrans'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortAlphaAsc, faSliders, faMinus } from "@fortawesome/free-solid-svg-icons"
import useOutsideAlerter from '@/lib/hooks/useOutsideAlerter'
import Products from '@/components/products/Product'

const Collections = () => {
    const clickOutSideRef = useRef<any>(null)
    const context = useWrapperContext()
    const trans = useTrans()
    const { currentLang } = useLanguage()
    const [openFilterSidebar, setOpenFilterSidebar] = useState<boolean>(false)
    const { isOutSide } = useOutsideAlerter(clickOutSideRef)

    useEffect(() => {
        context.contextValue({
            path: '',
            pageTitle: trans.seoTitle.collection,
            bodyClass: 'collection'
        })
        context.updateBreadcrumbContext([
            trans.breadcrumbs.collection.home,
            trans.breadcrumbs.collection.category,
            trans.breadcrumbs.collection.all
        ])
    }, [currentLang, context.language])

    useEffect(() => {
        context.contextValue({ bodyClass: `${openFilterSidebar ? 'collection open-filter' : ''}` })
    }, [openFilterSidebar, context.language])

    useEffect(() => {
        if (isOutSide) {
            context.contextValue({ bodyClass: '' })
            setOpenFilterSidebar(false)
        }
    }, [isOutSide])

    return (
        <div id='collection' className="collection-page">
            <div className='main-content container'>
                <div className='row'>
                    <div id='collection-body' className='wrap-collection-body clearfix'>
                        <div className="wrap-filter" ref={clickOutSideRef}>
                            <div className="filterTagFullwidthClose"></div>
                            <div className="box_sidebar">
                                <div className="block left-module">
                                    <div className="filter_xs">
                                        <div className="layered ">
                                            <div className="group-menu">
                                                <div className="title_block layered_subtitle dropdown-filter">
                                                    <span>{trans.collections.category}</span>
                                                    <span className="icon-control">
                                                        <i className="fa fa-minus"></i>
                                                    </span>
                                                </div>
                                                <div className="layered-content">
                                                    <ul className="menuList-links">
                                                        <li className="">
                                                            <a href="/collections/tee" title="T-SHIRT">
                                                                <span>T-SHIRT</span>
                                                            </a>
                                                        </li>
                                                        <li className="">
                                                            <a href="/collections/hoodie" title="HOODIE">
                                                                <span>HOODIE</span>
                                                            </a>
                                                        </li>
                                                        <li className="">
                                                            <a href="/collections/accessories" title="ACCESSORIES">
                                                                <span>ACCESSORIES</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="block_content">
                                                <div className="group-filter" aria-expanded="true">
                                                    <div className="layered_subtitle dropdown-filter">
                                                        <span>{trans.collections.brand}</span>
                                                        <span className="icon-control">
                                                            <FontAwesomeIcon icon={faMinus} onClick={() => setOpenFilterSidebar(false)} />
                                                        </span>
                                                    </div>
                                                    <div className="layered-content bl-filter filter-brand">
                                                        <ul className="check-box-list">
                                                            <li>
                                                                <input type="checkbox" id="data-brand-p1" value="STUSSY" name="brand-filter" data-vendor="(vendor:product=STUSSY)" />
                                                                <label htmlFor="data-brand-p1">STUSSY</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-brand-p2" value="Khác" name="brand-filter" data-vendor="(vendor:product=Khác)" />
                                                                <label htmlFor="data-brand-p2">{trans.collections.other}</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="group-filter" aria-expanded="true">
                                                    <div className="layered_subtitle dropdown-filter">
                                                        <span>{trans.collections.color}</span>
                                                        <span className="icon-control">
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </span>
                                                    </div>
                                                    <div className="layered-content filter-color s-filter">
                                                        <ul className="check-box-list">
                                                            <li>
                                                                <input type="checkbox" id="data-color-p8" value="ĐEN" name="color-filter" data-color="(variant:product contains ĐEN)" />
                                                                <label title="den" htmlFor="data-color-p8" style={{ backgroundColor: '#000' }}>{trans.collections.black}</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-color-p9" value="TRẮNG" name="color-filter" data-color="(variant:product contains TRẮNG)" />
                                                                <label title="trang" htmlFor="data-color-p9" style={{ backgroundColor: '#FFF' }}>{trans.collections.white}</label>
                                                            </li>
                                                            {/* <li>
                                                                <input type="checkbox" id="data-color-p1" value="NÂU" name="color-filter" data-color="(variant:product contains NÂU)" />
                                                                <label title="nau" htmlFor="data-color-p1" style={{ backgroundColor: '#8b572a' }}>NÂU</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-color-p2" value="KEM" name="color-filter" data-color="(variant:product contains KEM)" />
                                                                <label title="kem" htmlFor="data-color-p2" style={{ backgroundColor: '#e0d5b6' }}>KEM</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-color-p3" value="XÁM" name="color-filter" data-color="(variant:product contains XÁM)" />
                                                                <label title="xam" htmlFor="data-color-p3" style={{ backgroundColor: '#d2dae2' }}>XÁM</label>
                                                            </li>

                                                            <li>
                                                                <input type="checkbox" id="data-color-p10" value="ĐỎ" name="color-filter" data-color="(variant:product contains ĐỎ)" />
                                                                <label title="do" htmlFor="data-color-p10" style={{ backgroundColor: '#FF3F34' }}>ĐỎ</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-color-p12" value="XANH LÁ" name="color-filter" data-color="(variant:product contains XANH LÁ)" />
                                                                <label title="xanh-la" htmlFor="data-color-p12" style={{ backgroundColor: '#4F9235' }}>XANH LÁ</label>
                                                            </li> */}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="group-filter" aria-expanded="true">
                                                    <div className="layered_subtitle dropdown-filter">
                                                        <span>{trans.collections.size}</span>
                                                        <span className="icon-control">
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </span>
                                                    </div>
                                                    <div className="layered-content filter-size bl-filter">
                                                        <ul className="check-box-list clearfix">
                                                            <li>
                                                                <input type="checkbox" id="data-size-p1" value="S" name="size-filter" data-size="(variant:product=S)" />
                                                                <label htmlFor="data-size-p1">S</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-size-p2" value="M" name="size-filter" data-size="(variant:product=M)" />
                                                                <label htmlFor="data-size-p2">M</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-size-p3" value="L" name="size-filter" data-size="(variant:product=L)" />
                                                                <label htmlFor="data-size-p3">L</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-size-p4" value="XL" name="size-filter" data-size="(variant:product=XL)" />
                                                                <label htmlFor="data-size-p4">XL</label>
                                                            </li>
                                                            <li>
                                                                <input type="checkbox" id="data-size-p4" value="XXL" name="size-filter" data-size="(variant:product=XXL)" />
                                                                <label htmlFor="data-size-p4">XXL</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-12'>
                            <div className='wrap-collection-title row'>
                                <div className=''>
                                    <div className="heading-collection row">
                                        <div className="col-md-3 hidden-sm hidden-xs">
                                            <div className="filterTagFullwidthButton-desktop">
                                                <FontAwesomeIcon icon={faSliders} color='#666' onClick={() => setOpenFilterSidebar(!openFilterSidebar)} />
                                                <span style={{ paddingLeft: '.5rem', color: '#666' }} onClick={() => setOpenFilterSidebar(!openFilterSidebar)}>{trans.collections.filter}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <h1 className="title">
                                                {trans.collections.all}
                                            </h1>
                                        </div>
                                        <div className="col-md-3 col-sm-12 col-xs-12">
                                            <div className="outer-sort-filter">
                                                <div className="filterTagFullwidthButton-mobile">
                                                    <FontAwesomeIcon icon={faSliders} color='#666' onClick={() => setOpenFilterSidebar(!openFilterSidebar)} />
                                                    <span style={{ paddingLeft: '.5rem', color: '#666' }} onClick={() => setOpenFilterSidebar(!openFilterSidebar)} >{trans.collections.filter}</span>
                                                </div>
                                                <div className="collection-sortby">
                                                    <div className="sortby-option browse-tags option">
                                                        <label className="label-tt" htmlFor="sort-by">
                                                            <FontAwesomeIcon icon={faSortAlphaAsc} color='#666' />
                                                        </label>
                                                        <span className="custom-dropdown custom-dropdown--grey ">
                                                            <select className="sort-by custom-dropdown__select boxstyle-mb">
                                                                <option value="price-ascending" data-filter="&amp;sortby=(price:product=asc)">{trans.collections.price.asc}</option>
                                                                <option value="price-descending" data-filter="&amp;sortby=(price:product=desc)">{trans.collections.price.dsc}</option>
                                                                <option value="title-ascending" data-filter="&amp;sortby=(title:product=asc)">{trans.collections.name.az}</option>
                                                                <option value="title-descending" data-filter="&amp;sortby=(price:product=desc)">{trans.collections.name.za}</option>
                                                                <option value="created-ascending" data-filter="&amp;sortby=(updated_at:product=desc)">{trans.collections.oldest}</option>
                                                                <option value="created-descending" data-filter="&amp;sortby=(updated_at:product=asc)">{trans.collections.newest}</option>
                                                                <option value="best-selling" data-filter="&amp;sortby=(sold_quantity:product=desc)">{trans.collections.mostPopular}</option>
                                                                <option value="quantity-descending">{trans.collections.inStock}</option>
                                                            </select>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="group_filter_tags">
                                <div className="filter_tags">
                                    Thương hiệu: <b>Khác</b>
                                    <span className="filter_tags_remove">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z"></path>
                                        </svg>
                                    </span>
                                </div>

                                <div className="filter_tags">
                                    Màu sắc: <b>NÂU</b>
                                    <span className="filter_tags_remove">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z"></path>
                                        </svg>
                                    </span>
                                </div>

                                <div className="filter_tags">
                                    Kích thước: <b></b>
                                    <span className="filter_tags_remove">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z"></path>
                                        </svg>
                                    </span>
                                </div>

                                <div className="filter_tags filter_tags_remove_all"><span>Xóa hết </span></div>
                            </div>
                            <div className='row filter-here'>
                                <Products />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Collections;