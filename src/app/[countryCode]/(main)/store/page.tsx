import { Metadata } from "next"

import { getCategoriesList, getCustomer, getCustomAttributes } from "@lib/data"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Urban Therapy | All products",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page, ...filters } = searchParams
  const { product_categories } = await getCategoriesList(0, 6)
  const customAttributes = await getCustomAttributes()

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      categories={product_categories}
      customAttributes={customAttributes}
      filters={filters}
    />
  )
}
