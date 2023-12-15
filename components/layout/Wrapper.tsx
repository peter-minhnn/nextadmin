'use client'
import Footer from "./Footer";
import Header from "./Header";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="mainContainer_theme">
                {children}
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default Wrapper;