"use client"

type SeoProps = {
    pageTitle: string;
}

const Seo = ({ pageTitle }: SeoProps) => {
    return (
        <>
            <title>
                {pageTitle &&
                    `${pageTitle} | BeTi Store`}
            </title>
        </>
    )
};

export default Seo;
