import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { cookies } from "next/headers"
import { getCart } from "@lib/data"
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import ItemsPreviewTemplateCheckout from "@modules/cart/templates/preview-checkout"

const CheckoutSummary = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (!cart) {
    return null
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-4 py-8 small:py-0 ">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <ItemsPreviewTemplateCheckout
          region={cart?.region}
          items={cart?.items}
        />
        <h3 className="sr-only">Items in your cart</h3>
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
        <CartTotals data={cart} />
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-sage-10 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
