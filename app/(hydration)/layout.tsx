'use client'
import { formSearchStoreAtom } from "@/lib/stores/products";
import { useResetAtom } from "jotai/utils";
import { useEffect } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useWrapperContext } from "@/lib/context/WrapperContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const resetLocation = useResetAtom(formSearchStoreAtom);
    const { breadcrumb } = useWrapperContext();
    
    useEffect(() => {
        resetLocation();
    }, [])

    return (
        <>
            <Breadcrumb breadcrumbArr={breadcrumb} />
            {children}
        </>
    )
}