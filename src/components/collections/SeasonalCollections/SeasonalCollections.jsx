import SectionHeader from "./SectionHeader";
import SeasonGrid from "./SeasonGrid";

const SeasonalCollections = ({ collections }) => {
  return (
    <section className="py-15">
      <SectionHeader />

      <SeasonGrid collections={collections} />
    </section>
  );
};

export default SeasonalCollections;
