import LoginPage from "@/app/login/page";
import useTokenAuth from "@/lib/hooks/useTokenAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { isValid } = useTokenAuth();

    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Wrapper;