import { Heading } from "@medusajs/ui"
import Image from "next/image"
import globe from "/public/icons/icon-globe-values.svg"

const OurValues = () => {
  return (
    <div className="text-primary flex flex-col items-center justify-center py-48">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-7xl flex items-center justify-center gap-10">
        <div className="flex flex-col items-center mr-10">
          {/* <Image src={globe} alt="Globe Icon" width={130} height={130} /> */}
          <Heading
            level="h2"
            className="mt-4 text-5xl font-extralight tracking-tight"
          >
            Our Values
          </Heading>
        </div>
        <p className="mt-20 font-thin text-2xl max-w-4xl text-primary/75">
          {`At Urban Therapy, our values reflect our commitment to sustainability and quality. We believe in offering products that are kind to both you and the planet, using eco-friendly materials and ethical practices to ensure every item aligns with our principles. Transparency and integrity guide us, ensuring you can trust the choices you make with us.`}
        </p>
      </div>
      {/* <div className="flex justify-center gap-8 mt-20 text-2xl font-thin">
        <button className="px-8 py-4 bg-primary/5 rounded-full shadow-sm hover:shadow-md">
          Community
        </button>
        <button className="px-8 py-4 bg-primary/5 rounded-full shadow-sm hover:shadow-md">
          Creativity
        </button>
        <button className="px-8 py-4 bg-primary/5 rounded-full shadow-sm hover:shadow-md">
          Fair Trade
        </button>
        <button className="px-8 py-4 bg-primary/5 rounded-full shadow-sm hover:shadow-md">
          Sustainability
        </button>
        <button className="px-8 py-4 bg-primary/5 rounded-full shadow-sm hover:shadow-md">
          Innovation
        </button>
      </div> */}
    </div>
  )
}

export default OurValues
