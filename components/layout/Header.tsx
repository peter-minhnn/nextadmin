import { Fragment, useState } from 'react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className='main-header mainHeader_temp_2 ' style={{ minHeight: 97 }}>
            <div className='navigation-header'>
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
                                                            <a className="parent" href="/">MAIN MENU</a>
                                                        </li>
                                                        <li className="" data-menu-root="104326217">
                                                            <a className="parent" href="/collections/all">SHOP
                                                                <i className="svg-right">
                                                                    <svg className="icon icon--arrow-right" viewBox="0 0 8 12">
                                                                        <path stroke="currentColor" strokeWidth="2" d="M2 2l4 4-4 4" fill="none" strokeLinecap="square"></path>
                                                                    </svg>
                                                                </i>
                                                            </a>
                                                        </li>
                                                        <li className="">
                                                            <a className="parent" href="/blogs/news">BLOG</a>
                                                        </li>
                                                        <li className="">
                                                            <a className="parent" href="https://www.instagram.com/ctstussy/">SOCIAL</a>
                                                        </li>
                                                        <li className="">
                                                            <a className="parent" href="/pages/lien-he">CONTACT</a>
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
                                                                    <a href="tel:0933338913" rel="nofollow">0933338913</a>
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
                                                                    <a href="mailto:ctstussy@gmail.com" rel="nofollow">ctstussy@gmail.com</a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menuList-sub sub-child-1" id="104326217">
                                                        <li><a href="#"><i className="fa fa-angle-left" aria-hidden="true"></i>Quay về</a></li>
                                                        <li><a href="/collections/all"><b>Xem tất cả "SHOP"</b></a></li>
                                                        <li className="">
                                                            <a href="/collections/tee"><span>- </span>T-SHIRT</a>
                                                        </li>
                                                        <li className="">
                                                            <a href="/collections/hoodie"><span>- </span>HOODIE</a>
                                                        </li>
                                                        <li className="">
                                                            <a href="/collections/accessories"><span>- </span>ACCESSORIES</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </nav>
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