import hoodieImg from "../../../assets/images/categories/hoodies.jpg";
import tshirtImg from "../../../assets/images/categories/tshirts.jpg";
import shirtImg from "../../../assets/images/categories/shirts.jpg";

const categories = [
  {
    id: 1,
    name: "Hoodies",
    subtitle: "Premium Comfort",
    image: hoodieImg,
    link: "/shop?category=hoodies",
  },
  {
    id: 2,
    name: "T-Shirts",
    subtitle: "Minimal Everyday Wear",
    image: tshirtImg,
    link: "/shop?category=tshirts",
  },
  {
    id: 3,
    name: "Shirts",
    subtitle: "Formal Wear",
    image: shirtImg,
    link: "/shop?category=shirts",
  },
];

export default categories;
