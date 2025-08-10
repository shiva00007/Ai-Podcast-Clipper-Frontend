import HomeNavBar from "~/components/home-nav";
import HeroSection from "~/components/hero";
export default async function HomePage() {
  return (
    <>
      <HomeNavBar />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
