import { Order } from "@medusajs/medusa"
import { Heading, Text } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: Order
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <h2 className="flex flex-row text-lg font-medium text-sage-10 my-6">
        Delivery
      </h2>
      <div className="flex items-start gap-x-8 rounded-lg border border-sage-2 bg-white shadow-sm p-6">
        <div
          className="flex flex-col w-1/3 text-sm"
          data-testid="shipping-address-summary"
        >
          <p className="font-medium text-sage-10 mb-1">Shipping Address</p>
          <p className="text-sage-8">
            {order.shipping_address.first_name}{" "}
            {order.shipping_address.last_name}
          </p>
          <p className="text-sage-8">
            {order.shipping_address.address_1}{" "}
            {order.shipping_address.address_2}
          </p>
          <p className="text-sage-8">
            {order.shipping_address.postal_code}, {order.shipping_address.city}
          </p>
          <p className="text-sage-8">
            {order.shipping_address.country_code?.toUpperCase()}
          </p>
        </div>

        <div
          className="flex flex-col w-1/3 text-sm"
          data-testid="shipping-contact-summary"
        >
          <p className="font-medium text-sage-10 mb-1">Contact</p>
          <p className="text-sage-8">{order.shipping_address.phone}</p>
          <p className="text-sage-8">{order.email}</p>
        </div>

        <div
          className="flex flex-col w-1/3 text-sm"
          data-testid="shipping-method-summary"
        >
          <p className="font-medium text-sage-10 mb-1">Method</p>
          <p className="text-sage-8">
            {order.shipping_methods[0].shipping_option?.name} (
            {formatAmount({
              amount: order.shipping_methods[0].price,
              region: order.region,
              includeTaxes: false,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
