import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const shopLinks = [
  { label: "New Arrivals",  to: "/new-arrivals"  },
  { label: "Shop All",      to: "/shop"          },
  { label: "Collections",   to: "/collections"   },
  { label: "Best Sellers",  to: "/shop"          },
];

const companyLinks = [
  { label: "About Us", to: "/about"   },
  { label: "Contact",  to: "/contact" },
];

const supportLinks = [
  { label: "Shipping Policy", to: "/shipping" },
  { label: "Returns",         to: "/returns"  },
  { label: "Privacy Policy",  to: "/privacy"  },
  { label: "Terms",           to: "/terms"    },
];

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* ── Main ── */}
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-12 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand col — wider */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-[0.3em] text-white hover:opacity-70 transition-opacity">
              VEDRIX
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.9] text-white/40">
              Premium streetwear designed for everyday confidence. Minimal style. Maximum comfort.
              Crafted in Bangalore, India.
            </p>

            {/* Social */}
            <div className="mt-7 flex gap-3">
              {[
                { icon: <FiInstagram size={17} />, href: "https://instagram.com", label: "Instagram" },
                { icon: <FiTwitter   size={17} />, href: "https://twitter.com",   label: "Twitter"   },
                { icon: <FiMail      size={17} />, href: "mailto:support@vedrix.in", label: "Email"  },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/30 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="mt-7 space-y-2.5">
              {[
                { icon: <FiMail    size={13} />, text: "support@vedrix.in"       },
                { icon: <FiPhone   size={13} />, text: "+91 98765 43210"         },
                { icon: <FiMapPin  size={13} />, text: "Koramangala, Bangalore"  },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2.5 text-[12px] text-white/40">
                  <span className="text-white/20">{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">Shop</p>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[13px] text-white/50 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[13px] text-white/50 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">Support</p>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[13px] text-white/50 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-5 md:flex-row lg:px-10 xl:px-14">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} Vedrix. All Rights Reserved.
          </p>
          <p className="text-[11px] text-white/20">
            Designed & Built in Bangalore, India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
