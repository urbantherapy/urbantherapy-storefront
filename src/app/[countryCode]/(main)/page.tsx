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
import CollectionsCarousel from "@modules/products/components/collections-carousel"
import Instagram from "@modules/home/components/instagram"

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
  return (
    <div className="flex flex-col divide-y-0 divide-sage-3">
      <Hero />
      {/* <OurMission /> */}
      <OurValues />
      {/* <Slider /> */}
      <div className="max-w-7xl mx-auto">
        <CollectionsCarousel />
      </div>
      <Quote />
      {/* <Photos /> */}

      <InstagramWidget />
      {/* <div className="bg-aesop-dark">
        <div className="content-container grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 py-24">
          {incentives.map((incentive) => (
            <div key={incentive.name} className="sm:flex lg:block">
          
              <div className="mt-2 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-2 max-w-sm">
                <h3 className="text-sm text-sage-6 font-normal">
                  {incentive.name}
                </h3>
                <p className="mt-4 text-sm text-sage-8">
                  {incentive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div> */}
    </div>
  )
}
