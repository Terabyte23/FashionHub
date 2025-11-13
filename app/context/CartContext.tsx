import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
 
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
 
// Вспомогательные функции для ключей
const getFavoritesKey = (userId: number | null) =>
  userId ? `favorites_${userId}` : "favorites_guest";
 
const getCartKey = (userId: number | null) =>
  userId ? `cart_${userId}` : "cart_guest";
 
export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user ? user.id : null;
 
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
 
  // Загружаем корзину/избранное каждый раз, когда меняется пользователь
  useEffect(() => {
    const favKey = getFavoritesKey(userId);
    const cartKey = getCartKey(userId);
 
    try {
      const storedFavorites = localStorage.getItem(favKey);
      const storedCart = localStorage.getItem(cartKey);
 
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    } catch (e) {
      console.error("Error loading cart/favorites from localStorage:", e);
      setFavorites([]);
      setCartItems([]);
    }
  }, [userId]);
 
  // Сохраняем избранное в localStorage для текущего пользователя
  useEffect(() => {
    const favKey = getFavoritesKey(userId);
    try {
      localStorage.setItem(favKey, JSON.stringify(favorites));
    } catch (e) {
      console.error("Error saving favorites:", e);
    }
  }, [favorites, userId]);
 
  // Сохраняем корзину в localStorage для текущего пользователя
  useEffect(() => {
    const cartKey = getCartKey(userId);
    try {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }, [cartItems, userId]);
 
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