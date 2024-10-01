import Image from "next/image"
import Link from "next/link"

interface InstagramPost {
  id: string
  caption: string
  media_url: string
  media_type: string
  timestamp: string
  permalink: string
}

const InstagramWidget = async () => {
  let instagramFeed = null
  let error = null

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.INSTAGRAM_TOKEN}`
    const data = await fetch(url)
    console.log("data", data)
    if (!data.ok) {
      throw new Error("Failed to fetch Instagram feed")
    }
    instagramFeed = await data.json()
    console.log("Instagram feed:", instagramFeed)
  } catch (err: any) {
    console.error("Error fetching Instagram feed:", err.message)
    error = err.message
  }

  return (
    <div className="bg-aesop-3 h-[50vh]">
      <div className="grid grid-cols-2 items-center h-full bg-aesop-3 content-container py-24 md:py-0">
        <div
          className={` flex flex-col items-start justify-center text-left max-w-sm h-full`}
        >
          <h2 className="mt-0 text-xl font-normal tracking-tight text-sage-10">
            Join the Community
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sage-10 font-thin text-md leading-6">
            Discover the stories behind our products and stay connected with the
            makers who inspire us.
          </p>

          <div className="w-60">
            <Link
              href={"/about"}
              className="mt-10 text-sm font-normal border border-sage-10 text-sage-10 hover:border-sage-11 hover:text-sage-11 p-4 flex items-center justify-between"
            >
              <span>Follow us on Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="w-3.5 text-sage-8 hover:text-sage-11"
              >
                <g>
                  <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z"></path>
                </g>
              </svg>
            </Link>
          </div>
        </div>
        {instagramFeed && (
          <ul role="list" className="grid grid-cols-8 gap-1 bg-aesop-3 pl-1">
            {error && <p className="text-red-500">{error}</p>}
            {instagramFeed.data.slice(0, 24).map((post: InstagramPost) => (
              <li key={post.id} className="h-full w-full">
                {/* <div className="group aspect-h-7 aspect-w-7 block w-full overflow-hidden">
                  <Image
                    src={post.media_url}
                    alt={post.caption}
                    width={300}
                    height={300}
                    className="pointer-events-none object-cover group-hover:opacity-90 saturate-[.80]"
                  />
                  <div className="absolute inset-0 bg-sage-11/5"></div>
                  <button type="button" className="absolute inset-0">
                    <span className="sr-only">View details for {post.id}</span>
                  </button>
                </div> */}
                <Link
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full overflow-hidden"
                >
                  {post.media_type === "VIDEO" ? (
                    <video
                      src={post.media_url}
                      controls={false}
                      className="w-full h-full object-cover group-hover:opacity-90 saturate-[.80]"
                    />
                  ) : (
                    <Image
                      src={post.media_url}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:opacity-90 saturate-[.80]"
                      width={300}
                      height={300}
                      priority
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default InstagramWidget
