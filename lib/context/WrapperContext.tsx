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

type ContextTypes = {
    contextValue: (value: ContextProps) => void;
    updateBreadcrumbContext: (value: string[]) => void;
    setLoading: (loading: boolean) => void;
    breadcrumb: string[];
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
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    const contextValue = useCallback((params: ContextProps) => {
        params.path && setPath(params.path)
        params.pageTitle && setPageTitle(params.pageTitle)
        params.language && setLanguage(params.language)
        setBodyClass(params.bodyClass ?? '')
    }, [path, pageTitle, language, bodyClass]);

    const updateBreadcrumbContext = useCallback((data: string[] = []) => {
        setBreadcrumb([...data])
    }, [breadcrumb]) 

    const setLoading = useCallback((loading: boolean = false) => {
        loading && ref.current && ref.current.continuousStart();
        !loading && ref.current && ref.current.complete();
    }, []);

    useEffect(() => { }, [bodyClass])

    return (
        <WrapperContext.Provider
            value={{
                contextValue,
                updateBreadcrumbContext,
                setLoading,
                breadcrumb,
                language
            }}
        >
            <body className={`main-body ${inter.className} ${bodyClass}`} suppressHydrationWarning>
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