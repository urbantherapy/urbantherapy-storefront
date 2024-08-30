import { Heading } from "@medusajs/ui"
import Image from "next/image"
import globe from "/public/icons/icon-globe-values.svg"

const OurValues = () => {
  return (
    <div className="text-primary flex flex-col items-center justify-center py-16 lg:py-48 bg-sage-2">
      <div className="content-container lg:mx-0 lg:max-w-7xl flex flex-col md:flex-row items-center justify-center gap-0 lg:gap-10">
        <div className="flex flex-col items-center mr-10 mt-16">
          <Image src={globe} alt="Globe Icon" width={90} />
          <Heading
            level="h2"
            className="mt-2 lg:mt-4 text-5xl font-thin tracking-tight"
          >
            Our Values
          </Heading>
        </div>
        <div>
          <p className="mt-12 lg:mt-20 font-thin text-lg max-w-3xl text-primary/75">
            {`At Urban Therapy, our values reflect our commitment to sustainability and quality. We believe in offering products that are kind to both you and the planet, using eco-friendly materials and ethical practices to ensure every item aligns with our principles. Transparency and integrity guide us, ensuring you can trust the choices you make with us.`}
          </p>
          <button className="mt-8 font-normal link-animation after:bg-primary">
            Learn More
          </button>
        </div>
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
