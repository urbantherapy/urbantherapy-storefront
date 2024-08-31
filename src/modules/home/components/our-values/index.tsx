import Image from "next/image"
import globe from "/public/icons/icon-globe-values.svg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const OurValues = () => {
  return (
    <div className="text-primary flex flex-col items-center justify-center py-24 lg:py-48 bg-sage-2">
      <div className="content-container lg:mx-0 lg:max-w-7xl flex flex-col md:flex-row items-center justify-center gap-0 lg:gap-10">
        <div className="flex flex-col items-center md:mr-10">
          <Image
            src={globe}
            alt="Globe Icon"
            width={90}
            className="w-16 md:w-24"
          />
          <h2 className="mt-2 lg:mt-4 text-3xl md:text-5xl font-thin tracking-tight text-sage-8">
            Our Values
          </h2>
        </div>
        <div>
          <p className="mt-6 lg:mt-20 text-md md:text-lg max-w-3xl text-sage-6 font-thin leading-6 text-center md:text-left">
            {`At Urban Therapy, our values reflect our commitment to sustainability and quality. 
            
            We believe in offering products that are kind to both you and the planet, using eco-friendly materials and ethical practices to ensure every item aligns with our principles.`}
          </p>
          <div className="flex justify-center md:justify-start">
            <LocalizedClientLink
              href={"/about"}
              className="inline-block mt-10 text-base bg-sage-3 font-normal px-4 py-2 rounded-md"
            >
              Read More
            </LocalizedClientLink>
          </div>
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
