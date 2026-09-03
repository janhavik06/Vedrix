// Import your product images
import hoodie1 from "../../assets/images/products/hoodies/hoodie1.jpg";
import hoodie2 from "../../assets/images/products/hoodies/hoodie2.jpg";
import tshirt1 from "../../assets/images/products/tshirts/tshirt1.jpg";
import tshirt2 from "../../assets/images/products/tshirts/tshirt2.jpg";
import shirt1 from "../../assets/images/products/shirts/shirt1.jpg";
import jogger1 from "../../assets/images/products/joggers/jogger1.jpg";

const shopProducts = [
  {
    id: 1,
    name: "Essential Black Hoodie",
    category: "Hoodies",
    image: hoodie1,
    price: 1799,
    oldPrice: 2299,
    rating: 4.8,
    badge: "Best Seller",
    color: "Black",
    size: ["S", "M", "L", "XL"],
    stock: true,
  },
  {
    id: 2,
    name: "Minimal Beige Hoodie",
    category: "Hoodies",
    image: hoodie2,
    price: 1899,
    oldPrice: 2499,
    rating: 4.9,
    badge: "New",
    color: "Beige",
    size: ["M", "L", "XL"],
    stock: true,
  },
  {
    id: 3,
    name: "Classic White T-Shirt",
    category: "T-Shirts",
    image: tshirt1,
    price: 999,
    oldPrice: 1299,
    rating: 4.7,
    badge: "",
    color: "White",
    size: ["S", "M", "L"],
    stock: true,
  },
  {
    id: 4,
    name: "Oversized Black Tee",
    category: "T-Shirts",
    image: tshirt2,
    price: 1099,
    oldPrice: 1499,
    rating: 4.8,
    badge: "Trending",
    color: "Black",
    size: ["M", "L", "XL"],
    stock: true,
  },
  {
    id: 5,
    name: "Oxford Casual Shirt",
    category: "Shirts",
    image: shirt1,
    price: 1599,
    oldPrice: 1999,
    rating: 4.6,
    badge: "",
    color: "Blue",
    size: ["M", "L", "XL"],
    stock: false,
  },
  {
    id: 6,
    name: "Premium Cargo Joggers",
    category: "Joggers",
    image: jogger1,
    price: 1999,
    oldPrice: 2499,
    rating: 4.9,
    badge: "Limited",
    color: "Olive",
    size: ["S", "M", "L", "XL"],
    stock: true,
  },
];

export default shopProducts;
