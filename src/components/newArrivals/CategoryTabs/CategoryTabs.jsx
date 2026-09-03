import CategoryTab from "./CategoryTab";

const CategoryTabs = ({
  categories = [],
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <section className="my-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((category) => (
          <CategoryTab
            key={category}
            category={category}
            active={activeCategory === category}
            onClick={() => onCategoryChange(category)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryTabs;
