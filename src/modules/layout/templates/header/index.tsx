"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Customer } from "@medusajs/medusa"
import { Dialog, DialogPanel } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import clsx from "clsx"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import logo from "/public/logos/logoByAnice.svg"
import logoMobile from "/public/logos/logoLeaf.svg"

import CartDropdown from "@modules/layout/components/cart-dropdown"
import UserDropdown from "@modules/layout/components/user-dropdown"

const navigation = [
  { href: "/about", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/community", label: "Community" },
  { href: "/stores", label: "Stores" },
]

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname.includes(href)

  return (
    <li>
      <LocalizedClientLink
        href={href}
        className={clsx(
          "relative block transition link-animation",
          isActive ? "text-sage-11" : "hover:text-sage-11"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-0 -bottom-px h-px bg-sage-11 w-full" />
        )}
      </LocalizedClientLink>
    </li>
  )
}

interface HeaderProps {
  regions: any
  cart: any
  customer: Omit<Customer, "password_hash"> | null
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="flex gap-x-6 lg:gap-x-8 text-lg tracking-tight text-sage-6">
        {navigation.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

export function Header({ regions, cart, customer }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [visible, setVisible] = useState(true)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleScroll = () => {
    const st = window.scrollY

    if (st === 0) {
      setVisible(true)
      if (hideTimeout) clearTimeout(hideTimeout)
      return
    }

    if (Math.abs(lastScrollTop - st) <= 5) return

    if (st > lastScrollTop && st > 40) {
      setVisible(false)
    } else if (
      st + window.innerHeight <
      document.documentElement.scrollHeight
    ) {
      setVisible(true)
    }

    setLastScrollTop(st)

    if (hideTimeout) clearTimeout(hideTimeout)
    const timeout = setTimeout(() => setVisible(false), 3000)
    setHideTimeout(timeout)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setVisible(true)
    if (hideTimeout) clearTimeout(hideTimeout)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    const timeout = setTimeout(() => setVisible(false), 3000)
    setHideTimeout(timeout)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (hideTimeout) clearTimeout(hideTimeout)
    }
  }, [lastScrollTop, hideTimeout])

  return (
    <>
      <header
        className={`fixed top-0 w-full pointer-events-none z-10 h-24 sm:h-32 pt-4 transition-transform duration-500 bg-sage-1 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <>
          <div className="content-container relative flex pointer-events-auto items-center justify-between">
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-1 text-sage-8"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-7 w-7" />
              </button>
            </div>

            <LocalizedClientLink
              href="/"
              data-testid="nav-store-link"
              className="focus:outline-none focus:ring-0 focus:border-teal"
            >
              <Image
                src={logo}
                className="h-16 sm:h-[4.5rem] w-auto mt-2"
                alt="Logo"
              />
            </LocalizedClientLink>
            <div className="flex lg:hidden">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-white flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartDropdown cart={cart} />
              </Suspense>
            </div>
            <div className="flex-1 hidden lg:flex">
              <div className="flex flex-1 justify-end md:justify-center">
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex gap-x-2 md:gap-x-4 pointer-events-auto">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="hover:text-white flex gap-2"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      Cart (0)
                    </LocalizedClientLink>
                  }
                >
                  <CartDropdown cart={cart} />
                </Suspense>
                <UserDropdown customer={customer} />
              </div>
            </div>
          </div>
        </>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed top-12 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-sage-1 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-sage-2">
            <div className="flex items-center justify-between">
              <LocalizedClientLink href="/" data-testid="nav-store-link">
                <Image
                  src={logoMobile}
                  priority
                  className="h-6 w-auto focus:outline-none focus:ring-0 focus:border-teal"
                  alt="Logo"
                />
              </LocalizedClientLink>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md py-8 px-4 text-sage-6 hover:text-sage-8"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-sage-2">
                <div className="space-y-2 py-4">
                  {navigation.map((item) => (
                    <LocalizedClientLink
                      onClick={() => setMobileMenuOpen(false)}
                      key={item.label}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-lg font-normal leading-7 text-sage-8 hover:bg-sage-2"
                    >
                      {item.label}
                    </LocalizedClientLink>
                  ))}
                </div>
                <div className="py-4">
                  <LocalizedClientLink
                    onClick={() => setMobileMenuOpen(false)}
                    href="/account"
                    data-testid="nav-user-link"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-normal leading-7 text-sage-8 hover:bg-sage-2"
                  >
                    Log in
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  )
}
