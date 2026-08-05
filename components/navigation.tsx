"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-sm">
      <Link href="/" className="text-lg font-bold tracking-widest hover:opacity-80 transition-opacity">
        NOIRE
      </Link>
      <div className="flex gap-8 text-sm tracking-wide">
        <Link 
          href="/work" 
          className={`transition-opacity ${isActive('/work') ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
        >
          Work
        </Link>
        <Link 
          href="/studio" 
          className={`transition-opacity ${isActive('/studio') ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
        >
          Studio
        </Link>
        <Link 
          href="/journal" 
          className={`transition-opacity ${isActive('/journal') ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
        >
          Journal
        </Link>
        <Link 
          href="/contact" 
          className={`transition-opacity ${isActive('/contact') ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}
