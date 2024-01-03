'use client'
import '@/styles/applications.scss'
import '@/styles/ltr.css'
import "@fortawesome/fontawesome-svg-core/styles.css" // import Font Awesome CSS
import "react-image-gallery/styles/css/image-gallery.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { WrapperProvider } from '@/lib/context/WrapperContext'
import useLanguage from '@/lib/hooks/use-languages'
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});
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
        {/* <NextProgress/> */}
        {children}
        <Toaster />
      </WrapperProvider>
    </html>
  )
}
