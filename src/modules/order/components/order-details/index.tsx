import { Order } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import Items from "../items"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const getFulfillmentProgress = (
  fulfillmentStatus: string,
  paymentStatus: string
) => {
  if (paymentStatus === "pending") {
    return { percentage: 0, label: "Payment pending" }
  } else if (paymentStatus === "failed") {
    return { percentage: 0, label: "Payment failed" }
  }

  switch (fulfillmentStatus) {
    case "not_fulfilled":
      return { percentage: 25, label: "Order placed" }
    case "partially_fulfilled":
      return { percentage: 50, label: "Partially fulfilled" }
    case "fulfilled":
      return { percentage: 75, label: "Fulfilled" }
    case "partially_shipped":
      return { percentage: 85, label: "Partially shipped" }
    case "shipped":
      return { percentage: 100, label: "Shipped" }
    case "partially_returned":
      return { percentage: 50, label: "Partially returned" }
    case "returned":
      return { percentage: 100, label: "Returned" }
    case "canceled":
      return { percentage: 0, label: "Canceled" }
    case "requires_action":
      return { percentage: 50, label: "Requires action" }
    default:
      return { percentage: 0, label: "Unknown status" }
  }
}
const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }
  function classNames(
    ...classes: (string | undefined | null | false)[]
  ): string {
    return classes.filter(Boolean).join(" ")
  }

  const { percentage, label } = getFulfillmentProgress(
    order.fulfillment_status,
    order.payment_status
  )

  return (
    <div className="bg-white rounded-none border-sage-2 border overflow-hidden">
      <Items items={order.items} region={order.region} />
      <div className=" px-4 py-6 sm:px-6 lg:p-8">
        <h4 className="sr-only">Status</h4>
        <p className="text-sm font-medium text-primary">
          {label} on{" "}
          {new Date(order.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div aria-hidden="true" className="mt-6">
          <div className="overflow-hidden rounded-full bg-primary/25">
            <div
              style={{ width: `${percentage}%` }}
              className="h-2 rounded-full bg-primary"
            />
          </div>
          <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-primary/50 sm:grid">
            <div className="text-primary">Order placed</div>
            <div
              className={classNames(
                percentage >= 25 ? "text-primary" : "",
                "text-center"
              )}
            >
              Processing
            </div>
            <div
              className={classNames(
                percentage >= 50 ? "text-primary" : "",
                "text-center"
              )}
            >
              Fulfilled
            </div>
            <div
              className={classNames(
                percentage >= 75 ? "text-primary" : "",
                "text-right"
              )}
            >
              Shipped
            </div>
          </div>
        </div>

        {/* <div className="flex items-center text-compact-small gap-x-4 mt-4">
          {showStatus && (
            <>
              <Text>
                Order status:{" "}
                <span className="text-ui-fg-subtle " data-testid="order-status">
                  {formatStatus(order.fulfillment_status)}
                </span>
              </Text>
              <Text>
                Payment status:{" "}
                <span
                  className="text-ui-fg-subtle "
                  sata-testid="order-payment-status"
                >
                  {formatStatus(order.payment_status)}
                </span>
              </Text>
            </>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default OrderDetails
