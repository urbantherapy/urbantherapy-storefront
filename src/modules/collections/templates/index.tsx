import { ProductCollection } from "@medusajs/medusa"
import { Suspense } from "react"
import { ProductCategoryWithChildren } from "types/global"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

import dynamic from "next/dynamic"
import Filters from "@modules/store/components/filters"
// import MobileFilterButton from "../components"
const MobileFilterButton = dynamic(() => import("../components"), {
  ssr: false,
})
import kidsCollection from "/public/images/collectionKids.jpeg"
import Image from "next/image"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  categories,

  customAttributes,
  filters,
}: {
  sortBy?: SortOptions
  collection: ProductCollection
  page?: string
  countryCode: string
  categories: ProductCategoryWithChildren[]

  customAttributes: Array<{
    id: string
    name: string
    type: string
    handle: string
    values: Array<{ id: string; value: string }>
  }>
  filters: { [key: string]: string[] }
}) {
  const pageNumber = page ? parseInt(page) : 1

  console.log(collection, "collection", typeof collection.metadata.description)

  return (
    <>
      {/* <div className="mx-auto lg:w-screen -mb-20">
        <div className="py-24 content-container">
          <div className="relative flex h-[60vh]">
            <Image
              src={kidsCollection}
              className="w-full h-full object-cover"
              alt={"No heading"}
              placeholder="blur"
            />
          </div>
        </div>
      </div> */}

      <div className="mx-auto lg:w-screen border-sage-3 pt-24 md:pt-32">
        <Filters
          sortBy={sortBy || "created_at"}
          categories={categories}
          customAttributes={customAttributes}
          filters={filters}
        />
      </div>

      <div
        className="flex flex-col sm:flex-row sm:items-start py-6 pt-1 content-container text-primary"
        data-testid="category-container"
      >
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sortBy || "created_at"}
              page={pageNumber}
              collectionId={collection.id}
              collectionTitle={collection.title}
              collectionDescription={collection.metadata.description}
              countryCode={countryCode}
              filters={filters}
              customAttributes={customAttributes}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}
