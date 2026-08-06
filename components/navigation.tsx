"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-2 px-3 py-5 sm:gap-4 sm:px-8 sm:py-6 bg-black/50 backdrop-blur-sm">
      <Link href="/" aria-label="Project Noire home" className="shrink-0 transition-opacity hover:opacity-80">
        <Image
          src="/noire-mark.svg"
          alt="NOIRE."
          width={126}
          height={29}
          priority
          className="h-auto w-[104px] sm:w-[126px]"
        />
      </Link>
      <div className="flex shrink-0 gap-2 text-[10px] tracking-wide sm:gap-8 sm:text-sm">
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
