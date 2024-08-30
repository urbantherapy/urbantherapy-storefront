import { listRegions } from "@lib/data"
import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getCustomer } from "@lib/data"

import CartButton from "@modules/layout/components/cart-button"

import Image from "next/image"

import user from "/public/icons/icon-user.svg"

import NavItems from "./items"

import { LineItem } from "@medusajs/medusa"

import { enrichLineItems, retrieveCart } from "@modules/cart/actions"
import NavTemplate from "./template"
import { Header } from "../header"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const customer = await getCustomer().catch(() => null)

  const cart = await fetchCart()

  return <NavTemplate regions={regions} cart={cart} customer={customer} />
  // return <Header regions={regions} cart={cart} />
  // return (
  //   <header className="relative h-16 py-16 mx-auto duration-200 mb-0 z-50">
  //     <nav className="content-container text-secondary flex items-center justify-between w-full h-full text-lg">
  //       {/* <div className="flex-1 basis-0 h-full flex items-center">
  //           <div className="h-full">
  //             <SideMenu regions={regions} />
  //           </div>
  //         </div> */}

  //       {/* <div className="flex items-center h-full">
  //         <LocalizedClientLink
  //           href="/"
  //           className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
  //           data-testid="nav-store-link"
  //         >
  //           <Image src={logo} className="h-20 w-auto mt-2" alt="Logo" />
  //         </LocalizedClientLink>
  //       </div> */}
  //       <div className="flex items-center gap-x-6 flex-1 basis-0 justify-between">
  //         <Suspense fallback={<div>Loading...</div>}>
  //           <NavItems cart={cart} />
  //         </Suspense>
  //       </div>
  //     </nav>
  //   </header>
  // )
}
