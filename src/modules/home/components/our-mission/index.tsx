import { Heading } from "@medusajs/ui"
import Image from "next/image"
import leaves from "/public/icons/icon-leaves-mission.svg"

const OurMission = () => {
  return (
    <div className=" text-primary">
      <div className="mx-auto py-36 content-container max-w-2xl pb-26">
        <div className="mx-auto max-w-2xl lg:max-w-7xl flex flex-col items-start justify-center">
          <div className="flex justify-center rotate-[19.6deg]">
            <Image src={leaves} alt="Leaves Icon" width={90} height={90} />
          </div>
          <Heading
            level="h2"
            className="mt-4 text-5xl font-thin tracking-tight"
          >
            We&apos;re on a Mission
          </Heading>
          <p className="mt-8 text-lg font-thin max-w-xl leading-tight text-primary/75">
            Urban Therapy is dedicated to sustainability. We carefully select
            products that are kind to the planet, ensuring they are made from
            eco-friendly materials and processes.
          </p>
          <button className="mt-10 bg-primary/10 font-medium px-4 py-2 rounded-md">
            Read More
          </button>
          {/* <button className="mt-8 font-normal link-animation after:bg-primary">
            Learn More
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default OurMission
