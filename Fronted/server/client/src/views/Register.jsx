import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
const API_URL = "http://localhost:5000";
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  // Hämta cart från backend när appen startar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    fetch(`${API_URL}/carts/active/${user.user_id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.cart_items) return;
        const items = data.cart_items.map(ci => ({
          id: ci.product.product_id,
          title: ci.product.title,
          price: ci.product.price,
          quantity: ci.quantity,
          cartItemId: ci.cart_item_id
        }));
        setCartItems(items);
      });
  }, []);
  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    await fetch(`${API_URL}/carts/active/${user.user_id}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: product.product_id,
        quantity: 1
      })
    });
    // Hämta cart igen
    const res = await fetch(`${API_URL}/carts/active/${user.user_id}`);
    const data = await res.json();
    const items = data.cart_items.map(ci => ({
      id: ci.product.product_id,
      title: ci.product.title,
      price: ci.product.price,
      quantity: ci.quantity,
      cartItemId: ci.cart_item_id
    }));
    setCartItems(items);
  };
  const increaseQty = async (item) => {
    await fetch(`${API_URL}/carts/items/${item.cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: item.quantity + 1
      })
    });
    setCartItems(items =>
      items.map(i =>
        i.cartItemId === item.cartItemId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };
  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    await fetch(`${API_URL}/carts/items/${item.cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: item.quantity - 1
      })
    });
    setCartItems(items =>
      items.map(i =>
        i.cartItemId === item.cartItemId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };
  const removeItem = async (cartItemId) => {
    await fetch(`${API_URL}/carts/items/${cartItemId}`, {
      method: "DELETE"
    });
    setCartItems(items => items.filter(i => i.cartItemId !== cartItemId));
  };
  return (
    <CartContext.Provider
      value={{cartItems, addToCart, increaseQty, decreaseQty, removeItem}}>
      {children}
    </CartContext.Provider>
  );
}