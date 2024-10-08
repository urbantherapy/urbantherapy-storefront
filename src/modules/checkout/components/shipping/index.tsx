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
    <div className="rounded-md bg-white border border-sage-2 shadow-sm p-4 px-6">
      <div className="flex flex-row items-center justify-between my-2 mb-6">
        <h2
          className={clx(
            "flex flex-row text-3xl text-sage-10 font-thin gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods.length === 0,
            }
          )}
        >
          Delivery Methods
          {!isOpen && cart.shipping_methods.length > 0 && <CheckCircleSolid />}
        </h2>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <p>
              <button
                onClick={handleEdit}
                className="text-sage-10 hover:text-sage-11"
                data-testid="edit-delivery-button"
              >
                Edit
              </button>
            </p>
          )}
      </div>
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
                      className="rounded-lg border border-gray-200 bg-sage-1 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
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

                          <div className="ms-4">
                            <span className="font-normal leading-none text-sage-10">
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
            className="mt-6 !text-base !bg-sage-10 !text-sage-2 !font-normal !px-4 !py-2 !rounded-md !border-none !font-satoshi w-full"
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
            <div className="flex flex-col w-1/3">
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
  )
}

export default Shipping
