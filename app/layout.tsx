'use client'
import '@/styles/applications.scss';
import '@/styles/ltr.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-image-gallery/styles/css/image-gallery.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { config } from "@fortawesome/fontawesome-svg-core"
import { WrapperProvider } from '@/lib/context/WrapperContext'
import useLanguage from '@/lib/hooks/use-languages'
import { Toaster } from 'react-hot-toast';

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { currentLang } = useLanguage();

  return (
    <html lang={currentLang}>
      <WrapperProvider>
        {children}
        <Toaster />
      </WrapperProvider>
    </html>
  )
}
