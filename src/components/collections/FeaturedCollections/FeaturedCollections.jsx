import SectionHeader from "./SectionHeader";
import CollectionGrid from "./CollectionGrid";

const FeaturedCollections = ({ collections }) => {
  return (
    <section className="py-15">
      <SectionHeader />

      <CollectionGrid collections={collections} />
    </section>
  );
};

export default FeaturedCollections;
