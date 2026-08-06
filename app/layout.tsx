import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Orbitron } from 'next/font/google'

// Initialize fonts
const _orbitron = Orbitron({ subsets: ['latin'], weight: ["400", "700", "900"] })

export const metadata: Metadata = {
  title: "Project Noire | Creative Systems for Culture",
  description: "Luxury creative studio crafting memorable digital experiences through design, motion, and innovation.",
  generator: "v0.app",
  icons: {
    icon: {
      url: "/noire-mark.svg",
      type: "image/svg+xml",
    },
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_orbitron.className} bg-black`}>
      <body className={`antialiased bg-black text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
