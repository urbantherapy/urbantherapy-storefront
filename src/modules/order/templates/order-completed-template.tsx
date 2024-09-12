import { Order } from "@medusajs/medusa"
import { Heading } from "@medusajs/ui"
import { cookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"

import Image from "next/image"
import leaves from "/public/icons/icon-leaves-mission.svg"
import OrderSummary from "../components/order-summary"

type OrderCompletedTemplateProps = {
  order: Order
}

export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const isOnboarding = cookies().get("_medusa_onboarding")?.value === "true"

  return (
    <>
      <div className="py-6 mt-32 mb-28">
        <div className="content-container flex flex-col justify-between items-start gap-y-10 h-full w-full gap-x-16 md:flex-row">
          {isOnboarding && <OnboardingCta orderId={order.id} />}
          <div className="flex flex-col self-center">
            {/* <Image
              src={leaves}
              alt="Leaves Icon"
              width={90}
              height={90}
              className="w-16 md:w-24"
            /> */}
            <h1 className="text-3xl text-sage-8 font-thin tracking-tight">
              Thank you for your order.
            </h1>
            <p className="text-md leading-6 font-thin text-sage-6 w-full md:max-w-sm mt-8">
              Your order has been placed successfully! We’re thrilled to have
              you as part of our Urban Therapy community. Your support helps us
              empower makers and promote sustainable, handcrafted creations.
            </p>
            <p className="text-md leading-6 font-thin text-sage-6 w-full md:max-w-sm mt-8">
              Keep an eye on your inbox for updates, and get ready to enjoy
              something truly special.
            </p>
            <p className="text-md leading-6 font-thin text-sage-6 max-w-lg mt-8">
              Anis & Céline
            </p>
          </div>
          <div
            className="flex flex-col gap-4 max-w-4xl h-full w-full"
            data-testid="order-complete-container"
          >
            <h2 className="flex flex-row text-lg text-sage-6">Order summary</h2>
            <OrderDetails order={order} />

            {/* <Items items={order.items} region={order.region} />
            <div className="rounded-lg border-sage-2 bg-white shadow-sm">
              <CartTotals data={order} />
            </div> */}
            {/* <ShippingDetails order={order} /> */}
            {/* <PaymentDetails order={order} /> */}
            <div className="-mt-12">
              <OrderSummary order={order} />
            </div>

            {/* <Help /> */}
          </div>
        </div>
      </div>
    </>
  )
}
