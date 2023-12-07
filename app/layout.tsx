'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import LoginPage from './login/page'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'HomePage',
//   description: '',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  // const { getItem } = useLocalStorage('token');
  // const token = getItem();
  // console.log(token)
  // if (!token) return <LoginPage />

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
