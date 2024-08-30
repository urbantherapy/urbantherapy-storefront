import { getCustomer, listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
// import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import logo from "/public/logos/logoByAnice.svg"
import Nav from "@modules/layout/templates/nav"
import { Header } from "@modules/layout/templates/header"
import { enrichLineItems, retrieveCart } from "@modules/cart/actions"
import { LineItem } from "@medusajs/medusa"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)

    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const regions = await listRegions().then((regions) => regions)
  const cart = await fetchCart()
  const customer = await getCustomer().catch(() => null)

  return (
    <div className="w-full relative sm:min-h-screen">
      {/* <Nav /> */}
      <Header regions={regions} cart={cart} customer={customer} />
      {/* <div className="h-16 bg-sage-2">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
            data-testid="store-link"
          >
            <Image src={logo} className="h-15 w-auto mt-10" alt="Logo" />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div> */}
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      {/* <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div> */}
    </div>
  )
}
