import Image from "next/image"
import leaves from "/public/icons/icon-leaves-mission.svg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const OurMission = () => {
  return (
    <>
      <div className="py-2 md:py-4">
        <div className="content-container text-aesop-dark flex flex-col items-center justify-center py-24 lg:py-48">
          <div className="content-container lg:mx-0 lg:max-w-7xl flex flex-col md:flex-row items-start justify-center gap-0 lg:gap-10">
            <div className="flex flex-col items-center md:mr-10 w-full md:w-1/2">
              <Image
                src={leaves}
                alt="Leaves Icon"
                width={90}
                height={90}
                className="w-16 md:w-24 -rotate-[20.6deg]"
              />
              <h2 className="mt-2 lg:mt-4 text-3xl font-thin tracking-tight text-sage-8 text-center">
                {`We're on a Mission`}
              </h2>
            </div>
            <div className="w-full md:w-1/2">
              <p className="mt-6 lg:mt-0 text-md md:text-md max-w-md text-sage-6 font-thin leading-6 text-center md:text-left">
                {`At Urban Therapy, we believe in mindful living. Every product we curate is thoughtfully chosen to be kind to both you and the planet, crafted using sustainable practices and eco-friendly materials.`}
              </p>
              <p className="mt-6 text-md md:text-md max-w-md text-sage-6 font-thin leading-6 text-center md:text-left">
                {`We’re here to help you make meaningful choices that support a better world.`}
              </p>
              <div className="w-60">
                <LocalizedClientLink
                  href={"/about"}
                  className="mt-10 text-sm font-normal border text-sage-6 hover:bg-sage-2/50 p-4 flex items-center justify-between"
                >
                  <span>Read More</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4 text-sage-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="text-sage-8 bg-sage-1">
        <div className="mx-auto content-container px-0 py-2">

          <div className="mx-auto w-full flex flex-col items-center justify-center py-36 ">
            <div className="flex gap-x-10">
              <div>
                <div className="flex justify-center -rotate-[20.6deg]">
                  <Image
                    src={leaves}
                    alt="Leaves Icon"
                    width={90}
                    height={90}
                    className="w-16 md:w-24"
                  />
                </div>
                <h2 className="mt-2 md:font-sans text-3xl md:text-5xl font-thin tracking-tight max-w-sm">
                  We&apos;re on a Mission
                </h2>
              </div>

              <div>
                <p className="mt-6 text-md md:text-lg font-thin max-w-xl leading-6 text-sage-6">
                  Urban Therapy is dedicated to sustainability. We carefully
                  select products that are kind to the planet, ensuring they are
                  made from eco-friendly materials and processes.
                </p>
                <LocalizedClientLink
                  href={"/about"}
                  className="inline-block mt-6 text-base bg-sage-2 hover:bg-sage-3/75 font-normal px-4 py-2 rounded-md"
                >
                  Read More
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default OurMission
