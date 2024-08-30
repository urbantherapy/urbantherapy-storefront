import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import { ProductCategoryWithChildren } from "types/global"

import PaginatedProducts from "./paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"
import Filters from "../components/filters"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  categories,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categories: ProductCategoryWithChildren[]
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <>
      <div className="mx-auto lg:w-screen border-sage-3 md:content-container pt-24 md:pt-32">
        <Filters />
      </div>
      <div
        className="flex flex-col sm:flex-row sm:items-start py-6 content-container text-primary"
        data-testid="category-container"
      >
        <div className="flex flex-col sm:px-0 w-1/3 gap-y-10">
          <RefinementList sortBy={sortBy || "created_at"} />
          {categories && (
            <>
              <h3 className="sr-only">Categories</h3>
              <Text className="text-xs text-sage-6"></Text>
              {/* <ul role="list" className="">
                {categories.map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/categories/${c.handle}`}
                      className="block"
                    >
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul> */}
            </>
          )}
        </div>

        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sortBy || "created_at"}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default StoreTemplate
