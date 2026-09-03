import { Link } from "react-router-dom";

const SidebarItem = ({
  item,
  activeItem,
}) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
        activeItem === item.id
          ? "bg-black text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon size={18} />

      <span>{item.label}</span>
    </Link>
  );
};

export default SidebarItem;