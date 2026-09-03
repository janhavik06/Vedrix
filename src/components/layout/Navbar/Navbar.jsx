import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import CartIcon        from "./CartIcon";
import ProfileDropdown from "./ProfileDropdown";
import WishlistIcon    from "./WishlistIcon";
import NavLinks        from "./NavLinks";
import MobileMenu      from "../MobileMenu";

/**
 * Pages where the hero image starts at y=0 directly behind the transparent navbar.
 * On these pages the navbar starts transparent with white text.
 * On every other page the navbar starts solid (dark text on white bg).
 */
const TRANSPARENT_HERO_ROUTES = ["/", "/new-arrivals", "/collections", "/about"];

const Navbar = () => {
  const { pathname } = useLocation();
  const isHeroPage   = TRANSPARENT_HERO_ROUTES.includes(pathname);

  const [scrolled, setScrolled] = useState(!isHeroPage); // solid by default on non-hero pages
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible,  setVisible]  = useState(true);
  const lastY = useRef(0);

  // Reset scrolled state when route changes
  useEffect(() => {
    setMenuOpen(false);
    setScrolled(!isHeroPage || window.scrollY > 60);
    lastY.current = window.scrollY;
  }, [pathname, isHeroPage]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // On hero pages: go transparent when at top, solid after 60px
      // On non-hero pages: always solid
      if (isHeroPage) {
        setScrolled(y > 60);
      } else {
        setScrolled(true);
      }
      setVisible(y < lastY.current || y < 100);
      lastY.current = y;
    };

    onScroll(); // run immediately on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroPage]);

  // light = transparent navbar over dark hero
  // dark  = solid white navbar over light page content
  const light = isHeroPage && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500
          ${visible ? "translate-y-0" : "-translate-y-full"}
          ${scrolled
            ? "border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
            : "border-b border-white/10 bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-10 xl:px-14">

          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-black tracking-[0.3em] transition-all duration-300 hover:opacity-70
              ${light ? "text-white" : "text-gray-900"}`}
          >
            VEDRIX
          </Link>

          {/* Nav links */}
          <div className="hidden lg:block">
            <NavLinks light={light} />
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <WishlistIcon    light={light} />
            <CartIcon        light={light} />
            <ProfileDropdown light={light} />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition lg:hidden
                ${light
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <HiOutlineBars3 size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
