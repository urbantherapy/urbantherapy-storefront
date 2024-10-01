"use client"

import { useTransition, useOptimistic, useState } from "react"
import { useRouter } from "next/navigation"
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
import { ProductCategoryWithChildren } from "types/global"

export type SortOptions = "price_asc" | "price_desc" | "created_at"
type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  { label: "Latest Arrivals", href: "#", current: true, value: "created_at" },
  {
    label: "Price: Low to High",
    href: "#",
    value: "price_asc",
    current: false,
  },
  {
    label: "Price: High to Low",
    href: "#",
    value: "price_desc",
    current: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Filters({
  sortBy,
  categories,
  customAttributes,
  filters,
}: {
  sortBy: string
  categories: ProductCategoryWithChildren[]
  filters: { [key: string]: string[] }
  customAttributes: Array<{
    id: string
    name: string
    type: string
    handle: string
    values: Array<{ id: string; value: string }>
  }>
}) {
  const initialFilters = [
    {
      id: "category",
      name: "Category",
      options: categories.map((category) => ({
        value: category.id,
        label: category.name,
        checked: false,
      })),
    },

    ...customAttributes.map((attribute) => ({
      id: attribute.id,
      name: attribute.name,
      options: attribute.values.map((value) => ({
        value: value.id,
        label: value.value,
        checked: false,
      })),
    })),
  ]

  const router = useRouter()
  const [open, setOpen] = useState(false)
  let [pending, startTransition] = useTransition()
  let [optimisticFilters, setOptimisticFilters] = useOptimistic(filters)

  const updateURLParams = (newFilters: { [key: string]: string[] }) => {
    const newParams = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, values]) => {
      values.forEach((value) => newParams.append(key, value))
    })

    startTransition(() => {
      router.push(`?${newParams}`)
    })
  }

  return (
    <div className="bg-white">
      <div
        data-pending={pending ? "" : undefined}
        className="w-full rounded-md shadow-md"
      >
        {/* Iterate through the custom attributes */}
        {initialFilters.map((filter) => (
          <div className="p-4" key={filter.id}>
            <h2 className="text-gray-700 tracking-tight font-semibold text-lg">
              {filter.name}
            </h2>

            <div className="mt-4 -mx-4 px-4 sm:px-0 sm:mx-0 pb-3 sm:pb-0 flex overflow-x-scroll sm:overflow-auto sm:flex-wrap gap-y-2 gap-x-1">
              {filter.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    let newFilterValues = !optimisticFilters[
                      filter.name
                    ]?.includes(option.label)
                      ? [
                          ...(optimisticFilters[filter.name] || []),
                          option.label,
                        ]
                      : optimisticFilters[filter.name]?.filter(
                          (val) => val !== option.label
                        ) || []

                    newFilterValues = newFilterValues.sort()

                    startTransition(() => {
                      const updatedFilters = {
                        ...optimisticFilters,
                        [filter.name]: newFilterValues,
                      }

                      setOptimisticFilters(updatedFilters)

                      const newParams = new URLSearchParams(
                        Object.entries(updatedFilters).flatMap(
                          ([key, values]) => values.map((value) => [key, value])
                        )
                      )

                      router.push(`?${newParams}`)
                    })
                  }}
                  className={`${
                    optimisticFilters[filter.name]?.includes(option.label)
                      ? "bg-accent text-red-500 border-accent "
                      : "border-gray-500 hover:border-gray-400"
                  } px-3 py-1 rounded-full whitespace-nowrap font-medium border text-sm`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {optimisticFilters[filter.name]?.length > 0 && (
              <div className="border-t p-2 border-gray-600">
                <button
                  className="text-sm py-2 rounded hover:bg-gray-600 font-medium w-full text-center"
                  onClick={() => {
                    startTransition(() => {
                      setOptimisticFilters((prevFilters) => ({
                        ...prevFilters,
                        [filter.name]: [],
                      }))
                      updateURLParams({
                        ...optimisticFilters,
                        [filter.name]: [],
                      })
                    })
                  }}
                >
                  Clear {filter.name.toLowerCase()}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
