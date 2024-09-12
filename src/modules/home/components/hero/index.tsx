import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"

import heroImg from "/public/images/heroStore.jpg"

const Hero = () => {
  return (
    <div className="py-2 md:py-4">
      <div className="content-container relative mt-28 border-t border-sage-3 flex flex-col text-primary justify-between px-0 pt-2 md:pt-4">
        {/* <div className="h-px w-full border-b border-sage-5 mb-5" /> */}

        {/* <div className="absolute inset-0 bg-sage-10/30"></div> */}
        <div
          aria-hidden="true"
          className="relative flex-grow-0 flex-shrink-0 overflow-hidden"
        >
          {/* <Image
            src={heroImg}
            className="h-full w-full object-cover object-[50%_20%] saturate-[.85]"
            alt="Picture of the author"
            placeholder="blur"
          /> */}
          <video
            src={require("/public/videos/homepage.mp4")}
            autoPlay
            muted
            loop
            playsInline
            className="-z-10 w-full h-[50vh] object-cover"
          />
          <div className="absolute inset-0 bg-sage-12/5"></div>
        </div>
        {/* <div className="h-px w-full border-b border-sage-4 mt-4" /> */}
        {/* <div
          aria-hidden="true"
          className="flex-grow-0 flex-shrink-0 basis-1/4 flex flex-col justify-center items-start space-y-4 mb-4 p-32"
        >
          <Heading
            level="h2"
            className="text-5xl font-extralight tracking-tight mb-4"
          >
            Empowering the Makers
          </Heading>
          <div className="flex justify-between">
            <p className="w-1/2 text-2xl font-thin text-primary/75">
              Every purchase at Urban Therapy supports a dream, turning ideas
              into reality. Our handpicked, sustainable, and fairtrade products
              are more than items&mdash;they&apos;re stories crafted with care.
            </p>
            <button className="self-end bg-primary/10 font-medium px-4 py-2 rounded-md">
              Shop Now →
            </button>
          </div>
        </div> */}
      </div>
      {/* <div className="relative bg-sage-6">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <video
            src={require("/public/videos/homepage.mp4")}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-80 text-center  lg:px-0"></div>
      </div> */}
    </div>
  )
}

export default Hero
