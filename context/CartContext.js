import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [fromRestaurant, setFromRestaurant] = useState(null);

  const addItem = (foodItem, restaurant) => {
    if (fromRestaurant && fromRestaurant.id !== restaurant.id) {
      setItems([{ ...foodItem, quantity: 1 }]);
      setFromRestaurant(restaurant);
      return;
    }
    if (!fromRestaurant) setFromRestaurant(restaurant);
    setItems(prev => {
      const existing = prev.find(i => i.id === foodItem.id);
      if (existing) return prev.map(i => i.id === foodItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...foodItem, quantity: 1 }];
    });
  };

  const removeItem = (itemId) => {
    setItems(prev => {
      const updated = prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)
                         .filter(i => i.quantity > 0);
      if (updated.length === 0) setFromRestaurant(null);
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    setFromRestaurant(null);
  };

  const getQty = (itemId) => items.find(i => i.id === itemId)?.quantity ?? 0;
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal   = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, fromRestaurant, addItem, removeItem, clearCart, getQty, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
