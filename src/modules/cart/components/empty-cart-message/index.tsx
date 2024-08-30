import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-start text-primary"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row text-5xl font-thin tracking-tight gap-x-2 items-baseline"
      >
        Shopping cart
      </Heading>
      <Text className="text-lg font-thin my-6 max-w-2xl">
        It looks like you haven&apos;t added anything to your cart yet. Take a
        look at our curated collections and find something special that speaks
        to you. Each of our products is carefully selected to embody
        sustainability, innovation, and craftsmanship.
      </Text>
      <div>
        <InteractiveLink href="/store">Explore products</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
