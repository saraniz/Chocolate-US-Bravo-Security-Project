import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import FavoritesPage from "./pages/FavoritesPage";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyOrders from "./pages/MyOrders";
import Settings from "./pages/Settings";
import Product from "./pages/Product";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import Overview from "./admin/Overview";
import Admin from "./admin/Admin";
import AdminLayout from './admin/layouts/AdminLayout';
import Users from './admin/pages/Users';
import Products from './admin/pages/Products';
import Orders from './admin/pages/Orders';
import Analytics from './admin/pages/Analytics';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen font-poppins mx-auto max-w-screen-xl">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8B4513]"></div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const NonAuthenticatedLayout = ({ children }) => {
  return <div className="min-h-screen font-poppins">{children}</div>;
};

function App() {
  return (
    <div className="font-poppins">
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <Routes>
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <HomePage />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shop"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <Shop />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <Cart />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <FavoritesPage />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <AboutUs />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <MyOrders />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <Settings />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <Product />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />

              {/* Non-Protected Routes */}
              <Route
                path="/login"
                element={
                  <NonAuthenticatedLayout>
                    <LoginPage />
                  </NonAuthenticatedLayout>
                }
              />
              {/* Admin Routes (with nested layout) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
