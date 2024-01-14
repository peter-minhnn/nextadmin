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
import { Quicksand } from 'next/font/google';

const inter = Quicksand({ subsets: ['latin', 'vietnamese'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { currentLang } = useLanguage();

  return (
    <html lang={currentLang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="shortcut icon" href="./favicon.co" type="image/png" />
        <meta name="keywords" content="BETI" />
        <meta name="robots" content="index,follow,noodp" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta property="og:type" content="product" />
        <meta property="og:title" content="BETI STORE" />
        <meta property="og:image" content="https://ibb.co/sCv3L4g" />
        <meta property="og:image:secure_url" content="https://ibb.co/sCv3L4g" />
        <meta property="og:price:amount" content="1550000" />
        <meta property="og:price:currency" content="VND" />
        <meta property="og:url" content="https://www.betistore.vn/collections" />
        <meta property="og:site_name" content="BETI" />
        <meta name="description" content="Mua ngay – Xem nhanh" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* <link rel="manifest" href="site.webmanifest" /> */}
      </head>
      <body className={`main-body ${inter.className}`} suppressHydrationWarning>
        <WrapperProvider>
          {children}
          <Toaster />
        </WrapperProvider>
      </body>
    </html>
  )
}
