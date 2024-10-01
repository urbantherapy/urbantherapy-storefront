import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="h-[60vh] py-32 px-2 flex flex-col justify-center items-start md:ml-[15%] text-primary"
      data-testid="empty-cart-message"
    >
      <h1 className="flex flex-row text-3xl md:text-3xl font-thin tracking-tight gap-x-2 items-baseline">
        Your Cart is Empty
      </h1>
      <p className="mt-6 text-md max-w-md text-sage-8 font-thin leading-6">
        Explore our curated collections and discover items that resonate with
        your values. Each piece is crafted with sustainability, innovation, and
        artistry in mind.
      </p>
      <div className="w-60">
        <LocalizedClientLink
          href={"/store"}
          className="mt-10 text-sm font-normal border text-sage-8 hover:border-sage-4 hover:text-sage-8 p-4 flex items-center justify-between"
        >
          <span>Explore Products</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="currentColor"
            className="w-3.5 text-sage-6 hover:text-sage-8"
          >
            <g>
              <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z"></path>
            </g>
          </svg>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
