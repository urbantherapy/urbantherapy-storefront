import Image from "next/image"
import leaves from "/public/icons/icon-leaves-mission.svg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const OurMission = () => {
  return (
    <div className="text-sage-8 bg-sage-1">
      <div className="mx-auto py-36 content-container max-w-2xl pb-26">
        <div className="mx-auto max-w-2xl lg:max-w-7xl flex flex-col items-start justify-center">
          <div className="flex justify-center -rotate-[20.6deg] self-start">
            <Image
              src={leaves}
              alt="Leaves Icon"
              width={90}
              height={90}
              className="w-16 md:w-24"
            />
          </div>
          <h2 className="mt-2 text-3xl md:text-5xl font-thin tracking-tight">
            We&apos;re on a Mission
          </h2>
          <p className="mt-8 text-base md:text-lg max-w-xl leading-7 text-sage-6">
            Urban Therapy is dedicated to sustainability. We carefully select
            products that are kind to the planet, ensuring they are made from
            eco-friendly materials and processes.
          </p>
          <LocalizedClientLink
            href={"/about"}
            className="inline-block mt-10 text-base bg-sage-2 font-normal px-4 py-2 rounded-md"
          >
            Read More
          </LocalizedClientLink>
          {/* <button className="mt-8 font-normal link-animation after:bg-primary">
            Learn More
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default OurMission
