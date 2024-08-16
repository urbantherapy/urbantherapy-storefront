import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"

import logo from "/public/logos/logoByAnice.svg"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    // <div className="sticky top-0 inset-x-0 z-50 group bg-custom-bg">

    <header className="relative h-16 py-16 mx-auto duration-200 mb-0 z-50">
      <nav className="content-container text-primary flex items-center justify-between w-full h-full text-lg">
        {/* <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div> */}

        {/* <div className="flex items-center h-full">
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
            data-testid="nav-store-link"
          >
            <Image src={logo} className="h-20 w-auto mt-2" alt="Logo" />
          </LocalizedClientLink>
        </div> */}

        <div className="flex items-center gap-x-6 flex-1 basis-0 justify-between">
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
            {/* {process.env.FEATURE_SEARCH_ENABLED && (
              <LocalizedClientLink
                className="hover:text-white"
                href="/search"
                scroll={false}
                data-testid="nav-search-link"
              >
                Search
              </LocalizedClientLink>
            )} */}
            <LocalizedClientLink
              className="hover:text-white link-animation"
              href="/account"
              data-testid="nav-account-link"
            >
              About
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-white link-animation"
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
          <div className="flex gap-x-10">
            <LocalizedClientLink
              className="hover:text-white link-animation"
              href="/account"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-white flex gap-2 link-animation"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
    // </div>
  )
}
