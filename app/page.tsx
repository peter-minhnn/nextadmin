'use client'
import Banner from '@/components/home/Banner';
import Collection from '@/components/home/FilterCollection';
import { useWrapperContext } from '@/lib/context/WrapperContext';
import useLanguage from '@/lib/hooks/use-languages';
import useTrans from '@/lib/hooks/use-translation';
import { routes } from '@/routes';
import { useWindowSize } from '@uidotdev/usehooks'
import Link from 'next/link';
import { useEffect } from 'react';
import MainBanner from '@/public/assets/images/banner.jpg';
import Image from 'next/legacy/image';

const HomePage = () => {
  const size = useWindowSize()
  const context = useWrapperContext()
  const trans = useTrans()
  const { currentLang } = useLanguage()

  useEffect(() => {
    context.contextValue({ path: routes.home, pageTitle: trans.seoTitle.home, bodyClass: '' })
    context.updateBreadcrumbContext([]);
  }, [currentLang])

  return (
    <>
      <div id="home-slider">
        <div id="homepage_slider" className="owl-carousel owl-theme owl-loaded owl-drag">
          <div className="owl-stage-outer"><div className="owl-stage" style={{ width: `${size}px`, transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s' }}>
            <div className="owl-item active" style={{ width: `${size}px` }}>
              <div className="item">
                <Link href={routes.ecommerce.collections} aria-label="TẤT CẢ SẢN PHẨM">
                  <Image title="TẤT CẢ SẢN PHẨM" alt="TẤT CẢ SẢN PHẨM" src={MainBanner} />
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Banner />
      <Collection />
    </>
  )
}
export default HomePage