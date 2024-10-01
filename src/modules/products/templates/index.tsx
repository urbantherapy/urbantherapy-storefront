import { Customer, Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { MotionDiv } from "../../framer-motion/MotionDiv"
import Carousel from "@modules/products/components/carousel"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
  customer: Omit<Customer, "password_hash"> | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

const incentives = [
  {
    name: "Free shipping",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: "10-year warranty",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: "Exchanges",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
]

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  customer,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const itemVariants = (i: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: i * 0.05,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  })

  return (
    <>
      <MotionDiv
        className="content-container flex flex-col small:flex-row items-center small:items-start py-6 relative my-20 md:gap-x-32"
        data-testid="product-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <MotionDiv
          className="block w-full relative max-w-xl md:ml-20"
          variants={itemVariants(0)}
        >
          {/* <ImageGallery images={product?.images || []} /> */}
          <Carousel images={product?.images || []} />
        </MotionDiv>
        <MotionDiv
          className="flex flex-col mt-8 lg:mt-0 small:sticky md:top-48 small:py-0 w-full max-w-md py-8 gap-y-6"
          variants={itemVariants(1)}
        >
          <MotionDiv variants={itemVariants(2)}>
            <ProductInfo product={product} />
          </MotionDiv>
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <MotionDiv variants={itemVariants(3)}>
              <ProductActionsWrapper id={product.id} region={region} />
            </MotionDiv>
          </Suspense>
          <MotionDiv variants={itemVariants(4)}>
            <ProductTabs product={product} />
          </MotionDiv>
        </MotionDiv>

        {/* {customer && (
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
         )} */}
      </MotionDiv>
      <div className="bg-aesop-0">
        <FadeInStagger className="content-container grid grid-cols-1 gap-x-20 gap-y-10 lg:grid-cols-3 py-28 pt-24">
          {incentives.map((incentive) => (
            <FadeIn key={incentive.name} className="sm:flex lg:block">
              {/* <div className="sm:flex-shrink-0">
                <img alt="" src={incentive.imageSrc} className="h-7 w-7" />
              </div> */}
              <div className="mt-2 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-2">
                <h3 className="text-sm text-sage-10">{incentive.name}</h3>
                <p className="mt-2 text-sm text-sage-8">
                  {incentive.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>

      {/* <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div> */}
    </>
  )
}

export default ProductTemplate
