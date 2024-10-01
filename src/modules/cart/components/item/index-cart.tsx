"use client"
import { formatAmount } from "@lib/util/prices"

import { LineItem, Region } from "@medusajs/medusa"
import { Table, Text, clx } from "@medusajs/ui"
import {
  CheckCircleIcon,
  TrashIcon,
  ClockIcon,
  CheckIcon,
} from "@heroicons/react/20/solid"

import CartItemSelect from "@modules/cart/components/cart-item-select"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"
import { updateLineItem } from "@modules/cart/actions"
import Spinner from "@modules/common/icons/spinner"
import { useState } from "react"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { CalculatedVariant } from "types/medusa"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  type?: "full" | "preview"
}

const ItemCart = ({ item, region, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant.product

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        return err.message
      })
      .finally(() => {
        setUpdating(false)
      })

    message && setError(message)
  }

  const originalPrice = (item.variant as CalculatedVariant).original_price
  const hasReducedPrice = (originalPrice * item.quantity || 0) > item.total!
  const reducedPrice = (item.total || 0) / item.quantity!

  console.log(item.variant, "original Price")

  return (
    <li className="flex px-4 py-6 sm:px-6" data-testid="product-row">
      <div className="flex-shrink-0">
        <LocalizedClientLink
          href={`/products/${handle}`}
          className={clx("flex", {
            "w-20": type === "preview",
            "sm:w-24 sm:h-24": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            // size="full"
            className="rounded-md"
          />
        </LocalizedClientLink>
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between sm:grid sm:grid-cols-2">
            <div className="pr-6">
              <h3 className="text-sm mb-2">
                <span
                  className="text-sage-10 font-normal"
                  data-testid="product-title"
                >
                  {item.title}
                </span>
              </h3>
              <LineItemOptions
                variant={item.variant}
                data-testid="product-variant"
              />
            </div>
            <div className="text-right text-sm font-medium text-sage-12">
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </div>

            {/* <div className="text-right">
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </div> */}
          </div>

          <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Quantity, {item.title}
            </label>
            <select
              id={`quantity-${item.id}`}
              name={`quantity-${item.id}`}
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-sage-9 focus:outline-none focus:ring-1 focus:ring-sage-9 sm:text-sm"
            >
              {Array.from(
                {
                  length: Math.min(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10,
                    10
                  ),
                },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}
            </select>

            <DeleteButton
              className="ml-4 text-sm font-medium text-sage-8 hover:text-sage-9 sm:ml-0 sm:mt-3"
              id={item.id}
            />
          </div>
        </div>

        {/* <p className="mt-4 flex space-x-2 text-sm text-sage-10">
          {item ? (
            <CheckIcon
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-sage-8"
            />
          ) : (
            <ClockIcon
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-gray-300"
            />
          )}

          <span>{item ? "In stock" : `Ships in`}</span>
        </p> */}
      </div>
    </li>
  )
}

export default ItemCart
