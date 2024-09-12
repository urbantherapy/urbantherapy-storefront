import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="h-[85vh] py-32 md:py-48 px-2 flex flex-col justify-center items-start text-primary"
      data-testid="empty-cart-message"
    >
      <h1 className="flex flex-row text-3xl md:text-3xl font-thin tracking-tight gap-x-2 items-baseline">
        Oops...
      </h1>
      <p className="text-base md:text-lg font-thin mt-4 mb-4 max-w-2xl text-sage-6">
        It looks like you haven&apos;t added anything to your cart yet. Take a
        look at our curated collections and find something special that speaks
        to you.
      </p>
      <p className="text-base md:text-lg font-thin mb-6 max-w-2xl text-sage-6">
        Each of our products is carefully selected to embody sustainability,
        innovation, and craftsmanship.
      </p>
      <div>
        <InteractiveLink href="/store">Explore products</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
