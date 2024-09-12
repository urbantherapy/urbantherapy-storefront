"use client"

import { Customer as MedusaCustomer } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { updateCustomerVat } from "@modules/account/actions"

import AccountInfo from "../account-info"

type Customer = MedusaCustomer & {
  vat?: string
}

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileVat: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerVat, {
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
        label="VAT"
        currentInfo={`${customer.vat}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-vat-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="VAT"
            name="vat"
            required
            defaultValue={customer.vat}
            data-testid="vat-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileVat
