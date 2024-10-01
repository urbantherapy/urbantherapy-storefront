"use client"

import { clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"

const Review = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_session || paidByGiftcard)

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-4">
        <h2
          className={clx(
            "flex flex-row text-md text-sage-10 font-normal gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review Your Order
        </h2>
      </div>
      <div className="bg-aesop-0 p-4 px-6">
        {isOpen && previousStepsCompleted && (
          <>
            <div className="flex items-start gap-x-1 w-full mb-6 text-sm">
              <div className="w-full">
                <p className="font-light leading-5 text-sage-10 mb-1">
                  {`By clicking ‘Place Order,’ you’re joining the Urban Therapy community and supporting our mission to empower makers. You confirm that you’ve reviewed and accept our Terms of Use, Terms of Sale, and Returns Policy, and acknowledge that you’ve read our Privacy Policy. Thank you for choosing to make a difference with us.`}
                </p>
              </div>
            </div>
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </>
        )}
      </div>
    </>
  )
}

export default Review
