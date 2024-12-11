import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import SidebarLayout from '@/components/sidebar-07'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  )
}

