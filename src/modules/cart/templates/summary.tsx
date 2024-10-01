"use client"

import CartTotals from "@modules/common/components/cart-totals"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FadeIn } from "@modules/framer-motion/FadeIn"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <FadeIn>
        <h2 className="text-md font-normal text-sage-10">Order Summary</h2>
      </FadeIn>
      <FadeIn className="bg-aesop-0">
        <CartTotals data={cart} />
        <div className="border-t border-aesop-1">
          <DiscountCode cart={cart} />
          <div className="px-4 py-4">
            <LocalizedClientLink
              href={"/checkout?step=" + cart.checkout_step}
              data-testid="checkout-button"
              className="text-sm font-normal border text-sage-8 hover:border-sage-4 hover:text-sage-8 p-4 flex items-center justify-between"
            >
              Go to Checkout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="w-3.5 text-sage-6 hover:text-sage-8"
              >
                <g>
                  <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z"></path>
                </g>
              </svg>
            </LocalizedClientLink>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

export default Summary
