'use client'
import useOutsideAlerter from '@/lib/hooks/useOutsideAlerter'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    email: string
    password: string
}

export default function Header() {
    const clickOutSideRef = useRef<any>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const [showSearchPopup, setShowSearchPopup] = useState<boolean>(false)
    const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)
    const { isOutSide } = useOutsideAlerter(clickOutSideRef)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(watch("email")) // watch input value by passing the name of it

    useEffect(() => {
        if (isOutSide) {
            setShowSearchPopup(false);
            setShowLoginPopup(false);
        }
    }, [isOutSide])

    return (
        <header className='main-header mainHeader_temp_2 ' style={{ minHeight: 120 }}>
            <div className='navigation-header'>
                <div className='header-middle'>
                    <div className='container'>
                        <div className='flexContainer-header'>
                            <div className={`col-md-4 header-wrap-menu-mb header-icon ${mobileMenuOpen ? 'show-action' : ''}`}>
                                <div className="hidden-lg hidden-md">
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
                                                        <ul className="menuList-sub vertical-menu-list sub-child">
                                                            <li className="active">
                                                                <Link className="parent" href="/">MAIN MENU</Link>
                                                            </li>
                                                            <li className="" data-menu-root="104326217">
                                                                <Link className="parent" href="/collections/all">SHOP
                                                                    <i className="svg-right">
                                                                        <svg className="icon icon--arrow-right" viewBox="0 0 8 12">
                                                                            <path stroke="currentColor" strokeWidth="2" d="M2 2l4 4-4 4" fill="none" strokeLinecap="square"></path>
                                                                        </svg>
                                                                    </i>
                                                                </Link>
                                                            </li>
                                                            <li className="">
                                                                <Link className="parent" href="/blogs/news">BLOG</Link>
                                                            </li>
                                                            <li className="">
                                                                <Link className="parent" href="https://www.instagram.com/ctstussy/">SOCIAL</Link>
                                                            </li>
                                                            <li className="">
                                                                <Link className="parent" href="/pages/lien-he">CONTACT</Link>
                                                            </li>
                                                            <li className="main_help">
                                                                <div className="mobile_menu_section">
                                                                    <p className="mobile_menu_section-title">Bạn cần hỗ trợ</p>
                                                                    <div className="mobile_menu_help">
                                                                        <svg className="icon icon--bi-phone" viewBox="0 0 24 24">
                                                                            <g strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square">
                                                                                <path d="M17 15l-3 3-8-8 3-3-5-5-3 3c0 9.941 8.059 18 18 18l3-3-5-5z" stroke="#333333"></path>
                                                                                <path d="M14 1c4.971 0 9 4.029 9 9m-9-5c2.761 0 5 2.239 5 5" stroke="#333333"></path>
                                                                            </g>
                                                                        </svg>
                                                                        <Link href="tel:0933338913" rel="nofollow">0933338913</Link>
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
                                                                        <Link href="mailto:ctstussy@gmail.com" rel="nofollow">ctstussy@gmail.com</Link>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <ul className="menuList-sub sub-child-1" id="104326217">
                                                            <li><Link href="#"><i className="fa fa-angle-left" aria-hidden="true"></i>Quay về</Link></li>
                                                            <li><Link href="/collections/all"><b>Xem tất cả "SHOP"</b></Link></li>
                                                            <li className="">
                                                                <Link href="/collections/tee"><span>- </span>T-SHIRT</Link>
                                                            </li>
                                                            <li className="">
                                                                <Link href="/collections/hoodie"><span>- </span>HOODIE</Link>
                                                            </li>
                                                            <li className="">
                                                                <Link href="/collections/accessories"><span>- </span>ACCESSORIES</Link>
                                                            </li>
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
                                    <Link href="https://www.betistore.com" itemProp="url">
                                        <img itemProp="logo" data-src="//theme.hstatic.net/200000518745/1000870107/14/logo.png?v=99" alt="BETI" className="img-responsive logoimg lazyloaded" src="//theme.hstatic.net/200000518745/1000870107/14/logo.png?v=99" />
                                    </Link>
                                    <h1 style={{ display: 'none' }}><Link href="https://www.betistore.vn" itemProp="url">BETI</Link></h1>
                                </div>
                            </div>
                            <div ref={clickOutSideRef} className='col-md-4 header-wrap-icon'>
                                <div className={`header-icon header-action-search ${showSearchPopup ? 'show-action' : ''}`}>
                                    <Link id="site-search-handle" href="#" title="Search" className="header-action-toggle" arial-label="Search header"
                                        onClick={() => {
                                            setShowSearchPopup(!showSearchPopup)
                                            setShowLoginPopup(false)
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
                                            <p className="titlebox">Tìm kiếm</p>
                                            <div className="search-box wpo-wrapper-search">
                                                <form action="/search" className="searchform searchform-categoris ultimate-search">
                                                    <div className="wpo-search-inner">
                                                        <input type="hidden" name="type" value="product" />
                                                        <input required id="inputSearchAuto" name="q" autoComplete="off" className="searchinput input-search search-input" type="text" placeholder="Tìm kiếm sản phẩm..." />
                                                    </div>
                                                    <button type="submit" className="btn-search">
                                                        <svg version="1.1" className="svg search" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 27" style={{ background: 'new 0 0 24 27' }} xmlSpace
                                                            ="preserve"><path d="M10,2C4.5,2,0,6.5,0,12s4.5,10,10,10s10-4.5,10-10S15.5,2,10,2z M10,19c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S13.9,19,10,19z"></path><rect x="17" y="17" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.2844 19.5856)" width="4" height="8"></rect></svg>
                                                    </button>
                                                </form>
                                                <div id="ajaxSearchResults" className="smart-search-wrapper ajaxSearchResults" style={{ display: 'none' }}>
                                                    <div className="resultsContent"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`header-icon header-action-search ${showLoginPopup ? 'show-action' : ''}`}>
                                    <Link
                                        onClick={() => {
                                            setShowLoginPopup(!showLoginPopup)
                                            setShowSearchPopup(false)
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
                                            <div className="site_account_panel_list">
                                                <div id="header-login-panel" className="site_account_panel site_account_default is-selected">
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
                                                                    <Link href="/account/register" className="link">Tạo tài khoản</Link>
                                                                    <button aria-controls="header-register-panel" className="js-link link" >Tạo tài khoản</button>
                                                                </p>
                                                                <p>Quên mật khẩu?
                                                                    <button aria-controls="header-recover-panel" className="js-link link">Khôi phục mật khẩu</button>
                                                                </p>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div id="header-recover-panel" className="site_account_panel site_account_sliding">
                                                    <div className="site-account-list">
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
                                                                <button aria-controls="header-login-panel" className="js-link link">Trở về đăng nhập</button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}