import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { listCustomerOrders } from "@lib/data"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listCustomerOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="space-y-16 pb-6 sm:space-y-20 lg:mx-0 lg:max-w-none border-b border-gray-200 mb-8">
        <div>
          <h2 className="text-3xl leading-7 tracking-tight font-thin">
            Orders
          </h2>
          <p className="mt-4 text-lg leading-6 tracking-tight font-light">
            View your previous orders and their status. You can also create
            returns or exchanges for your orders if needed.
          </p>
        </div>
      </div>
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
