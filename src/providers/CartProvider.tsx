import { CartItem, Product } from "@/types";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { randomUUID } from "expo-crypto";
type CartType = {
  items: CartItem[];
  addItem: (product: Product, quantity: CartItem["quantity"]) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  total: number;
  clearCart: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  clearCart: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, quantity: CartItem["quantity"]) => {
    const existingItem = items.find((item) => item.product === product);

    if (existingItem) {
      updateQuantity(existingItem.id, quantity);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product: product,
      quantity: quantity,
      product_id: product.id,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + quantity }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
