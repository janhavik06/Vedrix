import { useState } from "react";
import { FiSend } from "react-icons/fi";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">Join the Vedrix Club</h3>

      <p className="text-gray-400 leading-7 mb-6">
        Get exclusive offers, early access to new collections, and premium
        streetwear updates delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            bg-[#1b1b1b]
            border
            border-gray-700
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-orange-500
            transition
          "
        />

        <button
          type="submit"
          className="
            flex
            justify-center
            items-center
            gap-2
            bg-white
            text-black
            rounded-xl
            py-3
            font-semibold
            hover:bg-orange-500
            hover:text-white
            transition
          "
        >
          Subscribe
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
