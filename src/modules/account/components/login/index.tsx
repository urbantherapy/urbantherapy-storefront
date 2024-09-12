import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Image from "next/image"

import doodle from "/public/icons/icon-doodle-cart.svg"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null)

  return (
    <div
      className="mt-12 md:mt-32 flex flex-col items-center max-w-md w-full"
      data-testid="login-page"
    >
      <div className="mb-12 flex flex-col items-center justify-center">
        <Image
          src={doodle}
          alt="Doodle"
          className="mx-auto h-32 w-auto rotate-[22.6deg]"
        />
        {/* <h2 className="mt-0 text-center text-2xl md:text-5xl font-normal leading-9 tracking-tight text-sage-8">
          Sign in to your account
        </h2> */}
        <p className="mt-8 text-base leading-7 text-sage-6">
          Our platform is currently exclusively available to businesses. To
          access our collections and wholesale offers, please{" "}
          <span className="link-animation font-medium after:bg-primary text-primary inline-block">
            contact us
          </span>
          . We&apos;ll set up your account and help you get started.
        </p>
      </div>

      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email address"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          variant="secondary"
          data-testid="sign-in-button"
          className="mt-2 w-full bg-sage-9 hover:bg-sage-10 rounded-md border-none text-tertiary px-3 py-2.5"
        >
          Sign in
        </SubmitButton>
      </form>

      {/* <----- Register form -----> */}
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
