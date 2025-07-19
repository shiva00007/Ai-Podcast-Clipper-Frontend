import { auth } from "~/server/auth";
import HomeNavBarClient from "./homeNavbar-client";

export default async function HomeNavBar() {
  const session = await auth();
  const isLoggedIn = !!session;

  return <HomeNavBarClient isLoggedIn={isLoggedIn} />;
}
