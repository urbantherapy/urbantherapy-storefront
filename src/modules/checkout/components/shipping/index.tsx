"use client"

import { RadioGroup } from "@headlessui/react"
import { CheckCircleSolid } from "@medusajs/icons"
import { Cart } from "@medusajs/medusa"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { Button, Heading, Text, clx, useToggleState } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import Divider from "@modules/common/components/divider"
import Radio from "@modules/common/components/radio"
import Spinner from "@modules/common/icons/spinner"
import ErrorMessage from "@modules/checkout/components/error-message"
import { setShippingMethod } from "@modules/checkout/actions"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  availableShippingMethods: PricedShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod(id)
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.toString())
        setIsLoading(false)
      })
  }

  const handleChange = (value: string) => {
    set(value)
  }

  useEffect(() => {
    setIsLoading(false)
    setError(null)
  }, [isOpen])

  return (
    <>
      <div className="flex flex-row items-center justify-between my-2 mb-4 px-0">
        <h2
          className={clx(
            "flex flex-row text-md text-sage-10 gap-x-2 items-center font-normal",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods.length === 0,
            }
          )}
        >
          Delivery Methods
          {!isOpen && cart.shipping_methods.length > 0 && (
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
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <p>
              <button
                onClick={handleEdit}
                className="text-sage-10 hover:text-sage-11 font-normal"
                data-testid="edit-delivery-button"
              >
                Edit
              </button>
            </p>
          )}
      </div>
      <div className="bg-aesop-0 p-4 px-6">
        {/* <div className="flex flex-row items-center justify-between my-2 mb-6">
          <h2
            className={clx(
              "flex flex-row text-xl text-sage-10 gap-x-2 items-center font-normal",
              {
                "opacity-50 pointer-events-none select-none":
                  !isOpen && cart.shipping_methods.length === 0,
              }
            )}
          >
            Delivery Methods
            {!isOpen && cart.shipping_methods.length > 0 && (
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
          {!isOpen &&
            cart?.shipping_address &&
            cart?.billing_address &&
            cart?.email && (
              <p>
                <button
                  onClick={handleEdit}
                  className="text-sage-10 hover:text-sage-11 font-normal"
                  data-testid="edit-delivery-button"
                >
                  Edit
                </button>
              </p>
            )}
        </div> */}
        {isOpen ? (
          <div data-testid="delivery-options-container">
            <div className="pb-0">
              <RadioGroup
                value={cart.shipping_methods[0]?.shipping_option_id}
                onChange={(value: string) => handleChange(value)}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {availableShippingMethods ? (
                  availableShippingMethods.map((option) => {
                    return (
                      <div
                        className="rounded-none bg-aesop-1 ps-3 p-4"
                        key={option.id}
                      >
                        <RadioGroup.Option
                          key={option.id}
                          value={option.id}
                          data-testid="delivery-option-radio"
                          className={clx("", {
                            "border-sage-10":
                              option.id ===
                              cart.shipping_methods[0]?.shipping_option_id,
                          })}
                        >
                          <div className="flex items-start">
                            <Radio
                              checked={
                                option.id ===
                                cart.shipping_methods[0]?.shipping_option_id
                              }
                            />

                            <div className="ms-2 text-sm">
                              <span className="font-medium leading-none text-sage-10">
                                {option.name} -{" "}
                                {formatAmount({
                                  amount: option.amount!,
                                  region: cart?.region,
                                  includeTaxes: false,
                                })}
                              </span>
                              <p
                                id="express-text"
                                className="mt-1 text-sm font-normal text-sage-6"
                              >
                                Get it today
                              </p>
                            </div>
                          </div>
                        </RadioGroup.Option>
                      </div>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-8 text-ui-fg-base">
                    <Spinner />
                  </div>
                )}
              </RadioGroup>
            </div>

            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />

            <Button
              size="large"
              className="mt-6 !text-sm !bg-aesop-dark !text-sage-2 !font-normal !px-4 !py-2.5 !rounded-none !border-none !font-satoshi w-full"
              variant="secondary"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods[0]}
              data-testid="submit-delivery-option-button"
            >
              Continue to payment
            </Button>
          </div>
        ) : (
          <div>
            {cart && cart.shipping_methods.length > 0 && (
              <div className="flex flex-col w-1/3 text-sm">
                <p className="font-normal text-sage-11 mb-1">Method</p>
                <p className="text-sage-10">
                  {cart.shipping_methods[0].shipping_option.name} (
                  {formatAmount({
                    amount: cart.shipping_methods[0].price,
                    region: cart.region,
                    includeTaxes: false,
                  })
                    .replace(/,/g, "")
                    .replace(/\./g, ",")}
                  )
                </p>
              </div>
            )}
          </div>
        )}
        {/* <Divider className="mt-8" /> */}
      </div>
    </>
  )
}

export default Shipping
