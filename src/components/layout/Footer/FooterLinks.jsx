import { Link } from "react-router-dom";

const footerData = [
  {
    title: "Shop",
    links: [
      {
        name: "Hoodies",
        path: "/shop?category=hoodies",
      },
      {
        name: "T-Shirts",
        path: "/shop?category=tshirts",
      },
      {
        name: "New Arrivals",
        path: "/new-arrivals",
      },
      {
        name: "Collections",
        path: "/collections",
      },
    ],
  },

  {
    title: "Company",
    links: [
      {
        name: "About",
        path: "/about",
      },
      {
        name: "Contact",
        path: "/contact",
      },
      {
        name: "FAQs",
        path: "/faq",
      },
      {
        name: "Support",
        path: "/support",
      },
    ],
  },
];

const FooterLinks = () => {
  return (
    <>
      {footerData.map((section) => (
        <div key={section.title}>
          <h3
            className="
              text-lg
              font-semibold
              mb-6
            "
          >
            {section.title}
          </h3>

          <div className="flex flex-col gap-4">
            {section.links.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="
                  text-gray-400
                  hover:text-white
                  transition
                "
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterLinks;
