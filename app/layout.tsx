'use client'
import { Noticia_Text, Quicksand } from 'next/font/google'
import './globals.css'
import '@/styles/applications.scss'
import '@/styles/ltr.css'
import "@fortawesome/fontawesome-svg-core/styles.css" // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core"
import { WrapperProvider } from '@/lib/context/WrapperContext'
import useLanguage from '@/lib/hooks/useLanguages'

// const inter = Noticia_Text({ weight: '400', subsets: ['latin'] })
const inter = Quicksand({ subsets: ['latin', 'vietnamese'] })
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

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
        </WrapperProvider>
    </html>
  )
}
