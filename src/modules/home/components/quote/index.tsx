import { Heading } from "@medusajs/ui"
import Image from "next/image"
import quote from "/public/icons/icon-quote.svg"

const Quote = () => {
  return (
    <div className="text-primary text-center">
      <div className="mx-auto py-32 content-container sm:py-56">
        <div className="mx-auto max-w-2xl lg:max-w-7xl flex flex-col items-center justify-center relative">
          <div className="absolute -right-32 -top-14">
            <Image
              src={quote}
              alt="Leaves Icon"
              width={150} // Adjust based on your icon's size
              height={150} // Adjust based on your icon's size
            />
          </div>
          <Heading
            level="h2"
            className="text-5xl font-extralight tracking-tight"
          >
            The world is a book, and those who do not travel read only one page.
          </Heading>
          <span className="self-start mt-6 text-5xl font-thin max-w-4xl text-primary/25 italic">
            — Saint Augustine
          </span>
        </div>
      </div>
    </div>
  )
}

export default Quote
