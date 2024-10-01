import { getProductsListWithSort, getRegion } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { MotionLi } from "../../framer-motion/MotionUl"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

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
  collectionTitle,
  collectionDescription,
  categoryId,
  productsIds,
  countryCode,
  filters,
  customAttributes = [],
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  collectionTitle?: string
  collectionDescription?: string
  productsIds?: string[]
  countryCode: string
  filters?: { [key: string]: string[] }
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

  // Optimized Filter Products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (!product.custom_attributes) {
      return false
    }

    const attributeMap = new Map()

    product.custom_attributes.forEach((attr) => {
      attr.values.forEach((val) => {
        attributeMap.set(attr.name.toLowerCase(), val.value)
      })
    })

    return Object.entries(filters ?? {}).every(([key, values]) => {
      const filterKey = key.toLowerCase()
      const filterValues = Array.isArray(values) ? values : [values]
      const attributeValue = attributeMap.get(filterKey)
      return filterValues.every((filterValue) => attributeValue === filterValue)
    })
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <>
      <FadeInStagger
        faster
        key={`${JSON.stringify(filters)}-${JSON.stringify(sortBy)}`}
        className="grid grid-cols-2 gap-x-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-testid="products-list"
      >
        <li className="hidden md:flex flex-col justify-center pl-8">
          <h2
            className={`lg:mt-4 text-xl font-thin tracking-tight text-sage-9 mb-6`}
          >
            {collectionTitle || "Essentials for a Mindful Life"}
          </h2>
          <p className="lg:mt-0 text-sm max-w-xs leading-5 text-center md:text-left pr-10 text-sage-6">
            {collectionDescription ||
              `Thoughtfully crafted for daily rituals, each product is designed to nurture both you and the planet—enhancing everyday moments with sustainable simplicity.`}
          </p>
        </li>

        {filteredProducts.map((p, i) => {
          return (
            <FadeIn
              // variants={variants}
              // initial="hidden"
              // animate="visible"
              // transition={{
              //   delay: i * 0.05,
              //   ease: "easeInOut",
              //   duration: 0.5,
              // }}
              key={p.id}
              className="bg-aesop-0"
            >
              <ProductPreview productPreview={p} region={region} />
            </FadeIn>
          )
        })}
      </FadeInStagger>
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
