import { Navbar, Footer } from "../../components/layout";

import {
  CollectionsHero,
  FeaturedCollections,
  CollectionCategories,
  SeasonalCollections,
  TrendingCollection,
  CollectionBanner,
  featuredCollections,
  categories,
  seasonalCollections,
  trendingCollections,
} from "../../components/collections";

const Collections = () => {
  return (
    <>
      <Navbar />

      <CollectionsHero />

      <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-14 xl:px-20">
        <FeaturedCollections collections={featuredCollections} />

        <CollectionCategories categories={categories} />

        <SeasonalCollections collections={seasonalCollections} />

        <TrendingCollection collections={trendingCollections} />

        <CollectionBanner />
      </main>

      <Footer />
    </>
  );
};

export default Collections;
