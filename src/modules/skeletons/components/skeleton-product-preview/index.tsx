import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="h-[45vh] w-full rounded-none border-none shadow-none bg-aesop-2/25 " />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 bg-aesop-2/25"></div>
        <div className="w-1/5 h-6 bg-aesop-2/25"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
