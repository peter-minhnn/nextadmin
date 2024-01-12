'use client'
import useTrans from '@/lib/hooks/use-translation';
import { routes } from '@/routes';
import moment from 'moment';
import Link from 'next/link';

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
                                                <Link href={routes.search} title={trans.footer.search}>
                                                    {trans.footer.search}
                                                </Link>
                                            </li>
                                            <li className="item">
                                                <Link href={routes.returnPolicy} title={trans.footer.returnPolicy}>
                                                    {trans.footer.returnPolicy}
                                                </Link>
                                            </li>
                                            <li className="item">
                                                <Link href={routes.contact} title={trans.footer.contact}>
                                                    {trans.footer.contact}
                                                </Link>
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