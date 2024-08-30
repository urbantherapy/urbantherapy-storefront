import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { getCustomer, listRegions } from "@lib/data"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Urban Therapy | My profile",
  description: "View and edit your B2B profile.",
}

export default async function Profile() {
  const customer = await getCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <>
      <div className="w-full" data-testid="profile-page-wrapper">
        <div className="space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base font-semibold leading-7">Profile</h2>
            <p className="mt-1 text-sm leading-6">
              View and update your profile information, including your name,
              email, and phone number. You can also update your billing address,
              or change your password.
            </p>
          </div>
        </div>
        {/* <div className="mb-8 flex flex-col gap-y-4">
          <h1 className="text-2xl-semi">Profile</h1>
          <p className="text-base-regular">
            View and update your profile information, including your name,
            email, and phone number. You can also update your billing address,
            or change your password.
          </p>
        </div> */}
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          {/* <div className="flex flex-col gap-y-8 w-full"> */}
          <ProfileName customer={customer} />
          {/* <Divider /> */}
          <ProfileEmail customer={customer} />
          {/* <Divider /> */}
          <ProfilePhone customer={customer} />
          {/* <Divider /> */}
          <ProfilePassword customer={customer} />
          {/* <Divider /> */}
          <ProfileBillingAddress customer={customer} regions={regions} />
          {/* </div> */}
        </dl>
      </div>
    </>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
