"use client"
import Carousel from "embla-carousel-react-component"
import Image from "next/image"
import { StaticImageData } from "next/image"

import kidsCollection from "/public/images/collectionKids.jpeg"
import doodle from "/public/icons/icon-doodle-kids.svg"

const MyIndicators = () => (
  <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-1">
    <Carousel.Indicators
      className="h-1 w-10 rounded-[1px]"
      selectedClassName="bg-primary"
      nonSelectedClassName="bg-primary/25"
    />
  </div>
)
const slides = [
  {
    id: 1,
    heading: "For the Little Ones",
    text: "Nurturing creativity and joy with our children's collection.",
    ctaText: "Explore Kids",
    imageUrl: kidsCollection,
    bgColor: "bg-sage-1", // Example background color
  },
  {
    id: 2,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-sage-4", // Example background color
  },
  {
    id: 3,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-sage-1", // Example background color
  },
  {
    id: 4,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-sage-4", // Example background color
  },
  {
    id: 5,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-sage-1", // Example background color
  },
]

type SlideProps = {
  heading: string
  text: string
  ctaText: string
  imageUrl: StaticImageData
  bgColor: string
}

const Slide: React.FC<SlideProps> = ({
  heading,
  text,
  ctaText,
  imageUrl,
  bgColor,
}) => (
  <div className="flex flex-col md:flex-row md:h-[60vh] text-primary md:px-0 mx-auto bg-sage-2 h-full">
    <div
      className={`flex-1 ${bgColor} flex flex-col items-center justify-center p-4 px-0 order-2 md:order-1 py-16`}
    >
      <Image src={doodle} alt="Doodle" className="mb-4 w-20 md:w-40" />
      <h2 className="text-3xl md:text-5xl font-thin tracking-tight">
        {heading}
      </h2>
      <p className="mt-10 font-normal text-base md:text-lg text-center max-w-md text-primary/75">
        {text}
      </p>
      <button className="mt-10 bg-sage-2 font-medium px-4 py-2 rounded-md">
        {ctaText} →
      </button>
    </div>
    <div className="flex-1 relative order-1 md:order-2">
      <Image
        src={imageUrl}
        className="w-full h-full object-cover saturate-[.80] max-h-[45vh] md:max-h-[60vh]"
        alt={heading}
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-sage-11/5"></div>
    </div>
  </div>
)

const Slider = () => {
  return (
    <div className="mx-auto h-full w-full">
      <Carousel Indicators={MyIndicators} className="relative">
        {slides.map((slide) => (
          <Carousel.Slide key={slide.id}>
            <Slide {...slide} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
