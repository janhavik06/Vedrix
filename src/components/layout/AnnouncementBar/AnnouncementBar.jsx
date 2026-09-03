import { useEffect, useState } from "react";
import { FiTruck, FiGift, FiTag } from "react-icons/fi";

const messages = [
  { icon: <FiTruck size={14} />,  text: "Free Shipping on Orders Above ₹999" },
  { icon: <FiTag size={14} />,    text: "Use code VEDRIX10 · 10% Off Your First Order" },
  { icon: <FiGift size={14} />,   text: "New Collection Live · Limited Stock" },
];

const AnnouncementBar = () => {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % messages.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-center px-6">
        <div
          className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <span className="text-white/60">{messages[idx].icon}</span>
          <span className="text-white/90">{messages[idx].text}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
