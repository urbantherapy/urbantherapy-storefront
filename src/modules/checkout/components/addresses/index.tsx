"use client"

import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation"
import { Cart, Customer } from "@medusajs/medusa"
import { CheckCircleSolid } from "@medusajs/icons"
import { useToggleState } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"

import BillingAddress from "../billing_address"
import ShippingAddress from "../shipping-address"
import { setAddresses } from "../../actions"
import { SubmitButton } from "../submit-button"
import { useFormState } from "react-dom"
import ErrorMessage from "../error-message"
import compareAddresses from "@lib/util/compare-addresses"

const Addresses = ({
  cart,
  customer,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const countryCode = params.countryCode as string

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsSBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useFormState(setAddresses, null)

  return (
    <div className="bg-white border border-sage-2 p-4 px-6 rounded-md shadow-sm">
      <div className="flex flex-row items-center justify-between my-2 mb-6">
        <h2 className="flex flex-row text-3xl text-sage-10 gap-x-2 items-baseline font-thin">
          Shipping Address
          {!isOpen && <CheckCircleSolid />}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <p>
            <button
              onClick={handleEdit}
              className="text-sage-10 hover:text-sage-11"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </p>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              countryCode={countryCode}
              checked={sameAsSBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsSBilling && (
              <div>
                <h2 className="text-3xl text-sage-10 font-thin gap-x-4 pb-6 pt-8">
                  Billing address
                </h2>

                <BillingAddress cart={cart} countryCode={countryCode} />
              </div>
            )}
            <div className="flex justify-end -mb-4">
              <SubmitButton
                className="mt-6 !text-base !bg-sage-10 !text-sage-2 !font-normal !px-4 !py-2 !rounded-md !border-none !font-satoshi w-full"
                data-testid="submit-address-button"
                variant="secondary"
              >
                Continue to delivery
              </SubmitButton>
            </div>

            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          {cart && cart.shipping_address ? (
            <div className="flex items-start gap-x-8">
              <div className="flex items-start gap-x-1 w-full">
                <div
                  className="flex flex-col w-1/3"
                  data-testid="shipping-address-summary"
                >
                  <p className="font-normal text-sage-11 mb-1">
                    Shipping Address
                  </p>
                  <p className="text-sage-10">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </p>
                  <p className="text-sage-10">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </p>
                  <p className="text-sage-10">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </p>
                  <p className="text-sage-10">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </p>
                </div>

                <div
                  className="flex flex-col w-1/3 "
                  data-testid="shipping-contact-summary"
                >
                  <p className="font-normal text-sage-11 mb-1">Contact</p>
                  <p className="text-sage-10">{cart.shipping_address.phone}</p>
                  <p className="text-sage-10">{cart.email}</p>
                </div>

                <div
                  className="flex flex-col w-1/3"
                  data-testid="billing-address-summary"
                >
                  <p className="font-normal text-sage-11 mb-1">
                    Billing Address
                  </p>

                  {sameAsSBilling ? (
                    <p className="text-sage-10">
                      Billing and delivery address are the same.
                    </p>
                  ) : (
                    <>
                      <p className="text-sage-10">
                        {cart.billing_address.first_name}{" "}
                        {cart.billing_address.last_name}
                      </p>
                      <p className="text-sage-10">
                        {cart.billing_address.address_1}{" "}
                        {cart.billing_address.address_2}
                      </p>
                      <p className="text-sage-10">
                        {cart.billing_address.postal_code},{" "}
                        {cart.billing_address.city}
                      </p>
                      <p className="text-sage-10">
                        {cart.billing_address.country_code?.toUpperCase()}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
      )}
      {/* <Divider className="mt-8" /> */}
    </div>
  )
}

export default Addresses
