import HomeNavBar from "~/components/home-nav";
import HeroSection from "~/components/hero";
import FeatureSection from "~/components/featuresection";
import BrandSection from "~/components/brandsection";
import Testimonial from "~/components/testimonial";
import Footer from "~/components/Footer";
export default async function HomePage() {
  return (
    <>
      <HomeNavBar />
      <main className="flex min-h-screen w-screen flex-col bg-black">
        <HeroSection />
        <FeatureSection />
        <BrandSection />
        <Testimonial />

        <Footer />
      </main>
    </>
  );
}
