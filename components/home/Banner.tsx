import Banner3 from '@/public/assets/images/banner-small-3.jpg';
import Image from 'next/legacy/image';

export default function Banner() {
    return (
        <>
            <section id="section-banner-home" className="section section-banner">
                <div className="container">
                    <div className="banner-home-outer banner_home_margin_top">
                        <div className="row banner-home-inner">
                            <div className="col-md-4 col-sm-4 col-xs-12 banner-home-item">
                                <div className="effectTwo fade-box">
                                    <a href="/collections/dress" title="DRESS" aria-label="DRESS1">
                                        <Image className="img-responsive border-radius1 ls-is-cached lazyloaded" src={Banner3} alt="DRESS1" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12 banner-home-item">
                                <div className="effectTwo fade-box">
                                    <a href="/collections/dress" title="DRESS" aria-label="DRESS2">
                                        <Image className="img-responsive border-radius1 ls-is-cached lazyloaded" src={Banner3} alt="DRESS2" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12 banner-home-item">
                                <div className="effectTwo fade-box">
                                    <a href="/collections/dress" title="DRESS" aria-label="DRESS3">
                                        <Image className="img-responsive border-radius1 ls-is-cached lazyloaded" src={Banner3} alt="DRESS3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}