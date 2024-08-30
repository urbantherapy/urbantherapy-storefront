import Link from "next/link"

export default function JoinTheCommunity() {
  return (
    <div className="content-container rounded-2xl bg-sage-8/80 px-10 flex justify-between items-end h-60 py-8 shadow-md">
      <div className="max-w-xl text-3xl font-thin tracking-tight text-sage-2 sm:text-4xl self-start">
        <h2 className="">
          Are you a maker with a passion for{" "}
          <span className="font-normal text-sage-1">creativity</span> and
          <span className="font-normal text-sage-1"> sustainability</span>?
        </h2>
        {/* <p className="mt-4 text-xl text-sage-4">
          Join our community and be part of a movement that’s making a{" "}
          <em>difference</em>.
        </p> */}
      </div>
      <div className="">
        <button className="mt-8 font-normal link-animation after:bg-sage-2 text-sage-2">
          Learn More
        </button>
      </div>
    </div>
  )
}
