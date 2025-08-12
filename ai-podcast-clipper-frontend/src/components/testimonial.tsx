import { testimonials } from "~/lib/constants";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Button } from "./ui/button";

export default function Testimonial() {
  return (
    <section id="testimonials" className="m-8">
      <div className="px-4">
        <h2 className="relative z-20 mx-auto max-w-4xl py-2 text-center text-4xl font-semibold text-white md:text-3xl lg:text-5xl">
          A partner to your growth
        </h2>

        <h3 className="mx-auto max-w-5xl py-2 text-center text-sm text-neutral-400 md:text-lg lg:text-xl">
          The only AI editor that actually drives growth. Just ask millions of
          creators and brands
        </h3>
      </div>
      <InfiniteMovingCards items={testimonials} />

      <div className="relative mt-10 overflow-hidden rounded-2xl bg-gradient-to-b from-black via-neutral-900 to-black px-4 py-12 shadow-lg">
        {/* Subtle blurred glow */}
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl"></div>

        <h2 className="relative z-10 mx-auto max-w-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text py-2 text-center text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
          Get Started With Podcast Clipper
        </h2>

        <h3 className="relative z-10 mx-auto max-w-3xl py-3 text-center text-base text-neutral-400 md:text-lg lg:text-xl">
          The only AI editor that actually drives growth.
          <br className="hidden sm:block" /> Just ask millions of creators and
          brands.
        </h3>

        <div className="relative z-10 mt-6 flex justify-center">
          <Button className="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            🚀 Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
