import Image from "next/image"
import globe from "/public/icons/icon-globe-values.svg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const OurValues = () => {
  return (
    <div className="py-4">
      <div className="content-container text-primary flex flex-col items-center justify-center py-24 lg:py-48 bg-sage-2">
        <div className="content-container lg:mx-0 lg:max-w-7xl flex flex-col md:flex-row items-start justify-center gap-0 lg:gap-10">
          <div className="flex flex-col items-center md:mr-10 w-full md:w-1/2">
            <Image
              src={globe}
              alt="Globe Icon"
              width={90}
              className="w-16 md:w-24"
            />
            <h2 className="mt-2 lg:mt-4 text-3xl md:text-4xl font-thin tracking-tight text-sage-8 text-center">
              Guided by Principles
            </h2>
          </div>
          <div className="w-full md:w-1/2">
            <p className="mt-6 lg:mt-0 text-md md:text-lg max-w-xl text-sage-6 font-thin leading-6 text-center md:text-left">
              Our values are the heartbeat of everything we do. We prioritize{" "}
              <strong>sustainability</strong>, ensure <strong>fairness</strong>{" "}
              and <strong>responsibility</strong> in every step of production,{" "}
              <strong>support artisans and makers</strong>, and{" "}
              <strong>build a network</strong> of conscious consumers and
              creators who share our vision for a better world.
            </p>

            <div className="flex justify-center md:justify-start">
              <LocalizedClientLink
                href={"/about"}
                className="inline-block mt-10 text-base bg-sage-3/50 hover:bg-sage-3 font-normal px-4 py-2 rounded-md"
              >
                Read More
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurValues
