import { Navbar } from '../components/molecules/Navbar'
import { useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const renderComponent=true;
  return (
    <html>
      <body>
         {renderComponent? <></> : <Navbar />}
        {children}
      </body>
    </html>
  )
}
