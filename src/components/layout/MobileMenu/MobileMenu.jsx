import { Link } from "react-router-dom";
import {
  FiX,
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiInfo,
  FiUser,
  FiPhone,
} from "react-icons/fi";

const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: <FiHome />,
  },
  {
    name: "Shop",
    path: "/shop",
    icon: <FiShoppingBag />,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    icon: <FiHeart />,
  },
  {
    name: "About",
    path: "/about",
    icon: <FiInfo />,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <FiPhone />,
  },
];

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-80 max-w-[85%] bg-white z-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-3xl font-black tracking-[5px]">VEDRIX</h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-orange-500 transition"
          >
            <FiX />
          </button>
        </div>

        {/* Login Section */}
        <div className="px-6 py-6 border-b">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
              <FiUser />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Welcome</h3>

              <p className="text-sm text-gray-500">Login to continue</p>
            </div>
          </div>

          <Link
            to="/login"
            onClick={onClose}
            className="block mt-5 text-center bg-black text-white py-3 rounded-xl hover:bg-orange-500 transition"
          >
            Login / Register
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-5 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-gray-100 transition"
            >
              <span className="text-xl">{item.icon}</span>

              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t px-6 py-5">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Vedrix
          </p>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
