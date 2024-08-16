import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null)

  return (
    <div
      className="flex flex-col items-center max-w-xl w-full"
      data-testid="login-page"
    >
      <div className="mb-12">
        <h2 className="mt-8 text-5xl font-extralight leading-tight tracking-tigh text-center">
          Welcome to Urban Therapy B2B
        </h2>
        <p className="mt-12 text-lg font-thin leading-tigh text-primary/75">
          Our platform is exclusively for businesses. To access our curated
          collections and special wholesale offers, please{" "}
          <span className="link-animation font-normal after:bg-primary text-primary inline-block">
            contact us
          </span>
          . We'll set up your account and help you get started.
        </p>
      </div>

      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            // className="bg-secondary block w-full border-0 py-1.5 text-primary shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6 h-14 rounded-md"
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
          className="w-full mt-6 bg-primary rounded-md border-none text-tertiary hover:bg-primary/75"
        >
          Sign in
        </SubmitButton>
      </form>
      {/* <span className="text-center text-ui-fg-base text-small-regular mt-6">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span> */}
    </div>
  )
}

export default Login
