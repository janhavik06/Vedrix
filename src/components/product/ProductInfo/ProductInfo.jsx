import ProductMeta from "./ProductMeta";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product, children }) => {
  return (
    <div>
      <ProductMeta product={product} />

      {children}

      <ProductActions />
    </div>
  );
};

export default ProductInfo;
