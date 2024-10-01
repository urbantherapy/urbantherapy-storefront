import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm text-sage-8 font-normal self-start"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h2
          className="text-xl leading-10 text-sage-10 font-normal tracking-tight"
          data-testid="product-title"
        >
          {product.title}
        </h2>

        <Text
          className="font-extralight text-md text-primary max-w-md"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
