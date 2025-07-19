import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { Toaster } from "sonner";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import NavHeader from "~/components/nav-header";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await db.user.findFirstOrThrow({
    where: { id: session.user.id },
    select: { credits: true, email: true },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <NavHeader email={user.email} credits={user.credits} />
      <main className="container mx-auto flex-1 py-6">{children}</main>
      <Toaster />
    </div>
  );
}
