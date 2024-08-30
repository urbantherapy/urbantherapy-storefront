import { Order } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { formatAmount } from "@lib/util/prices"

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items.length
  }, [order])

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="flex flex-col" data-testid="order-card">
      <div className="bg-sage-2 rounded-md px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
        <dl className="flex-auto space-y-6 divide-y divide-primary/25 text-sm text-sage-8 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between sm:block">
            <dt className="font-medium text-sage-8">Date placed</dt>
            <dd className="sm:mt-1">
              {new Date(order.created_at).toDateString()}
            </dd>
          </div>
          <div className="flex justify-between pt-6 sm:block sm:pt-0">
            <dt className="font-medium text-sage-8">Order number</dt>
            <dd className="sm:mt-1" data-testid="order-display-id">
              #{order.display_id}
            </dd>
          </div>
          <div className="flex justify-between pt-6 font-medium text-sage-8 sm:block sm:pt-0">
            <dt>Total amount</dt>
            <dd className="sm:mt-1">
              {formatAmount({
                amount: order.total,
                region: order.region,
                includeTaxes: false,
              })}
            </dd>
          </div>
        </dl>
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            variant="secondary"
            className="mt-6 flex w-full items-center justify-center rounded-md borde bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            See Details →
            <span className="sr-only">for order #{order.display_id}</span>
          </Button>
        </LocalizedClientLink>
      </div>

      <table className="mt-4 w-full text-sage-8 sm:mt-6">
        <caption className="sr-only">Products</caption>
        <thead className="sr-only text-left text-sm text-sage-8 sm:not-sr-only">
          {/* <tr>
            <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
              Product
            </th>
            <th
              scope="col"
              className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
            >
              Price
            </th>
            <th
              scope="col"
              className="hidden py-3 pr-8 font-normal sm:table-cell"
            >
              Status
            </th>
            <th scope="col" className="w-0 py-3 text-right font-normal">
              Info
            </th>
          </tr> */}
        </thead>
        <tbody className="divide-y divide-primary/25 border-primary/25 text-sm sm:border-t">
          {order.items.map((i) => (
            <tr key={i.id}>
              <td className="py-6 pr-8">
                <div className="flex items-center">
                  <Thumbnail
                    thumbnail={i.thumbnail}
                    images={[]}
                    size="square"
                    className="mr-6 h-16 w-16 rounded-none border-none object-cover object-center"
                  />
                  <div>
                    <div className="font-medium text-sage-10">{i.title}</div>
                    <div className="mt-1 sm:hidden">
                      {formatAmount({
                        amount: i.unit_price,
                        region: order.region,
                        includeTaxes: false,
                      })}
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden py-6 pr-8 sm:table-cell">
                {formatAmount({
                  amount: i.unit_price,
                  region: order.region,
                  includeTaxes: false,
                })}
              </td>
              <td className="hidden py-6 pr-8 sm:table-cell">
                {formatStatus(order.fulfillment_status)}
              </td>
              <td className="whitespace-nowrap py-6 text-right font-medium">
                <a href={i.href} className="text-sage-8">
                  View
                  <span className="hidden lg:inline"> Product</span>
                  <span className="sr-only">, {i.name}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="uppercase text-large-semi mb-1">
        #<span data-testid="order-display-id">{order.display_id}</span>
      </div>
      <div className="flex items-center divide-x divide-primary/25 text-small-regular text-ui-fg-base">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2" data-testid="order-amount">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
        {order.items.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div className="flex items-center text-small-regular text-ui-fg-base">
                <span
                  className="text-ui-fg-base font-semibold"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2">x</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-small-regular text-ui-fg-base">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-ui-fg-base">more</span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button data-testid="order-details-link" variant="secondary">
            See details
          </Button>
        </LocalizedClientLink>
      </div> */}
    </div>
  )
}

export default OrderCard
