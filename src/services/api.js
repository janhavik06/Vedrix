// Central API service — all backend calls go through here

const BASE_URL = "http://localhost:5000/api";

// ── Helper: get stored token ──────────────────────────────
const getToken = () => localStorage.getItem("vedrix_token");

// ── Core fetch wrapper ────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ── Convenience methods ───────────────────────────────────
const get    = (url)         => request(url, { method: "GET" });
const post   = (url, body)   => request(url, { method: "POST",   body: JSON.stringify(body) });
const put    = (url, body)   => request(url, { method: "PUT",    body: JSON.stringify(body) });
const del    = (url)         => request(url, { method: "DELETE" });

// ════════════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════════════
export const authAPI = {
  register:        (data)   => post("/auth/register", data),
  login:           (data)   => post("/auth/login", data),
  getMe:           ()       => get("/auth/me"),
  updateProfile:   (data)   => put("/auth/update-profile", data),
  changePassword:  (data)   => put("/auth/change-password", data),
};

// ════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════
export const productAPI = {
  getAll:          (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/products${qs ? `?${qs}` : ""}`);
  },
  getById:         (id)     => get(`/products/${id}`),
  getByCategory:   (slug)   => get(`/products/category/${slug}`),
  create:          (data)   => post("/products", data),
  update:          (id, data) => put(`/products/${id}`, data),
  delete:          (id)     => del(`/products/${id}`),
};

// ════════════════════════════════════════════════════════
// CART
// ════════════════════════════════════════════════════════
export const cartAPI = {
  get:             ()            => get("/cart"),
  add:             (data)        => post("/cart", data),
  update:          (itemId, qty) => put(`/cart/${itemId}`, { quantity: qty }),
  remove:          (itemId)      => del(`/cart/${itemId}`),
  clear:           ()            => del("/cart/clear"),
};

// ════════════════════════════════════════════════════════
// WISHLIST
// ════════════════════════════════════════════════════════
export const wishlistAPI = {
  get:             ()          => get("/wishlist"),
  add:             (productId) => post("/wishlist", { productId }),
  remove:          (productId) => del(`/wishlist/${productId}`),
};

// ════════════════════════════════════════════════════════
// ORDERS
// ════════════════════════════════════════════════════════
export const orderAPI = {
  create:          (data)  => post("/orders", data),
  getMyOrders:     ()      => get("/orders/my"),
  getById:         (id)    => get(`/orders/${id}`),
  cancel:          (id)    => put(`/orders/${id}/cancel`),
};

// ════════════════════════════════════════════════════════
// PROFILE / ADDRESSES
// ════════════════════════════════════════════════════════
export const profileAPI = {
  getAddresses:    ()        => get("/profile/addresses"),
  addAddress:      (data)    => post("/profile/addresses", data),
  updateAddress:   (id, data) => put(`/profile/addresses/${id}`, data),
  deleteAddress:   (id)      => del(`/profile/addresses/${id}`),
};

// ════════════════════════════════════════════════════════
// REVIEWS
// ════════════════════════════════════════════════════════
export const reviewAPI = {
  getForProduct:   (productId) => get(`/reviews/${productId}`),
  add:             (data)      => post("/reviews", data),
  delete:          (id)        => del(`/reviews/${id}`),
};

// ════════════════════════════════════════════════════════
// ADMIN
// ════════════════════════════════════════════════════════
export const adminAPI = {
  // Dashboard
  getStats:         ()           => get("/admin/stats"),
  getCategories:    ()           => get("/admin/categories"),

  // Products
  getProducts:      (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/admin/products${qs ? `?${qs}` : ""}`);
  },
  createProduct:    (data)       => post("/admin/products", data),
  updateProduct:    (id, data)   => put(`/admin/products/${id}`, data),
  deleteProduct:    (id)         => del(`/admin/products/${id}`),

  // Image upload — uses FormData so needs raw fetch
  uploadImage: async (file) => {
    const token = localStorage.getItem("vedrix_token");
    const form  = new FormData();
    form.append("image", file);
    const res  = await fetch("http://localhost:5000/api/admin/upload", {
      method:  "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body:    form,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data;
  },

  // Orders
  getOrders:        (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/admin/orders${qs ? `?${qs}` : ""}`);
  },
  updateOrderStatus: (id, status) => put(`/admin/orders/${id}/status`, { status }),

  // Customers
  getCustomers:     (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/admin/customers${qs ? `?${qs}` : ""}`);
  },
};
