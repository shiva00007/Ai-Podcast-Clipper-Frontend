import React from "react";
import GridItem from "./ui/grid-item";
import { Box, Heading, Lock, Search, Settings, Sparkles } from "lucide-react";
import { Cover } from "./ui/cover";
export default function FeatureSection() {
  return (
    <section id="features" className="m-8">
      <div className="px-4">
        <h1 className="relative z-20 mx-auto max-w-7xl py-2 text-center text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
          Revolutionary Features <br /> at{" "}
          <Cover className="bg-gradient-to-b from-white to-black bg-clip-text text-transparent">
            warp speed
          </Cover>
        </h1>
        <h3 className="mx-auto max-w-5xl py-4 text-center text-sm text-neutral-400 md:text-lg lg:text-xl">
          Experience the future of podcast content creation with our
          cutting-edge AI technology.
        </h3>
      </div>

      <ul className="mt-2 grid grid-cols-1 grid-rows-none gap-4 bg-gradient-to-b from-neutral-900 to-black text-white md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-4 w-4 text-white" />}
          title="AI Clip Detection"
          description="Automatically detects and extracts the most viral moments from your podcast episodes."
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Settings className="h-4 w-4 text-white" />}
          title="Smart Highlighting"
          description="Uses AI to identify impactful quotes and scenes for quick sharing on social media."
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Lock className="h-4 w-4 text-white" />}
          title="One-Click Export"
          description="Render, format, and export vertical clips optimized for Reels, Shorts, and TikTok."
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Sparkles className="h-4 w-4 text-white" />}
          title="Secure Uploads"
          description="Upload full-length podcasts securely and process them with confidence."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-4 w-4 text-white" />}
          title="Custom Branding"
          description="Add your own logos, fonts, and styles to every clip — no editing software needed."
        />
      </ul>
    </section>
  );
}
