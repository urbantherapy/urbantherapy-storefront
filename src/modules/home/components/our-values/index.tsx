import Image from "next/image"
import globe from "/public/icons/icon-globe-values.svg"
import principlesHand from "/public/icons/icon-principles-hand.svg"
import leaves from "/public/icons/icon-leaves-mission.svg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const OurValues = () => {
  return (
    <div className="py-4">
      <div className="content-container text-primary flex flex-col items-center justify-center py-24 lg:py-48 bg-aesop-0 md:bg-aesop-1">
        {/* <div className="content-container lg:mx-0 lg:max-w-7xl flex flex-col md:flex-row items-start justify-center gap-0 lg:gap-10"> */}
        <FadeInStagger className="content-container lg:mx-0 lg:max-w-7xl flex flex-col md:flex-row items-center justify-center gap-0 lg:gap-10">
          <div className="flex flex-col items-start md:items-center md:mr-10 w-full md:w-1/2">
            <FadeIn>
              <Image
                src={principlesHand}
                alt="Globe Icon"
                width={90}
                className="hidden md:block w-16 md:w-24 opacity-100 rotate-[20deg]"
              />
            </FadeIn>
            <FadeIn>
              <h2
                className={`mt-2 lg:mt-0 text-xl font-normal tracking-tight text-sage-8 text-center`}
              >
                Guided by Principles
              </h2>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start md:items-start">
            <FadeIn>
              <p className="mt-6 lg:mt-0 text-md max-w-md text-sage-8 font-thin leading-6 text-center md:text-left">
                Our values are the heartbeat of everything we do.
              </p>
            </FadeIn>
            <FadeIn>
              <p className="mt-6 text-md max-w-md text-sage-8 font-thin leading-6">
                We prioritize sustainability, ensure fairness and responsibility
                in every step of production, support artisans and makers, and
                build a network of conscious consumers and creators who share
                our vision for a better world.
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
            </FadeIn>
          </div>
        </FadeInStagger>
        {/* </div> */}
      </div>
    </div>
  )
}

export default OurValues
