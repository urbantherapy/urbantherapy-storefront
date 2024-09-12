"use client"

import { Customer as MedusaCustomer } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { updateCustomerCompanyName } from "@modules/account/actions"

import AccountInfo from "../account-info"

type Customer = MedusaCustomer & {
  company_name?: string
}

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileCompanyName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerCompanyName, {
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
        label="Company name"
        currentInfo={`${customer.company_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-company-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="Company name"
            name="company_name"
            required
            defaultValue={customer.company_name}
            data-testid="company-name-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileCompanyName
