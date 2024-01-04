'use client'
import { BreadcrumbProps } from '@/lib/context/WrapperContext';
import { useRouter } from 'next/navigation';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BreadcrumbLayout = ({ breadcrumbArr }: { breadcrumbArr: BreadcrumbProps[] }) => {
    const router = useRouter();
    return (
        <>
            <div className={`breadcrumb-shop clearfix`}>
                <div className="container">
                    <div style={{ height: 40 }}>
                        <Breadcrumb className={`breadcrumb breadcrumb-arrows`}>
                            {breadcrumbArr.length ?
                                breadcrumbArr.map((el, i) => (
                                    <Breadcrumb.Item
                                        key={i}
                                        active={i === (breadcrumbArr.length - 1)}
                                        onClick={() => router.push(el.path)}>
                                        {el.title}
                                    </Breadcrumb.Item>
                                ))
                                : <Breadcrumb.Item active>Trang Chủ</Breadcrumb.Item>
                            }
                        </Breadcrumb>
                        {/* <ol className="breadcrumb breadcrumb-arrows" itemScope itemType="http://schema.org/BreadcrumbList">
                            <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                <a href="/" target="_self" itemProp="item"><span itemProp="name">Trang chủ</span></a>
                                <meta itemProp="position" content="1" />
                            </li>
                            <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                <a href="/collections" target="_self" itemProp="item">
                                    <span itemProp="name">Danh mục</span>
                                </a>
                                <meta itemProp="position" content="2" />
                            </li>
                            <li className="active" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                <span itemProp="item" content="https://www.ctstussy.com/collections/all"><span itemProp="name">Tất cả sản phẩm</span></span>
                                <meta itemProp="position" content="3" />
                            </li>
                        </ol> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BreadcrumbLayout;