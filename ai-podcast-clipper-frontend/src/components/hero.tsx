import React from "react";
import { BackgroundLines } from "./ui/background-lines";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center">
      <BackgroundLines className="flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black px-4 py-16 text-white">
        {/* Subtle blurred glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl"></div>

        <h2 className="relative z-10 mx-auto max-w-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text py-2 text-center text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
          Turn Your Podcast Into <br />
          Viral AI Clips
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
      </BackgroundLines>
    </section>
  );
}
