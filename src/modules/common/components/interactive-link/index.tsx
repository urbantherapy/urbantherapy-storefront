import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-1 items-center group bg-primary/10 font-medium px-4 py-2 rounded-md"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-primary">{children}</Text>
      <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150 text-primary" />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
