"use client"

import { useState } from "react"
import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

type CarouselProps = {
  images: MedusaImage[]
}

const Carousel = ({ images }: CarouselProps) => {
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex(index + 1)
  }

  const prev = () => {
    setIndex(index - 1)
  }

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full bg-aesop-0">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image, index) => (
                <Image
                  key={image.id}
                  src={image.url}
                  width={600}
                  height={600}
                  alt={`Product image ${index + 1}`}
                  className="aspect-[3/4] object-cover"
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

export default Carousel
