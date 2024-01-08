'use client'
import HomePage from "@/app/page";
import { routes } from "@/routes";
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LayoutProductPage() {
    const router = useRouter();

    useEffect(() => {
        router.push(routes.home)
    }, [])

    return <HomePage />;
}