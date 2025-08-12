import { BrandCards } from "./ui/brandcards";
import { Cover } from "./ui/cover";

export default function BrandSection() {
  return (
    <section id="collaboration" className="m-8">
      <div className="px-4">
        <h2 className="relative z-20 mx-auto max-w-4xl py-2 text-center text-4xl font-semibold text-white md:text-3xl lg:text-5xl">
          Expand your creative reach
          <br className="gap-2" /> grow your business <br />
          without increasing workload
        </h2>

        <h3 className="mx-auto max-w-5xl py-2 text-center text-sm text-neutral-400 md:text-lg lg:text-xl">
          Every business is becoming video-first. Our platform helps you stay
          top of mind.
        </h3>
      </div>
      <BrandCards />
    </section>
  );
}
