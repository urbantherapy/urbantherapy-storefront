import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-sage-2 rounded-md p-4 flex items-center justify-between text-sage-10">
      <div>
        <Heading level="h2" className="text-lg">
          Already have an account?
        </Heading>
        <Text className="text-sm text-sage-8 mt-4">
          Sign in to access your account and enjoy a more personalized shopping
          experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
