'use client'
import { useRouter } from "next/navigation";
import HomePage from "./page";
import { useEffect } from "react";
import { routes } from "@/routes";

export default function CustomError() {
    const router = useRouter();
    useEffect(() => { router.replace(routes.home) }, [])
    
    return (
        <HomePage />
    )
}