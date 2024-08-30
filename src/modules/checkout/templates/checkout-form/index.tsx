import {
  createPaymentSessions,
  getCustomer,
  listCartShippingMethods,
} from "@lib/data"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import ProgressBar from "@modules/checkout/components/progress-bar"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { cookies } from "next/headers"
import { CartWithCheckoutStep } from "types/global"

export default async function CheckoutForm() {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  // create payment sessions and get cart
  const cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  if (!cart) {
    return null
  }

  cart.checkout_step = cart && getCheckoutStep(cart)
  console.log(cart.checkout_step, "CHECKOUT STEP!")

  // get available shipping methods
  const availableShippingMethods = await listCartShippingMethods(cart.id).then(
    (methods) => methods?.filter((m) => !m.is_return)
  )

  if (!availableShippingMethods) {
    return null
  }

  // get customer if logged in
  const customer = await getCustomer()

  const totalSteps = 4
  const currentStep = parseInt(cart.checkout_step, 10)
  console.log(currentStep, "CURRENT STEPS!")

  return (
    <div>
      <ProgressBar cart={cart} />
      <div className="w-full grid grid-cols-1 gap-y-8">
        <div>
          <Addresses cart={cart} customer={customer} />
        </div>

        <div>
          <Shipping
            cart={cart}
            availableShippingMethods={availableShippingMethods}
          />
        </div>

        <div>
          <Payment customer={customer} cart={cart} />
        </div>

        <div>
          <Review cart={cart} />
        </div>
      </div>
    </div>
  )
}
