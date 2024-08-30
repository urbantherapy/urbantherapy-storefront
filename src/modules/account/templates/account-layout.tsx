import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { Customer } from "@medusajs/medusa"

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 text-primary" data-testid="account-page">
      <div className="flex-1 content-container h-full mx-auto flex flex-col">
        <div
          className={`grid grid-cols-1 ${
            customer ? "small:grid-cols-[240px_1fr]" : ""
          } py-12 w-full`}
        >
          {customer && (
            <div>
              <AccountNav customer={customer} />
            </div>
          )}
          <div className="flex-1">{children}</div>
        </div>
        {/* <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 py-12 gap-8 bg-secondary/50 p-10">
          <div>
            <h3 className="text-5xl font-extralight tracking-tight mb-4">
              Got questions?
            </h3>
            <span className="font-thin text-2xl text-primary/75">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default AccountLayout
