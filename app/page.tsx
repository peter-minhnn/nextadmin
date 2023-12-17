'use client'
import Banner from '@/components/home/Banner';
import Collection from '@/components/home/Collection';
import { useWrapperContext } from '@/lib/context/WrapperContext';
import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect } from 'react';

export default function Home() {
  const size = useWindowSize();
  const context = useWrapperContext();

  useEffect(() => {
    context.contextValue({ breadcrumb: [], path: 'Trang Chủ' })
  }, [])

  return (
    <>
      <div id="home-slider">
        <div id="homepage_slider" className="owl-carousel owl-theme owl-loaded owl-drag">
          <div className="owl-stage-outer"><div className="owl-stage" style={{ width: `${size}px`, transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s' }}>
            <div className="owl-item active" style={{ width: `${size}px` }}>
              <div className="item">
                <a href="/collections/all" aria-label="TẤT CẢ SẢN PHẨM">
                  <img title="TẤT CẢ SẢN PHẨM" alt="TẤT CẢ SẢN PHẨM" src="//theme.hstatic.net/200000518745/1000870107/14/slideshow_1.jpg?v=99" />
                </a>
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
