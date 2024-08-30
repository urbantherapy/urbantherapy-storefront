"use client"

import { LineItem, Region } from "@medusajs/medusa"
import { Table, clx } from "@medusajs/ui"

import ItemCheckout from "../components/item/index-checkout"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsPreviewTemplateCheckout = ({
  items,
  region,
}: ItemsTemplateProps) => {
  const hasOverflow = items && items.length > 4

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {items && region
        ? items
            .sort((a, b) => {
              return a.created_at > b.created_at ? -1 : 1
            })
            .map((item) => {
              return (
                <ItemCheckout
                  key={item.id}
                  item={item}
                  region={region}
                  type="preview"
                />
              )
            })
        : Array.from(Array(5).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </ul>
  )
}

export default ItemsPreviewTemplateCheckout
