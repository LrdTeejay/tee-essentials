import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BagDrawer from './components/BagDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/OrderConfirmed';
import Orders from './pages/Orders';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

function StoreLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  // Start each new page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {user && <BagDrawer />}
    </>
  );
}

function GuestOnly({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/shop" replace /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />

      <Route element={<StoreLayout />}>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderConfirmed />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
