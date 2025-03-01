'use client'

import { MobileNav } from '@/components/mobile-nav'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Shield, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import * as React from 'react'

type MainNavItem = {
  title: string
  href: string
  disabled?: boolean
}

interface MainNavProps {
  items?: MainNavItem[]
  isAdmin: boolean
  children?: React.ReactNode
}

export function MainNav({ items, isAdmin, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image
          src="/images/logo-circle.webp"
          height={24}
          width={24}
          alt="Eliana Ginocchio logo"
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <X />
        ) : (
          <Image
            src="/images/logo-circle.webp"
            height={24}
            width={24}
            alt="Eliana Ginocchio logo"
          />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {isAdmin && (
        <Link
          href="/dashboard/admin"
          className="flex items-center text-lg font-medium transition-colors hover:text-foreground/50 sm:text-sm"
        >
          <Shield />
          <span>Admin</span>
        </Link>
      )}
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}
