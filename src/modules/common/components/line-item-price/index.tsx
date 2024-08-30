import { formatAmount } from "@lib/util/prices"
import { LineItem, Region } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"

import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { CalculatedVariant } from "types/medusa"

type LineItemPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemPrice = ({
  item,
  region,
  style = "default",
}: LineItemPriceProps) => {
  const originalPrice =
    (item.variant as CalculatedVariant).original_price * item.quantity
  const hasReducedPrice = (item.total || 0) < originalPrice

  return (
    <div className="flex flex-col gap-x-2 text-primary items-end">
      <div className="text-left flex gap-x-1">
        {hasReducedPrice && (
          <>
            <p className="inline-block">
              {style === "default" && <span className="">Original: </span>}
              <span
                className="line-through text-sage-4"
                data-testid="product-original-price"
              >
                {formatAmount({
                  amount: originalPrice,
                  region: region,
                  includeTaxes: false,
                })}
              </span>
            </p>
            {style === "default" && (
              <span className="">
                -{getPercentageDiff(originalPrice, item.total || 0)}%
              </span>
            )}
          </>
        )}
        <span
          className={clx("", {
            "text-sage-8": hasReducedPrice,
          })}
          data-testid="product-price"
        >
          {formatAmount({
            amount: item.total || 0,
            region: region,
            includeTaxes: false,
          })}
        </span>
      </div>
    </div>
  )
}

export default LineItemPrice
