'use client'
import Header from "./Header";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Wrapper;