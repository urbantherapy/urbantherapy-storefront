"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import clx from "clsx"

const ProgressBar = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentStep = searchParams.get("step")

  const steps = [
    { id: "Step 1", name: "Shipping Address", href: "address" },
    { id: "Step 2", name: "Delivery", href: "delivery" },
    { id: "Step 3", name: "Payment", href: "payment" },
    { id: "Step 4", name: "Review", href: "review" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.href === currentStep)

  const paidByGiftcard = cart?.gift_cards?.length > 0 && cart?.total === 0

  const isStepValidated = (stepHref: string) => {
    switch (stepHref) {
      case "address":
        return !!cart?.shipping_address
      case "delivery":
        return cart?.shipping_methods?.length > 0
      case "payment":
        return !!cart?.payment_session || paidByGiftcard
      case "review":
        return (
          !!cart?.shipping_address &&
          cart?.shipping_methods?.length > 0 &&
          (!!cart?.payment_session || paidByGiftcard)
        )
      default:
        return false
    }
  }

  const handleStepClick = (stepHref: string) => {
    if (isStepValidated(stepHref)) {
      router.push(`${pathname}?step=${stepHref}`, { scroll: false })
    }
  }

  return (
    <nav aria-label="Progress" className="mb-6 mt-2">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => {
          const isCurrentStep = index === currentStepIndex
          const isPreviousStepValid =
            index === 0 || isStepValidated(steps[index - 1].href)

          return (
            <li key={step.name} className="md:flex-1">
              <button
                onClick={() => handleStepClick(step.href)}
                className={clx(
                  "w-full group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  {
                    "border-sage-10": index <= currentStepIndex,
                    "border-gray-200": index > currentStepIndex,
                    "opacity-50 cursor-not-allowed":
                      !isPreviousStepValid || !isStepValidated(step.href),
                  }
                )}
                disabled={!isPreviousStepValid || !isStepValidated(step.href)}
              >
                <span
                  className={clx("flex items-center text-sm font-medium", {
                    "text-sage-10": index <= currentStepIndex,
                    "text-sage-4": index > currentStepIndex,
                  })}
                >
                  <svg
                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {step.name}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default ProgressBar
