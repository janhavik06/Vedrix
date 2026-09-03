import { createContext, useContext, useEffect, useState } from "react";
import { cartAPI } from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading]     = useState(false);

  // ── Fetch cart whenever user logs in/out ─────────────────
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartTotal(0);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartAPI.get();
      setCartItems(res.items || []);
      setCartTotal(res.total || 0);
    } catch (err) {
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Add to cart ──────────────────────────────────────────
  const addToCart = async (productId, quantity = 1, size = null, color = null) => {
    if (!user) throw new Error("Please login to add items to cart.");
    await cartAPI.add({ productId, quantity, size, color });
    await fetchCart();
  };

  // ── Update item quantity ─────────────────────────────────
  const updateQuantity = async (itemId, quantity) => {
    await cartAPI.update(itemId, quantity);
    await fetchCart();
  };

  // ── Remove item ──────────────────────────────────────────
  const removeFromCart = async (itemId) => {
    await cartAPI.remove(itemId);
    await fetchCart();
  };

  // ── Clear cart ───────────────────────────────────────────
  const clearCart = async () => {
    await cartAPI.clear();
    setCartItems([]);
    setCartTotal(0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
