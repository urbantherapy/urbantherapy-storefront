"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Customer } from "@medusajs/medusa"
import { Dialog, DialogPanel } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"

import clsx from "clsx"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import logo from "/public/logos/logoByAnice-aesop.svg"
import logoMobile from "/public/logos/logoLeaf.svg"

import CartDropdown from "@modules/layout/components/cart-dropdown"
import UserDropdown from "@modules/layout/components/user-dropdown"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

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
      <ul className="flex gap-x-6 lg:gap-x-8 text-md font-normal text-sage-10">
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
  const [hidden, setHidden] = useState(false)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  const slideInVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  }
  return (
    <>
      <motion.header
        variants={{
          hidden: { y: "-100%" },
          visible: { y: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 w-full pointer-events-none z-10 h-24 pt-4 bg-aesop-1`}
      >
        <>
          <div className="content-container relative flex pointer-events-auto items-center justify-between">
            <LocalizedClientLink
              href="/"
              data-testid="nav-store-link"
              className="focus:outline-none focus:ring-0 focus:border-teal"
            >
              <Image src={logo} className="h-[3.5rem] w-auto mt-2" alt="Logo" />
            </LocalizedClientLink>
            <div className="flex lg:hidden space-x-1">
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
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-1 text-sage-8"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="flex-1 hidden lg:flex">
              <div className="flex flex-1 justify-end md:justify-center">
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex gap-x-2 md:gap-x-4 pointer-events-auto text-md font-normal text-sage-10">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="flex gap-2"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      Cart (0)
                    </LocalizedClientLink>
                  }
                >
                  <CartDropdown cart={cart} />
                </Suspense>
                {/* <UserDropdown customer={customer} /> */}
              </div>
            </div>
          </div>
        </>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <FadeInStagger>
            <div className="fixed top-12 z-10" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-aesop-0 sm:bg-aesop-0 sm:max-w-sm sm:ring-0 shadow-sm sm:ring-sage-2">
              <div className="flex items-center justify-between px-6 py-4">
                <FadeIn>
                  <LocalizedClientLink href="/" data-testid="nav-store-link">
                    <Image
                      src={logoMobile}
                      priority
                      className="h-6 w-auto focus:outline-none focus:ring-0 focus:border-teal"
                      alt="Logo"
                    />
                  </LocalizedClientLink>
                </FadeIn>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md py-8 px-4 text-sage-8 hover:text-sage-8"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    width="59"
                    height="58"
                    viewBox="0 0 59 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                  >
                    <path
                      d="M2.9834 55.5165L56.0164 2.48347"
                      stroke="currentColor"
                      stroke-width="4.16667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.9834 2.48352L56.0164 55.5165"
                      stroke="currentColor"
                      stroke-width="4.16667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-6 flow-root pl-6">
                <div className="-my-6 divide-y divide-sage-2">
                  <FadeIn>
                    <div className="space-y-4 py-4">
                      {navigation.map((item) => (
                        <LocalizedClientLink
                          onClick={() => setMobileMenuOpen(false)}
                          key={item.label}
                          href={item.href}
                          className="block rounded-lg text-md font-normal leading-4 text-sage-8"
                        >
                          {item.label}
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </FadeIn>
                  {/* <FadeIn>
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
                  </FadeIn> */}
                </div>
              </div>
            </div>
          </FadeInStagger>
        </Dialog>
      </motion.header>
    </>
  )
}
