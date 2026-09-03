import api from "./api";

const productService = {
  getProducts: async () => {
    const { data } = await api.get("/products");

    return data;
  },

  getProductById: async (id) => {
    const { data } = await api.get(
      `/products/${id}`
    );

    return data;
  },

  getFeaturedProducts: async () => {
    const { data } = await api.get(
      "/products/featured"
    );

    return data;
  },

  searchProducts: async (query) => {
    const { data } = await api.get(
      `/products/search?q=${query}`
    );

    return data;
  },
};

export default productService;