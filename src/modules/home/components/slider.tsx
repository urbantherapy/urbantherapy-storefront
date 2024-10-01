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
    bgColor: "bg-aesop-dark", // Example background color
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
  <div className="flex flex-col md:flex-row md:h-[60vh] text-primary md:px-0 mx-auto h-full md:space-x-0">
    <div
      className={`${bgColor} flex-1 flex flex-col items-center justify-center p-4 px-0 order-2 md:order-1 py-16 w-96`}
    >
      <Image src={doodle} alt="Doodle" className="mb-4 w-20 md:w-24" />
      <h2 className="text-3xl font-thin tracking-tight">{heading}</h2>
      <p className="mt-10 font-thin text-md text-center max-w-xs text-primary/75">
        {text}
      </p>
      <div className="w-60">
        <button className="mt-10 text-sm font-normal border text-sage-8 hover:border-sage-4 hover:text-sage-8 p-4 flex items-center justify-between w-full">
          <span>{ctaText}</span>
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
      </div>
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
    <div className="h-full w-full content-container px-0 py-4">
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
