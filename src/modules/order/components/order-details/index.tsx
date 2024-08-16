import { Order } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
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
  return (
    <div>
      <Text className="font-extralight text-2xl text-primary/75">
        We have sent the order confirmation details to{" "}
        <span
          className="text-ui-fg-medium-plus font-normal"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        Order date:{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>
      {/* <Text className="mt-2 text-ui-fg-interactive">
        Order number: <span data-testid="order-id">{order.display_id}</span>
      </Text> */}

      <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8 bg-secondary/50 rounded-lg">
        <h4 className="sr-only">Status</h4>
        <p className="text-sm font-medium text-primary">
          {formatStatus(order.fulfillment_status)} on{" "}
          {new Date(order.created_at).toDateString()}
        </p>
        <div aria-hidden="true" className="mt-6">
          <div className="overflow-hidden rounded-full bg-primary/25">
            <div
              style={{ width: `calc((${1} * 2 + 1) / 8 * 100%)` }}
              className="h-2 rounded-full bg-primary"
            />
          </div>
          <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-primary/50 sm:grid">
            <div className="text-primary">Order placed</div>
            <div
              className={classNames(1 > 0 ? "text-primary" : "", "text-center")}
            >
              Processing
            </div>
            <div
              className={classNames(1 > 1 ? "text-primary" : "", "text-center")}
            >
              Shipped
            </div>
            <div
              className={classNames(1 > 2 ? "text-primary" : "", "text-right")}
            >
              Delivered
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
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
      </div>
    </div>
  )
}

export default OrderDetails
