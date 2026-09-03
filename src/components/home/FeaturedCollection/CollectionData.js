import hoodie from "../../../assets/images/products/hoodies/hoodie1.jpg";
import tshirt from "../../../assets/images/products/tshirts/tshirt1.jpg";
import shirt from "../../../assets/images/products/shirts/shirt1.jpg";

const collections = [
  {
    id: 1,
    title: "Essential Hoodies",
    description: "Minimal. Comfortable. Everyday streetwear.",
    image: hoodie,
    route: "/shop?category=hoodies",
  },
  {
    id: 2,
    title: "Oversized T-Shirts",
    description: "Relaxed fit with premium cotton fabric.",
    image: tshirt,
    route: "/shop?category=tshirts",
  },
  {
    id: 3,
    title: "Formal Shirts",
    description: "Elegant design for professional settings.",
    image: shirt,
    route: "/shop?category=shirts",
  },
];

export default collections;
