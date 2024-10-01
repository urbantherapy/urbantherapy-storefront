import Image from "next/image"
import clsx from "clsx"

import image1 from "/public/images/instagram-widget/img1.png"
import image2 from "/public/images/instagram-widget/img2.png"
import image3 from "/public/images/instagram-widget/img3.png"
import image4 from "/public/images/instagram-widget/img4.png"
import image5 from "/public/images/instagram-widget/img5.png"
import image6 from "/public/images/instagram-widget/img6.png"

const Photos = () => {
  let rotations = ["rotate-2", "-rotate-2", "rotate-2", "rotate-2", "-rotate-2"]

  return (
    <div className="">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-4">
        {[image1, image2, image3, image4, image5, image6].map(
          (image, imageIndex) => (
            <div
              key={image.src}
              className={clsx(
                "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-sage-2 sm:w-44 sm:rounded-none dark:bg-zinc-800",
                rotations[imageIndex % rotations.length]
              )}
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover saturate-[.75]"
              />
              <div className="absolute inset-0 bg-sage-10/20"></div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Photos
