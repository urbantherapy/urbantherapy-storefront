"use client"

import { Order } from "@medusajs/medusa"
import { XMark } from "@medusajs/icons"
import React from "react"

import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type OrderDetailsTemplateProps = {
  order: Order
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4 mt-24">
      <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
        <div className="flex sm:items-baseline sm:space-x-4">
          <h1 className="text-2xl font-thin tracking-tight text-sage-8 sm:text-3xl">
            Order #<span data-testid="order-id">{order.display_id}</span>
          </h1>
        </div>
        <p className="text-sm text-sage-8">
          Order placed{" "}
          <time
            dateTime={new Date(order.created_at).toISOString()}
            className="font-normal text-sage-10"
          >
            {new Date(order.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>
      </div>
      <div
        className="flex flex-col gap-4 h-full w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        {/* <Items items={order.items} region={order.region} /> */}
        {/* <ShippingDetails order={order} /> */}
        <OrderSummary order={order} />
        {/* <Help /> */}
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
