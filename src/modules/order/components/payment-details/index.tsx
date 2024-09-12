import { Order } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import { paymentInfoMap } from "@lib/constants"

type PaymentDetailsProps = {
  order: Order
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payments[0]
  return (
    <div className="text-sm">
      <h2 className="flex flex-row text-lg font-medium text-sage-10 my-6">
        Payment
      </h2>
      <div className="rounded-lg border border-sage-2 bg-white shadow-sm p-6">
        {payment && (
          <div className="flex items-start gap-x-1 w-full">
            <div className="flex flex-col w-1/3">
              <p className="font-medium text-sage-10 mb-1">Payment method</p>
              <p className="text-sage-8" data-testid="payment-method">
                {paymentInfoMap[payment.provider_id].title}
              </p>
            </div>
            <div className="flex flex-col w-2/3">
              <p className="font-medium text-sage-10 mb-1">Payment details</p>
              <div className="flex gap-2 items-center">
                <Container className="flex items-center h-7 w-fit p-2">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <p data-testid="payment-amount" className="text-sage-8">
                  {payment.provider_id === "stripe" && payment.data.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${formatAmount({
                        amount: payment.amount,
                        region: order.region,
                        includeTaxes: false,
                      })} to be paid by ${new Date(
                        new Date(payment.created_at).setDate(
                          new Date(payment.created_at).getDate() + 7
                        )
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentDetails
