import { Metadata } from "next"
import Image from "next/image"
import store from "/public/images/stores.jpg"
import { Heading } from "@medusajs/ui"
import globe from "/public/icons/icon-globe-stores.svg"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const stores = [
  {
    name: "Dansaert",
    address: "Rue de Flandre 84",
    city: "Brussels",
    country: "Belgium",
    openingDate: "October 2016",
    notes: "Flagship store",
    openingHours: "Mon-Sun 10am-6:30pm",
    image: "/images/ourStores.jpg",
  },
  {
    name: "Marolles",
    address: "Rue Blaes 96B",
    city: "Brussels",
    country: "Belgium",
    openingDate: "October 2016",
    notes: "Flagship store",
    openingHours: "Mon-Sun 10am-6:30pm",
    image: "/images/ourStores.jpg",
  },
  {
    name: "Sablon",
    address: "Rue de Rollebeek 29",
    city: "Brussels",
    country: "Belgium",
    openingDate: "October 2016",
    notes: "Flagship store",
    openingHours: "Mon-Sun 10am-6:30pm",
    image: "/images/ourStores.jpg",
  },
  {
    name: "Antwerp",
    address: "Leopoldlaan",
    city: "Zaventem",
    country: "Belgium",
    openingDate: "October 2016",
    notes: "Flagship store",
    openingHours: "Mon-Sun 10am-6:30pm",
    image: "/images/ourStores.jpg",
  },
  {
    name: "Airport",
    address: "Leopoldlaan",
    city: "Zaventem",
    country: "Belgium",
    openingDate: "October 2016",
    notes: "Flagship store",
    openingHours: "Mon-Sun 10am-6:30pm",
    image: "/images/ourStores.jpg",
  },
]

export const metadata: Metadata = {
  title: "Urban Therapy | Stores",
  description:
    "Discover unique, handcrafted gifts made with love for the planet. Explore eco-friendly homeware, fashion, and more from passionate artisans. Shop consciously, feel good.",
}

const Stores: React.FC = () => {
  return (
    <div className="mt-40">
      {/* <div className="flex h-[75vh] gap-x-28">
        <FadeIn className="w-1/2 pl-32">
          <Image
            alt=""
            placeholder="blur"
            src={store}
            className="h-full w-full object-cover object-center saturate-[.85]"
          />
        </FadeIn>
        <div className="text-sage-10 h-full w-1/2">
          <FadeInStagger className="flex flex-col items-start h-full w-full justify-center">
            <FadeIn>
              <h2 className="text-3xl font-thin tracking-tight leading-snug text-sage-11">
                Stores
              </h2>
            </FadeIn>
            <FadeIn>
              <p className="mt-4 font-thin text-sm leading-6 text-sage-8 max-w-sm">
                {`Discover our thoughtfully curated products in stores around the world. Each location offers a selection crafted with care for both you and the planet. Visit us and explore sustainable living firsthand.`}
              </p>
            </FadeIn>
          </FadeInStagger>
        </div>
      </div> */}

      <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
        <div className="flex items-center justify-center space-x-32">
          <FadeIn className="w-full hidden md:w-auto md:block">
            <Image
              alt=""
              width={500}
              src={store}
              className="object-cover object-center shadow-md"
            />
          </FadeIn>
          <FadeInStagger className="flex flex-col space-y-6 text-sage-8">
            <FadeIn>
              <h2 className="text-3xl font-thin tracking-tight text-sage-10">
                Stores
              </h2>
            </FadeIn>

            <div className="text-sage-6 text-md font-thin leading-6 flex flex-col space-y-6 max-w-md">
              <FadeIn>
                <p>
                  {`Discover our thoughtfully curated products in stores around the world. Each location offers a selection crafted with care for both you and the planet. Visit us and explore sustainable living firsthand.`}
                </p>
              </FadeIn>
            </div>
          </FadeInStagger>
        </div>
      </div>
      <FadeInStagger faster className="bg-aesop-0">
        <ul
          role="list"
          className="content-container flex flex-wrap justify-center gap-y-16 text-sage-8 py-16 gap-x-32 mt-32"
        >
          {stores.map((store, index) => (
            <FadeIn key={`store.name` + `${index}`}>
              <li className="flex flex-col items-start text-sm">
                <h3 className="mt-6 font-normal leading-8 tracking-tight text-sage-10">
                  {store.name}
                </h3>
                <p>{store.address}</p>
                <p>
                  {store.city}, {store.country}
                </p>
                <p>{store.openingHours}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </FadeInStagger>
    </div>
  )
}

export default Stores
