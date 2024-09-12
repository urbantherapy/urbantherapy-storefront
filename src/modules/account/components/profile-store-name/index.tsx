"use client"

import { Customer as MedusaCustomer } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { updateCustomerStoreName } from "@modules/account/actions"

import AccountInfo from "../account-info"

type Customer = MedusaCustomer & {
  store_name?: string
}

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileStoreName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerStoreName, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label="Store name"
        currentInfo={`${customer.store_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-company-store-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="Store name"
            name="store_name"
            required
            defaultValue={customer.store_name}
            data-testid="store-name-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileStoreName
