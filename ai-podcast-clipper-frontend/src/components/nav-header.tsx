"use client";

import Link from "next/link";
import DashboardNav from "./dashboard-nav";

const NavHeader = ({ email, credits }: { email: string; credits: number }) => {
  return (
    <header className="bg-background sticky top-0 z-10 border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}

        <div className="font-sans text-xl font-medium tracking-tight">
          <Link href="/">
            <span className="text-foreground">Podcast</span>
            <span className="font-light text-gray-500">/</span>
            <span className="text-foreground font-light">clipper</span>
          </Link>
        </div>

        {/* DashboardNav on right */}
        <DashboardNav email={email} credits={credits} />
      </div>
    </header>
  );
};

export default NavHeader;
