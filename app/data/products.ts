import type { Product } from "../context/CartContext";

export const sampleProducts: Product[] = [
  {
    id: "m-shirt-1",
    name: "Classic White T-Shirt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "mees",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m-shirt-2",
    name: "Black Polo Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
    category: "mees",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    id: "m-pants-1",
    name: "Blue Jeans",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    category: "mees",
    availableSizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "m-jacket-1",
    name: "Leather Jacket",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    category: "mees",
    availableSizes: ["M", "L", "XL"],
  },
  {
    id: "w-dress-1",
    name: "Summer Floral Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    category: "naiste",
    availableSizes: ["XS", "S", "M", "L"],
  },
  {
    id: "w-top-1",
    name: "Elegant Blouse",
    price: 39.99,
    image: "icon/bluzka.png",
    category: "naiste",
    availableSizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "w-pants-1",
    name: "High-Waist Trousers",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    category: "naiste",
    availableSizes: ["XS", "S", "M", "L"],
  },
  {
    id: "w-jacket-1",
    name: "Denim Jacket",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=500&fit=crop",
    category: "naiste",
    availableSizes: ["S", "M", "L"],
  },
];

export function getProductsByCategory(category: string): Product[] {
  return sampleProducts.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find((product) => product.id === id);
}
