'use client'
import { useWrapperContext } from "@/lib/context/WrapperContext";
import useLanguage from "@/lib/hooks/use-languages";
import useTrans from "@/lib/hooks/use-translation";
import { routes } from "@/routes";
import { useEffect } from "react";

const Contact = () => {
    const context = useWrapperContext();
    const trans = useTrans();
    const { currentLang } = useLanguage();

    useEffect(() => {
        context.contextValue({
            path: routes.contact,
            pageTitle: trans.seoTitle.contact,
            bodyClass: 'page-contact'
        })
    }, [currentLang, context.language])

    return (
        <div className="layout-pageContact">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12 box-heading-contact"></div>
                    <div className="col-md-6 col-sm-12 col-xs-12  wrapbox-content-page-contact">
                        <div className="header-page-contact clearfix">
                            <h1>{trans.seoTitle.contact}</h1>
                        </div>
                        <div className="box-info-contact">
                            <ul className="list-info">
                                <li>
                                    <p>{trans.contact.myAddress}</p>
                                    <p><strong></strong></p>
                                </li>
                                <li>
                                    <p>{trans.contact.myEmail}</p>
                                    <p><strong>nnminh742@gmail.com</strong></p>
                                </li>
                                <li>
                                    <p>{trans.contact.phoneNumber}</p>
                                    <p><strong></strong></p>
                                </li>
                                <li>
                                    <p>{trans.contact.workingTime}</p>
                                    <p><strong>{trans.contact.schedule}</strong></p>
                                </li>
                            </ul>
                        </div>
                        <div className="box-send-contact">
                            <h2>{trans.contact.sendUsQuestion}</h2>
                            <div id="col-left contactFormWrapper">
                                <form className="contact-form">
                                    <div className="contact-form">
                                        <div className="row">
                                            <div className="col-sm-12 col-xs-12">
                                                <div className="input-group">
                                                    <input required type="text" name="contact[name]" className="form-control" placeholder={trans.contact.yourName} aria-describedby="basic-addon1" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="input-group">
                                                    <input required type="text" name="contact[email]" className="form-control" placeholder={trans.contact.yourEmail} aria-describedby="basic-addon1" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="input-group">
                                                    <input pattern="[0-9]{10,12}" required type="text" name="contact[phone]" className="form-control" placeholder={trans.contact.yourPhone} aria-describedby="basic-addon1" />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-xs-12">
                                                <div className="input-group">
                                                    <textarea required name="contact[body]" placeholder={trans.contact.content}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <button className="button dark">{trans.contact.send}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;