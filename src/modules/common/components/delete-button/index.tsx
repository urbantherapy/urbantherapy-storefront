import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

import { deleteLineItem } from "@modules/cart/actions"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx("flex items-center justify-between text-sm", className)}
    >
      <button
        className="flex gap-x-1 font-medium text-sage-9 hover:text-sage-8 cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        <span className="sr-only">Remove</span>
        {isDeleting ? <Spinner className="animate-spin" /> : "Remove"}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
