"use client"

type SeoProps = {
    pageTitle: string;
}

const Seo = ({ pageTitle }: SeoProps) => {
    return (
        <>
            <title>
                {pageTitle &&
                    `${pageTitle} - BETI STORE`}
            </title>
        </>
    )
};

export default Seo;
