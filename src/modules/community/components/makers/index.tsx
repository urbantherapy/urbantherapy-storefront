import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const people = [
  {
    name: "Leslie Alexander",
    role: "Ceramic Artist",
    imageUrl:
      "https://media.architecturaldigest.com/photos/60d63850b900b98403a430f9/master/w_1600%2Cc_limit/AD0721_GAVALET_2.jpg",
    bio: "Leslie's passion for pottery began as a child, and today, she creates stunning, sustainable pieces that reflect her love for the earth and its natural beauty.",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Ana Velasquez",
    role: "Textile Artisan",
    imageUrl:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/21/15/5919320.jpg?width=1200",
    bio: "Ana Velasquez is a master of textile artistry, weaving narratives into every piece she creates. Her journey began in the mountains of Peru, where she learned the art of weaving from her grandmother. Today, Ana blends traditional techniques with contemporary design, creating vibrant, sustainable textiles that honor her heritage.",
    xUrl: "#",
    linkedinUrl: "#",
  },
]

export default function Makers() {
  return (
    <div className="bg-aesop-dark py-24 md:py-32">
      <FadeInStagger className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
        <FadeIn className="max-w-2xl xl:col-span-2">
          <h2 className="text-3xl font-thin tracking-tight text-sage-4">
            Meet the Makers
          </h2>
          <p className="mt-6 text-base md:text-md leading-6 text-sage-8 sm:max-w-md lg:max-w-sm">
            {`Meet the talented makers who bring our collections to life. Each month, we feature a new maker, sharing their story, their craft, and what inspires them to create.`}
          </p>
        </FadeIn>
        <ul
          role="list"
          className="-mt-12 space-y-12 divide-y divide-sage-11/75 xl:col-span-3"
        >
          {people.map((person) => (
            <li key={person.name}>
              <FadeIn className="flex flex-col gap-10 pt-12 sm:flex-row">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="aspect-[4/5] w-52 flex-none rounded-none object-cover"
                />
                <div className="max-w-xl flex-auto">
                  <h3 className="text-xl font-normal leading-8 tracking-tight text-sage-4">
                    {person.name}
                  </h3>
                  <p className="text-md leading-7 text-sage-8 italic">
                    {person.role}
                  </p>
                  <p className="mt-6 text-md leading-7 text-sage-8">
                    {person.bio}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </div>
  )
}
