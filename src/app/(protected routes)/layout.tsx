import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import SideMenu from '@/components/SideMenu/index'
import TopMenu from '@/components/TopMenu/index'
import { Toaster } from '@/components/ui/toaster'
import { BreadcrumbMenu } from '@/components/Breadcrumb'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CDC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SideMenu />
        <BreadcrumbMenu />
        {/* <TopMenu isLogin={false} /> */}
        <div
          style={{
            backgroundColor: '#090d28',
            marginLeft: '6%',
            minHeight: '100vh',
          }}
        >
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
