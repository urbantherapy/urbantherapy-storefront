import { Metadata } from "next"
import image1 from "/public/images/instagram-widget/img1.png"
import image2 from "/public/images/instagram-widget/img2.png"
import image3 from "/public/images/instagram-widget/img3.png"
import image4 from "/public/images/instagram-widget/img4.png"
import image5 from "/public/images/instagram-widget/img5.png"
import image6 from "/public/images/instagram-widget/img6.png"
import Image from "next/image"
import { Schedule } from "@modules/community/components/schedule"
import Makers from "@modules/community/components/makers"
import JoinTheCommunity from "@modules/community/components/join"

export const metadata: Metadata = {
  title: "Urban Therapy | Community",
  description:
    "Discover unique, handcrafted gifts made with love for the planet. Explore eco-friendly homeware, fashion, and more from passionate artisans. Shop consciously, feel good.",
}

const Community: React.FC = () => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="content-container pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-0">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="mt-4 text-5xl font-thin tracking-tight sm:text-5xl text-sage-8">
                Empowering the Makers
              </h1>
              <p className="mt-8 text-lg font-thin leading-snug text-sage-6 sm:max-w-md lg:max-w-xl">
                {`At Urban Therapy, we believe that every maker has a story worth
                telling. Our community is built on the foundation of creativity,
                sustainability, and the shared passion for bringing unique,
                handcrafted products to life.`}
              </p>
              <p className="mt-6 text-lg font-thin leading-snug text-sage-6 sm:max-w-md lg:max-w-xl">
                {`  We’re more than just a store—we’re
                a movement dedicated to empowering makers and fostering
                innovation.`}
              </p>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div className="relative">
                  <Image
                    alt=""
                    sizes="(min-width: 640px) 18rem, 11rem"
                    src={image1}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[.80]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div className="relative">
                  <Image
                    alt=""
                    sizes="(min-width: 640px) 18rem, 11rem"
                    src={image2}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[.80]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="relative">
                  <Image
                    alt=""
                    sizes="(min-width: 640px) 18rem, 11rem"
                    src={image3}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[.80]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div className="relative">
                  <Image
                    alt=""
                    sizes="(min-width: 640px) 18rem, 11rem"
                    src={image4}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[.80]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="relative">
                  <Image
                    alt=""
                    sizes="(min-width: 640px) 18rem, 11rem"
                    src={image5}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg saturate-[.80]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Schedule />
      <Makers />
      <JoinTheCommunity />
    </>
  )
}

export default Community
