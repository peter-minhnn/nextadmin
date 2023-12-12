// 'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/components/layout/ltr.css'
import Wrapper from '@/components/layout/Wrapper'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
