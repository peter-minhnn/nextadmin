'use client'
import { formSearchStoreAtom } from "@/lib/stores/products";
import { useResetAtom } from "jotai/utils";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const resetLocation = useResetAtom(formSearchStoreAtom);
    
    useEffect(() => { 
        resetLocation(); 
    }, [])

    return (
        <>{children}</>
    )
}