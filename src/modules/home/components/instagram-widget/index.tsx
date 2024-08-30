import { Heading } from "@medusajs/ui"
import Image from "next/image"

import kidsCollection from "/public/images/collectionKids.jpeg"
import img1 from "/public/images/instagram-widget/img1.png"
import img2 from "/public/images/instagram-widget/img2.png"
import img3 from "/public/images/instagram-widget/img3.png"
import img4 from "/public/images/instagram-widget/img4.png"
import img5 from "/public/images/instagram-widget/img5.png"
import img6 from "/public/images/instagram-widget/img6.png"

import leaves from "/public/icons/icon-leaves-mission.svg"

const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: img1,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: img2,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: img3,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: img4,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: img5,
  },
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: img6,
  },
]
const InstagramWidget = () => {
  return (
    <div className="text-primary bg-sage-4 text-center flex flex-col md:flex-row">
      <ul
        role="list"
        className="w-full md:w-1/2 grid grid-cols-3 gap-x-1 md:gap-x-1 gap-y-1 md:gap-y-1 lg:grid-cols-3"
      >
        {files.map((file, index) => (
          <li key={`${file.title}-${index}`} className="relative">
            <div className="group aspect-h-7 aspect-w-7 block w-full overflow-hidden h-full">
              <Image
                alt=""
                src={file.source}
                className="pointer-events-none object-cover group-hover:opacity-90 saturate-[.80]"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-sage-11/5"></div>
              <button type="button" className="absolute inset-0">
                <span className="sr-only">View details for {file.title}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div
        className={`flex-1 bg-sage-1 flex flex-col items-center justify-center p-4 py-24 md:py-32`}
      >
        <div className="flex justify-center rotate-[19.6deg]">
          <Image
            src={leaves}
            alt="Leaves Icon"
            width={90}
            height={90}
            className="w-1/2 md:w-3/4"
          />
        </div>
        <h2 className="mt-0 text-3xl md:text-5xl font-thin tracking-tight text-center text-sage-8">
          Join the Community
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-center text-sage-6 text-base md:text-lg leading-7">
          Subscribe to our newsletter and be the first to hear about new
          collections, upcoming workshops, and exclusive offers. Discover the
          stories behind our products and stay connected with the makers who
          inspire us.
        </p>
        {/* <h2 className="text-5xl font-extralight tracking-tight">
          Follow Us on Instagram
        </h2>
        <p className="mt-10 font-thin text-2xl text-center max-w-md text-primary/75">
          Stay inspired and connected with our latest updates and adventures.
        </p> */}
        <button className="mt-10 bg-primary/10 font-medium px-4 py-2 rounded-md">
          @urbantherapy.be →
        </button>
      </div>
    </div>
  )
}

export default InstagramWidget
