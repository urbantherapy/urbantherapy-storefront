"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Customer } from "@medusajs/medusa"

import CartButton from "@modules/layout/components/cart-button"
import Image from "next/image"

import logo from "/public/logos/logoLight.svg"
import user from "/public/icons/icon-user.svg"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import UserDropdown from "@modules/layout/components/user-dropdown"

interface NavItemsProps {
  cart: any
  customer: Omit<Customer, "password_hash"> | null
}

const NavItems: React.FC<NavItemsProps> = ({ cart, customer }) => {
  let isHomePage = usePathname() === "/"
  const pathname = usePathname()
  const countryCode = pathname.split("/")[1]

  return (
    <>
      <div className="flex items-center h-full">
        <LocalizedClientLink
          href="/"
          className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
          data-testid="nav-store-link"
        >
          <Image src={logo} className="h-20 w-auto mt-2" alt="Logo" />
        </LocalizedClientLink>
      </div>
      <div className="hidden small:flex items-center gap-x-10 h-full">
        <LocalizedClientLink
          className="hover:text-white link-animation"
          href="/collections/skincare"
          data-testid="nav-account-link"
        >
          About
        </LocalizedClientLink>
        <LocalizedClientLink
          className={clsx(
            "hover:text-white link-animation",
            pathname === `/${countryCode}/account` &&
              "text-teal-500 dark:text-teal-400"
          )}
          href="/account"
          data-testid="nav-account-link"
        >
          Collections
        </LocalizedClientLink>
        <LocalizedClientLink
          className="hover:text-white link-animation"
          href="/account"
          data-testid="nav-account-link"
        >
          Community
        </LocalizedClientLink>
      </div>

      <div className="flex gap-x-4">
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
        <LocalizedClientLink
          className="hover:text-white flex"
          href="/account"
          data-testid="nav-account-link"
        >
          {/* Account */}
          <Image className="" src={user} alt="Leaves Icon" />
          <UserDropdown customer={customer} />
        </LocalizedClientLink>
      </div>
    </>
  )
}

export default NavItems
