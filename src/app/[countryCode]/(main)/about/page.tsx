import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Urban Therapy | Our Story",
  description:
    "Discover unique, handcrafted gifts made with love for the planet. Explore eco-friendly homeware, fashion, and more from passionate artisans. Shop consciously, feel good.",
}

import image1 from "/public/images/about1.png"
import image1bis from "/public/images/aboutPage.jpg"
import leaves from "/public/icons/icon-leaves-mission.svg"
import innovation from "/public/icons/icon-innovation.svg"
import simplicity from "/public/icons/icon-simplicity.svg"
import respect from "/public/icons/icon-respect.svg"
import excellence from "/public/icons/icon-excellence.svg"

import image2 from "/public/images/instagram-widget/img2.png"
import image3 from "/public/images/instagram-widget/img3.png"
import image4 from "/public/images/instagram-widget/img4.png"
import image5 from "/public/images/instagram-widget/img5.png"
import image6 from "/public/images/instagram-widget/img6.png"

const features = [
  {
    name: "Excellence",
    description:
      "Today, Next, and Someday cards allow you to defer your dreams into the future.",
    imageSrc: excellence,
    imageAlt: "Green cardstock box containing white, beige, and brown cards.",
  },
  {
    name: "Innovation",
    description:
      "Each refill pack contains plenty of cards to last you a month of procrastination.",
    imageSrc: innovation,
    imageAlt: "Green cardstock box open with 50 cards inside.",
  },
  {
    name: "Respect",
    description:
      "Flip a card over to doodle during meetings when you should be listening.",
    imageSrc: respect,
    imageAlt:
      "Detail of white today card, beige next card, and brown someday card with dot grid.",
  },
  {
    name: "Simplicity",
    description:
      "Subscribe and save on routine refill packs to keep you productive all year long.",
    imageSrc: simplicity,
    imageAlt:
      "Stack of three green cardstock boxes with 3 hole cutouts showing cards inside.",
  },
]
const perks = [
  {
    name: "Excellence",
    imageSrc: excellence,
    description:
      "Order now and you'll get delivery absolutely free. Well, it's not actually free, we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: "Innovation",
    imageSrc: innovation,
    description:
      "We have a 10 year warranty with every product that you purchase, whether thats a new pen or organizer, you can be sure we'll stand behind it.",
  },
  {
    name: "Respect",
    imageSrc: respect,
    description:
      "We understand that when your product arrives you might not particularly like it, or you ordered the wrong thing. Conditions apply here.",
  },
  {
    name: "Simplicity",
    imageSrc: simplicity,
    description:
      "Like you, we love the planet, and so we've pledged 1% of all sales to the preservation and restoration of the natural environment.",
  },
]

const incentives = [
  {
    name: "Free shipping",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: "10-year warranty",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: "Exchanges",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
]

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="text-sage-8">
        <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-x-24 gap-y-10 lg:grid-cols-2">
              <div className="flex flex-col space-y-12">
                <h2 className="text-5xl font-thin tracking-tight">
                  Building an Urban Harmony
                </h2>
                <div className="text-sage-6 text-lg font-thin leading-snug flex flex-col space-y-8">
                  <p>
                    Urban Therapy is a visionary concept store that seamlessly
                    blends modern aesthetics with timeless elegance. We offer a
                    curated selection of lifestyle products designed to elevate
                    everyday living. Our focus is on enhancing the urban
                    lifestyle, providing unique, high-quality products that
                    resonate with individuals who value both style and
                    functionality.
                  </p>
                  <p>
                    Our <span className="font-bold">mission</span>: to curate
                    products that align with urban living, emphasizing quality,
                    innovation, and the beauty of everyday life.
                  </p>
                </div>
              </div>
              {/* <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  alt=""
                  src={image1}
                  className="object-cover object-center saturate-0"
                />
              </div> */}
              <div className="w-full">
                <Image
                  alt=""
                  width={500}
                  src={image1bis}
                  className="object-cover object-center shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 pt-0 sm:pt-0 lg:px-4">
          <h2 className="sr-only">Our perks</h2>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 px-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {perks.map((perk) => (
              <div key={perk.name} className="sm:flex">
                <div className="mt-3 sm:ml-3 sm:mt-0">
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <Image alt="" src={perk.imageSrc} className="w-10" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-thin text-sage-8">
                    {perk.name}
                  </h3>
                  <p className="mt-2 text-sage-6 text-lg font-thin leading-snug">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div className="bg-sage-3 text-sage-10">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <div className="max-w-3xl">
            <h2 id="features-heading" className="font-medium text-sage-6">
              Focus
            </h2>
            <p className="mt-2 text-5xl font-thin tracking-tight">Our Values</p>
            <p className="mt-4 text-lg font-thin leading-snug text-sage-8">
              Focus allows you to plan 10 daily tasks, while also thinking ahead
              about what's next. Forget distracting digital apps and embrace
              these small, sturdy pieces of paper.
            </p>
          </div>

          <div className="mt-11 grid grid-cols-2 items-start gap-x-6 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col-reverse">
                <div className="mt-6">
                  {/* <h3 className="text-sm font-medium text-gray-900">
                    {feature.name}
                  </h3> */}
                  <h3 className="text-3xl font-thin text-sage-10">
                    {feature.name}
                  </h3>
                  {/* <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p> */}
                  <p className="mt-2 text-sage-8 text-md font-thin leading-snug">
                    {feature.description}
                  </p>
                </div>
                <div className="bg-sage-1/85 hover:bg-sage-1 flex items-center justify-center w-full h-52 shadow-sm border-sage-5">
                  {/* <div className="overflow-hidden rounded-lg bg-sage-1"></div> */}
                  <Image
                    alt={feature.imageAlt}
                    src={feature.imageSrc}
                    className="object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-sage-1 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="flex w-full items-center">
          <h2 className="text-5xl font-thin tracking-tight sm:text-5xl text-sage-8 min-w-80">
            Our Vision
          </h2>
          <p className="mt-8 text-lg font-thin leading-snug text-sage-6">
            {`To transform urban living by offering a premium selection of
                products that seamlessly integrate with contemporary lifestyles,
                inspiring individuals to infuse elegance into their everyday
                lives. Urban Therapy is driven by the conviction that modern
                living should embody a perfect balance of style, comfort, and
                practicality. Our mission is to curate products that not only
                enhance living environments but also enrich our customers'
                lives, enabling them to express their unique identity through
                our thoughtfully chosen collections.`}
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutPage
