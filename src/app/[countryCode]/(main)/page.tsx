import { Product } from "@medusajs/medusa"
import { Metadata } from "next"
import { headers, cookies } from "next/headers"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import OurMission from "@modules/home/components/our-mission"
import OurValues from "@modules/home/components/our-values"

import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import Slider from "@modules/home/components/slider"
import Quote from "@modules/home/components/quote"
import InstagramWidget from "@modules/home/components/instagram-widget"
import Photos from "@modules/home/components/photos"
import Newsletter from "@modules/home/components/newsletter"

export const metadata: Metadata = {
  title: "Urban Therapy | Empowering the Makers",
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

export default async function Home({
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
      <Hero />
      <OurMission />
      <OurValues />
      <Slider />
      <Quote />
      {/* <Newsletter /> */}
      {/* <Photos /> */}

      <InstagramWidget />
      {/* <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div> */}
    </>
  )
}
