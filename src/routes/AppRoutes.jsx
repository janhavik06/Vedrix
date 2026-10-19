import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop";
import AdminRoute from "../pages/Admin/AdminRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminCustomers from "../pages/Admin/AdminCustomers";
import ProtectedRoute from "./ProtectedRoute";
import OrderDetails from "../pages/Orders/OrderDetails";

import {
  Home,
  Shop,
  NewArrivals,
  Collections,
  ProductDetails,
  Cart,
  Wishlist,
  Login,
  Register,
  Profile,
  Orders,
  About,
  Contact,
  NotFound,
  Checkout,
  PrivacyPolicy,
  Terms,
  ShippingPolicy,
  Returns,
} from "../pages";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/new-arrivals" element={<NewArrivals />} />

        <Route path="/collections" element={<Collections />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* Policy pages */}
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/shipping" element={<ShippingPolicy />} />

        <Route path="/returns" element={<Returns />} />

        <Route path="*" element={<NotFound />} />

        {/* Admin panel — role-guarded */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
