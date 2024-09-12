import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { formatAmount } from "@lib/util/prices"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"

// Define the CustomAttribute type
interface CustomAttribute {
  id: string
  name: string
  type: string
  handle: string
  values: Array<{ id: string; value: string }>
}

// Extend the PricedProduct type to include custom_attributes
interface ExtendedPricedProduct extends PricedProduct {
  custom_attributes?: CustomAttribute[]
}

const transformProductPreview = (
  product: ExtendedPricedProduct,
  region: Region
): ProductPreviewType => {
  const variants = product.variants as unknown as CalculatedVariant[]

  let cheapestVariant = undefined

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    }, variants[0])
  }

  return {
    id: product.id!,
    title: product.title!,
    handle: product.handle!,
    thumbnail: product.thumbnail!,
    created_at: product.created_at,
    price: cheapestVariant
      ? {
          calculated_price: formatAmount({
            amount: cheapestVariant.calculated_price,
            region: region,
            includeTaxes: false,
          }),
          original_price: formatAmount({
            amount: cheapestVariant.original_price,
            region: region,
            includeTaxes: false,
          }),
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
    custom_attributes: product.custom_attributes,
  }
}

export default transformProductPreview
