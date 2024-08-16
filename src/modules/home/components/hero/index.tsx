import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"

import heroImg from "/public/images/heroStore.jpg"

const Hero = () => {
  return (
    <div className="relative -mt-32 flex flex-col text-primary justify-between">
      <video
        src={require("/public/videos/homepage.mp4")}
        autoPlay
        muted
        loop
        className="-z-10 w-full h-screen object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      {/* <div
        aria-hidden="true"
        className="relative flex-grow-0 flex-shrink-0 h-[65vh] overflow-hidden"
      >
        <Image
          src={heroImg}
          className="h-full w-full object-cover object-[50%_20%] saturate-[.75]"
          alt="Picture of the author"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-primary/20"></div>
      </div> */}
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
            Every purchase at Urban Therapy supports a dream, turning ideas into
            reality. Our handpicked, sustainable, and fairtrade products are
            more than items&mdash;they&apos;re stories crafted with care.
          </p>
          <button className="self-end bg-primary/10 font-medium px-4 py-2 rounded-md">
            Shop Now →
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default Hero
