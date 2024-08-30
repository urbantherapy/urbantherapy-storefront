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
    <div className="bg-sage-1 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
        <div className="max-w-2xl xl:col-span-2">
          <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-sage-8">
            Meet the Makers
          </h2>
          <p className="mt-8 text-base md:text-lg leading-6 text-sage-6 sm:max-w-md lg:max-w-xl">
            {`Meet the talented makers who bring our collections to life. Each month, we feature a new maker, sharing their story, their craft, and what inspires them to create.`}
          </p>
        </div>
        <ul
          role="list"
          className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3"
        >
          {people.map((person) => (
            <li
              key={person.name}
              className="flex flex-col gap-10 pt-12 sm:flex-row"
            >
              <img
                alt=""
                src={person.imageUrl}
                className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
              />
              <div className="max-w-xl flex-auto">
                <h3 className="text-xl font-normal leading-8 tracking-tight text-sage-8">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-sage-6">{person.role}</p>
                <p className="mt-6 text-base leading-7 text-sage-6">
                  {person.bio}
                </p>
                {/* <ul role="list" className="mt-6 flex gap-x-6">
                  <li>
                    <a
                      href={person.xUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">X</span>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href={person.linkedinUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
