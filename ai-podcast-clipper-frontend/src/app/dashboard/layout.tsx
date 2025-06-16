"use server";
import { type ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
