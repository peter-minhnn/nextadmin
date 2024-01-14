'use client'
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Seo from "@/components/layout/Seo";
import { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useResetAtom } from "jotai/utils";
import { formSearchStoreAtom } from "@/lib/stores/products";

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

// const NextProgress = dynamic(() => import('@/components/next-progress'), {
//     ssr: false,
// });

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
    const resetLocation = useResetAtom(formSearchStoreAtom);

    const contextValue = useCallback((params: ContextProps) => {
        params.path && setPath(params.path)
        params.pageTitle && setPageTitle(params.pageTitle)
        params.language && setLanguage(params.language)
        setBodyClass(params.bodyClass ?? '')
    }, []);

    const updateBreadcrumbContext = useCallback((data: BreadcrumbProps[] = []) => {
        setBreadcrumb([...data])
    }, [])

    const setLoading = useCallback((loading: boolean = false) => {
        loading && ref.current && ref.current.continuousStart();
        !loading && ref.current && ref.current.complete();
    }, []);

    const handleLockedScroll = useCallback((className: string) => {
        setLockedScroll(className);
    }, []);

    // useEffect(() => { }, [bodyClass])

    useEffect(() => { resetLocation(); }, [])
    
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
            <div className={`${bodyClass} ${lockedScroll}`}>
                <Seo pageTitle={pageTitle} />
                <Header />
                <main className="mainContainer_theme">
                    {children}
                </main>
                <Footer />
                <LoadingBar color={'#2998ff'} ref={ref} />
            </div>
        </WrapperContext.Provider>
    )
}