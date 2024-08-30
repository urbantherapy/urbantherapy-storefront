import Link from "next/link"

export default function JoinTheCommunity() {
  return (
    <div className="content-container xl:rounded-2xl bg-sage-8/80 flex justify-between flex-col md:flex-row items-end h-auto md:h-60 py-8 shadow-md xl:px-10">
      <div className="max-w-xl text-2xl font-thin tracking-tight text-sage-2 sm:text-4xl self-start">
        <h2 className="">
          Are you a maker with a passion for{" "}
          <span className="font-normal text-sage-1">creativity</span> and
          <span className="font-normal text-sage-1"> sustainability</span>?
        </h2>
      </div>
      <div className="self-start md:self-end">
        <button className="mt-8 font-normal link-animation after:bg-sage-2 text-sage-2">
          Learn More
        </button>
      </div>
    </div>
  )
}
