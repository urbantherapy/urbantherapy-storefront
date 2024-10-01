import { Metadata } from "next"
import image1 from "/public/images/communityHero.jpg"
import image2 from "/public/images/instagram-widget/img2.png"
import image3 from "/public/images/instagram-widget/img3.png"
import image4 from "/public/images/instagram-widget/img4.png"
import image5 from "/public/images/instagram-widget/img5.png"
import image6 from "/public/images/instagram-widget/img6.png"
import Image from "next/image"
import { Schedule } from "@modules/community/components/schedule"
import Makers from "@modules/community/components/makers"
import JoinTheCommunity from "@modules/community/components/join"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

export const metadata: Metadata = {
  title: "Urban Therapy | Community",
  description:
    "Discover unique, handcrafted gifts made with love for the planet. Explore eco-friendly homeware, fashion, and more from passionate artisans. Shop consciously, feel good.",
}

const Community: React.FC = () => {
  return (
    <>
      <div className="content-container pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-0">
        <FadeInStagger className="mx-auto max-w-2xl gap-x-0 lg:mx-0 lg:flex lg:max-w-none lg:items-center my-32 pl-32">
          <FadeIn className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            <h1 className="text-3xl font-thin tracking-tight leading-snug text-sage-10">
              Empowering the Makers
            </h1>
            <p className="mt-4 font-thin text-sm leading-6 text-sage-8 max-w-sm">
              {`At Urban Therapy, we believe that every maker has a story worth
                telling. Our community is built on the foundation of creativity,
                sustainability, and the shared passion for bringing unique,
                handcrafted products to life.`}
            </p>
            <p className="mt-4 font-thin text-sm leading-6 text-sage-8 max-w-sm">
              {`  We’re more than just a store—we’re
                a movement dedicated to empowering makers and fostering
                innovation.`}
            </p>
          </FadeIn>

          <FadeIn className="">
            <div className="relative w-[85%]">
              <Image
                alt=""
                // sizes="(min-width: 640px) 18rem, 11rem"
                src={image1}
                className="aspect-[2/3] object-cover"
              />
            </div>
          </FadeIn>
        </FadeInStagger>
      </div>

      {/* <Schedule /> */}
      <Makers />
      {/* <JoinTheCommunity /> */}
    </>
  )
}

export default Community
