"use-client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import PricingCard from "~/components/PricingCard";
import { Button } from "~/components/ui/button";
import { plans } from "~/lib/constants";
export default function BillingPage() {
  return (
    <div className="mx-auto flex flex-col space-y-8 px-4 py-12">
      <div className="relative flex items-center justify-center gap-4">
        <Button
          variant="outline"
          className="absolute top-0 left-0"
          size="icon"
          asChild
        >
          <Link href="/dashboard">
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Buy Credits
          </h1>
          <p className="text-muted-foreground">
            Purchase credits to generate more podcast clips. The More Credits to
            Buy,the better the value
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.title} plan={plan} />
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="mb-4 text-lg font-semibold">How credits work</h3>
        <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
          <li>1 credit = 1 minute of podcast processing</li>
          <li>
            The program will create around 1 clip per 5 minutes of podcast
          </li>
          <li>Credits never expire and can be used anytime</li>
          <li>Longer podcasts require more credits based on duration</li>
          <li>All packages are one-time purchases (not subscription)</li>
        </ul>
      </div>
    </div>
  );
}
