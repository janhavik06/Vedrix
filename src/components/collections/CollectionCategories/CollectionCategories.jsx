import SectionHeader from "./SectionHeader";
import CategoryGrid from "./CategoryGrid";

const CollectionCategories = ({ categories }) => {
  return (
    <section className="py-15">
      <SectionHeader />

      <CategoryGrid categories={categories} />
    </section>
  );
};

export default CollectionCategories;
