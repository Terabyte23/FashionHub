import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  availableSizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  favorites: Product[];
  cartItems: CartItem[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartItemQuantity: (productId: string, size: string, quantity: number) => void;
  updateCartItemSize: (productId: string, oldSize: string, newSize: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const storedCart = localStorage.getItem("cart");

    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    }

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.id === productId);
  };

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, selectedSize: size, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.selectedSize === size))
    );
  };

  const updateCartItemQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateCartItemSize = (productId: string, oldSize: string, newSize: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === oldSize
          ? { ...item, selectedSize: newSize }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        favorites,
        cartItems,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        updateCartItemSize,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
