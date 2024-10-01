import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import { CartWithCheckoutStep } from "types/global"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { Customer } from "@medusajs/medusa"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: CartWithCheckoutStep | null
  customer: Omit<Customer, "password_hash"> | null
}) => {
  return (
    <div className="mt-32 pb-12">
      <div className="content-container" data-testid="cart-container">
        {cart?.items.length ? (
          <FadeInStagger
            faster
            className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40"
          >
            <div className="flex flex-col py-6 gap-y-6">
              {/* {!customer && (
                <>
                  <SignInPrompt />
                </>
              )} */}
              <ItemsTemplate region={cart?.region} items={cart?.items} />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div className="py-6">
                      <Summary cart={cart} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </FadeInStagger>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
