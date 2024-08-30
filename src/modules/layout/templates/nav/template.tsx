"use client"
import { useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Customer } from "@medusajs/medusa"

import CartButton from "@modules/layout/components/cart-button"
import Image from "next/image"
import NavItems from "./items"
import logo from "/public/logos/logoLight.svg"
import user from "/public/icons/icon-user.svg"

interface NavTemplateProps {
  regions: any
  cart: any
  customer: Omit<Customer, "password_hash"> | null
}

const NavTemplate: React.FC<NavTemplateProps> = ({
  regions,
  cart,
  customer,
}) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if (currentScrollPos > prevScrollPos) {
      setVisible(false)
    } else {
      setVisible(true)
    }

    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  })

  return (
    <header
      className={`sticky h-16 py-16 mx-auto duration-200 mb-0 z-50 ${
        visible ? "top-0" : ""
      }`}
    >
      <nav className="content-container text-secondary flex items-center justify-between w-full h-full text-lg">
        <NavItems cart={cart} customer={customer} />
      </nav>
    </header>
  )
}

export default NavTemplate
