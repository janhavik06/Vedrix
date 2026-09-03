import { Link, useLocation } from "react-router-dom";

const links = [
  { title: "Home",         path: "/"            },
  { title: "Shop",         path: "/shop"         },
  { title: "New Arrivals", path: "/new-arrivals" },
  { title: "Collections",  path: "/collections"  },
  { title: "About",        path: "/about"        },
];

const NavLinks = ({ light = false }) => {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-8">
      {links.map((link) => {
        const active =
          link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`relative text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-300
              after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:transition-all after:duration-300
              ${light
                ? active
                  ? "text-white after:w-full after:bg-white"
                  : "text-white/70 hover:text-white after:w-0 after:bg-white hover:after:w-full"
                : active
                  ? "text-gray-900 after:w-full after:bg-gray-900"
                  : "text-gray-500 hover:text-gray-900 after:w-0 after:bg-gray-900 hover:after:w-full"
              }`}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
