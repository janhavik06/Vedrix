import hoodie1 from "../../../assets/images/products/hoodies/hoodie1.jpg";
import hoodie2 from "../../../assets/images/products/hoodies/hoodie2.jpg";
import tshirt1 from "../../../assets/images/products/tshirts/tshirt1.jpg";
import tshirt2 from "../../../assets/images/products/tshirts/tshirt2.jpg";
import shirt1 from "../../../assets/images/products/shirts/shirt1.jpg";
// import bottom1 from "../../../assets/images/products/bottomwear/bottom1.jpg";

export const newArrivalProducts = [
  {
    id: 1,
    name: "Essential Oversized Hoodie",
    category: "Hoodies",
    image: hoodie1,
    price: 2499,
    oldPrice: 2999,
    color: "Black",
    size: ["S", "M", "L", "XL"],
    isNew: true,
    featured: true,
    trending: true,
  },

  {
    id: 2,
    name: "Classic Heavyweight Hoodie",
    category: "Hoodies",
    image: hoodie2,
    price: 2699,
    color: "Grey",
    size: ["M", "L", "XL"],
    isNew: true,
    featured: false,
    trending: true,
  },

  {
    id: 3,
    name: "Minimal Logo Tee",
    category: "T-Shirts",
    image: tshirt1,
    price: 1199,
    color: "White",
    size: ["S", "M", "L"],
    isNew: true,
    featured: true,
    trending: false,
  },

  {
    id: 4,
    name: "Relaxed Fit Tee",
    category: "T-Shirts",
    image: tshirt2,
    price: 1399,
    oldPrice: 1599,
    color: "Black",
    size: ["M", "L", "XL"],
    isNew: false,
    featured: false,
    trending: true,
  },

  {
    id: 5,
    name: "Premium Oxford Shirt",
    category: "Shirts",
    image: shirt1,
    price: 2299,
    color: "Blue",
    size: ["M", "L", "XL"],
    isNew: true,
    featured: false,
    trending: false,
  },

  //   {
  //     id: 6,
  //     name: "Cargo Bottom Wear",
  //     category: "Bottom Wear",
  //     image: bottom1,
  //     price: 2899,
  //     color: "Grey",
  //     size: ["M", "L", "XL"],
  //     isNew: true,
  //     featured: true,
  //     trending: true,
  //   },
];
