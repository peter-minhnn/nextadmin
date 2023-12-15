// 'use client'
import { Noticia_Text, Quicksand } from 'next/font/google'
import './globals.css'
import '@/styles/applications.scss'
import '@/styles/ltr.css'
import "@fortawesome/fontawesome-svg-core/styles.css" // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core"
import Wrapper from '@/components/layout/Wrapper'
import { Metadata } from 'next'

// const inter = Noticia_Text({ weight: '400', subsets: ['latin'] })
const inter = Quicksand({ subsets: ['latin', 'vietnamese'] })
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export const metadata: Metadata = {
  title: {
    template: '%s | BETI Store',
    default: 'BETI Store',
  },
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={`main-body ${inter.className}`}>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
