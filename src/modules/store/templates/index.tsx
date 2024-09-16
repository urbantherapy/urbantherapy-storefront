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
  customAttributes,
  filters,
}: {
  sortBy?: SortOptions
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
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <>
      <div className="mx-auto lg:w-screen border-sage-3 pt-24 md:pt-32">
        <Filters
          sortBy={sortBy || "created_at"}
          categories={categories}
          customAttributes={customAttributes}
          filters={filters}
        />
      </div>
      <div
        className="flex flex-col sm:flex-row sm:items-start py-6 content-container text-primary"
        data-testid="category-container"
      >
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sortBy || "created_at"}
              page={pageNumber}
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

export default StoreTemplate
