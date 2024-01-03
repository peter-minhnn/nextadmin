'use client'
import useTrans from '@/lib/hooks/use-translation';
import moment from 'moment';

const Footer = () => {
    const trans = useTrans();

    return (
        <>
            <footer className="mainFooter footer">
                <div className="main-footer" id="fter-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg">
                                <div className="footer-col footer-content1">
                                    <h4 className="footer-title in">
                                        {trans.footer.about}
                                    </h4>
                                    <div className="footer-content">
                                        <p>{trans.footer.aboutContent}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg">
                                <div className="footer-col footer-block">
                                    <h4 className="footer-title in">
                                        {trans.footer.linked}
                                    </h4>
                                    <div className="footer-content toggle-footer">
                                        <ul>
                                            <li className="item">
                                                <a href="/search" title="Tìm kiếm">{trans.footer.search}</a>
                                            </li>
                                            <li className="item">
                                                <a href="/return-policy" title="Chính sách đổi trả">{trans.footer.returnPolicy}</a>
                                            </li>
                                            <li className="item">
                                                <a href="/pages/lien-he" title="Liên hệ">{trans.footer.contact}</a>
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