import { FadeIn, FadeInStagger } from "@modules/framer-motion/FadeIn"

const Quote = () => {
  return (
    <div className="py-4">
      <section className="content-container isolate overflow-hidden px-6 lg:px-8">
        <div className="relative mx-auto max-w-2xl py-32 pt-40 sm:py-48 lg:max-w-4xl">
          <figure className="flex flex-col items-center text-center">
            <FadeInStagger>
              <FadeIn>
                <blockquote className="text-3xl font-thin tracking-tight leading-8 sm:leading-9 text-sage-10">
                  <p className="font-thin">{`‘The journey itself is my home.’`}</p>
                </blockquote>
              </FadeIn>
              <FadeIn>
                <figcaption className="mt-4 text-sage-8 text-sm font-normal tracking-wide">
                  Matsuo Bashō
                </figcaption>
              </FadeIn>
            </FadeInStagger>
          </figure>
        </div>
      </section>
    </div>
  )
}

export default Quote
