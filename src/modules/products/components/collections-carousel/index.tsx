"use client"

import { useState } from "react"
import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

type SimpleImage = {
  url: string
  alt: string
  id: string
}

import kidsCollection from "/public/images/collectionKids.jpeg"
import skincareCollection from "/public/images/heroGirl.jpeg"
import skincareCollectionBis from "/public/images/heroStore.jpg"
import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const images = [
  {
    url: kidsCollection,
    alt: "Essentials for a Mindful Life",
    id: "kids",
    title: "Essentials for a Mindful Life",
    description:
      "Thoughtfully crafted for daily rituals, each product is designed to nurture both you and the planet—enhancing everyday moments with sustainable simplicity.",
    cta: "Explore",
  },
  {
    url: skincareCollection,
    alt: "Essentials for a Mindful Life",
    id: "skincare",
    title: "Title 2",
    description:
      "Thoughtfully crafted for daily rituals, each product is designed to nurture both you and the planet—enhancing everyday moments with sustainable simplicity.",
    cta: "Shop Now",
  },
  {
    url: skincareCollectionBis,
    alt: "Home & Living Collection",
    id: "home-living",
    title: "Title 3",
    description: "Description for image 3",
    cta: "Discover",
  },
]

type CollectionsCarouselProps = {
  images: SimpleImage[]
}

const CollectionsCarousel = () => {
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex(index + 1)
  }

  const prev = () => {
    setIndex(index - 1)
  }

  const itemVariants = (i: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  })

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full flex space-x-20">
        <FadeInStagger
          key={index}
          className="w-full p-4 px-8 flex flex-col justify-center max-w-sm"
        >
          <FadeIn>
            <h2 className="lg:mt-4 text-xl font-normal tracking-tight text-sage-9 mb-6">
              {images[index].title}
            </h2>
          </FadeIn>

          <FadeIn>
            <p className="lg:mt-0 text-md max-w-md leading-6 text-center md:text-left pr-4 text-sage-6">
              {images[index].description}
            </p>
          </FadeIn>
          <FadeIn>
            <button className="w-60 mt-8 text-sm font-normal border text-sage-8 hover:border-sage-4 hover:text-sage-8 p-4 flex items-center justify-between">
              <span>{images[index].cta}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="w-3.5 text-sage-6 hover:text-sage-8"
              >
                <g>
                  <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z"></path>
                </g>
              </svg>
            </button>
          </FadeIn>
        </FadeInStagger>

        <div className="mx-auto flex h-full w-[95%] flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image, index) => (
                <Image
                  key={image.id}
                  src={image.url}
                  width={1000}
                  height={1000}
                  alt={`Product image ${index + 1}`}
                  placeholder="blur"
                  className="aspect-[3/2] object-cover"
                />
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  onClick={prev}
                  className="absolute top-1/2 left-2 -mt-4 flex h-8 w-8 items-center justify-center"
                >
                  <ChevronLeftIcon className="h-6 w-6 text-sage-10" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  onClick={next}
                  className="absolute top-1/2 right-2 -mt-4 flex h-8 w-8 items-center justify-center"
                >
                  <ChevronRightIcon className="h-6 w-6 text-sage-10" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

export default CollectionsCarousel
