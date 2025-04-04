import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import FavoritesPage from './pages/FavoritesPage';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-poppins max-w-screen-xl mx-auto">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};


const NonAuthenticatedLayout = ({ children }) => {
  return (
    <div className="min-h-screen font-poppins">
      {children}
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Routes>
          {/* Authenticated Routes */}
          <Route path="/" element={
            <AuthenticatedLayout>
              <HomePage />
            </AuthenticatedLayout>
          } />
          <Route path="/shop" element={
            <AuthenticatedLayout>
              <Shop />
            </AuthenticatedLayout>
          } />
          <Route path="/cart" element={
            <AuthenticatedLayout>
              <Cart />
            </AuthenticatedLayout>
          } />
          <Route path="/favorites" element={
            <AuthenticatedLayout>
              <FavoritesPage />
            </AuthenticatedLayout>
          } />
          <Route path="/about" element={
            <AuthenticatedLayout>
              <AboutUs />
            </AuthenticatedLayout>
          } />

          {/* Non-Authenticated Routes */}
          <Route path="/login" element={
            <NonAuthenticatedLayout>
              <LoginPage />
            </NonAuthenticatedLayout>
          } />
          <Route path="/register" element={
            <NonAuthenticatedLayout>
              <RegisterPage />
            </NonAuthenticatedLayout>
          } />
        </Routes>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
