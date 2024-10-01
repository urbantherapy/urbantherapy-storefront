import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import leaves from "/public/icons/icon-leaves-mission.svg"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const Hero = () => {
  return (
    <div>
      <div className="mt-28 md:mt-32 content-container flex flex-col md:flex-row text-primary items-start w-full md:space-x-32 relative min-h-svh space-y-20 md:space-y-0">
        <FadeIn className="w-full md:ml-32 -z-10 md:w-[40%] md:h-[75vh] h-[80vh] object-cover">
          <video
            src={require("/public/videos/homepage.mp4")}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto max-w-full"
          />
        </FadeIn>
        <FadeInStagger className="w-full md:w-1/2 self-center px-8 md:px-0">
          {/* <div className="w-full md:w-1/2 self-center"> */}
          {/* <Image
            src={leaves}
            alt="Leaves Icon"
            width={90}
            height={90}
            className="w-16 md:w-24 -rotate-[35deg] ml-6 opacity-25"
          /> */}
          <FadeIn>
            <h2
              className={`mb-6 lg:mt-4 text-xl font-normal tracking-tight text-sage-9`}
            >
              Crafted for Conscious Living
              {/* Kind to You */}
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="mt-6 lg:mt-0 text-md md:text-md max-w-md leading-6">
              {`At Urban Therapy, we believe in mindful living. Every product we curate is thoughtfully chosen to be kind to both you and the planet, crafted using sustainable practices and eco-friendly materials.`}
            </p>
          </FadeIn>
          <FadeIn>
            <p className="mt-6 text-md md:text-md max-w-md text-kaplan-dark leading-6">
              {`We’re here to help you make meaningful choices that support a better world.`}
            </p>
          </FadeIn>
          <FadeIn>
            <div className="w-60">
              <LocalizedClientLink
                href={"/about"}
                className="mt-10 text-sm font-normal border text-sage-8 hover:border-sage-4 hover:text-sage-8 p-4 flex items-center justify-between"
              >
                <span>Read More</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4 text-sage-6 hover:text-sage-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </LocalizedClientLink>
            </div>
          </FadeIn>
          {/* </div> */}
        </FadeInStagger>
      </div>
    </div>
  )
}

export default Hero
