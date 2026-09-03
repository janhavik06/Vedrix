import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaInstagram />,
    url: "#",
  },
  {
    icon: <FaFacebookF />,
    url: "#",
  },
  {
    icon: <FaLinkedinIn />,
    url: "#",
  },
  {
    icon: <FaGithub />,
    url: "#",
  },
];

const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className="
            h-11
            w-11
            rounded-full
            border
            border-gray-700
            flex
            items-center
            justify-center
            text-lg
            hover:bg-white
            hover:text-black
            hover:border-white
            transition-all
            duration-300
          "
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
