import type { VariantProps } from "class-variance-authority";
import type { PriceId } from "~/actions/stripe";
import type { buttonVariants } from "~/components/ui/button";

export interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  isPopular?: boolean;
  savePercentage?: string;
  priceId: PriceId;
}
