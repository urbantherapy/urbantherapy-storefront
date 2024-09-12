import { getProductsListWithSort, getRegion } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import axios from "axios"
import sortProducts from "@lib/util/sort-products"
import { filter } from "lodash"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  filters = {},
  customAttributes = [],
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  filters?: { [key: string]: string | undefined }
  customAttributes?: Array<{
    id: string
    name: string
    type: string
    handle: string
    values: Array<{ id: string; value: string }>
  }>
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  console.log(filters, "my active filters")

  // Optimized Filter Products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Check if custom_attributes is defined
    if (!product.custom_attributes) {
      return false // Skip this product if no custom_attributes are present
    }

    const attributeMap = new Map()

    // Create a map for quick lookup of custom attributes
    product?.custom_attributes?.forEach((attr) => {
      attr.values.forEach((val) => {
        attributeMap.set(attr.name.toLowerCase(), val.value.toLowerCase())
      })
    })

    // Check if all filters match
    return Object.entries(filters).every(([key, value]) => {
      const filterValue = value?.toLowerCase()
      return attributeMap.get(key.toLowerCase()) === filterValue
    })
  })

  console.log(filteredProducts, "filtered products")

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-testid="products-list"
      >
        {filteredProducts.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview productPreview={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
