import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getCustomer, getRegion } from "@lib/data"

import { headers } from "next/headers"
import Divider from "@modules/common/components/divider"

export const metadata: Metadata = {
  title: "Urban Therapy | My addresses",
  description: "View your addresses",
}

export default async function Addresses({
  params,
}: {
  params: { countryCode: string }
}) {
  const nextHeaders = headers()
  // const countryCode = nextHeaders.get("next-url")?.split("/")[1] || ""
  const countryCode = params.countryCode || ""

  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  console.log(region, "REGION")
  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="space-y-16 pb-6 sm:space-y-20 lg:mx-0 lg:max-w-none border-b border-gray-200 mb-8">
        <div>
          <h2 className="text-base font-semibold leading-7">
            Shipping Addresses
          </h2>
          <p className="mt-1 text-sm leading-6">
            View and update your shipping addresses, you can add as many as you
            like. Saving your addresses will make them available during
            checkout.
          </p>
        </div>
      </div>
      {/* <Divider /> */}
      {/* <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Shipping Addresses</h1>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div> */}
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
