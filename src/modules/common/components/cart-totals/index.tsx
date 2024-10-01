"use client"

import { formatAmount } from "@lib/util/prices"
import { InformationCircleSolid } from "@medusajs/icons"
import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import React from "react"

type CartTotalsProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  return (
    <>
      <dl className="space-y-3 border-t border-aesop-1 px-4 py-4 sm:px-4 text-sage-10">
        <div className="flex items-center justify-between">
          <dt className="text-sm flex gap-x-1 items-center font-normal">
            Subtotal
            <Tooltip
              content="This is your cart total before shipping and taxes are applied."
              className="font-normal text-sage-8 font-satoshi leading-snug p-4 pr-2 bg-aesop-1 rounded-none border-none shadow-sm"
            >
              <InformationCircleSolid color="#D3D6C9" />
            </Tooltip>
          </dt>
          <dd
            className="text-sm text-sage-10 font-normal"
            data-testid="cart-subtotal"
            data-value={subtotal || 0}
          >
            {getAmount(subtotal)}
          </dd>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between font-normal">
            <dt className="text-sm">Discount</dt>
            <dd
              className="text-sm text-green-400"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              - {getAmount(discount_total)}
            </dd>
          </div>
        )}
        <div className="flex items-center justify-between font-normal">
          <dt className="text-sm">Shipping</dt>
          <dd
            className="text-sm text-sage-10"
            data-testid="cart-shipping"
            data-value={shipping_total || 0}
          >
            {getAmount(shipping_total)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm font-normal">Taxes</dt>
          <dd
            className="text-sm font-medium text-sage-10"
            data-testid="cart-taxes"
            data-value={tax_total || 0}
          >
            {getAmount(tax_total)}
          </dd>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <dt className="text-sm">Gift card</dt>
            <dd
              className="text-sm font-normal text-green-400"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              - {getAmount(gift_card_total)}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-aesop-1 pt-6 text-sm">
          <dt className="text-sage-10 font-medium">Total</dt>
          <dd
            className="font-medium text-sage-10"
            data-testid="cart-total"
            data-value={total || 0}
          >
            {getAmount(total)}
          </dd>
        </div>
      </dl>
      {/* <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            Subtotal
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          <span data-testid="cart-subtotal" data-value={subtotal || 0}>
            {getAmount(subtotal)}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              - {getAmount(discount_total)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0}>
            {getAmount(shipping_total)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center ">Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {getAmount(tax_total)}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              - {getAmount(gift_card_total)}
            </span>
          </div>
        )}
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>Total</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {getAmount(total)}
        </span>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" /> */}
    </>
  )
}

export default CartTotals
