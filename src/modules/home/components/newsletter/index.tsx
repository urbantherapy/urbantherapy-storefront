import { Heading } from "@medusajs/ui"
import Image from "next/image"
import leaves from "/public/icons/icon-leaves-mission.svg"
import Link from "next/link"
import clsx from "clsx"

import backgroundImage from "/public/images/background-newsletter.jpg"

type ButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })

function Button({ className, ...props }: ButtonProps) {
  className = clsx(
    "inline-flex justify-center rounded-2xl bg-blue-600 p-4 text-base font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70",
    className
  )

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}

function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}

function ArrowRightIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="m14 7 5 5-5 5M19 12H5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Newsletter = () => {
  return (
    <div className="bg-sage-2 py-16 sm:py-44">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center rotate-[19.6deg]">
          <Image
            src={leaves}
            alt="Leaves Icon"
            width={90} // Adjust based on your icon's size
            height={90} // Adjust based on your icon's size
          />
        </div>
        <Heading
          level="h2"
          className="mt-4 text-5xl font-thin tracking-tight text-center text-sage-8"
        >
          Join the Community
        </Heading>
        <p className="mx-auto mt-8 max-w-xl text-center text-sage-6 text-lg font-thin leading-snug">
          Subscribe to our newsletter and be the first to hear about new
          collections, upcoming workshops, and exclusive offers. Discover the
          stories behind our products and stay connected with the makers who
          inspire us.
        </p>
        {/* <form className="mx-auto mt-10 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            autoComplete="email"
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Notify me
          </button>
        </form> */}
      </div>
    </div>
  )
}

export default Newsletter
