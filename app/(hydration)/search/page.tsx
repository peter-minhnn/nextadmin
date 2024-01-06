'use client'
import ProductItem from "@/components/products/ProductItem";
import { useWrapperContext } from "@/lib/context/WrapperContext"
import useLanguage from "@/lib/hooks/use-languages";
import useProducts from "@/lib/hooks/use-products";
import useTrans from "@/lib/hooks/use-translation";
import { routes } from "@/routes";
import { ProductItemType } from "@/types/product-type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const SearchProduct = () => {
    const context = useWrapperContext();
    const trans = useTrans();
    const { currentLang } = useLanguage();
    const [searchText, setSearchText] = useState<string>('');
    const { products } = useProducts({ categoryCode: '' });
    const [result, setResult] = useState<ProductItemType[]>([]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (!searchText) {
            toast.error(trans.errors.requiredSearch)
            return;
        }
        setIsSubmitted(true);
        const data = products.filter(el => el.productName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
        setResult(data || []);
    }

    const hiddenNotFound = () => {
        if (!isSubmitted && !result.length) return true;
        if (isSubmitted && result.length) return true;
        return false;
    }

    useEffect(() => {
        context.contextValue({
            path: routes.search,
            pageTitle: trans.seoTitle.search,
            bodyClass: 'search'
        })

        context.updateBreadcrumbContext([
            { title: trans.breadcrumbs.home, path: routes.home },
            { title: trans.breadcrumbs.search, path: routes.search },
        ])
    }, [currentLang, context.language])

    return (
        <>
            <div className="searchPage" id="layout-search">
                <div className="container">
                    <div className="row pd-page">
                        <div className="col-md-12 col-xs-12">
                            <div className="heading-page">
                                <h1>{trans.seoTitle.search}</h1>
                                <p className={`subtxt ${hiddenNotFound() && 'hidden'}`}>
                                    {trans.search.yes}
                                    <span>{result.length} {trans.search.product}</span>
                                    {trans.search.forSeaching}
                                </p>
                            </div>
                            <div className="wrapbox-content-page">
                                <div className="content-page clearfix" id="search">
                                    <div className={`expanded-message`}>
                                        <h2 className={`${hiddenNotFound() && 'hidden'}`}>{trans.errors.searchNotFound}</h2>
                                        <div className={`subtext`} style={{ display: `${hiddenNotFound() ? 'none' : 'block'}` }}>
                                            <span>{trans.errors.textNotFound}  <strong>"{searchText}"</strong>. </span>
                                            <span>{trans.errors.reInput}</span>
                                        </div>
                                        <div className="search-field">
                                            <form className="search-page" onSubmit={(e) => submitHandler(e)}>
                                                {/* <input type="hidden" name="type" value="product" /> */}
                                                <input type="submit" alt="Go" id="go" />
                                                <input
                                                    type="text"
                                                    name="q"
                                                    className="search_box"
                                                    placeholder={trans.seoTitle.search}
                                                    onChange={(e) => setSearchText(e.target.value)}
                                                    value={searchText}
                                                    defaultValue={undefined}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                    <div className={`${!result.length && 'hidden'}`} style={{ marginTop: '2rem' }}>
                                        <p className={`subtext-result ${(!result.length) && 'hidden'}`}>{trans.search.searchResult} <strong>"{searchText}"</strong>.</p>
                                        <div className={`results content-product-list`}>
                                            <div className={`search-list-results row`}>
                                                {result.map((product, index) => (
                                                    <ProductItem product={product} key={index} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchProduct;