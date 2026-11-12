import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { load, save } from '../utils/storage';
import { uid } from '../utils/helpers';
import { DISCOUNT_CODES, getProduct, getStock } from '../data/products';

const ShopContext = createContext(null);

// A piece of state saved under the current user's email
function useUserState(name, user, initial) {
  const key = user ? `tee_${name}_${user.email}` : null;
  const [value, setValue] = useState(() => (key ? load(key, initial) : initial));

  useEffect(() => {
    setValue(key ? load(key, initial) : initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Change and save in one step, so one user's data never lands under another's key
  const update = (fn) =>
    setValue((prev) => {
      const next = typeof fn === 'function' ? fn(prev) : fn;
      if (key) save(key, next);
      return next;
    });

  return [value, update];
}

export function ShopProvider({ children }) {
  const { user } = useAuth();
  const [bag, setBag] = useUserState('bag', user, []);
  const [wishlist, setWishlist] = useUserState('wish', user, []);
  const [orders, setOrders] = useUserState('orders', user, []);
  const [viewed, setViewed] = useUserState('viewed', user, []);
  const [code, setCode] = useUserState('code', user, null);
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    setBagOpen(false);
  }, [user]);

  // ---- Bag ----
  function addToBag(productId, size, color, qty = 1) {
    const product = getProduct(productId);
    const stock = getStock(product, size, color);
    const lineId = `${productId}|${size}|${color}`;
    const inBag = bag.find((l) => l.lineId === lineId)?.qty || 0;
    if (inBag + qty > stock) {
      return { ok: false, message: stock === 0 ? `${size}, ${color} is sold out.` : `Only ${stock} left in ${size}, ${color}.` };
    }
    setBag((prev) => {
      const existing = prev.find((l) => l.lineId === lineId);
      return existing
        ? prev.map((l) => (l.lineId === lineId ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { lineId, productId, size, color, qty }];
    });
    return { ok: true };
  }

  function setQty(lineId, qty) {
    setBag((prev) =>
      prev
        .map((l) => {
          if (l.lineId !== lineId) return l;
          const max = getStock(getProduct(l.productId), l.size, l.color);
          return { ...l, qty: Math.min(qty, max) };
        })
        .filter((l) => l.qty > 0)
    );
  }

  const removeLine = (lineId) => setBag((prev) => prev.filter((l) => l.lineId !== lineId));

  // Bag lines joined with their product data
  const lines = useMemo(
    () => bag.map((l) => ({ ...l, product: getProduct(l.productId) })).filter((l) => l.product),
    [bag]
  );

  const totals = useMemo(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const rule = code ? DISCOUNT_CODES[code] : null;
    let discount = 0;
    if (rule) discount = rule.type === 'percent' ? Math.round((subtotal * rule.value) / 100) : rule.value;
    discount = Math.min(discount, subtotal);
    return { count, subtotal, discount, afterDiscount: subtotal - discount };
  }, [lines, code]);

  // ---- Discount codes ----
  function applyCode(input) {
    const clean = input.trim().toUpperCase();
    if (!DISCOUNT_CODES[clean]) return { ok: false, message: "That code isn't valid. Check the spelling and try again." };
    setCode(clean);
    return { ok: true, message: `${clean} applied: ${DISCOUNT_CODES[clean].label}` };
  }
  const removeCode = () => setCode(null);

  // ---- Wishlist ----
  const isWished = (id) => wishlist.includes(id);
  const toggleWish = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));

  // ---- Recently viewed ----
  const addViewed = (id) => setViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));

  // ---- Orders ----
  function placeOrder({ shipping, details, reference, method, displayCurrency }) {
    const order = {
      id: uid('TEE-'),
      reference,
      method,
      items: lines.map(({ productId, size, color, qty, product }) => ({
        productId, size, color, qty, name: product.name, price: product.price,
      })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      code,
      shipping,
      total: totals.afterDiscount + shipping.cost,
      displayCurrency,
      details,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    setBag([]);
    setCode(null);
    return order;
  }

  return (
    <ShopContext.Provider
      value={{
        lines, totals, addToBag, setQty, removeLine, bagOpen, setBagOpen,
        code, applyCode, removeCode,
        wishlist, isWished, toggleWish,
        viewed, addViewed,
        orders, placeOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
