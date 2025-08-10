import React from "react";
import { BackgroundLines } from "./ui/background-lines";

export default function HeroSection() {
  return (
    <section
      id="features"
      className="relative flex items-center justify-center"
    >
      <BackgroundLines className="flex w-full flex-col items-center justify-center bg-white px-4">
        <h2 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text text-center font-sans text-3xl font-bold tracking-tight text-transparent md:text-5xl lg:text-7xl dark:from-neutral-100 dark:to-white">
          Turn Your Podcast Into
          <br />
          Viral AI Clips
        </h2>
        <p className="mt-4 max-w-xl text-center text-sm text-neutral-700 md:text-lg dark:text-neutral-400">
          Revolutionary Al identifies the most engaging moments in your podcasts
          and creates share-ready clips that drive massive audience
        </p>
      </BackgroundLines>
    </section>
  );
}
