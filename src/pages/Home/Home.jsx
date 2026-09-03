import {
  Hero,
  FeaturedCollection,
  Categories,
  NewArrivals,
  BestSellers,
  WhyVedrix,
  FeaturedBanner,
  Testimonials,
  Newsletter,
  SocialGallery,
} from "../../components/home";
import { Navbar, Footer } from "../../components/layout";

const Home = () => {
  return (
    <>
      {/* Navbar is fixed/sticky — hero renders beneath it intentionally */}
      <Navbar />
      <main>
        {/* Hero sits directly under the fixed navbar — no spacer */}
        <Hero />
        <Categories />
        <NewArrivals />
        <FeaturedCollection />
        <BestSellers />
        <WhyVedrix />
        <FeaturedBanner />
        <Testimonials />
        <Newsletter />
        <SocialGallery />
      </main>
      <Footer />
    </>
  );
};

export default Home;
