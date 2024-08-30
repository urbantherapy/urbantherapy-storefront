import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

import logo from "/public/logos/logoByAnice.svg"
import logoMobile from "/public/logos/logoLeaf.svg"

const navigation = {
  about: [
    { name: "Our Values", href: "#" },
    { name: "Our Vision", href: "#" },
    { name: "Our Commitment", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Data Protection Policy", href: "#" },
    { name: "Right of Withdrawal", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Imprint", href: "#" },
    { name: "Cookies", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          fill="currentColor"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
          {...props}
        >
          <g fill="currentColor">
            <path
              d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96"
              opacity="0.2"
            />
            <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m8 191.63V152h24a8 8 0 0 0 0-16h-24v-24a16 16 0 0 1 16-16h16a8 8 0 0 0 0-16h-16a32 32 0 0 0-32 32v24H96a8 8 0 0 0 0 16h24v63.63a88 88 0 1 1 16 0" />
          </g>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          fill="currentColor"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
          {...props}
        >
          <g fill="currentColor">
            <path
              d="M176 32H80a48 48 0 0 0-48 48v96a48 48 0 0 0 48 48h96a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48m-48 136a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
              opacity="0.2"
            />
            <path d="M176 24H80a56.06 56.06 0 0 0-56 56v96a56.06 56.06 0 0 0 56 56h96a56.06 56.06 0 0 0 56-56V80a56.06 56.06 0 0 0-56-56m40 152a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40V80a40 40 0 0 1 40-40h96a40 40 0 0 1 40 40Zm-88-96a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32m64-84a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
          </g>
        </svg>
      ),
    },
  ],
}

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <div className="bg-white">
      <footer aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="content-container px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <LocalizedClientLink
                href="/"
                className="focus:outline-none focus:ring-0 focus:border-teal"
              >
                <Image src={logoMobile} className="h-7 w-auto" alt="Logo" />
              </LocalizedClientLink>
              <p className="leading-6 text-lg font-thin text-sage-6">
                Connecting creativity and community for a more inspired,
                sustainable world.
              </p>
              <div className="flex space-x-6">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sage-4 hover:text-sage-6"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon aria-hidden="true" className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="font-normal leading-6 text-sage-8">About</h3>
                  <ul role="list" className="mt-6 space-y-4 font-thin">
                    {navigation.about.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="leading-6 text-sage-6 hover:text-sage-8"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {product_categories && product_categories?.length > 0 && (
                  <div className="mt-10 md:mt-0">
                    <h3 className="font-normal text-sage-8 leading-6">
                      Categories
                    </h3>
                    <ul
                      role="list"
                      className="mt-6 space-y-4"
                      data-testid="footer-categories"
                    >
                      {product_categories?.slice(0, 6).map((c) => {
                        if (c.parent_category) {
                          return
                        }

                        const children =
                          c.category_children?.map((child) => ({
                            name: child.name,
                            handle: child.handle,
                            id: child.id,
                          })) || null

                        return (
                          <li key={c.id}>
                            <LocalizedClientLink
                              className={clx(
                                "text-sage-6 hover:text-sage-8",
                                children && "font-thin"
                              )}
                              href={`/categories/${c.handle}`}
                              data-testid="category-link"
                            >
                              {c.name}
                            </LocalizedClientLink>
                            {children && (
                              <ul className="grid grid-cols-1 ml-3 gap-2">
                                {children &&
                                  children.map((child) => (
                                    <li key={child.id}>
                                      <LocalizedClientLink
                                        className="text-sage-6 hover:text-sage-8"
                                        href={`/categories/${child.handle}`}
                                        data-testid="category-link"
                                      >
                                        {child.name}
                                      </LocalizedClientLink>
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                {collections && collections.length > 0 && (
                  <div>
                    <h3 className="font-normal leading-6 text-sage-8">
                      Collections
                    </h3>
                    <ul
                      role="list"
                      className={clx("mt-6 space-y-4 font-thin", {
                        "grid-cols-1": (collections?.length || 0) > 3,
                      })}
                    >
                      {collections?.slice(0, 6).map((c) => (
                        <li key={c.id}>
                          <LocalizedClientLink
                            className="text-sage-6 hover:text-sage-8"
                            href={`/collections/${c.handle}`}
                          >
                            {c.title}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10 md:mt-0">
                  <h3 className="font-normal leading-6 text-sage-8">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4 font-light">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="leading-6 text-sage-6 hover:text-sage-8"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-sage-2 text-sage-5 pt-8 sm:mt-20 lg:mt-24 flex items-center justify-between font-thin">
            <p className="leading-5 hover:text-sage-6">
              &copy; {new Date().getFullYear()} Urban Therapy. All rights
              reserved.
            </p>
            <p className="hover:text-sage-6 hidden sm:block">Back to top ↑</p>
          </div>
        </div>
      </footer>

      {/* <footer className="w-full text-primary bg-sage-1 pt-12">
        <div className="content-container flex flex-col w-full">
          <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between pb-12">
            <div>
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Image src={logoMobile} className="h-8 w-auto" alt="Logo" />
              </LocalizedClientLink>
            </div>
            <div className="gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
              {product_categories && product_categories?.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <span className="font-normal">Categories</span>
                  <ul
                    className="grid grid-cols-1 gap-2"
                    data-testid="footer-categories"
                  >
                    {product_categories?.slice(0, 6).map((c) => {
                      if (c.parent_category) {
                        return
                      }

                      const children =
                        c.category_children?.map((child) => ({
                          name: child.name,
                          handle: child.handle,
                          id: child.id,
                        })) || null

                      return (
                        <li className="flex flex-col gap-2" key={c.id}>
                          <LocalizedClientLink
                            className={clx(
                              "hover:text-ui-fg-base",
                              children && "font-thin"
                            )}
                            href={`/categories/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.name}
                          </LocalizedClientLink>
                          {children && (
                            <ul className="grid grid-cols-1 ml-3 gap-2">
                              {children &&
                                children.map((child) => (
                                  <li key={child.id}>
                                    <LocalizedClientLink
                                      className="hover:text-ui-fg-base"
                                      href={`/categories/${child.handle}`}
                                      data-testid="category-link"
                                    >
                                      {child.name}
                                    </LocalizedClientLink>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {collections && collections.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <span className="font-normal">Collections</span>
                  <ul
                    className={clx("grid grid-cols-1 gap-2 font-light", {
                      "grid-cols-1": (collections?.length || 0) > 3,
                    })}
                  >
                    {collections?.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-ui-fg-base font-thin"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-col gap-y-2 font-thin">
                <span className="font-normal">Legal</span>
                <ul className="grid grid-cols-1 gap-y-2">
                  <li>
                    <a
                      href="https://github.com/medusajs"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Data Protection Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.medusajs.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Right of Withdrawal
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/medusajs/nextjs-starter-medusa"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/medusajs/nextjs-starter-medusa"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Imprint
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/medusajs/nextjs-starter-medusa"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full my-4 justify-between text-primary/50">
            <p>
              © {new Date().getFullYear()} Urban Therapy. All rights reserved.
            </p>
            <p>Back to top ↑</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
