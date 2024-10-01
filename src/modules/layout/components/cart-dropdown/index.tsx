"use client"

import { Popover, Transition } from "@headlessui/react"
import { Cart } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"

import { formatAmount } from "@lib/util/prices"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

import doodle from "/public/icons/icon-doodle-cart.svg"
import cart from "/public/icons/icon-cart.svg"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: Omit<Cart, "beforeInsert" | "afterLoad"> | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const { countryCode } = useParams()

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (
      itemRef.current !== totalItems &&
      !pathname.includes("/cart") &&
      !pathname.includes("/checkout")
    ) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <>
      {cartDropdownOpen && (
        <div className="fixed inset-0 h-screen bg-aesop-2/50 backdrop-blur-sm -z-0"></div>
      )}
      <div
        className="h-auto z-40"
        onMouseEnter={openAndCancel}
        onMouseLeave={close}
      >
        <Popover className="relative h-full">
          <Popover.Button className="h-full">
            <LocalizedClientLink
              className="hover:text-sage-8 text-sage-10 p-4 -mr-4"
              href="/cart"
              data-testid="nav-cart-link"
            >
              {`Cart (${totalItems})`}
              {/* <Image className="" src={cart} alt="Cart Icon" /> */}
            </LocalizedClientLink>
          </Popover.Button>
          <Transition
            show={cartDropdownOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className={`hidden small:block absolute top-[calc(100%+10px)] right-0 border-sage-2 ${
                cartState && cartState.items?.length ? "w-[450px]" : "w-[300px]"
              } text-sage-10 shadow-sm rounded-none bg-aesop-1`}
              data-testid="nav-cart-dropdown"
            >
              {cartState && cartState.items?.length ? (
                <>
                  <div className="flow-root p-4">
                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                      {cartState.items
                        .sort((a, b) => {
                          return a.created_at > b.created_at ? -1 : 1
                        })
                        .map((item) => (
                          <li
                            key={item.id}
                            className="flex py-6"
                            data-testid="cart-item"
                          >
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-none border-none bg-aesop-1 border border-red-400">
                              <LocalizedClientLink
                                href={`/products/${item.variant.product.handle}`}
                              >
                                <Thumbnail
                                  thumbnail={item.thumbnail}
                                  size="square"
                                />
                              </LocalizedClientLink>
                            </div>

                            <div className="ml-4 flex flex-1 flex-col text-sm">
                              <div>
                                <div className="flex justify-between font-normal">
                                  <h3>
                                    <LocalizedClientLink
                                      href={`/products/${item.variant.product.handle}`}
                                      data-testid="product-link"
                                    >
                                      {item.title}
                                    </LocalizedClientLink>
                                  </h3>
                                  <div className="ml-4">
                                    <LineItemPrice
                                      region={cartState.region}
                                      item={item}
                                      style="tight"
                                    />
                                  </div>
                                </div>
                                <div className="mt-1">
                                  <LineItemOptions
                                    variant={item.variant}
                                    data-testid="cart-item-variant"
                                    data-value={item.variant}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between">
                                <p
                                  className="text-sage-6"
                                  data-testid="cart-item-quantity"
                                >
                                  Qty {item.quantity}
                                </p>

                                <div className="flex">
                                  <DeleteButton
                                    id={item.id}
                                    className="mt-1"
                                    data-testid="cart-item-remove-button"
                                  ></DeleteButton>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="p-4 flex flex-col gap-y-4 border-t border-primary/10 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">
                        Subtotal{" "}
                        <span className="font-normal">
                          (excl. shipping and taxes)
                        </span>
                      </span>
                      <span
                        className="text-sage-10 font-normal"
                        data-testid="cart-subtotal"
                        data-value={cartState.subtotal || 0}
                      >
                        {formatAmount({
                          amount: cartState.subtotal || 0,
                          region: cartState.region,
                          includeTaxes: false,
                        })}
                      </span>
                    </div>
                    <LocalizedClientLink
                      href="/cart"
                      passHref
                      className="mt-10 text-sm font-normal border text-sage-8 hover:border-sage-4 hover:text-sage-8 p-4 flex items-center justify-between"
                      data-testid="go-to-cart-button"
                    >
                      {/* <Button
                      variant="secondary"
                      className="w-full bg-primary/20 text-primary rounded-md hover:bg-primary/10 border-none shadow-none"
                      size="large"
                      data-testid="go-to-cart-button"
                    > */}
                      Go to Cart
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
                      {/* </Button> */}
                    </LocalizedClientLink>
                  </div>
                </>
              ) : (
                <div>
                  <div className="p-4 text-center text-md">
                    <span>Your shopping bag is empty.</span>
                    <LocalizedClientLink
                      href="/store"
                      className="mt-4 text-sm font-normal border text-sage-10 hover:bg-sage-12 p-4 hover:text-sage-2 flex items-center justify-between"
                      onClick={close}
                    >
                      <span className="sr-only">Go to all products page</span>
                      {/* <Button
                      variant="secondary"
                      className="mt-4 text-sm font-normal border text-sage-10 hover:bg-sage-12 p-4 hover:text-sage-2 flex items-center justify-between border-none rounded-none shadow-none"
                      onClick={close}
                    > */}
                      <span>Explore</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 text-sage-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {/* </Button> */}
                    </LocalizedClientLink>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  )
}

export default CartDropdown
