import { Metadata } from "next"
import Image from "next/image"
import store from "/public/images/ourStores.jpg"
import { Heading } from "@medusajs/ui"
import globe from "/public/icons/icon-globe-stores.svg"

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
    <>
      <div className="relative bg-sage-2">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt=""
            placeholder="blur"
            src={store}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-sage-10 opacity-25"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0"></div>
      </div>
      <div className="content-container text-sage-10 mt-20">
        <div className="flex flex-col items-center mr-10 w-full">
          {/* <Image src={globe} alt="Globe Icon" width={130} height={130} /> */}
          <div className="flex justify-center rotate-[19.6deg]">
            <Image src={globe} alt="Leaves Icon" width={90} height={90} />
          </div>
          <Heading
            level="h2"
            className="mt-4 text-3xl sm:text-5xl font-thin tracking-tight leading-snug text-sage-8"
          >
            Stores
          </Heading>
          <p className="mt-20 font-thin text-lg max-w-4xl text-center text-primary/75">
            {`Explore our thoughtfully designed stores located across Europe and
            beyond. Each Urban Therapy location is a sanctuary where modern
            elegance meets everyday functionality, offering a curated selection
            of lifestyle products that reflect our commitment to quality and
            innovation. From our flagship in Brussels to our latest venture in
            Dubai, every store embodies our vision of enhancing urban living
            through style and simplicity.`}
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto max-w-2xl lg:max-w-none my-20 flex flex-wrap items-center justify-center gap-y-16 text-center text-sage-7"
        >
          {stores.map((store, index) => (
            <li
              key={`store.name` + `${index}`}
              className="w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center"
            >
              <h3 className="mt-6 text-lg font-normal leading-8 tracking-tight text-sage-11">
                {store.name}
              </h3>
              <p className="text-base leading-7">{store.address}</p>
              <p className="text-base leading-7">
                {store.city}, {store.country}
              </p>
              <p className="text-base leading-7">{store.openingHours}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Stores
