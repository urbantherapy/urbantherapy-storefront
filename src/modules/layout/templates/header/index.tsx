"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Customer } from "@medusajs/medusa"
import { Dialog, DialogPanel } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
  DisclosureButton,
} from "@headlessui/react"
import clsx from "clsx"

import { Container } from "./container"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import logo from "/public/logos/logoByAnice.svg"
import logoMobile from "/public/logos/logoLeaf.svg"
import user from "/public/icons/icon-user.svg"

import CartDropdown from "@modules/layout/components/cart-dropdown"
import UserDropdown from "@modules/layout/components/user-dropdown"

const navigation = [
  { href: "/about", label: "About" },
  { href: "/collections", label: "Collections" },
  { href: "/community", label: "Community" },
  { href: "/stores", label: "Stores" },
]

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <PopoverButton as={Link} href={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>
) {
  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton aria-label="Close menu" className="-m-1 p-1">
            <CloseIcon className="h-6 w-6 text-sage-6" />
          </PopoverButton>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800">
            <MobileNavItem href="/about">About</MobileNavItem>
            <MobileNavItem href="/articles">Articles</MobileNavItem>
            <MobileNavItem href="/projects">Projects</MobileNavItem>
            <MobileNavItem href="/speaking">Speaking</MobileNavItem>
            <MobileNavItem href="/uses">Uses</MobileNavItem>
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

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
      <ul className="flex gap-x-6 lg:gap-x-8 text-lg text-sage-6">
        {navigation.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
        {/* <NavItem href="/about">About</NavItem>
        <NavItem href="/collections">Collections</NavItem>
        <NavItem href="/community">Community</NavItem>
        <NavItem href="/stores">Stores</NavItem> */}
      </ul>
    </nav>
  )
}

function clamp(number: number, a: number, b: number) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

export function Header({ regions, cart, customer }: HeaderProps) {
  // let isHomePage = usePathname() === "/"

  let headerRef = useRef<React.ElementRef<"div">>(null)
  let isInitial = useRef(true)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let downDelay = 0
    let upDelay = 0

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      let { top, height } = headerRef.current.getBoundingClientRect()

      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      )

      if (isInitial.current) {
        setProperty("--header-position", "sticky")
      }

      setProperty("--content-offset", `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`)
        setProperty("--header-mb", `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty("--header-height", `${offset}px`)
        setProperty("--header-mb", `${height - offset}px`)
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`)
        setProperty("--header-mb", `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed")
        removeProperty("--header-top")
      } else {
        removeProperty("--header-inner-position")
        setProperty("--header-top", "0px")
      }
    }

    function updateStyles() {
      updateHeaderStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener("scroll", updateStyles, { passive: true })
    window.addEventListener("resize", updateStyles)

    return () => {
      window.removeEventListener("scroll", updateStyles)
      window.removeEventListener("resize", updateStyles)
    }
  }, [])

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "calc(var(--header-mb))",
        }}
      >
        <div
          ref={headerRef}
          className="top-0 z-10 h-32 pt-4 bg-sage-1"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex pointer-events-auto items-center justify-between">
              <LocalizedClientLink href="/" data-testid="nav-store-link">
                <Image src={logo} className="h-20 w-auto mt-2" alt="Logo" />
              </LocalizedClientLink>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-sage-8"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 hidden lg:flex">
                <div className="flex flex-1 justify-end md:justify-center">
                  {/* <MobileNavigation className="pointer-events-auto md:hidden" /> */}
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
                  {/* <LocalizedClientLink
                  className="hover:text-white flex"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                  <Image className="" src={user} alt="Leaves Icon" />
                
                </LocalizedClientLink> */}
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed top-12 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-sage-1 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-sage-2">
            <div className="flex items-center justify-between">
              <LocalizedClientLink href="/" data-testid="nav-store-link">
                <Image src={logoMobile} className="h-6 w-auto" alt="Logo" />
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
      {/* {isHomePage && (
        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
        />
      )} */}
    </>
  )
}
