import SectionHeader from "./SectionHeader";
import TrendingGrid from "./TrendingGrid";

const TrendingCollection = ({ collections }) => {
  return (
    <section className="py-15">
      <SectionHeader />

      <TrendingGrid collections={collections} />
    </section>
  );
};

export default TrendingCollection;
