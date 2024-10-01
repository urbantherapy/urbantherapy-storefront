import { LineItem, Region } from "@medusajs/medusa"

import ItemCart from "../components/item/index-cart"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import { FadeIn } from "@modules/framer-motion/FadeIn"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div>
      <FadeIn className="pb-3 flex items-center">
        <h2 className="text-md font-normal text-sage-10">Shopping Cart</h2>
      </FadeIn>
      <div>
        <h2 className="sr-only">Items in your shopping cart</h2>
      </div>
      <ul role="list" className="divide-y divide-aesop-1">
        {items && region
          ? items
              .sort((a, b) => {
                return a.created_at > b.created_at ? -1 : 1
              })
              .map((item) => {
                return (
                  <FadeIn key={item.id} className="bg-aesop-0">
                    <ItemCart item={item} region={region} />
                  </FadeIn>
                )
              })
          : Array.from(Array(5).keys()).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </ul>
    </div>
  )
}

export default ItemsTemplate
