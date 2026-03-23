import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext();
/* Det var en ESLint-regel från React Refresh som inte tillåter att hooks och komponenter exporteras i samma fil, så jag valde att ignorera den. */
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
const API_URL = "http://localhost:5000";
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  const loadCart = async () => {
    const user = getUser();
    if (!user) return;
    const res = await fetch(`${API_URL}/carts/active/${user.user_id}`, {
      cache: "no-store"
    });
    const data = await res.json();
    const cartItemsData = data.cart_items || [];
    const items = cartItemsData.map(ci => ({
      id: ci.product.product_id,     // product_id
      title: ci.product.title,
      price: ci.product.price,
      quantity: ci.quantity,
      cartItemId: ci.cart_item_id
    }));
    setCartItems(items);
  };
useEffect(() => {
  // Hämtar kundvagnen när komponenten laddas första gången
  loadCart();
  // ESLint varnar för att loadCart saknas i dependency array,
  // men vi vill bara köra den en gång vid första render.
  // Därför ignorerar vi varningen.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const addToCart = async (product) => {
    const user = getUser();
    if (!user) {
      alert("Du måste vara inloggad först!");
      return;
    }
    const existing = cartItems.find(i => i.id === product.product_id);
    if (existing) {
      await fetch(`${API_URL}/carts/items/${existing.cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: existing.quantity + 1
        })
      });
    } else {
      await fetch(`${API_URL}/carts/active/${user.user_id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.product_id,
          quantity: 1
        })
      });
    }
    await loadCart();
  };
  const increaseQty = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;
    await fetch(`${API_URL}/carts/items/${item.cartItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: item.quantity + 1
      })
    });
    setCartItems(items =>
      items.map(i =>
        i.id === productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };
  const decreaseQty = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item || item.quantity <= 1) return;
    await fetch(`${API_URL}/carts/items/${item.cartItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: item.quantity - 1
      })
    });
    setCartItems(items =>
      items.map(i =>
        i.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };
  const removeItem = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;
    await fetch(`${API_URL}/carts/items/${item.cartItemId}`, {
      method: "DELETE"
    });
    setCartItems(items =>
      items.filter(i => i.id !== productId)
    );
  };
  return (
    <CartContext.Provider
      value={{cartItems,addToCart,increaseQty,decreaseQty,removeItem}}>
      {children}
    </CartContext.Provider>
  );
}