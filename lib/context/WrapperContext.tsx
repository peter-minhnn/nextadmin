'use client'
import Breadcrumb from "@/components/layout/Breadcrumb";
import Header from "@/components/layout/Header";
import { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export interface ContextProps {
    path?: string;
    breadcrumb?: string[];
}

type ProviderProps = {
    children: ReactNode
}

type ContextTypes = {
    contextValue: (value: ContextProps) => void;
    setLoading: (loading: boolean) => void;
    breadcrumb: string[];
}

export const WrapperContext = createContext<ContextTypes | null>(null);

export const useWrapperContext = () => {
    const context = useContext(WrapperContext);
    if (!context) throw new Error('MiPu context does not exist');
    return context;
}

export function WrapperProvider({ children }: ProviderProps) {
    const ref = useRef<any>(null);
    const [path, setPath] = useState<string>('/');
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    const contextValue = useCallback((params: ContextProps) => {
        params.path && setPath(params.path)
        params.breadcrumb && setBreadcrumb(params.breadcrumb)
    }, [path]);

    const setLoading = useCallback((loading: boolean = false) => {
        loading && ref.current && ref.current.continuousStart();
        !loading && ref.current && ref.current.complete();
    }, []);

    return (
        <WrapperContext.Provider
            value={{
                contextValue,
                setLoading,
                breadcrumb
            }}
        >
            <Header />
            <main className="mainContainer_theme">
                {breadcrumb.length ? <Breadcrumb breadcrumbArr={['Trang Chủ', 'Danh mục', 'Tất cả sản phẩm']}/> : null}
                {children}
            </main>
            <LoadingBar color={'#2998ff'} ref={ref} />
        </WrapperContext.Provider>
    )
}