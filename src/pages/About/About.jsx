import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import {
  FiTarget,
  FiHeart,
  FiStar,
  FiShield,
  FiZap,
  FiUsers,
} from "react-icons/fi";

/* ---------- static data ---------- */

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Products" },
  { value: "15+", label: "Cities Delivered" },
  { value: "4.8★", label: "Avg. Rating" },
];

const values = [
  {
    icon: <FiTarget size={28} />,
    title: "Quality First",
    description:
      "Every stitch, fabric and finish is held to the highest standard before it reaches you.",
  },
  {
    icon: <FiHeart size={28} />,
    title: "Made with Passion",
    description:
      "Our designs are born from a love of fashion, culture, and the people who wear our clothes.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Transparent Pricing",
    description:
      "Premium quality shouldn't cost a fortune. We keep our margins honest and our prices fair.",
  },
  {
    icon: <FiZap size={28} />,
    title: "Fast & Reliable",
    description:
      "From our warehouse to your door in 3-5 days, with real-time tracking every step of the way.",
  },
  {
    icon: <FiStar size={28} />,
    title: "Timeless Style",
    description:
      "We skip the fleeting trend trap. Our collections are designed to outlast every season.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Community Driven",
    description:
      "Every drop, collab and colourway is shaped by feedback from the Vedrix community.",
  },
];

const team = [
  {
    name: "Aryan Mehta",
    role: "Founder & Creative Director",
    initials: "AM",
    color: "bg-orange-500",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    initials: "PS",
    color: "bg-black",
  },
  {
    name: "Rohan Das",
    role: "Operations Lead",
    initials: "RD",
    color: "bg-gray-700",
  },
  {
    name: "Neha Kapoor",
    role: "Brand & Marketing",
    initials: "NK",
    color: "bg-orange-400",
  },
];

/* ---------- component ---------- */

const About = () => {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── full-bleed from y=0, navbar is transparent over it */}
        <section className="relative overflow-hidden bg-black pb-32 pt-[120px] text-white">
          {/* decorative ring */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full border border-orange-500/20" />

          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[4px] text-orange-400">
              Our Story
            </span>

            <h1 className="mx-auto mt-8 max-w-4xl text-6xl font-black leading-tight md:text-7xl">
              Dressing the{" "}
              <span className="text-orange-500">Bold.</span>
              <br />
              Since Day One.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-300">
              Vedrix was built on a simple belief — great clothes shouldn't be a
              compromise between quality, style, and price. We set out to fix
              that, one drop at a time.
            </p>

            <Link
              to="/shop"
              className="mt-12 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-orange-600"
            >
              Explore the Collection
            </Link>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="border-b border-gray-100 bg-[#fafafa]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-gray-100 md:grid-cols-4 md:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-10 py-10 text-center">
                <p className="text-4xl font-black">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-widest text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Brand Story ── */}
        <section className="py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
            {/* text */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[4px] text-gray-400">
                How It Started
              </span>
              <h2 className="mt-5 text-5xl font-black leading-tight">
                Born from the
                <br />
                streets, built for
                <br />
                <span className="text-orange-500">everyone.</span>
              </h2>
              <div className="mt-8 space-y-5 text-gray-500 leading-8">
                <p>
                  It started in 2022 with a small capsule collection, a shared
                  passion for streetwear, and zero compromises on fabric
                  quality. Our founder Aryan had a simple mission — make the
                  kind of clothes he actually wanted to wear.
                </p>
                <p>
                  Within a year, Vedrix grew from a side project into a
                  full-blown brand worn across India. We source premium
                  GSM-heavy fabrics, work with skilled local artisans, and
                  design everything in-house in our Bangalore studio.
                </p>
                <p>
                  Today, Vedrix ships to 15+ cities, serves 50,000+ customers,
                  and drops new collections every season — but the ethos hasn't
                  changed: quality you feel, style that lasts.
                </p>
              </div>
            </div>

            {/* visual block */}
            <div className="relative">
              <div className="h-[500px] overflow-hidden rounded-[40px] bg-gradient-to-br from-black via-gray-800 to-gray-900">
                <div className="flex h-full flex-col items-center justify-center gap-4 text-white">
                  <span className="text-[120px] font-black leading-none tracking-tighter text-white/10">
                    VDX
                  </span>
                  <p className="text-center text-xl font-light tracking-[8px] text-orange-400 uppercase">
                    Vedrix Studio
                  </p>
                  <p className="text-gray-500 text-sm tracking-widest">
                    Bangalore, India · Est. 2022
                  </p>
                </div>
              </div>

              {/* floating badge */}
              <div className="absolute -bottom-6 -right-6 rounded-3xl bg-orange-500 px-7 py-5 text-white shadow-xl">
                <p className="text-3xl font-black">3+</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider">
                  Years of Drops
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values Grid ── */}
        <section className="bg-[#fafafa] py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <span className="text-xs font-semibold uppercase tracking-[4px] text-gray-400">
                What We Stand For
              </span>
              <h2 className="mt-5 text-5xl font-black">Our Values</h2>
              <p className="mx-auto mt-5 max-w-xl text-gray-500 leading-8">
                Six principles that guide every decision we make — from design
                to delivery.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="group rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-colors duration-300 group-hover:bg-orange-500">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 leading-7 text-gray-500">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <span className="text-xs font-semibold uppercase tracking-[4px] text-gray-400">
                The People
              </span>
              <h2 className="mt-5 text-5xl font-black">Meet the Team</h2>
              <p className="mx-auto mt-5 max-w-xl text-gray-500 leading-8">
                A small, focused group of people obsessed with building the
                best streetwear brand in India.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div
                    className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full ${member.color} text-3xl font-black text-white`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{member.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-black py-24 text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-5xl font-black leading-tight">
              Ready to wear
              <br />
              <span className="text-orange-500">Vedrix?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-gray-300 leading-8">
              Explore our latest drops, seasonal collections, and bestsellers.
              Free shipping on all orders above ₹999.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/shop"
                className="rounded-xl bg-orange-500 px-8 py-4 font-semibold transition-all duration-300 hover:bg-orange-600"
              >
                Shop Now
              </Link>
              <Link
                to="/collections"
                className="rounded-xl border border-white px-8 py-4 font-semibold transition-all duration-300 hover:bg-white hover:text-black"
              >
                View Collections
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
