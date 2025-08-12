import type { PricingPlan } from "./types";

export const plans: PricingPlan[] = [
  {
    title: "Small Pack",
    price: "$9.99",
    description: "Perfect for occasional podcast creators",
    features: ["50 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 50 credits",
    buttonVariant: "outline",
    priceId: "small",
  },
  {
    title: "Medium Pack",
    price: "$24.99",
    description: "Best value for regular podcasters",
    features: ["150 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 150 credits",
    buttonVariant: "default",
    isPopular: true,
    savePercentage: "Save 17%",
    priceId: "medium",
  },
  {
    title: "Large Pack",
    price: "$69.99",
    description: "Ideal for podcast studioes and agencies",
    features: ["500 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 500 credits",
    buttonVariant: "outline",
    isPopular: false,
    savePercentage: "Save 30%",
    priceId: "large",
  },
];

export const testimonials = [
  {
    quote:
      "This tool has completely transformed how I handle content. What used to take me hours is now done in minutes — and the quality is top-notch.",
    name: "Aarav Mehta",
    title: "Content Creator & Digital Strategist",
  },
  {
    quote:
      "I used to dread editing videos, but now it’s the fastest part of my workflow. This platform lets me focus on creativity instead of technical headaches.",
    name: "Emily Carter",
    title: "YouTube Educator",
  },
  {
    quote:
      "The automation is a game-changer. I can publish more, experiment more, and see what works without spending a fortune on production.",
    name: "Daniel Wong",
    title: "Marketing Lead, GrowthWave",
  },
  {
    quote:
      "It’s rare to find a tool that’s both powerful and incredibly easy to use. My team adopted it instantly — no training required.",
    name: "Sophia Rodriguez",
    title: "Social Media Manager",
  },
  {
    quote:
      "I love how fast I can turn my ideas into polished videos. It feels like having a full production team in my pocket.",
    name: "Liam Johnson",
    title: "Freelance Videographer",
  },
];
