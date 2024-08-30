import { Metadata } from "next"
import { getCustomer, listRegions } from "@lib/data"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { Header } from "@modules/layout/templates/header"
import { enrichLineItems, retrieveCart } from "@modules/cart/actions"
import { LineItem } from "@medusajs/medusa"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)

    console.log(enrichedItems, "enriched")
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}
export default async function PageLayout(props: { children: React.ReactNode }) {
  const regions = await listRegions().then((regions) => regions)
  const cart = await fetchCart()
  const customer = await getCustomer().catch(() => null)

  return (
    <>
      <Header regions={regions} cart={cart} customer={customer} />
      {/* <Nav /> */}
      {props.children}
      <Footer />
    </>
  )
}
