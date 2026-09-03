import SidebarItem from "./SidebarItem";
import sidebarMenu from "./SidebarMenu";

const ProfileSidebar = ({
  activeItem,
}) => {
  return (
    <aside
      className="
        rounded-3xl
        border
        bg-white
        p-5
        shadow-sm
      "
    >
      <h2 className="mb-6 text-xl font-bold">
        My Account
      </h2>

      <div className="space-y-2">
        {sidebarMenu.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            activeItem={activeItem}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProfileSidebar;