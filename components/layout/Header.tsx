'use client'
import useOutsideAlerter from '@/lib/hooks/use-outside-alerter'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import { useForm, SubmitHandler } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import useWindowResize from '@/lib/hooks/use-window-resize'
import useTrans from '@/lib/hooks/use-translation'
import useLanguage from '@/lib/hooks/use-languages'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useWrapperContext } from '@/lib/context/WrapperContext'
import Logo from '@/public/assets/images/logo.jpg';
import Image from "next/legacy/image"
import { routes } from '@/routes'
import useCategories from '@/lib/hooks/use-categories'
import useProducts from '@/lib/hooks/use-products'
import { useDebounce } from "@uidotdev/usehooks";
import { ProductItemType } from '@/types/product-type'
import { arrayBufferToBase64, stringToSlug } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function Header() {
    const router = useRouter();
    const clickOutSideRef = useRef<any>(null)
    // const accountPanelRef = useRef<any>(null)
    const headerRef = useRef<any>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const [showSearchPopup, setShowSearchPopup] = useState<boolean>(false)
    const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)
    const [showRecoverPopup, setShowRecoverPopup] = useState<boolean>(false)
    const [showCartPopup, setShowCartPopup] = useState<boolean>(false)
    const [navChildOpen, setNavChildOpen] = useState<boolean>(false)
    const [navbar, setNavbar] = useState(false)
    const { isOutSide } = useOutsideAlerter(clickOutSideRef)
    const { height } = useWindowResize(headerRef)
    const trans = useTrans()
    const { currentLang } = useLanguage()
    const { setItem: setLangLocalStorage } = useLocalStorage('lang')
    const context = useWrapperContext();
    const [categories] = useCategories();
    const { products } = useProducts({ categoryCode: '' });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<ProductItemType[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm<Inputs>()

    // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const handleScrollEvent = () => {
        if (window.scrollY >= 70) setNavbar(true);
        else setNavbar(false);
    }

    const renderSelectLanguage = useMemo(() => {
        if (!currentLang) return;
        return (
            <>
                {currentLang === 'en' && (
                    <div className='d-flex justify-content-center align-items-center column-gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-us" viewBox="0 0 512 512" width={25} height={20}>
                            <g fillRule="evenodd">
                                <g strokeWidth="1pt">
                                    <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z" />
                                    <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V315H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0z" />
                                </g>
                                <path fill="#192f5d" d="M0 0h389.1v275.7H0z" />
                                <path fill="#fff" d="m32.3 11.8 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.9-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6L65 61l-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 67l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6L212 78h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6L277 78h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.5 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.6h11.4zm64.7 0 4 11h11l-9.1 6.7L139 123l-9.4-6.7-9 6.7 3.5-10.7-9.5-6.6h11.8zm65 0 3.5 11h11.4l-9 6.7L204 123l-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.6H191zm65 0 3.5 11h11.4l-9.4 6.7L269 123l-9.5-6.7-9.4 6.7 4-10.7-9.5-6.6H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.6h11.8zM32.7 122.1l3.1 11h11.9l-9.5 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7L139 178l-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7L204 178l-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7L269 178l-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 177.2l3.1 11h11.9l-9.5 6.8 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.8 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.8 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.8 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.8zM32.7 232.4l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4z" />
                            </g>
                        </svg>
                    </div>
                )}

                {currentLang === 'vi' && (
                    <div className='d-flex justify-content-center align-items-center column-gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-vn" viewBox="0 0 512 512" width={25} height={20}>
                            <defs>
                                <clipPath id="a">
                                    <path fillOpacity=".7" d="M177.2 0h708.6v708.7H177.2z" />
                                </clipPath>
                            </defs>
                            <g fillRule="evenodd" clipPath="url(#a)" transform="translate(-128) scale(.72249)">
                                <path fill="#da251d" d="M0 0h1063v708.7H0z" />
                                <path fill="#ff0" d="m661 527.5-124-92.6-123.3 93.5 45.9-152-123.2-93.8 152.4-1.3L536 129.8 584.3 281l152.4.2-122.5 94.7L661 527.5z" />
                            </g>
                        </svg>
                    </div>
                )}
            </>
        )
    }, [currentLang, showLoginPopup])

    const handleChangeLanguage = useCallback((lang: string) => {
        if (!lang) return;
        setLangLocalStorage(lang);
        setShowLoginPopup(false);
        context.contextValue({ language: lang });
    }, [currentLang, showLoginPopup])

    useEffect(() => {
        if (isOutSide) {
            setShowSearchPopup(false);
            setShowLoginPopup(false);
            setShowRecoverPopup(false);
            setShowCartPopup(false);
        }
    }, [isOutSide])

    useEffect(() => {
        window.addEventListener('scroll', handleScrollEvent);

        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        }
    })

    useEffect(() => {
        (mobileMenuOpen || showLoginPopup || showRecoverPopup || showCartPopup) && context.handleLockedScroll('locked-scroll');
        return () => {
            (!mobileMenuOpen || !showLoginPopup || !showRecoverPopup || !showCartPopup) && context.handleLockedScroll('');
        }
    }, [mobileMenuOpen, showLoginPopup, showRecoverPopup, showCartPopup])

    useEffect(() => {
        const searchHN = async () => {
            let results: ProductItemType[] = [];
            setIsSearching(true);
            if (debouncedSearchTerm) {
                const data = products.filter(el => stringToSlug(el.productName).toLocaleLowerCase().includes(stringToSlug(debouncedSearchTerm).toLocaleLowerCase()));
                results = data || [];
            }
            setIsSearching(false);
            setResults(results);
        };

        searchHN();
    }, [debouncedSearchTerm]);

    return (
        <header className={`main-header mainHeader_temp_2 ${(mobileMenuOpen || showLoginPopup || showRecoverPopup || showCartPopup) ? 'locked-scroll' : ''}`} style={{ minHeight: `${height > 0 ? height : 120}px` }}>
            <div ref={headerRef} className={`navigation-header ${navbar ? 'hSticky hSticky-down' : ''}`}>
                <div className='header-middle'>
                    <div className='container'>
                        <div className='flexContainer-header'>
                            <div className={`col-md-4 header-wrap-menu-mb header-icon ${mobileMenuOpen && 'show-action'}`}>
                                <div className="d-lg-none">
                                    <button style={{ outline: 'none', border: 'unset', backgroundColor: 'transparent' }} type='button' className="header-action-toggle site-handle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                        <div className="hamburger-menu">
                                            <span className="bar"></span>
                                        </div>
                                    </button>
                                    <div className="header_dropdown_content site_menu_mobile">
                                        <span className="box-triangle">
                                            <svg viewBox="0 0 20 9">
                                                <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
                                            </svg>
                                        </span>
                                        <div className="site-nav-container-menu">
                                            <div className="menu-mobile-content">
                                                <nav id="mb-menu" className="navbar-mainmenu">
                                                    <div className="navbar-level" data-level="1">
                                                        <ul className={`menuList-sub vertical-menu-list sub-child ${navChildOpen && 'mm-subopened'}`}>
                                                            <li className="active">
                                                                <Link className="parent" href={routes.home} onClick={() => setMobileMenuOpen(false)}>{trans.menu.mainMenu}</Link>
                                                            </li>
                                                            <li className="" data-menu-root="104326217">
                                                                <Link href={'#'} className="parent" onClick={() => setNavChildOpen(true)}>{trans.menu.shop}
                                                                    <i className="svg-right">
                                                                        <svg className="icon icon--arrow-right" viewBox="0 0 8 12">
                                                                            <path stroke="currentColor" strokeWidth="2" d="M2 2l4 4-4 4" fill="none" strokeLinecap="square"></path>
                                                                        </svg>
                                                                    </i>
                                                                </Link>
                                                            </li>
                                                            <li className="">
                                                                <Link className="parent" href={routes.contact} onClick={() => setMobileMenuOpen(false)}>{trans.menu.contact}</Link>
                                                            </li>
                                                            <li className="main_help">
                                                                <div className="mobile_menu_section">
                                                                    <p className="mobile_menu_section-title">{trans.menu.needHelp}</p>
                                                                    <div className="mobile_menu_help">
                                                                        <svg className="icon icon--bi-phone" viewBox="0 0 24 24">
                                                                            <g strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square">
                                                                                <path d="M17 15l-3 3-8-8 3-3-5-5-3 3c0 9.941 8.059 18 18 18l3-3-5-5z" stroke="#333333"></path>
                                                                                <path d="M14 1c4.971 0 9 4.029 9 9m-9-5c2.761 0 5 2.239 5 5" stroke="#333333"></path>
                                                                            </g>
                                                                        </svg>
                                                                        <Link href="tel:0933338913" rel="nofollow">0764849787</Link>
                                                                    </div>
                                                                    <div className="mobile_menu_help">
                                                                        <svg className="icon icon--bi-email" viewBox="0 0 22 22">
                                                                            <g fill="none" fillRule="evenodd">
                                                                                <path stroke="#333333" d="M.916667 10.08333367l3.66666667-2.65833334v4.65849997zm20.1666667 0L17.416667 7.42500033v4.65849997z"></path>
                                                                                <path stroke="#333333" strokeWidth="2" d="M4.58333367 7.42500033L.916667 10.08333367V21.0833337h20.1666667V10.08333367L17.416667 7.42500033"></path>
                                                                                <path stroke="#333333" strokeWidth="2" d="M4.58333367 12.1000003V.916667H17.416667v11.1833333m-16.5-2.01666663L21.0833337 21.0833337m0-11.00000003L11.0000003 15.5833337"></path>
                                                                                <path d="M8.25000033 5.50000033h5.49999997M8.25000033 9.166667h5.49999997" stroke="#333333" strokeWidth="2" strokeLinecap="square"></path>
                                                                            </g>
                                                                        </svg>
                                                                        <Link href="mailto:nnminh742@gmail.com" rel="nofollow">nnminh742@gmail.com</Link>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <ul className={`menuList-sub sub-child-1 ${navChildOpen && 'mm-opened'}`} id="104326217">
                                                            <li>
                                                                <Link href={'#'} onClick={() => setNavChildOpen(false)}>
                                                                    <FontAwesomeIcon icon={faAngleLeft} width={15} height={15} size='sm' />
                                                                    {trans.back}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href={routes.ecommerce.collections} onClick={() => setMobileMenuOpen(false)}>
                                                                    <b style={{ fontWeight: 700 }}>{trans.menu.showAll}</b>
                                                                </Link>
                                                            </li>
                                                            {categories.map((item, idx) => (
                                                                <li className="" key={idx}>
                                                                    <Link href={routes.ecommerce.searchCollections(item.categoryCode)} onClick={() => setMobileMenuOpen(false)} title={item.categoryName}>
                                                                        - {item.categoryName}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 header-wrap-logo header-mid">
                                <div className="wrap-logo text-center" itemType="http://schema.org/Organization">
                                    <Link href="/" itemProp="url">
                                        <Image itemProp="logo" alt="BETI" className="img-responsive logoimg lazyloaded" src={Logo} width={150} height={50} />
                                    </Link>
                                    {/* <h1 style={{ display: 'block' }}><Link href="https://www.betistore.vn" itemProp="url">BETI</Link></h1> */}
                                </div>
                            </div>
                            <div ref={clickOutSideRef} className='col-md-4 header-wrap-icon'>
                                <div className={`header-icon header-action-search ${showSearchPopup && 'show-action'}`}>
                                    <Link id="site-search-handle" href="#" title="Search" className="header-action-toggle" arial-label="Search header"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowSearchPopup(!showSearchPopup)
                                            setShowLoginPopup(false)
                                            setShowCartPopup(false)
                                        }}
                                    >
                                        <span className="box-action-icon">
                                            <svg className="icon-svg svg-icon-search" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.999 511.999" style={{ background: 'new 0 0 511.999 511.999' }} xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve">
                                                <path d="M508.874,478.708L360.142,329.976c28.21-34.827,45.191-79.103,45.191-127.309c0-111.75-90.917-202.667-202.667-202.667
														 S0,90.917,0,202.667s90.917,202.667,202.667,202.667c48.206,0,92.482-16.982,127.309-45.191l148.732,148.732
														 c4.167,4.165,10.919,4.165,15.086,0l15.081-15.082C513.04,489.627,513.04,482.873,508.874,478.708z M202.667,362.667
														 c-88.229,0-160-71.771-160-160s71.771-160,160-160s160,71.771,160,160S290.896,362.667,202.667,362.667z"></path>
                                            </svg>
                                            <span className="box-icon--close">
                                                <svg viewBox="0 0 19 19"><path d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z" fill="currentColor" fillRule="evenodd"></path></svg>
                                            </span>
                                        </span>
                                    </Link>
                                    <div className={`header_dropdown_content site_search`}>
                                        <span className="box-triangle">
                                            <svg viewBox="0 0 20 9">
                                                <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
                                            </svg>
                                        </span>
                                        <div className="site-nav-container">
                                            <p className="titlebox">{trans.menu.search}</p>
                                            <div className="search-box wpo-wrapper-search">
                                                <form action="/search" className="searchform searchform-categoris ultimate-search">
                                                    <div className="wpo-search-inner">
                                                        <input type="hidden" name="type" value="product" />
                                                        <input
                                                            id="inputSearchAuto" name="q" autoComplete="off"
                                                            className="searchinput input-search search-input" type="text" placeholder={trans.menu.searchPlaceHolder}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            value={debouncedSearchTerm} defaultValue={undefined}
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn-search">
                                                        {isSearching && "..."}
                                                        <svg version="1.1" className={`svg search ${isSearching && 'hidden'}`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 27" style={{ background: 'new 0 0 24 27' }} xmlSpace
                                                            ="preserve"><path d="M10,2C4.5,2,0,6.5,0,12s4.5,10,10,10s10-4.5,10-10S15.5,2,10,2z M10,19c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S13.9,19,10,19z"></path><rect x="17" y="17" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.2844 19.5856)" width="4" height="8"></rect></svg>
                                                    </button>
                                                </form>
                                                <div
                                                    id="ajaxSearchResults"
                                                    className={`smart-search-wrapper ajaxSearchResults`}
                                                    style={{ display: `${showSearchPopup && debouncedSearchTerm ? 'block' : 'none'}` }}
                                                >
                                                    <div className="resultsContent">
                                                        {!results.length && debouncedSearchTerm && (
                                                            <p className={`dataEmpty`}>
                                                                {trans.collections.searchProduct}
                                                            </p>
                                                        )}
                                                        {results.map((el, index) => {
                                                            return index <= 5 && (
                                                                <div className="item-ult" key={index} onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setShowSearchPopup(false);
                                                                    setSearchTerm('');
                                                                    router.push(routes.ecommerce.productDetail(el.productCode))
                                                                }}>
                                                                    <div className="thumbs">
                                                                        <a href={routes.ecommerce.productDetail(el.productCode)} title={el.productName}>
                                                                            <img alt={el.productName} src={arrayBufferToBase64(el.frontImage.data, el.frontImageMimeType)} />
                                                                        </a>
                                                                    </div>
                                                                    <div className="title">
                                                                        <a title={el.productName} href={routes.ecommerce.productDetail(el.productCode)}>{el.productName}</a>
                                                                        <p className="f-initial">
                                                                            {el.salePrice.toLocaleString('en-US')}₫
                                                                            <del className={`${el.costPrice === 0 && 'hidden'}`}>{el.costPrice.toLocaleString('en-Us')}₫</del>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                        <div className={`resultsMore ${((results.length && results.length < 5) || !results.length) && 'hidden'}`}>
                                                            <Link href={'#'}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setShowSearchPopup(false);
                                                                    setSearchTerm('');
                                                                    router.push(routes.searchFilter(debouncedSearchTerm))
                                                                }}
                                                            >
                                                                {trans.search.seeMore} {results.length - 5} {trans.search.product}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`header-icon header-action-search`}>
                                    <div className={`switch ${showLoginPopup ? 'show-options anim-options show-shadow' : ''}`} onClick={() => {
                                        setShowSearchPopup(false);
                                        setShowLoginPopup(!showLoginPopup);
                                    }}>
                                        <div className="current">
                                            {renderSelectLanguage}
                                            <em className="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><title>ic_arrow_drop_down_18px</title>
                                                <g fill="#FFFFFF">
                                                    <path d="M5 8l4 4 4-4z"></path>
                                                </g>
                                            </svg></em>
                                        </div>
                                        <div className="options">
                                            <ul className="options-list">
                                                <li data-lang="en" onClick={() => handleChangeLanguage('en')}>
                                                    <div className='d-flex justify-center items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-us" viewBox="0 0 512 512" width={20} height={20}>
                                                            <g fillRule="evenodd">
                                                                <g strokeWidth="1pt">
                                                                    <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z" />
                                                                    <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V315H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0z" />
                                                                </g>
                                                                <path fill="#192f5d" d="M0 0h389.1v275.7H0z" />
                                                                <path fill="#fff" d="m32.3 11.8 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.9-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6L65 61l-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 67l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6L212 78h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6L277 78h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.5 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.6h11.4zm64.7 0 4 11h11l-9.1 6.7L139 123l-9.4-6.7-9 6.7 3.5-10.7-9.5-6.6h11.8zm65 0 3.5 11h11.4l-9 6.7L204 123l-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.6H191zm65 0 3.5 11h11.4l-9.4 6.7L269 123l-9.5-6.7-9.4 6.7 4-10.7-9.5-6.6H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.6h11.8zM32.7 122.1l3.1 11h11.9l-9.5 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7L139 178l-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7L204 178l-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7L269 178l-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 177.2l3.1 11h11.9l-9.5 6.8 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.8 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.8 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.8 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.8zM32.7 232.4l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4z" />
                                                            </g>
                                                        </svg>
                                                        <span style={{ color: `${currentLang === 'en' ? '#ffc107' : '#000'}` }}>English</span>
                                                    </div>
                                                </li>
                                                <li data-lang="no" onClick={() => handleChangeLanguage('vi')}>
                                                    <div className='d-flex justify-center items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-vn" viewBox="0 0 512 512" width={20} height={20}>
                                                            <defs>
                                                                <clipPath id="a">
                                                                    <path fillOpacity=".7" d="M177.2 0h708.6v708.7H177.2z" />
                                                                </clipPath>
                                                            </defs>
                                                            <g fillRule="evenodd" clipPath="url(#a)" transform="translate(-128) scale(.72249)">
                                                                <path fill="#da251d" d="M0 0h1063v708.7H0z" />
                                                                <path fill="#ff0" d="m661 527.5-124-92.6-123.3 93.5 45.9-152-123.2-93.8 152.4-1.3L536 129.8 584.3 281l152.4.2-122.5 94.7L661 527.5z" />
                                                            </g>
                                                        </svg>
                                                        <span style={{ color: `${currentLang === 'vi' ? '#ffc107' : '#000'}` }}>Việt Nam</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div id="trans-circle">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"> <g id="circle" fill="none" fillRule="evenodd"> <circle id="bg" cx="60" cy="60" r="60" fill="#FFFFFF" /> </g> </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className={`header-icon header-action-account ${showLoginPopup && 'show-action'}`}>
                                    <Link
                                        onClick={() => {
                                            setShowLoginPopup(!showLoginPopup)
                                            setShowSearchPopup(false)
                                            setShowCartPopup(false)
                                        }}
                                        id="site-account-handle" href="#" title="Tài khoản" className="header-action-toggle" arial-label="Tài khoản">
                                        <span className="box-action-icon">
                                            <svg className="icon-svg svg-icon-account" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                                <path d="M18 21v-2c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464h-8c-1.38 0-2.632 0.561-3.536 1.464s-1.464 2.156-1.464 3.536v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.829 0.335-1.577 0.879-2.121s1.292-0.879 2.121-0.879h8c0.829 0 1.577 0.335 2.121 0.879s0.879 1.292 0.879 2.121v2c0 0.552 0.448 1 1 1s1-0.448 1-1zM14 7c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464-2.632 0.561-3.536 1.464-1.464 2.156-1.464 3.536 0.561 2.632 1.464 3.536 2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536zM12 7c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121 0.335-1.577 0.879-2.121 1.292-0.879 2.121-0.879 1.577 0.335 2.121 0.879 0.879 1.292 0.879 2.121zM24 21v-2c-0.001-1.245-0.457-2.385-1.216-3.261-0.652-0.753-1.528-1.311-2.529-1.576-0.534-0.141-1.081 0.177-1.222 0.711s0.177 1.081 0.711 1.222c0.607 0.161 1.136 0.498 1.528 0.952 0.455 0.526 0.727 1.206 0.728 1.952v2c0 0.552 0.448 1 1 1s1-0.448 1-1zM15.752 4.099c0.803 0.206 1.445 0.715 1.837 1.377s0.531 1.47 0.325 2.273c-0.176 0.687-0.575 1.256-1.105 1.652-0.314 0.235-0.675 0.41-1.063 0.511-0.534 0.14-0.854 0.687-0.713 1.221s0.687 0.854 1.221 0.713c0.637-0.167 1.232-0.455 1.753-0.844 0.883-0.66 1.552-1.613 1.845-2.758 0.342-1.337 0.11-2.689-0.542-3.788s-1.725-1.953-3.062-2.296c-0.535-0.137-1.080 0.186-1.217 0.721s0.186 1.080 0.721 1.217z"></path>
                                            </svg>
                                            <span className="box-icon--close">
                                                <svg viewBox="0 0 19 19"><path d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z" fill="currentColor" fillRule="evenodd"></path></svg>
                                            </span>
                                        </span>
                                    </Link>
                                    <div className="header_dropdown_content site_account ">
                                        <span className="box-triangle">
                                            <svg viewBox="0 0 20 9">
                                                <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
                                            </svg>
                                        </span>
                                        <div className="site-nav-container text-center">
                                            <div className="site_account_panel_list" style={{ height: `${accountPanelRef && accountPanelRef.current && showRecoverPopup ? accountPanelRef.current.clientHeight : 265}px` }}>
                                                <div id="header-login-panel" className={`site_account_panel site_account_default ${!showRecoverPopup ? 'is-selected' : ''}`}>
                                                    <div className="site-account-list">
                                                        <form id="customer_login" onSubmit={handleSubmit(onSubmit)}>
                                                            <input name="form_type" type="hidden" value="customer_login" />
                                                            <input name="utf8" type="hidden" value="✓" />
                                                            <div className="site_account_header">
                                                                <h2 className="site_account_title heading">Đăng nhập tài khoản</h2>
                                                                <p className="site_account_legend">Nhập email và mật khẩu của bạn:</p>
                                                            </div>
                                                            <div className="form__input-wrapper form__input-wrapper--labelled">
                                                                <input
                                                                    {...register('email', { required: true })}
                                                                    type="email"
                                                                    id="email"
                                                                    className={`form__field form__field--text ${watch('email') && 'is-filled'}`}
                                                                    name="email"
                                                                    autoComplete="email" />
                                                                <label htmlFor="email" className="form__floating-label">Email</label>
                                                                {errors.email && <span className='text-danger'>Vui lòng nhập email</span>}
                                                            </div>
                                                            <div className="form__input-wrapper form__input-wrapper--labelled">
                                                                <input
                                                                    {...register('password', { required: true })}
                                                                    type="password"
                                                                    id="password"
                                                                    className={`form__field form__field--text ${watch('password') && 'is-filled'}`}
                                                                    name="password"
                                                                    autoComplete="current-password"
                                                                />
                                                                <label htmlFor="password" className="form__floating-label">Mật khẩu</label>
                                                                {errors.password && <span className='text-danger'>Vui lòng nhập email</span>}
                                                            </div>
                                                            <button type="submit" className="form__submit button dark" id="form_submit-login">Đăng nhập</button>

                                                            <div className="site_account_secondary-action">
                                                                <p>Khách hàng mới?
                                                                    <Link href="/account/register" className="link"> Tạo tài khoản</Link>
                                                                </p>
                                                                <p>Quên mật khẩu?
                                                                    <button type='button' aria-controls="header-recover-panel" className="js-link link" onClick={() => setShowRecoverPopup(true)}>Khôi phục mật khẩu</button>
                                                                </p>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div id="header-recover-panel" className={`site_account_panel site_account_sliding ${showRecoverPopup ? 'is-selected' : ''}`}>
                                                    <div className="site-account-list" ref={accountPanelRef} >
                                                        <input name="form_type" type="hidden" value="recover_customer_password" />
                                                        <input name="utf8" type="hidden" value="✓" />
                                                        <div className="site_account_header">
                                                            <h2 className="site_account_title heading">Khôi phục mật khẩu</h2>
                                                            <p className="site_account_legend">Nhập email của bạn:</p>
                                                        </div>
                                                        <div className="form__input-wrapper form__input-wrapper--labelled">
                                                            <input type="email" id="recover-customer[recover_email]" className="form__field form__field--text" name="email" required autoComplete="email" />
                                                            <label htmlFor="recover-customer[recover_email]" className="form__floating-label">Email</label>
                                                        </div>
                                                        <button type="submit" className="form__submit button dark" id="form_submit-recover">Khôi phục</button>

                                                        <div className="site_account_secondary-action">
                                                            <p>Bạn đã nhớ mật khẩu?
                                                                <button aria-controls="header-login-panel" className="js-link link" onClick={() => setShowRecoverPopup(false)}>Trở về đăng nhập</button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`header-icon header-action-cart ${showCartPopup && 'show-action'}`}>
                                    <Link
                                        onClick={() => {
                                            setShowCartPopup(!showCartPopup)
                                            setShowSearchPopup(false)
                                            setShowLoginPopup(false)
                                            setShowRecoverPopup(false)
                                        }}
                                        id="site-cart-handle" href="#" title="Giỏ hàng" className="header-action-toggle" arial-label="Giỏ hàng"
                                    >
                                        <span className="box-action-icon">
                                            <svg className="icon-svg svg-icon-cart" version="1.1" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24">
                                                <path d="M19 5h-14l1.5-2h11zM21.794 5.392l-2.994-3.992c-0.196-0.261-0.494-0.399-0.8-0.4h-12c-0.326 0-0.616 0.156-0.8 0.4l-2.994 3.992c-0.043 0.056-0.081 0.118-0.111 0.183-0.065 0.136-0.096 0.282-0.095 0.425v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.219-0.071-0.422-0.189-0.585-0.004-0.005-0.007-0.010-0.011-0.015zM4 7h16v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM15 10c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121c0-0.552-0.448-1-1-1s-1 0.448-1 1c0 1.38 0.561 2.632 1.464 3.536s2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536c0-0.552-0.448-1-1-1s-1 0.448-1 1z"></path>
                                            </svg>
                                            <span className="count-holder"><span className="count">0</span></span>
                                            <span className="box-icon--close">
                                                <svg viewBox="0 0 19 19"><path d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z" fill="currentColor" fillRule="evenodd"></path></svg>
                                            </span>
                                        </span>
                                    </Link>
                                    <div className="header_dropdown_content site_cart">
                                        <span className="box-triangle">
                                            <svg viewBox="0 0 20 9">
                                                <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
                                            </svg>
                                        </span>
                                        <div className="site-nav-container">
                                            <p className="titlebox">Giỏ hàng</p>
                                            <div className="cart-view clearfix">
                                                <table id="clone-item-cart" className="table-clone-cart">
                                                    <tbody><tr className="list-item hidden">
                                                        <td className="img"><a href="" title=""><img src="" alt="" /></a></td>
                                                        <td className="item">
                                                            <a className="pro-title-view" href="" title=""></a>
                                                            <span className="variant"></span>
                                                            <span className="pro-quantity-view"> </span>
                                                            <span className="pro-price-view"> </span>
                                                            <span className="remove_link remove-cart"> </span>
                                                        </td>
                                                    </tr>
                                                    </tbody></table>
                                                <div className="cart-scroll">
                                                    <table id="cart-view">
                                                        <tbody><tr>
                                                            <td className="mini_cart_header">
                                                                <svg width="81" height="70" viewBox="0 0 81 70">
                                                                    <g transform="translate(0 2)" strokeWidth="4" stroke="#333333" fill="none" fillRule="evenodd">
                                                                        <circle strokeLinecap="square" cx="34" cy="60" r="6"></circle>
                                                                        <circle strokeLinecap="square" cx="67" cy="60" r="6"></circle>
                                                                        <path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
                                                                    </g>
                                                                </svg>
                                                                <p>Hiện chưa có sản phẩm</p>
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                </div>
                                                <span className="line"></span>
                                                <table className="table-total">
                                                    <tbody><tr>
                                                        <td className="text-left">TỔNG TIỀN:</td>
                                                        <td className="text-right" id="total-view-cart">0₫</td>
                                                    </tr>
                                                        <tr className="btn-linktocart">
                                                            <td><a href="/cart" className="linktocart button dark">Xem giỏ hàng</a></td>
                                                            <td><a href="/checkout" className="linktocheckout button drakpay">Thanh toán</a></td>
                                                        </tr>
                                                    </tbody></table>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-menu-desktop d-none d-lg-block d-xl-block">
                    <div className="container">
                        <div className="header-navbar-menu">
                            <div className="wrap-logo wrap-logo-sticky">
                                <Link href={routes.home}>
                                    <Image itemProp="logo" alt="BETI" className="img-responsive logoimg lazyloaded" src={Logo} width={150} height={50} />
                                </Link>
                            </div>
                            <div className="menu-desktop-sticky">
                                <div id="nav-main-menu">
                                    <nav className="main-nav text-center">
                                        <ul className="clearfix">
                                            <li className="active">
                                                <Link href={routes.home} title="MAIN MENU">
                                                    {trans.menu.mainMenu}
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link href={routes.ecommerce.collections} title="SHOP">
                                                    {trans.menu.shop} <FontAwesomeIcon style={{ fontSize: "9px" }} icon={faChevronDown}></FontAwesomeIcon>
                                                </Link>
                                                <ul className="sub_menu">
                                                    {categories.map((item, idx) => (
                                                        <li className="" key={idx}>
                                                            <Link href={routes.ecommerce.searchCollections(item.categoryCode)} title={item.categoryName}>
                                                                {item.categoryName}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li className="">
                                                <Link href={routes.contact} title="CONTACT">
                                                    {trans.menu.contact}
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-search-mobile search-bar-mobile">
                    <div className="search-box wpo-wrapper-search">
                        <form className={`searchform searchform-categoris ultimate-search ${debouncedSearchTerm && 'expanded'}`}>
                            <div className="wpo-search-inner">
                                <input type="hidden" name="type" value="product" />
                                <input
                                    id="inputSearchAuto-mb" name="q" autoComplete="off"
                                    className="searchinput input-search search-input"
                                    type="text"
                                    placeholder={trans.menu.searchPlaceHolder}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={debouncedSearchTerm}
                                    defaultValue={undefined}
                                />
                            </div>
                            <button type="submit" className="btn-search">
                                {isSearching && "..."}
                                <svg version="1.1" className={`svg search ${debouncedSearchTerm && 'hidden'}`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 27" style={{ background: 'new 0 0 24 27' }} xmlSpace
                                    ="preserve"><path d="M10,2C4.5,2,0,6.5,0,12s4.5,10,10,10s10-4.5,10-10S15.5,2,10,2z M10,19c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S13.9,19,10,19z"></path><rect x="17" y="17" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.2844 19.5856)" width="4" height="8"></rect></svg>
                                <svg
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSearchTerm('');
                                    }}
                                    className={`svg-search-close ${!debouncedSearchTerm && 'hidden'}`}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                </svg>
                            </button>
                        </form>
                        <div
                            id="ajaxSearchResults-mb"
                            className={`smart-search-wrapper ajaxSearchResults`}
                            style={{ display: `${debouncedSearchTerm ? 'block' : 'none'}` }}
                        >
                            <div className="resultsContent">
                                {!results.length && debouncedSearchTerm && (
                                    <p className={`dataEmpty`}>
                                        {trans.collections.searchProduct}
                                    </p>
                                )}
                                {results.map((el, index) => (
                                    <div className="item-ult" key={index} onClick={() => router.push(routes.ecommerce.productDetail(el.productCode))}>
                                        <div className="thumbs">
                                            <a href={routes.ecommerce.productDetail(el.productCode)} title={el.productName}>
                                                <img alt={el.productName} src={arrayBufferToBase64(el.frontImage.data, el.frontImageMimeType)} />
                                            </a>
                                        </div>
                                        <div className="title">
                                            <a title={el.productName} href={routes.ecommerce.productDetail(el.productCode)}>{el.productName}</a>
                                            <p className="f-initial">
                                                {el.salePrice.toLocaleString('en-US')}₫
                                                <del className={`${el.costPrice === 0 && 'hidden'}`}>{el.costPrice.toLocaleString('en-Us')}₫</del>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className={`resultsMore ${((results.length && results.length < 5) || !results.length) && 'hidden'}`}>
                                    <Link
                                        href={'#'}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowSearchPopup(false);
                                            setSearchTerm('');
                                            router.push(routes.searchFilter(debouncedSearchTerm))
                                        }}
                                    >
                                        {trans.search.seeMore} {products.length - results.length} {trans.search.product}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* <form action="/search" className="searchform searchform-categoris ultimate-search">
                            <div className="wpo-search-inner">
                                <input type="hidden" name="type" value="product" />
                                <input required id="inputSearchAuto-mb" name="q" maxLength={40} autoComplete="off" className="searchinput input-search search-input" type="text" placeholder={trans.menu.searchPlaceHolder} />
                            </div>
                            <button type="submit" className="btn-search">
                                <svg className="svg-search" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 27" style={{ background: 'new 0 0 24 27' }} xmlSpace="preserve"><path d="M10,2C4.5,2,0,6.5,0,12s4.5,10,10,10s10-4.5,10-10S15.5,2,10,2z M10,19c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S13.9,19,10,19z"></path><rect x="17" y="17" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.2844 19.5856)" width="4" height="8"></rect></svg>
                                <svg className="svg-search-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                            </button>
                        </form>
                        <div id="ajaxSearchResults-mb" className="smart-search-wrapper ajaxSearchResults" style={{ display: 'none' }}>
                            <div className="resultsContent"></div>
                        </div> */}
                    </div>
                </div>
            </div>
        </header>
    )
}