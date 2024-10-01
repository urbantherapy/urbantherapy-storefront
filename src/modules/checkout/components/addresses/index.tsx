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
    <>
      <div className="flex flex-row items-center justify-between my-2 mb-4 px-0">
        <h2 className="flex flex-row text-md text-sage-10 gap-x-2 items-center font-normal">
          Shipping Address
          {!isOpen && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-sage-6"
            >
              <path d="M6.6 11.508L12.996 5.112L12.289 4.404L6.6 10.092L3.75 7.242L3.042 7.95L6.6 11.508ZM0 16V0H16V16H0Z" />
            </svg>
            // <svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   viewBox="0 0 20 20"
            //   fill="currentColor"
            //   className="size-5"
            // >
            //   <path
            //     fillRule="evenodd"
            //     d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            //     clipRule="evenodd"
            //   />
            // </svg>
          )}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <p>
            <button
              onClick={handleEdit}
              className="text-sage-10 hover:text-sage-11 font-normal"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </p>
        )}
      </div>
      <div className="bg-aesop-0 p-4 px-6">
        {/* <div className="flex flex-row items-center justify-between my-2 mb-6">
          <h2 className="flex flex-row text-xl text-sage-10 gap-x-2 items-center font-normal">
            Shipping Address
            {!isOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </h2>
          {!isOpen && cart?.shipping_address && (
            <p>
              <button
                onClick={handleEdit}
                className="text-sage-10 hover:text-sage-11 font-normal"
                data-testid="edit-address-button"
              >
                Edit
              </button>
            </p>
          )}
        </div> */}
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
                  className="mt-6 !text-base !bg-aesop-dark !text-sage-2 !font-normal !px-4 !py-2 !rounded-none !shadow-none !gradient-none !border-none !font-satoshi w-full"
                  data-testid="submit-address-button"
                  variant="secondary"
                >
                  Continue to delivery
                </SubmitButton>
              </div>

              <ErrorMessage
                error={message}
                data-testid="address-error-message"
              />
            </div>
          </form>
        ) : (
          <div>
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8 text-sm">
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
                    <p className="text-sage-10">
                      {cart.shipping_address.phone}
                    </p>
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
    </>
  )
}

export default Addresses
