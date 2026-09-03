import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group overflow-hidden rounded-[30px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-neutral-900">{category.name}</h3>

        <p className="mt-2 text-sm text-neutral-500">
          {category.products} Products
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
