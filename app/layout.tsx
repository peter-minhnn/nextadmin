// 'use client'
import { Quicksand } from 'next/font/google'
import './globals.css'
import '@/styles/applications.scss'
import '@/components/layout/ltr.css'
import Wrapper from '@/components/layout/Wrapper'
import { Metadata } from 'next'

const inter = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HomePage',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={`main-body  ${inter.className}`}>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
