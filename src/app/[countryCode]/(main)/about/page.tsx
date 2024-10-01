import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Urban Therapy | Our Story",
  description:
    "Discover unique, handcrafted gifts made with love for the planet. Explore eco-friendly homeware, fashion, and more from passionate artisans. Shop consciously, feel good.",
}

import image1 from "/public/images/about1.png"
import image1bis from "/public/images/urbanHarmony.jpeg"
import leaves from "/public/icons/icon-leaves-mission.svg"
import innovation from "/public/icons/icon-innovation.svg"
import simplicity from "/public/icons/icon-simplicity.svg"
import respect from "/public/icons/icon-respect.svg"
import excellence from "/public/icons/icon-excellence.svg"

import leaves2 from "/public/icons/icon-about-value.svg"
import { MotionDiv } from "@modules/framer-motion/MotionDiv"
import { MotionH2 } from "@modules/framer-motion/MotionH2"
import { MotionP } from "@modules/framer-motion/MotionP"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const incentives = [
  {
    name: "Planet First, Always",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    description:
      "Every product we offer is thoughtfully crafted with sustainability at the forefront. We’re here for the Earth, one mindful choice at a time.",
  },
  {
    name: "Crafted by Nature, Approved by You",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    description:
      "Our ingredients and materials are chosen with care, creating products that feel good, look good, and do good—both for you and the environment.",
  },
  {
    name: "A Journey Towards Mindfulness",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    description:
      "Urban Therapy isn’t just a store, it’s a lifestyle. We believe in small, meaningful changes that lead to a more conscious, balanced way of living.",
  },
]

const AboutPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  }
  const itemVariants = (i: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  })

  return (
    <>
      <div className="mx-auto max-w-7xl pt-48 py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-24 gap-y-10 lg:grid-cols-2">
            <FadeInStagger className="flex flex-col space-y-6 text-sage-8">
              <FadeIn>
                <h2 className="text-3xl font-thin tracking-tight text-sage-10">
                  Building an <span className="italic">Urban Harmony</span>
                </h2>
              </FadeIn>

              <div className="text-sage-6 text-md font-thin leading-6 flex flex-col space-y-6 max-w-md">
                <FadeIn>
                  <p>
                    {`At Urban Therapy, we believe in the power of intention. Our journey began with a vision to create a brand that champions sustainability and mindfulness in everyday life. Each product is a testament to our commitment to ethical practices, eco-friendly materials, and innovative design.`}
                  </p>
                </FadeIn>
                <FadeIn>
                  <p>
                    {`We strive to inspire a community that values conscious choices, nurturing both personal well-being and the health of our planet. Join us as we share our passion for products that enhance your life while making a positive impact on the world.`}
                  </p>
                </FadeIn>
              </div>
            </FadeInStagger>

            <FadeIn className="w-full hidden md:block">
              <Image
                alt=""
                width={500}
                src={image1bis}
                className="object-cover object-center shadow-md"
              />
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="bg-sage-12 text-sage-8">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <FadeInStagger className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-3 mt-8">
            {incentives.map((incentive) => (
              <FadeIn key={incentive.name}>
                <div className="sm:flex lg:block">
                  <div className="mt-2 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-0 max-w-sm text-md">
                    <h3 className="text-sage-4 font-normal">
                      {incentive.name}
                    </h3>
                    <p className="mt-4 text-sage-8">{incentive.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </div>

      <div className="content-container py-24 md:py-32 md:max-w-5xl">
        <FadeInStagger>
          <div className="flex flex-col md:flex-row w-full md:items-center">
            <FadeIn>
              <h2 className="text-3xl font-thin tracking-tight text-sage-9 min-w-80">
                Our Vision
              </h2>
            </FadeIn>
            <div className="mt-8 md:mt-0 text-sage-6 text-md flex flex-col space-y-8 max-w-lg leading-6">
              <FadeIn>
                <p>
                  {`To transform urban living by offering a premium selection of
                products that seamlessly integrate with contemporary lifestyles,
                inspiring individuals to infuse elegance into their everyday
                lives.`}
                </p>
              </FadeIn>
              <FadeIn>
                <p>
                  {`Urban Therapy is driven by the conviction that modern
                living should embody a perfect balance of style, comfort, and
                practicality. Our mission is to curate products that not only
                enhance living environments but also enrich our customers'
                lives, enabling them to express their unique identity through
                our thoughtfully chosen collections.`}
                </p>
              </FadeIn>
            </div>
          </div>
        </FadeInStagger>
      </div>
    </>
  )
}

export default AboutPage
