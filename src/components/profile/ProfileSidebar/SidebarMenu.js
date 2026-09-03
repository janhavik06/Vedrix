import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiHeart,
  FiSettings,
} from "react-icons/fi";

const sidebarMenu = [
  {
    id: "profile",
    label: "My Profile",
    icon: FiUser,
    path: "/profile",
  },
  {
    id: "orders",
    label: "My Orders",
    icon: FiPackage,
    path: "/profile/orders",
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: FiMapPin,
    path: "/profile/addresses",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: FiHeart,
    path: "/wishlist",
  },
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
    path: "/profile/settings",
  },
];

export default sidebarMenu;