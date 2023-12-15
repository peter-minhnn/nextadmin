'use client'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BreadcrumbLayout = ({ breadcrumbArr }: { breadcrumbArr: string[] }) => {
    return (
        <>
            <div className="breadcrumb-shop clearfix">
                <div className="container">
                    <div className="">
                        <Breadcrumb className='breadcrumb breadcrumb-arrows'>
                            {breadcrumbArr.length ?
                                breadcrumbArr.map((el, i) => (
                                    <Breadcrumb.Item key={i} active={i === (breadcrumbArr.length - 1)}>{el}</Breadcrumb.Item>
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