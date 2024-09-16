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
      {/* Mobile filter dialog */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 sm:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-sage-10">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-sage-6"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {initialFilters.map((section) => (
                <Disclosure
                  key={section.name}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-sage-6">
                      <span className="font-medium text-sage-10">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <div className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={optimisticFilters[
                                section.name
                              ]?.includes(option.label)}
                              onChange={(e) => {
                                let newFilterValues = !optimisticFilters[
                                  section.name
                                ]?.includes(option.label)
                                  ? [
                                      ...(optimisticFilters[section.name] ||
                                        []),
                                      option.label,
                                    ]
                                  : optimisticFilters[section.name]?.filter(
                                      (val) => val !== option.label
                                    ) || []

                                newFilterValues = newFilterValues.sort()

                                startTransition(() => {
                                  const updatedFilters = {
                                    ...optimisticFilters,
                                    [section.name]: newFilterValues,
                                  }

                                  setOptimisticFilters(updatedFilters)

                                  const newParams = new URLSearchParams(
                                    Object.entries(updatedFilters).flatMap(
                                      ([key, values]) =>
                                        values.map((value) => [key, value])
                                    )
                                  )

                                  router.push(`?${newParams}`)
                                })
                              }}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>

                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-sage-7"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b-none border-sage-3 py-4 h-16 flex">
          <div className="content-container flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-sage-8 hover:text-sage-10">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-sage-6 group-hover:text-sage-7"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in overflow-hidden"
              >
                <div className="">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.label}>
                      <button
                        onClick={() => {
                          startTransition(() => {
                            const newParams = new URLSearchParams(
                              window.location.search
                            )
                            newParams.set("sortBy", option.value)
                            router.push(`?${newParams.toString()}`)
                          })
                        }}
                        value={option.value}
                        className={classNames(
                          option.value === sortBy
                            ? "font-medium text-sage-7"
                            : "text-sage-7",
                          "block px-4 py-2 text-sm data-[focus]:bg-gray-100 w-full text-left"
                        )}
                      >
                        {option.label}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-block text-sm font-medium text-sage-8 hover:text-sage-10 sm:hidden"
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <PopoverGroup className="-mx-4 flex items-center divide-x divide-gray-200">
                  {initialFilters.map((filter) => {
                    const checkedOptionsCount =
                      optimisticFilters[filter.name]?.length || 0

                    return (
                      <Popover
                        key={filter.id}
                        className="relative inline-block px-4 text-left"
                      >
                        {({ open }) => (
                          <>
                            <PopoverButton className="group inline-flex justify-center text-sm font-medium text-sage-8 hover:text-sage-10 focus:ring-0 focus:outline-none">
                              <span>{filter.name}</span>
                              {checkedOptionsCount > 0 && (
                                <span className="ml-1.5 rounded bg-sage-2 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-sage-8">
                                  {checkedOptionsCount}
                                </span>
                              )}
                              <ChevronDownIcon
                                aria-hidden="true"
                                className={`-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-sage-6 group-hover:text-sage-7 transition-transform ${
                                  open ? "rotate-180" : ""
                                }`}
                              />
                            </PopoverButton>

                            <PopoverPanel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                              <form className="space-y-4">
                                {filter.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-3"
                                  >
                                    <div className="flex items-center">
                                      <input
                                        defaultValue={option.value}
                                        defaultChecked={optimisticFilters[
                                          filter.name
                                        ]?.includes(option.label)}
                                        onChange={(e) => {
                                          let newFilterValues =
                                            !optimisticFilters[
                                              filter.name
                                            ]?.includes(option.label)
                                              ? [
                                                  ...(optimisticFilters[
                                                    filter.name
                                                  ] || []),
                                                  option.label,
                                                ]
                                              : optimisticFilters[
                                                  filter.name
                                                ]?.filter(
                                                  (val) => val !== option.label
                                                ) || []

                                          newFilterValues =
                                            newFilterValues.sort()

                                          startTransition(() => {
                                            const updatedFilters = {
                                              ...optimisticFilters,
                                              [filter.name]: newFilterValues,
                                            }

                                            setOptimisticFilters(updatedFilters)

                                            const newParams =
                                              new URLSearchParams(
                                                Object.entries(
                                                  updatedFilters
                                                ).flatMap(([key, values]) =>
                                                  values.map((value) => [
                                                    key,
                                                    value,
                                                  ])
                                                )
                                              )

                                            router.push(`?${newParams}`)
                                          })
                                        }}
                                        id={`filter-${filter.id}-${optionIdx}`}
                                        name={`${filter.id}[]`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-sage-3 text-sage-7 focus:ring-sage-6 border"
                                      />
                                    </div>
                                    <label
                                      htmlFor={`filter-${filter.id}-${optionIdx}`}
                                      className="whitespace-nowrap pr-6 !text-sm text-sage-10"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </form>
                            </PopoverPanel>
                          </>
                        )}
                      </Popover>
                    )
                  })}
                </PopoverGroup>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {/* {Object.keys(optimisticFilters).length > 0 && ( */}
        <div className="bg-sage-2 h-16 flex">
          <div className="content-container px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-sm font-medium text-sage-7">
              Filters
              <span className="sr-only">, active</span>
            </h3>

            <div
              aria-hidden="true"
              className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
            />

            <div className="mt-2 sm:ml-4 sm:mt-0">
              <div className="-m-1 flex flex-wrap items-center">
                {Object.entries(optimisticFilters).flatMap(
                  ([category, options]) =>
                    options.map((option) => (
                      <span
                        key={`${category}-${option}`}
                        className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-sage-10"
                      >
                        <span>{option}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFilterValues = optimisticFilters[
                              category
                            ].filter((val) => val !== option)

                            const updatedFilters = {
                              ...optimisticFilters,
                              [category]: newFilterValues,
                            }

                            setOptimisticFilters(updatedFilters)

                            const newParams = new URLSearchParams(
                              Object.entries(updatedFilters).flatMap(
                                ([key, values]) =>
                                  values.map((value) => [key, value])
                              )
                            )

                            router.push(`?${newParams}`)
                          }}
                          className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-sage-6 hover:bg-gray-200 hover:text-sage-7"
                        >
                          <span className="sr-only">
                            Remove filter for {option}
                          </span>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 8 8"
                            className="h-2 w-2"
                          >
                            <path
                              d="M1 1l6 6m0-6L1 7"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </span>
                    ))
                )}
                {Object.keys(optimisticFilters).length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setOptimisticFilters({})
                      router.push(`?`)
                    }}
                    className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-sage-10 hover:bg-gray-200 hover:text-sage-7"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </section>
    </div>
  )
}
