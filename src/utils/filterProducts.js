const filterProducts = (
  products,
  filters
) => {
  return products.filter((product) => {
    const matchesCategory =
      !filters.category ||
      product.category ===
        filters.category;

    const matchesPrice =
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(
          filters.search.toLowerCase()
        );

    return (
      matchesCategory &&
      matchesPrice &&
      matchesSearch
    );
  });
};

export default filterProducts;