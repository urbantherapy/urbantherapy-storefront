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
    bgColor: "bg-secondary/25", // Example background color
  },
  {
    id: 2,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-blue-500", // Example background color
  },
  {
    id: 3,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-blue-500", // Example background color
  },
  {
    id: 4,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-blue-500", // Example background color
  },
  {
    id: 5,
    heading: "Slide 1 Heading",
    text: "This is a small text for Slide 1",
    ctaText: "Learn More",
    imageUrl: kidsCollection,
    bgColor: "bg-blue-500", // Example background color
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
  <div className="flex w-full text-primary">
    <div
      className={`flex-1 ${bgColor} flex flex-col items-center justify-center p-4`}
    >
      <Image src={doodle} alt="Doodle" className="mb-4 w-1/2" />
      <h2 className="text-5xl font-extralight tracking-tight">{heading}</h2>
      <p className="mt-10 font-thin text-2xl text-center max-w-md text-primary/75">
        {text}
      </p>
      <button className="mt-10 bg-primary/10 font-medium px-4 py-2 rounded-md">
        {ctaText} →
      </button>
    </div>
    <div className="flex-1 relative">
      <Image
        src={imageUrl}
        className="w-full h-full object-cover saturate-[.70]"
        alt={heading}
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-primary/20"></div>
    </div>
  </div>
)

const Slider = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Carousel Indicators={MyIndicators} className="relative mt-4">
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
