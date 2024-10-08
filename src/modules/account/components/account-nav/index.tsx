"use client"

import Image from "next/image"
import { Customer } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import { signOut } from "@modules/account/actions"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import userIcon from "/public/icons/icon-user.svg"
import addressesIcon from "/public/icons/icon-addresses.svg"
import ordersIcon from "/public/icons/icon-orders.svg"
import signoutIcon from "/public/icons/icon-signout.svg"

const AccountNav = ({
  customer,
}: {
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signOut(countryCode)
  }

  return (
    <div>
      <div
        className="small:hidden mt-24 md:mt-32"
        data-testid="mobile-account-nav"
      >
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-3xl font-thin tracking-tight mb-4">
              Hello, {customer?.first_name}!
            </div>

            <ul>
              <li>
                <LocalizedClientLink
                  href="/account/profile"
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                  data-testid="profile-link"
                >
                  <>
                    <div className="flex items-center gap-x-2">
                      <Image className="w-4" src={userIcon} alt="User Icon" />
                      <span>Profile</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </>
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/account/addresses"
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                  data-testid="addresses-link"
                >
                  <>
                    <div className="flex items-center gap-x-2">
                      <Image
                        className="w-4"
                        src={addressesIcon}
                        alt="Addresses Icon"
                      />
                      <span>Addresses</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </>
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/account/orders"
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                  data-testid="orders-link"
                >
                  <div className="flex items-center gap-x-2">
                    <Image className="w-4" src={ordersIcon} alt="Orders Icon" />
                    <span>Orders</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </LocalizedClientLink>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center justify-between py-4 border-b border-gray-200 w-full"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  <div className="flex items-center gap-x-2">
                    <Image
                      className="w-4"
                      src={signoutIcon}
                      alt="Sign Out Icon"
                    />
                    <span>Log out</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
      <div className="hidden small:block mt-24" data-testid="account-nav">
        <div>
          {/* <div className="pb-4">
            <h3 className="text-base-semi font-normal">Account</h3>
          </div> */}
          <div className="text-base">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-2">
              <li className="link-animation">
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  Overview
                </AccountNavLink>
              </li>
              <li className="link-animation">
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  Profile
                </AccountNavLink>
              </li>
              <li className="link-animation">
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li className="link-animation">
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700 link-animation">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx("hover:text-sage-11", {
        "text-sage-11": active,
      })}
      data-testid={dataTestId}
    >
      {children}
      {/* {active && (
        <span className="absolute inset-x-0 -bottom-px h-px bg-sage-11 w-full" />
      )} */}
    </LocalizedClientLink>
  )
}

export default AccountNav
