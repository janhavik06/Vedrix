import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-5">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
