import { Order } from "@medusajs/medusa"
import { formatAmount } from "@lib/util/prices"

type OrderSummaryProps = {
  order: Order
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false })
  }

  return (
    <>
      {/* Billing */}
      <section aria-labelledby="summary-heading" className="mt-16">
        <h2 id="summary-heading" className="sr-only">
          Billing Summary
        </h2>

        <div className="bg-aesop-0 px-4 py-6 sm:rounded-none sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div>
              <dt className="font-medium text-sage-10">Delivery address</dt>
              <dd className="mt-3 text-sage-8">
                <span className="block">
                  {order.shipping_address.first_name}{" "}
                  {order.shipping_address.last_name}
                </span>
                <span className="block">
                  {" "}
                  {order.shipping_address.address_1}{" "}
                  {order.shipping_address.address_2}
                </span>
                <span className="block">
                  {" "}
                  {order.shipping_address.postal_code},{" "}
                  {order.shipping_address.city}
                </span>
                <span className="block">
                  {order.shipping_address.country_code?.toUpperCase()}
                </span>
                <div className="mt-6 flex gap-x-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <span>{order.shipping_address.phone}</span>
                </div>
                <div className="flex gap-x-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                  <span>{order.email}</span>
                </div>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-sage-10">
                Payment by bank transfer
              </dt>
              <dd className="-ml-4 -mt-1 flex flex-wrap">
                <div className="ml-4 mt-4">
                  <p className="text-sage-8">Urban Therapy Ltd.</p>
                  <p className="text-sage-8">BE52 3948 9383 4738 8391</p>
                </div>
              </dd>
            </div>
          </dl>

          <dl className="mt-8 divide-y divide-sage-3 text-sm lg:col-span-5 lg:mt-0">
            <div className="flex items-center justify-between pb-4">
              <dt className="text-sage-9">Subtotal</dt>
              <dd className="font-medium text-sage-10">
                {getAmount(order.subtotal)}
              </dd>
            </div>
            {order.discount_total > 0 && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-sage-9">Discount</dt>
                <dd className="font-medium text-sage-10">
                  - {getAmount(order.discount_total)}
                </dd>
              </div>
            )}
            {order.gift_card_total > 0 && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-sage-9">Discount</dt>
                <dd className="font-medium text-sage-10">
                  - {getAmount(order.gift_card_total)}
                </dd>
              </div>
            )}
            <div className="flex items-center justify-between py-4">
              <dt className="text-sage-9">Shipping</dt>
              <dd className="font-medium text-sage-10">
                {getAmount(order.shipping_total)}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-sage-9">Tax</dt>
              <dd className="font-medium text-sage-10">
                {getAmount(order.tax_total)}
              </dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-sage-10">Order total</dt>
              <dd className="font-medium text-sage-11">
                {getAmount(order.total)}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}

export default OrderSummary
