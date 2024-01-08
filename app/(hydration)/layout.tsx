'use client'
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useWrapperContext } from "@/lib/context/WrapperContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { breadcrumb } = useWrapperContext();

    return (
        <>
            <Breadcrumb breadcrumbArr={breadcrumb} />
            {children}
        </>
    )
}