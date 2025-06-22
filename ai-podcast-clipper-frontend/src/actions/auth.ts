"use server";

import { hashPassword } from "~/lib/auth";
import { signupSchema, type signupFormValues } from "~/schemas/auth";
import { db } from "~/server/db";
import Stripe from "stripe";

type signUpResult = {
  success: boolean;
  error?: string;
};

export async function signUp(data: signupFormValues): Promise<signUpResult> {
  const validationResult = signupSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message || "Invalid Input",
    };
  }
  const { email, password } = validationResult.data;

  try {
    const exsistingUser = await db.user.findUnique({
      where: { email },
    });

    if (exsistingUser) {
      return {
        success: false,
        error: "Email Already Exsists",
      };
    }

    const hashedPassword = await hashPassword(password);

    // const stripe = new Stripe("Todo:script Key added");

    // const stripeCustomer = await stripe.customers.create({
    //   email: email.toLowerCase(),
    // });
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        // stripeCustomerId: stripeCustomer.id,
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "An Error Occur During Signup",
    };
  }
}
