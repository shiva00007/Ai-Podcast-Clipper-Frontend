"use server";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import NavHeader from "~/components/ui/nav-header";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await db.user.findFirstOrThrow({
    where: {
      id: session.user.id,
    },
    select: {
      credits: true,
      email: true,
    },
  });
  return (
    <div className="flex min-h-screen flex-col">
      <NavHeader credits={user.credits} email={user.email} />
      <main className="container mx-auto flex-1 py-6">{children}</main>
    </div>
  );
}
