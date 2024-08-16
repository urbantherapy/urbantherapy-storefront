import { ProductCollection } from "@medusajs/medusa"
import { Suspense } from "react"

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

import dynamic from "next/dynamic"
// import MobileFilterButton from "../components"
const MobileFilterButton = dynamic(() => import("../components"), {
  ssr: false,
})

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: ProductCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
  ]
  const filters = [
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "All New Arrivals", checked: false },
        { value: "tees", label: "Tees", checked: false },
        { value: "objects", label: "Objects", checked: true },
      ],
    },
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: false },
      ],
    },
    {
      id: "sizes",
      name: "Sizes",
      options: [
        { value: "s", label: "S", checked: false },
        { value: "m", label: "M", checked: false },
        { value: "l", label: "L", checked: false },
      ],
    },
  ]
  const activeFilters = [{ value: "objects", label: "Objects" }]

  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      href: "#",
      price: "$48",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      href: "#",
      price: "$35",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      href: "#",
      price: "$89",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      href: "#",
      price: "$35",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
    // More products...
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <>
      {/* <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:content-container lg:px-8"> */}
      <div className="mx-auto text-center lg:w-screen">
        <div className="py-24 bg-secondary/25">
          <h1 className="text-5xl font-thin tracking-tight text-primary">
            {collection.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl font-thin text-xl text-primary/75">
            Thoughtfully designed objects for the workspace, home, and travel.
          </p>
        </div>

        {/* <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 py-6 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:content-container lg:px-8"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <RefinementList sortBy={sortBy || "created_at"} />
                  {sortOptions.map((option) => (
                    <MenuItem key={option}>
                      <a
                        href={option.href}
                        className="block px-4 py-2 text-sm font-medium text-gray-900 data-[focus]:bg-gray-100"
                      >
                        {option.name}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <MobileFilterButton />

            <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>{section.name}</span>
                      {sectionIdx === 0 ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1
                        </span>
                      ) : null}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </PopoverButton>
                  </div>

                  <PopoverPanel
                    transition
                    className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <form className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </form>
                  </PopoverPanel>
                </Popover>
              ))}
            </PopoverGroup>
          </div>
        </section> */}
      </div>

      <section
        aria-labelledby="products-heading"
        className="mx-auto max-w-2xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-4 lg:content-container lg:px-8"
      >
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sortBy || "created_at"}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </section>

      {/* <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
        <RefinementList sortBy={sortBy || "created_at"} />
        <div className="w-full">
          <div className="mb-8 text-2xl-semi">
            <h1>{collection.title}</h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sortBy || "created_at"}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div> */}
    </>
  )
}
