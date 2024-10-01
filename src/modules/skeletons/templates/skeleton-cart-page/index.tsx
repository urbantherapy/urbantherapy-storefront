import { Table } from "@medusajs/ui"

import repeat from "@lib/util/repeat"
import SkeletonCartItem from "@modules/skeletons/components/skeleton-cart-item"
import SkeletonCodeForm from "@modules/skeletons/components/skeleton-code-form"
import SkeletonOrderSummary from "@modules/skeletons/components/skeleton-order-summary"

const SkeletonCartPage = () => {
  return (
    <div className="pt-48 py-12">
      <div className="content-container">
        <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
          <div className="flex flex-col bg-aesop-1 gap-y-6">
            {/* <div className="bg-aesop-1 flex items-start justify-between">
              <div className="flex flex-col gap-y-2">
                <div className="w-60 h-8 bg-sage-2 animate-pulse" />
                <div className="w-48 h-6 bg-sage-2 animate-pulse" />
              </div>
              <div>
                <div className="w-14 h-8 bg-sage-2 animate-pulse" />
              </div>
            </div> */}
            <div>
              {/* <div className="pb-3 flex items-center">
                <div className="w-20 h-12 bg-sage-2 animate-pulse" />
              </div> */}
              <div className="flex flex-col gap-y-2 mb-4">
                <div className="w-32 h-8 bg-sage-2 animate-pulse" />
              </div>
              <Table>
                {/* <Table.Header className="border-t-0 border-aesop-1">
                  <Table.Row>
                    <Table.HeaderCell className="!pl-0 bg-aesop-1">
                      <div className="w-10 h-6 bg-sage-2 animate-pulse" />
                    </Table.HeaderCell>
                    <Table.HeaderCell className="bg-aesop-1"></Table.HeaderCell>
                    <Table.HeaderCell className="bg-aesop-1">
                      <div className="w-16 h-6 bg-sage-2 animate-pulse" />
                    </Table.HeaderCell>
                    <Table.HeaderCell className="bg-aesop-1">
                      <div className="w-12 h-6 bg-sage-2 animate-pulse" />
                    </Table.HeaderCell>
                    <Table.HeaderCell className="!pr-0 bg-aesop-1">
                      <div className="flex justify-end">
                        <div className="w-12 h-6 bg-sage-2 animate-pulse" />
                      </div>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header> */}
                <Table.Body>
                  {repeat(4).map((index) => (
                    <SkeletonCartItem key={index} />
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <SkeletonOrderSummary />
            <SkeletonCodeForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartPage
