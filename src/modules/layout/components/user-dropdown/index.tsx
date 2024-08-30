"use client"

import { Customer } from "@medusajs/medusa"
import { Popover, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRightOnRectangle } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import User from "@modules/common/icons/user"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import { signOut } from "@modules/account/actions"

import userIcon from "/public/icons/icon-user.svg"
import addressesIcon from "/public/icons/icon-addresses.svg"
import ordersIcon from "/public/icons/icon-orders.svg"
import signoutIcon from "/public/icons/icon-signout.svg"

const UserDropdown = ({
  customer,
}: {
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const open = () => setUserDropdownOpen(true)
  const close = () => setUserDropdownOpen(false)

  const openAndCancel = () => {
    open()
  }

  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signOut(countryCode)
  }

  return (
    <div
      className="h-auto z-40"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button className="h-full">
          <LocalizedClientLink
            className="hover:text-white"
            href="/account"
            data-testid="nav-user-link"
          >
            <Image className="" src={userIcon} alt="User Icon" />
          </LocalizedClientLink>
        </Popover.Button>
        <Transition
          show={userDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+10px)] right-0 bg-sage-2 border-x border-b border-gray-200 w-[260px] text-primary shadow-sm rounded-xl"
            data-testid="nav-user-dropdown"
          >
            {customer ? (
              <div className="p-4 text-base-regular">
                <div className="flex items-center justify-between pb-4 border-b border-primary/10">
                  <span>Hello, {customer.first_name}!</span>
                </div>
                <ul className="pt-4">
                  <li>
                    <LocalizedClientLink
                      href="/account/profile"
                      className="flex items-center justify-between py-2 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-sage-1 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      data-testid="profile-link"
                    >
                      <div className="flex items-center gap-x-2">
                        {/* <User size={20} /> */}
                        <Image className="w-4" src={userIcon} alt="User Icon" />
                        <span>Profile</span>
                      </div>
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/account/addresses"
                      className="flex items-center justify-between py-2 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-sage-1 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      data-testid="addresses-link"
                    >
                      <div className="flex items-center gap-x-2">
                        {/* <MapPin size={20} /> */}
                        <Image
                          className="w-4"
                          src={addressesIcon}
                          alt="User Icon"
                        />
                        <span>Addresses</span>
                      </div>
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/account/orders"
                      className="flex items-center justify-between py-2 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-sage-1 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      data-testid="orders-link"
                    >
                      <div className="flex items-center gap-x-2">
                        {/* <Package size={20} /> */}
                        <Image
                          className="w-4"
                          src={ordersIcon}
                          alt="User Icon"
                        />
                        <span>Orders</span>
                      </div>
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="flex items-center justify-between py-2 w-full text-left rounded-lg p-2 transition duration-150 ease-in-out hover:bg-sage-1 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      onClick={handleLogout}
                      data-testid="logout-button"
                    >
                      <div className="flex items-center gap-x-2">
                        {/* <ArrowRightOnRectangle /> */}
                        <Image
                          className="w-4"
                          src={signoutIcon}
                          alt="User Icon"
                        />
                        <span>Log out</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="p-4 text-center">
                <span>You are not logged in.</span>
                <LocalizedClientLink href="/account">
                  <Button
                    variant="secondary"
                    className="w-full mt-4 bg-primary/20 text-primary rounded-md hover:bg-primary/10 border-none shadow-none"
                  >
                    Log in
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default UserDropdown
