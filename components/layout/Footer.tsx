'use client'
import moment from 'moment';

const Footer = () => {
    return (
        <>
            <footer className="mainFooter footer">
                <div className="main-footer" id="fter-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg">
                                <div className="footer-col footer-content1">
                                    <h4 className="footer-title in">
                                        Giới thiệu
                                    </h4>
                                    <div className="footer-content">
                                        <p>BETI trang mua sắm trực tuyến của thương hiệu thời trang Stussy giúp bạn tiếp cận xu hướng thời trang mới nhất.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg">
                                <div className="footer-col footer-block">
                                    <h4 className="footer-title in">
                                        Liên kết
                                    </h4>
                                    <div className="footer-content toggle-footer">
                                        <ul>
                                            <li className="item">
                                                <a href="/search" title="Tìm kiếm">Tìm kiếm</a>
                                            </li>
                                            <li className="item">
                                                <a href="/pages/about-us" title="Giới thiệu">Giới thiệu</a>
                                            </li>
                                            <li className="item">
                                                <a href="/return-policy" title="Chính sách đổi trả">Chính sách đổi trả</a>
                                            </li>
                                            <li className="item">
                                                <a href="/pages/chinh-sach-bao-mat" title="Chính sách bảo mật">Chính sách bảo mật</a>
                                            </li>
                                            <li className="item">
                                                <a href="/pages/dieu-khoan-dich-vu" title="Điều khoản dịch vụ">Điều khoản dịch vụ</a>
                                            </li>
                                            <li className="item">
                                                <a href="/pages/lien-he" title="Liên hệ">Liên hệ</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-footer text-center">
                    <div className="container">
                        <p>Copyright © {moment().year()} <a href="https://www.betistore.vn"> BETI</a></p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;