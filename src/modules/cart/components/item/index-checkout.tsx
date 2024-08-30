"use client"

import { LineItem, Region } from "@medusajs/medusa"
import { Table, Text, clx } from "@medusajs/ui"
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid"

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

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  type?: "full" | "preview"
}

const ItemCheckout = ({ item, region, type = "full" }: ItemProps) => {
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

  return (
    <li className="flex px-4 py-6 sm:px-6" data-testid="product-row">
      <div className="flex-shrink-0">
        <LocalizedClientLink
          href={`/products/${handle}`}
          className={clx("flex", {
            "w-20": type === "preview",
            "sm:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            size="full"
            className="rounded-md"
          />
        </LocalizedClientLink>
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">
              <span
                className="font-medium text-gray-700 hover:text-gray-800"
                data-testid="product-title"
              >
                {item.title}
              </span>
            </h4>
            <LineItemOptions
              variant={item.variant}
              data-testid="product-variant"
            />
          </div>

          <div className="ml-4 flow-root flex-shrink-0">
            <DeleteButton
              id={item.id}
              data-testid="product-delete-button"
              aria-hidden="true"
              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between pt-2">
          <span className="">
            {/* <Text className="">{item.quantity} x </Text> */}
            <LineItemUnitPrice item={item} region={region} style="tight" />
          </span>

          <div className="ml-4 flex items-center gap-x-2">
            <label htmlFor="quantity" className="sr-only">
              Quantity
            </label>
            {updating && <Spinner color="#888F75" />}
            <select
              id="quantity"
              name="quantity"
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-sage-8 focus:outline-none focus:ring-1 focus:ring-sage-8 sm:text-sm"
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
          </div>
        </div>
      </div>

      {/* <Table.Cell className="!pr-0">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1">
              <Text className="">{item.quantity} x </Text>
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell> */}
    </li>
  )
}

export default ItemCheckout
