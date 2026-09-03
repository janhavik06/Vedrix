import { createContext, useContext, useEffect, useState } from "react";
import { wishlistAPI } from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading]             = useState(false);

  // ── Fetch wishlist whenever user changes ─────────────────
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await wishlistAPI.get();
      setWishlistItems(res.items || []);
    } catch (err) {
      console.error("Fetch wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Add to wishlist ──────────────────────────────────────
  const addToWishlist = async (productId) => {
    if (!user) throw new Error("Please login to save items.");
    await wishlistAPI.add(productId);
    await fetchWishlist();
  };

  // ── Remove from wishlist ─────────────────────────────────
  const removeFromWishlist = async (productId) => {
    await wishlistAPI.remove(productId);
    setWishlistItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  // ── Check if a product is in wishlist ────────────────────
  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.productId === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
