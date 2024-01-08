'use client'
import { sendMessage } from "@/lib/actions/contact.action";
import { useWrapperContext } from "@/lib/context/WrapperContext";
import useLanguage from "@/lib/hooks/use-languages";
import useTrans from "@/lib/hooks/use-translation";
import { routes } from "@/routes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type Inputs = {
    name: string;
    email: string;
    phone: string;
    content: string;
}

const Contact = () => {
    const context = useWrapperContext();
    const trans = useTrans();
    const { currentLang } = useLanguage();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        const response = await sendMessage(data);
        if (response.code === 'error' || (response.code === 'success' && response.data.code === (-1))) {
            toast.error(trans.errors.sendContactFailed)
            return;
        }
        toast.success(trans.success.sendContactSuccess);
        reset();
    };

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
                                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="contact-form">
                                        <div className="row">
                                            <div className="col-sm-12 col-xs-12">
                                                <div className="input-group">
                                                    <input type="text"
                                                        {...register('name', { required: true })}
                                                        aria-invalid={errors.name ? "true" : "false"}
                                                        className={`form-control ${errors.name ? 'border border-danger' : ''}`}
                                                        placeholder={trans.contact.yourName}
                                                        aria-describedby="basic-addon1"
                                                    />
                                                    {errors.name && errors.name.type === "required" && (
                                                        <span className="text-danger">{trans.errors.emptyName}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="input-group">
                                                    <input type="text"
                                                        {...register('email', {
                                                            required: true,
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: trans.errors.invalidEmail
                                                            }
                                                        })}
                                                        aria-invalid={errors.email ? "true" : "false"}
                                                        className={`form-control ${errors.email ? 'border border-danger' : ''}`}
                                                        placeholder={trans.contact.yourEmail} aria-describedby="basic-addon1"
                                                    />
                                                    {errors.email && errors.email.type === "required" && (
                                                        <span className="text-danger">{trans.errors.emptyEmail}</span>
                                                    )}
                                                    {errors.email && errors.email.type === "pattern" && (
                                                        <span className="text-danger">{trans.errors.invalidEmail}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="input-group">
                                                    <input type="number"
                                                        {...register('phone', {
                                                            required: {
                                                                value: true,
                                                                message: trans.errors.emptyPhone
                                                            },
                                                            maxLength: {
                                                                value: 10,
                                                                message: trans.errors.invalidMaxlengthPhone,
                                                            },
                                                        })}
                                                        aria-invalid={errors.phone ? "true" : "false"}
                                                        className={`form-control ${errors.phone ? 'border border-danger' : ''}`}
                                                        placeholder={trans.contact.yourPhone}
                                                        aria-describedby="basic-addon1"
                                                    />

                                                    {errors.phone && errors.phone.type === "required" && (
                                                        <span className="text-danger">{trans.errors.emptyPhone}</span>
                                                    )}
                                                    {errors.phone && errors.phone.type === "pattern" && (
                                                        <span className="text-danger">{trans.errors.invalidPhone}</span>
                                                    )}
                                                    {errors.phone && errors.phone.type === "maxLength" && (
                                                        <span className="text-danger">{trans.errors.invalidMaxlengthPhone}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-xs-12">
                                                <div className="input-group">
                                                    <textarea
                                                        {...register('content', { required: true })}
                                                        className={`${errors.content ? 'border border-danger' : ''}`}
                                                        aria-invalid={errors.content ? "true" : "false"}
                                                        placeholder={trans.contact.content}>
                                                    </textarea>
                                                    {errors.content && errors.content.type === "required" && (
                                                        <span className="text-danger">{trans.errors.emptyContent}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xs-12">
                                                <button type="submit" className="button dark"
                                                    style={{
                                                        opacity: `${(!isDirty || !isValid) ? 0.5 : 1}`,
                                                        cursor: `${(!isDirty || !isValid) ? 'not-allowed' : 'pointer'}`
                                                    }}
                                                    disabled={!isDirty || !isValid}>
                                                    {trans.contact.send}
                                                </button>
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