'use client'
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Seo from "@/components/layout/Seo";
import { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { Quicksand } from 'next/font/google'

export interface ContextProps {
    path?: string;
    pageTitle?: string;
    language?: string;
    bodyClass?: string;
}

type ProviderProps = {
    children: ReactNode
}

export interface BreadcrumbProps {
    title: string;
    path: string;
}

type ContextTypes = {
    contextValue: (value: ContextProps) => void;
    updateBreadcrumbContext: (value: BreadcrumbProps[]) => void;
    setLoading: (loading: boolean) => void;
    handleLockedScroll: (className: string) => void;
    breadcrumb: BreadcrumbProps[];
    language?: string;
}

const inter = Quicksand({ subsets: ['latin', 'vietnamese'] })

export const WrapperContext = createContext<ContextTypes | null>(null);

export const useWrapperContext = () => {
    const context = useContext(WrapperContext);
    if (!context) throw new Error('MiPu context does not exist');
    return context;
}

export function WrapperProvider({ children }: ProviderProps) {
    const ref = useRef<any>(null);
    const [path, setPath] = useState<string>('/');
    const [pageTitle, setPageTitle] = useState<string>('');
    const [language, setLanguage] = useState<string>('');
    const [bodyClass, setBodyClass] = useState<string>('');
    const [lockedScroll, setLockedScroll] = useState<string>('');
    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProps[]>([]);

    const contextValue = useCallback((params: ContextProps) => {
        params.path && setPath(params.path)
        params.pageTitle && setPageTitle(params.pageTitle)
        params.language && setLanguage(params.language)
        setBodyClass(params.bodyClass ?? '')
    }, []);

    const updateBreadcrumbContext = useCallback((data: BreadcrumbProps[] = []) => {
        setBreadcrumb([...data])
    }, [breadcrumb])

    const setLoading = useCallback((loading: boolean = false) => {
        loading && ref.current && ref.current.continuousStart();
        !loading && ref.current && ref.current.complete();
    }, []);

    const handleLockedScroll = useCallback((className: string) => {
        setLockedScroll(className);
    }, []);

    useEffect(() => { }, [bodyClass])

    return (
        <WrapperContext.Provider
            value={{
                contextValue,
                updateBreadcrumbContext,
                setLoading,
                handleLockedScroll,
                breadcrumb,
                language
            }}
        >
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=0" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <link rel="shortcut icon" href="./favicon.co" type="image/png" />
                <meta name="keywords" content="BETI" />
                <meta name="robots" content="index,follow,noodp" />
                <meta httpEquiv="x-dns-prefetch-control" content="on" />
                <meta property="og:type" content="product" />
                <meta property="og:title" content="BETI STORE" />
                <meta property="og:image" content="http://product.hstatic.net/200000518745/product/z4458353944460_a3a32e53db88f893113f6833fc75be65_e28d5f1418c242efa7c5fa3348499238_grande.jpg" />
                <meta property="og:image:secure_url" content="https://product.hstatic.net/200000518745/product/z4458353944460_a3a32e53db88f893113f6833fc75be65_e28d5f1418c242efa7c5fa3348499238_grande.jpg" />
                <meta property="og:price:amount" content="1550000" />
                <meta property="og:price:currency" content="VND" />
                <meta property="og:url" content="https://www.betistore.vn/products/8-ball-corp-hoodie" />
                <meta property="og:site_name" content="BETI" />
                <meta name="description" content="Mua ngay – Xem nhanh" />
            </head>
            <body className={`main-body ${inter.className} ${bodyClass} ${lockedScroll}`} suppressHydrationWarning>
                <Seo pageTitle={pageTitle} />
                <Header />
                <main className="mainContainer_theme">
                    {breadcrumb.length ? <Breadcrumb breadcrumbArr={breadcrumb} /> : null}
                    {children}
                </main>
                <Footer />
                <LoadingBar color={'#2998ff'} ref={ref} />
            </body>
        </WrapperContext.Provider>
    )
}