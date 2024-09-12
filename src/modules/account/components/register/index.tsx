"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null)

  return (
    <div
      className="mt-12 md:mt-32 max-w-md flex flex-col items-center w-full"
      data-testid="register-page"
    >
      <h2 className="mt-0 text-center text-2xl md:text-3xl font-normal leading-9 tracking-tight text-sage-8">
        Urban Therapy B2B
      </h2>
      {/* <p className="mt-8 text-base leading-7 text-sage-6">
        Our platform is currently exclusively available to businesses. To access
        our collections and wholesale offers, please{" "}
        <span className="link-animation font-medium after:bg-primary text-primary inline-block">
          contact us
        </span>
        . We&apos;ll set up your account and help you get started.
      </p> */}
      <form className="mt-12 w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Company name"
            name="company_name"
            required
            autoComplete="organization"
            data-testid="company-name-input"
          />
          <Input
            label="Store name"
            name="store_name"
            required
            autoComplete="store"
            data-testid="store-name-input"
          />
          <Input
            label="VAT"
            name="vat"
            required
            // autoComplete="vat"
            data-testid="vat-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />

        <SubmitButton
          variant="secondary"
          className="mt-2 w-full bg-sage-9 hover:bg-sage-10 rounded-md border-none text-tertiary px-3 py-2.5"
          data-testid="register-button"
        >
          Join
        </SubmitButton>
      </form>
      <span className="text-center mt-4 text-sm">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
