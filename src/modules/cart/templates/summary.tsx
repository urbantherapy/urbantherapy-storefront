"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-lg font-medium text-sage-10">
        Summary
      </Heading>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <DiscountCode cart={cart} />
        <CartTotals data={cart} />
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <LocalizedClientLink
            href={"/checkout?step=" + cart.checkout_step}
            data-testid="checkout-button"
          >
            <Button className="w-full h-10 bg-primary/20 text-primary rounded-md hover:bg-primary/50 border-none shadow-none">
              Go to Checkout
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Summary
