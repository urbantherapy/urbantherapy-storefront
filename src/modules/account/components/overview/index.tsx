import { Customer, Order } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"

type OverviewProps = {
  customer: Omit<Customer, "password_hash"> | null
  orders: Order[] | null
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const statuses = {
  fulfilled: "text-green-700 bg-green-50 ring-green-600/20",
  not_fulfilled: "text-gray-600 bg-gray-50 ring-gray-500/10",
  partially_fulfilled: "text-yellow-700 bg-yellow-50 ring-yellow-600/20",
  partially_shipped: "text-blue-700 bg-blue-50 ring-blue-600/20",
  shipped: "text-blue-700 bg-blue-50 ring-blue-600/20",
  partially_returned: "text-orange-700 bg-orange-50 ring-orange-600/20",
  returned: "text-orange-700 bg-orange-50 ring-orange-600/20",
  canceled: "text-red-700 bg-red-50 ring-red-600/20",
  requires_action: "text-purple-700 bg-purple-50 ring-purple-600/20",
  withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  overdue: "text-red-700 bg-red-50 ring-red-600/10",
}

const accountDashboardStats = [
  {
    name: "Profile",
    description: "completed",
    key: "profileCompletion",
  },
  {
    name: "Addresses",
    description: "saved",
    key: "addressesCount",
  },
  {
    name: "Orders",
    description: "made",
    key: "ordersCount",
  },
]

const Overview = ({ customer, orders }: OverviewProps) => {
  const getStatValue = (key: string) => {
    switch (key) {
      case "profileCompletion":
        return `${getProfileCompletion(customer)}%`
      case "addressesCount":
        return customer?.shipping_addresses?.length || 0
      case "ordersCount":
        return orders?.length || 0
      default:
        return null
    }
  }

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-4">
          <span data-testid="welcome-message" data-value={customer?.first_name}>
            Hello, {customer?.first_name}
          </span>
          <span className="">
            Signed in as:{" "}
            <span
              className=""
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col py-4 border-t border-sage-2">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <>
              <dl className="grid grid-cols-1 divide-y divide-sage-3 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
                {accountDashboardStats.map((item) => (
                  <div
                    key={item.name}
                    className="px-4 py-5 sm:p-6 hover:bg-sage-1/80"
                  >
                    <dt className="text-base font-normal text-sage-6">
                      {item.name}
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div
                        className="flex items-baseline text-2xl font-normal text-sage-9"
                        data-testid={`customer-${item.key}`}
                        data-value={getStatValue(item.key)}
                      >
                        {getStatValue(item.key)}
                        <span className="ml-2 text-sm text-sage-6 font-normal">
                          {item.description}
                        </span>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
            <h2 className="mx-auto mt-12 text-base font-medium leading-6 text-sage-8 lg:mx-0 lg:max-w-none">
              Recent orders
            </h2>
            <div className="overflow-hidden border-t border-gray-100">
              <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <thead className="sr-only">
                      <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders && orders.length > 0 ? (
                        orders.slice(0, 5).map((order) => {
                          return (
                            <tr
                              key={order.id}
                              data-testid="order-wrapper"
                              data-value={order.id}
                            >
                              <td className="relative py-5 pr-6">
                                <div className="flex gap-x-6">
                                  <div className="flex-auto">
                                    <div className="flex items-start gap-x-3">
                                      <div
                                        className="text-sm font-medium leading-6 text-sage-10"
                                        data-testid="order-amount"
                                      >
                                        {formatAmount({
                                          amount: order.total,
                                          region: order.region,
                                          includeTaxes: false,
                                        })}
                                      </div>
                                      <div
                                        data-testid="order-fulfillment-status"
                                        className={classNames(
                                          statuses[order.fulfillment_status],
                                          "rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                                        )}
                                      >
                                        {formatStatus(order.fulfillment_status)}
                                      </div>
                                    </div>

                                    <div
                                      data-testid="order-created-date"
                                      className="mt-1 text-xs leading-5 text-sage-6"
                                    >
                                      {new Date(
                                        order.created_at
                                      ).toDateString()}
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 right-full h-px w-screen bg-sage-1" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden py-5 pr-6 sm:table-cell">
                                <div
                                  data-testid="order-created-date"
                                  className="text-sm leading-6"
                                >
                                  {new Date(order.created_at).toDateString()}{" "}
                                </div>
                              </td>
                              <td className="py-5 text-right">
                                <div className="flex justify-end">
                                  <LocalizedClientLink
                                    href={`/account/orders/details/${order.id}`}
                                    className="text-sm font-medium leading-6 text-sage-11 hover:text-sage-10"
                                  >
                                    View
                                    <span className="hidden sm:inline">
                                      {" "}
                                      order
                                    </span>
                                    <span className="sr-only">
                                      , invoice #{order.display_id}
                                    </span>
                                  </LocalizedClientLink>
                                </div>
                                <div className="mt-1 text-xs leading-5 text-sage-9">
                                  Invoice{" "}
                                  <span
                                    data-testid="order-id"
                                    data-value={order.display_id}
                                    className="text-sage-11"
                                  >
                                    #{order.display_id}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <span data-testid="no-orders-message">
                          No recent orders
                        </span>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">Recent orders</h3>
              </div>
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Container className="bg-gray-50 flex justify-between items-center p-4">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-semibold">Date placed</span>
                              <span className="font-semibold">
                                Order number
                              </span>
                              <span className="font-semibold">
                                Total amount
                              </span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {formatAmount({
                                  amount: order.total,
                                  region: order.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                Go to order #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </Container>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span data-testid="no-orders-message">No recent orders</span>
                )}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (
  customer: Omit<Customer, "password_hash"> | null
) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
