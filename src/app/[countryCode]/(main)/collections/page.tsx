import { Fulfillment, Product } from "@medusajs/medusa"
import { Metadata } from "next"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"

import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"

import kidsCollection from "/public/images/collectionKids.jpeg"
import skincareCollection from "/public/images/collectionSkincare.png"
import skincareCollectionBis from "/public/images/collectionSkincarebis.png"
import CollectionsCarousel from "@modules/products/components/collections-carousel"

export const metadata: Metadata = {
  title: "Urban Therapy | Our Collections",
  description:
    "Discover unique, handcrafted gifts made with love for the planet. Explore eco-friendly homeware, fashion, and more from passionate artisans. Shop consciously, feel good.",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

const categories = [
  {
    name: "Kids",
    href: "#",
    imageSrc: kidsCollection,
    imageAlt:
      "Brown leather key ring with brass metal loops and rivets on wood table.",
    description:
      "Keep your phone, keys, and wallet together, so you can lose everything at once.",
  },
  {
    name: "Skincare",
    href: "#",
    imageSrc: skincareCollection,
    imageAlt:
      "Natural leather mouse pad on white desk next to porcelain mug and keyboard.",
    description:
      "The rest of the house will still be a mess, but your desk will look great.",
  },
  {
    name: "Home & Living",
    href: "#",
    imageSrc: skincareCollectionBis,
    imageAlt:
      "Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.",
    description:
      "Be more productive than enterprise project managers with a single piece of paper.",
  },
]

const images = [
  {
    url: kidsCollection.src,
    alt: "Kids Collection",
    id: "kids",
  },
  {
    url: skincareCollection.src,
    alt: "Skincare Collection",
    id: "skincare",
  },
  {
    url: skincareCollectionBis.src,
    alt: "Home & Living Collection",
    id: "home-living",
  },
]

export default async function CollectionsPage({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <div className="max-w-5xl mx-auto my-40">
        <CollectionsCarousel />
      </div>
      {/* <div className="py-32 pt-40 bg-aesop-3">
        <div className="content-container space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {categories.map((category) => (
            <LocalizedClientLink
              key={category.name}
              href={category.href}
              className="group block"
            >
              <div
                aria-hidden="true"
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-none shadow-md shadow-sage-6 lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-95"
              >
                <Image
                  alt={category.imageAlt}
                  src={category.imageSrc}
                  placeholder="blur"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-all duration-300 ease-in-out saturate-[.80]"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-sage-12 opacity-50"
                />
                <div className="flex items-end p-6 pb-4">
                  <div>
                    <h3 className="text-sage-3 text-3xl font-thin tracking-tight">
                      <span>
                        <span className="absolute inset-0" />
                        {category.name}
                      </span>
                    </h3>
                    <p aria-hidden="true" className="text-lg text-sage-4">
                      Explore
                    </p>
                  </div>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div> */}
    </>
  )
}
